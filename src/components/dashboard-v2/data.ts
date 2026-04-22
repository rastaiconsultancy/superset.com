export const dashboardData = {
  user: {
    name: "Hero",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=hero&backgroundColor=fef3c7",
  },
  nav: [
    { label: "MISSION", href: "#mission" },
    { label: "PROGRESS", href: "#progress", active: true },
    { label: "REVIEW", href: "#review" },
    { label: "LEARN", href: "#learn" },
  ],
  hero: {
    eyebrow: { prefix: "SYSTEM", suffix: "INITIALIZED" },
    title: "Welcome back, Hero",
    description:
      "Your path to mastery continues. Athena has analyzed your recent progress and identified three key areas for growth today.",
  },
  rank: {
    label: "CURRENT RANK",
    name: "Novice II",
    progressLabel: "RANK EVOLUTION",
    progress: 74,
  },
  dailyGoal: {
    label: "DAILY GOAL STATUS",
    xp: 42,
    target: 100,
    resetIn: "4h 12m",
    remaining: "58 XP to reach milestone",
  },
  neuralSync: {
    title: "Neural Sync",
    refreshed: "Refreshed: Today, 11:24 PM",
    cta: "FORCE SYNC",
  },
  ad: {
    title: "ADS IN HERE",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  quests: {
    title: "QUEST TRACKER",
    activeCount: 2,
    items: [
      {
        id: "1",
        title: "Master the Comma",
        meta: "Level 4 · Grammaticon",
        status: "IN PROGRESS" as const,
        progress: 65,
        icon: "code",
        locked: false,
      },
      {
        id: "2",
        title: "Quadratic Hero",
        meta: "Level 7 · Algebrick",
        status: "IN PROGRESS" as const,
        progress: 12,
        icon: "sigma",
        locked: false,
      },
      {
        id: "3",
        title: "The Syntax Cipher",
        meta: "Requires Level 10",
        status: "LOCKED" as const,
        progress: 0,
        icon: "lock",
        locked: true,
      },
    ],
    cta: "BROWSE VAULT",
  },
  leaderboard: {
    title: "GLOBAL LEADERBOARD",
    liveLabel: "SYNCING LIVE",
    entries: [
      {
        rank: 1,
        name: "Cipher_Master",
        title: "GRANDMASTER",
        score: 14290,
        delta: "+140 Today",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=cipher&backgroundColor=0d3b3d",
        highlight: true,
      },
      {
        rank: 2,
        name: "Lumina_AI",
        title: "ARCHITECT",
        score: 12110,
        delta: null,
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=lumina&backgroundColor=dbeafe",
        highlight: false,
      },
      {
        rank: 3,
        name: "NeoNexus",
        title: "VANGUARD",
        score: 11940,
        delta: null,
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=neo&backgroundColor=fed7aa",
        highlight: false,
      },
    ],
    stats: {
      streakLabel: "LONGEST STREAK",
      streak: "14 Days",
      avgLabel: "AVG DAILY",
      avg: "42m",
    },
  },
};

export type DashboardData = typeof dashboardData;
