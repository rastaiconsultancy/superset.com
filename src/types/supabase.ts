export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      custom_quiz_answers: {
        Row: {
          created_at: string
          id: string
          is_correct: boolean
          question_id: string
          selected_option: number
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct: boolean
          question_id: string
          selected_option: number
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_option?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_quiz_answers_question_id_custom_topic_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "custom_topic_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_quiz_answers_session_id_custom_quiz_sessions_id_fk"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "custom_quiz_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_quiz_sessions: {
        Row: {
          created_at: string
          id: string
          score: number
          time_elapsed_seconds: number
          topic_id: string
          total_questions: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          score: number
          time_elapsed_seconds: number
          topic_id: string
          total_questions: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number
          time_elapsed_seconds?: number
          topic_id?: string
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_quiz_sessions_topic_id_custom_topics_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "custom_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_quiz_sessions_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_topic_questions: {
        Row: {
          correct_option: number
          created_at: string
          difficulty: string
          explanation: string
          hint: string
          id: string
          options: Json
          order_index: number
          question_text: string
          solution_steps: Json
          time_recommendation_seconds: number
          topic_id: string
        }
        Insert: {
          correct_option: number
          created_at?: string
          difficulty: string
          explanation: string
          hint: string
          id?: string
          options: Json
          order_index: number
          question_text: string
          solution_steps: Json
          time_recommendation_seconds: number
          topic_id: string
        }
        Update: {
          correct_option?: number
          created_at?: string
          difficulty?: string
          explanation?: string
          hint?: string
          id?: string
          options?: Json
          order_index?: number
          question_text?: string
          solution_steps?: Json
          time_recommendation_seconds?: number
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_topic_questions_topic_id_custom_topics_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "custom_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_topics: {
        Row: {
          common_mistakes: Json
          created_at: string
          description: string
          id: string
          learning_objectives: Json
          tips_and_tricks: Json
          title: string
          user_id: string
        }
        Insert: {
          common_mistakes: Json
          created_at?: string
          description: string
          id?: string
          learning_objectives: Json
          tips_and_tricks: Json
          title: string
          user_id: string
        }
        Update: {
          common_mistakes?: Json
          created_at?: string
          description?: string
          id?: string
          learning_objectives?: Json
          tips_and_tricks?: Json
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_topics_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_quest_problems: {
        Row: {
          answered_at: string | null
          bucket: string
          difficulty_level: number
          id: string
          is_correct: boolean | null
          order_index: number
          problem_id: string
          quest_id: string
          response_time_ms: number | null
          selected_option: number | null
          subtopic_id: string
        }
        Insert: {
          answered_at?: string | null
          bucket: string
          difficulty_level: number
          id?: string
          is_correct?: boolean | null
          order_index: number
          problem_id: string
          quest_id: string
          response_time_ms?: number | null
          selected_option?: number | null
          subtopic_id: string
        }
        Update: {
          answered_at?: string | null
          bucket?: string
          difficulty_level?: number
          id?: string
          is_correct?: boolean | null
          order_index?: number
          problem_id?: string
          quest_id?: string
          response_time_ms?: number | null
          selected_option?: number | null
          subtopic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_quest_problems_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "sat_problems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_quest_problems_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "daily_quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_quest_problems_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_quests: {
        Row: {
          correct_count: number
          created_at: string
          id: string
          quest_date: string
          score: number
          status: string
          time_elapsed_seconds: number
          total_questions: number
          updated_at: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          correct_count?: number
          created_at?: string
          id?: string
          quest_date: string
          score?: number
          status?: string
          time_elapsed_seconds?: number
          total_questions?: number
          updated_at?: string
          user_id: string
          xp_earned?: number
        }
        Update: {
          correct_count?: number
          created_at?: string
          id?: string
          quest_date?: string
          score?: number
          status?: string
          time_elapsed_seconds?: number
          total_questions?: number
          updated_at?: string
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_quests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      friendships: {
        Row: {
          created_at: string
          friend_user_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_user_id: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_user_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendships_friend_user_id_users_id_fk"
            columns: ["friend_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_queue: {
        Row: {
          added_during: string
          created_at: string
          id: string
          lesson_id: string
          progress_pct: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          added_during?: string
          created_at?: string
          id?: string
          lesson_id: string
          progress_pct?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          added_during?: string
          created_at?: string
          id?: string
          lesson_id?: string
          progress_pct?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_queue_lesson_id_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_queue_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: Json
          created_at: string
          estimated_duration_minutes: number
          id: string
          question_id: string
          title: string
        }
        Insert: {
          content: Json
          created_at?: string
          estimated_duration_minutes?: number
          id?: string
          question_id: string
          title: string
        }
        Update: {
          content?: Json
          created_at?: string
          estimated_duration_minutes?: number
          id?: string
          question_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: true
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      micro_lessons: {
        Row: {
          created_at: string
          id: string
          lesson_content: string
          status: string
          subtopic_id: string
          updated_at: string
          whiteboard_steps: Json
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_content?: string
          status?: string
          subtopic_id: string
          updated_at?: string
          whiteboard_steps?: Json
        }
        Update: {
          created_at?: string
          id?: string
          lesson_content?: string
          status?: string
          subtopic_id?: string
          updated_at?: string
          whiteboard_steps?: Json
        }
        Relationships: [
          {
            foreignKeyName: "micro_lessons_subtopic_id_subtopics_id_fk"
            columns: ["subtopic_id"]
            isOneToOne: true
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_progress: {
        Row: {
          created_at: string
          current_step: string
          id: string
          lesson_preference: string | null
          quiz_question_index: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_step?: string
          id?: string
          lesson_preference?: string | null
          quiz_question_index?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_step?: string
          id?: string
          lesson_preference?: string | null
          quiz_question_index?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_progress_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_problems: {
        Row: {
          common_errors: Json
          concept_tags: Json
          correct_option: number
          created_at: string | null
          detailed_hint: string | null
          difficulty: string
          explanation: string
          hint: string
          id: string
          options: Json
          order_index: number
          question_text: string
          sat_frequency: string | null
          solution_steps: Json
          subtopic_id: string | null
          subtopic_slug: string
          time_recommendation_seconds: number
          topic_slug: string
        }
        Insert: {
          common_errors?: Json
          concept_tags?: Json
          correct_option: number
          created_at?: string | null
          detailed_hint?: string | null
          difficulty: string
          explanation: string
          hint?: string
          id?: string
          options: Json
          order_index: number
          question_text: string
          sat_frequency?: string | null
          solution_steps: Json
          subtopic_id?: string | null
          subtopic_slug: string
          time_recommendation_seconds: number
          topic_slug: string
        }
        Update: {
          common_errors?: Json
          concept_tags?: Json
          correct_option?: number
          created_at?: string | null
          detailed_hint?: string | null
          difficulty?: string
          explanation?: string
          hint?: string
          id?: string
          options?: Json
          order_index?: number
          question_text?: string
          sat_frequency?: string | null
          solution_steps?: Json
          subtopic_id?: string | null
          subtopic_slug?: string
          time_recommendation_seconds?: number
          topic_slug?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          category: string
          correct_option: number
          created_at: string
          difficulty: string
          explanation: string
          id: string
          options: Json
          order_index: number
          question_text: string
        }
        Insert: {
          category: string
          correct_option: number
          created_at?: string
          difficulty: string
          explanation: string
          id?: string
          options: Json
          order_index: number
          question_text: string
        }
        Update: {
          category?: string
          correct_option?: number
          created_at?: string
          difficulty?: string
          explanation?: string
          id?: string
          options?: Json
          order_index?: number
          question_text?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          created_at: string
          id: string
          is_correct: boolean
          question_id: string
          selected_option: number
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct: boolean
          question_id: string
          selected_option: number
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_option?: number
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sat_problems: {
        Row: {
          common_errors: Json
          concept_tags: Json
          correct_option: number
          created_at: string
          detailed_hint: string | null
          difficulty: string
          difficulty_level: number
          explanation: string
          hint: string
          id: string
          options: Json
          order_index: number
          question_text: string
          sat_frequency: string
          solution_steps: Json
          subtopic_id: string
          time_recommendation_seconds: number
        }
        Insert: {
          common_errors: Json
          concept_tags: Json
          correct_option: number
          created_at?: string
          detailed_hint?: string | null
          difficulty: string
          difficulty_level: number
          explanation: string
          hint: string
          id?: string
          options: Json
          order_index: number
          question_text: string
          sat_frequency: string
          solution_steps: Json
          subtopic_id: string
          time_recommendation_seconds: number
        }
        Update: {
          common_errors?: Json
          concept_tags?: Json
          correct_option?: number
          created_at?: string
          detailed_hint?: string | null
          difficulty?: string
          difficulty_level?: number
          explanation?: string
          hint?: string
          id?: string
          options?: Json
          order_index?: number
          question_text?: string
          sat_frequency?: string
          solution_steps?: Json
          subtopic_id?: string
          time_recommendation_seconds?: number
        }
        Relationships: [
          {
            foreignKeyName: "sat_problems_subtopic_id_subtopics_id_fk"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
        ]
      }
      sat_quiz_answers: {
        Row: {
          created_at: string
          difficulty_level: number | null
          id: string
          is_correct: boolean
          problem_id: string
          response_time_ms: number | null
          selected_option: number
          session_id: string
        }
        Insert: {
          created_at?: string
          difficulty_level?: number | null
          id?: string
          is_correct: boolean
          problem_id: string
          response_time_ms?: number | null
          selected_option: number
          session_id: string
        }
        Update: {
          created_at?: string
          difficulty_level?: number | null
          id?: string
          is_correct?: boolean
          problem_id?: string
          response_time_ms?: number | null
          selected_option?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sat_quiz_answers_problem_id_sat_problems_id_fk"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "sat_problems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sat_quiz_answers_session_id_sat_quiz_sessions_id_fk"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sat_quiz_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sat_quiz_sessions: {
        Row: {
          created_at: string
          id: string
          score: number
          subtopic_id: string
          time_elapsed_seconds: number
          total_questions: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          score: number
          subtopic_id: string
          time_elapsed_seconds: number
          total_questions: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          score?: number
          subtopic_id?: string
          time_elapsed_seconds?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sat_quiz_sessions_subtopic_id_subtopics_id_fk"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sat_quiz_sessions_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string
          day_of_week: string
          end_time: string
          id: string
          is_active: boolean
          start_time: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: string
          end_time: string
          id?: string
          is_active?: boolean
          start_time: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: string
          end_time?: string
          id?: string
          is_active?: boolean
          start_time?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          id: string
          schedule_id: string
          scheduled_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          schedule_id: string
          scheduled_date: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          schedule_id?: string
          scheduled_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_schedule_id_schedules_id_fk"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subsection_skills: {
        Row: {
          correct_attempts: number
          created_at: string
          id: string
          last_10: boolean[]
          last_seen_at: string | null
          level: number
          section_category: string
          streak_correct: number
          streak_wrong: number
          subtopic_id: string
          total_attempts: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          correct_attempts?: number
          created_at?: string
          id?: string
          last_10?: boolean[]
          last_seen_at?: string | null
          level?: number
          section_category: string
          streak_correct?: number
          streak_wrong?: number
          subtopic_id: string
          total_attempts?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          correct_attempts?: number
          created_at?: string
          id?: string
          last_10?: boolean[]
          last_seen_at?: string | null
          level?: number
          section_category?: string
          streak_correct?: number
          streak_wrong?: number
          subtopic_id?: string
          total_attempts?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "subsection_skills_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subsection_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subtopics: {
        Row: {
          common_mistakes: Json
          conceptual_overview: Json
          created_at: string
          description: string
          difficulty: string
          estimated_minutes: number
          id: string
          key_formulas: Json
          learning_objectives: Json
          name: string
          order_index: number
          prerequisite_subtopic_slugs: Json
          slug: string
          tips_and_tricks: Json
          topic_id: string
        }
        Insert: {
          common_mistakes: Json
          conceptual_overview: Json
          created_at?: string
          description: string
          difficulty: string
          estimated_minutes: number
          id?: string
          key_formulas: Json
          learning_objectives: Json
          name: string
          order_index: number
          prerequisite_subtopic_slugs: Json
          slug: string
          tips_and_tricks: Json
          topic_id: string
        }
        Update: {
          common_mistakes?: Json
          conceptual_overview?: Json
          created_at?: string
          description?: string
          difficulty?: string
          estimated_minutes?: number
          id?: string
          key_formulas?: Json
          learning_objectives?: Json
          name?: string
          order_index?: number
          prerequisite_subtopic_slugs?: Json
          slug?: string
          tips_and_tricks?: Json
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtopics_topic_id_topics_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          color_scheme: string
          created_at: string
          difficulty_distribution: Json
          estimated_total_minutes: number
          icon: string
          id: string
          key_concepts: Json
          learning_objectives: Json
          name: string
          order_index: number
          overview: string
          prerequisites: Json
          pro_tips: Json
          sat_relevance: Json
          slug: string
          subject: string
        }
        Insert: {
          color_scheme: string
          created_at?: string
          difficulty_distribution: Json
          estimated_total_minutes: number
          icon: string
          id?: string
          key_concepts: Json
          learning_objectives: Json
          name: string
          order_index: number
          overview: string
          prerequisites: Json
          pro_tips: Json
          sat_relevance: Json
          slug: string
          subject?: string
        }
        Update: {
          color_scheme?: string
          created_at?: string
          difficulty_distribution?: Json
          estimated_total_minutes?: number
          icon?: string
          id?: string
          key_concepts?: Json
          learning_objectives?: Json
          name?: string
          order_index?: number
          overview?: string
          prerequisites?: Json
          pro_tips?: Json
          sat_relevance?: Json
          slug?: string
          subject?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          lesson_delivery: string | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_delivery?: string | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_delivery?: string | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          best_streak: number
          clerk_id: string
          created_at: string
          current_composite: number | null
          current_math: number | null
          current_reading_writing: number | null
          display_name: string | null
          email: string
          id: string
          onboarding_completed: boolean
          skill_score: number | null
          start_composite: number | null
          target_score: number | null
          total_xp: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          best_streak?: number
          clerk_id: string
          created_at?: string
          current_composite?: number | null
          current_math?: number | null
          current_reading_writing?: number | null
          display_name?: string | null
          email: string
          id?: string
          onboarding_completed?: boolean
          skill_score?: number | null
          start_composite?: number | null
          target_score?: number | null
          total_xp?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          best_streak?: number
          clerk_id?: string
          created_at?: string
          current_composite?: number | null
          current_math?: number | null
          current_reading_writing?: number | null
          display_name?: string | null
          email?: string
          id?: string
          onboarding_completed?: boolean
          skill_score?: number | null
          start_composite?: number | null
          target_score?: number | null
          total_xp?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      save_custom_quiz_session: {
        Args: {
          p_answers: Json
          p_score: number
          p_time_elapsed_seconds: number
          p_topic_id: string
          p_total_questions: number
          p_user_id: string
        }
        Returns: {
          created_at: string
          id: string
          score: number
          time_elapsed_seconds: number
          topic_id: string
          total_questions: number
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "custom_quiz_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_custom_topic: {
        Args: {
          p_common_mistakes: Json
          p_description: string
          p_learning_objectives: Json
          p_questions: Json
          p_tips_and_tricks: Json
          p_title: string
          p_user_id: string
        }
        Returns: {
          common_mistakes: Json
          created_at: string
          description: string
          id: string
          learning_objectives: Json
          tips_and_tricks: Json
          title: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "custom_topics"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_sat_quiz_session: {
        Args: {
          p_answers: Json
          p_score: number
          p_subtopic_id: string
          p_time_elapsed_seconds: number
          p_total_questions: number
          p_user_id: string
        }
        Returns: {
          created_at: string
          id: string
          score: number
          subtopic_id: string
          time_elapsed_seconds: number
          total_questions: number
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "sat_quiz_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
