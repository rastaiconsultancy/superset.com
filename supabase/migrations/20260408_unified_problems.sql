-- ============================================================
-- PRODUCTION-SAFE / IDEMPOTENT SUPABASE MIGRATION
-- Unified Problems + Quiz Schema
-- Safe for reruns where possible
-- ============================================================

BEGIN;

-- ============================================================
-- EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- ENUM TYPES
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'problem_source'
  ) THEN
    CREATE TYPE problem_source AS ENUM ('onboarding', 'sat', 'practice', 'custom');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'session_source'
  ) THEN
    CREATE TYPE session_source AS ENUM ('onboarding', 'sat', 'custom');
  END IF;
END $$;

-- ============================================================
-- A. CREATE problems
-- ============================================================

CREATE TABLE IF NOT EXISTS problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source problem_source NOT NULL,

  subtopic_id uuid REFERENCES subtopics(id) ON DELETE CASCADE,
  custom_topic_id uuid REFERENCES custom_topics(id) ON DELETE CASCADE,

  topic_slug text,
  subtopic_slug text,

  order_index integer NOT NULL,
  difficulty text NOT NULL,

  difficulty_level integer NOT NULL DEFAULT 5
    CHECK (difficulty_level >= 1 AND difficulty_level <= 10),

  category text,

  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_option integer NOT NULL,
  explanation text NOT NULL,

  solution_steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  concept_tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  common_errors jsonb NOT NULL DEFAULT '[]'::jsonb,

  hint text NOT NULL DEFAULT '',
  detailed_hint text,

  time_recommendation_seconds integer NOT NULL DEFAULT 60,
  sat_frequency text,

  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT problems_source_linking CHECK (
    CASE source
      WHEN 'sat' THEN subtopic_id IS NOT NULL
      WHEN 'practice' THEN
        subtopic_id IS NOT NULL
        OR (topic_slug IS NOT NULL AND subtopic_slug IS NOT NULL)
      WHEN 'custom' THEN custom_topic_id IS NOT NULL
      WHEN 'onboarding' THEN true
      ELSE false
    END
  )
);

CREATE INDEX IF NOT EXISTS idx_problems_source
ON problems(source);

CREATE INDEX IF NOT EXISTS idx_problems_subtopic
ON problems(subtopic_id)
WHERE subtopic_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_problems_subtopic_difficulty
ON problems(subtopic_id, difficulty_level)
WHERE subtopic_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_problems_custom_topic
ON problems(custom_topic_id)
WHERE custom_topic_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_problems_slug_pair
ON problems(topic_slug, subtopic_slug)
WHERE topic_slug IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_problems_onboarding_order
ON problems(order_index)
WHERE source = 'onboarding';

-- ============================================================
-- B. CREATE quiz_sessions
-- ============================================================

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  source session_source NOT NULL,

  subtopic_id uuid REFERENCES subtopics(id) ON DELETE CASCADE,
  custom_topic_id uuid REFERENCES custom_topics(id) ON DELETE CASCADE,

  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 1,
  time_elapsed_seconds integer NOT NULL DEFAULT 0,

  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user
ON quiz_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_source
ON quiz_sessions(user_id, source);

-- ============================================================
-- C. CREATE quiz_answers
-- ============================================================

CREATE TABLE IF NOT EXISTS quiz_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  session_id uuid NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  problem_id uuid NOT NULL REFERENCES problems(id) ON DELETE CASCADE,

  selected_option integer NOT NULL,
  is_correct boolean NOT NULL,

  difficulty_level integer,
  response_time_ms integer,

  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_session
ON quiz_answers(session_id);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_problem
ON quiz_answers(problem_id);

-- ============================================================
-- D. DATA MIGRATION (SAFE)
-- ============================================================

-- onboarding questions
INSERT INTO problems (
  id, source, order_index, difficulty, difficulty_level,
  category, question_text, options, correct_option,
  explanation, created_at
)
SELECT
  q.id,
  'onboarding',
  q.order_index,
  q.difficulty,
  5,
  q.category,
  q.question_text,
  q.options,
  q.correct_option,
  q.explanation,
  q.created_at
FROM questions q
WHERE EXISTS (
  SELECT 1
  FROM information_schema.tables
  WHERE table_name='questions'
)
ON CONFLICT (id) DO NOTHING;

-- SAT problems
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name='sat_problems'
  ) THEN

    INSERT INTO problems (
      id, source, subtopic_id, order_index,
      difficulty, difficulty_level,
      question_text, options, correct_option,
      explanation, solution_steps,
      concept_tags, common_errors,
      hint, detailed_hint,
      time_recommendation_seconds,
      sat_frequency, created_at
    )
    SELECT
      id, 'sat', subtopic_id, order_index,
      difficulty, difficulty_level,
      question_text, options, correct_option,
      explanation, solution_steps,
      concept_tags, common_errors,
      hint, detailed_hint,
      time_recommendation_seconds,
      sat_frequency, created_at
    FROM sat_problems
    ON CONFLICT (id) DO NOTHING;

  END IF;
END $$;

-- ============================================================
-- E. lessons repoint
-- ============================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name='lessons'
      AND column_name='question_id'
  ) THEN
    ALTER TABLE lessons
    RENAME COLUMN question_id TO problem_id;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name='lessons'
  ) THEN

    ALTER TABLE lessons
    DROP CONSTRAINT IF EXISTS lessons_question_id_questions_id_fk;

    ALTER TABLE lessons
    DROP CONSTRAINT IF EXISTS lessons_problem_id_problems_fk;

    ALTER TABLE lessons
    ADD CONSTRAINT lessons_problem_id_problems_fk
    FOREIGN KEY (problem_id)
    REFERENCES problems(id)
    ON DELETE CASCADE;

  END IF;
END $$;

-- ============================================================
-- F. DROP OLD FUNCTIONS (SAFE)
-- ============================================================

DROP FUNCTION IF EXISTS save_sat_quiz_session(uuid, uuid, integer, integer, integer, jsonb);
DROP FUNCTION IF EXISTS save_custom_topic(uuid, text, text, jsonb, jsonb, jsonb, jsonb);
DROP FUNCTION IF EXISTS save_custom_quiz_session(uuid, uuid, integer, integer, integer, jsonb);

COMMIT;