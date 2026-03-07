import { VaultItem, AIInsight, Task, HabitMaster, HabitLog, JournalEntry, LifeMetric } from '@/types';

// Mock data — used as fallback when GAS API is unavailable during dev/test.
// All types aligned to the real GAS schema in types/index.ts.

export const mockVaultItems: VaultItem[] = [
    {
        id: 'vault-1',
        type: 'note',
        title: 'System Architecture V2',
        content: 'The new distributed database structure uses three completely separate headless Google Sheets. They are aggregated by a master REST API (Google Apps Script).',
        tags: 'architecture,backend',
        created_at: '2023-10-24T08:00:00Z',
    },
    {
        id: 'vault-2',
        type: 'link',
        title: 'Zustand Documentation',
        content: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
        tags: 'react,state-management',
        created_at: '2023-10-23T14:30:00Z',
    },
    {
        id: 'vault-3',
        type: 'idea',
        title: 'CSS Grid Crash Course Notes',
        content: 'Key concepts from CSS Grid: grid-template-columns, grid-area, fr unit.',
        tags: 'css,frontend',
        created_at: '2023-10-22T09:15:00Z',
    },
];

export const mockAIInsights: AIInsight[] = [
    {
        id: 'insight-1',
        title: 'Caffeine Threshold Exceeded',
        description: "You've consumed 120mg of caffeine after 2 PM. Based on your historical data (R²=0.82), this reduces your deep sleep duration by approximately 45 minutes.",
        timestamp: '2h ago',
        severity: 'warning',
    },
    {
        id: 'insight-2',
        title: 'Peak Focus Window Incoming',
        description: 'Your circadian rhythm suggests your highest cognitive output window is between 10:00 AM and 11:30 AM.',
        timestamp: 'Now',
        severity: 'tip',
    },
];

export const mockTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Design database schema for user profiles',
        category: 'Backend',
        status: 'todo',
        priority: 'high',
        due_date: '2023-10-25T17:00:00Z',
        progress_percentage: 0,
        linked_vault_ids: 'vault-1',
    },
    {
        id: 'task-2',
        title: 'Draft newsletter content for Q3 launch',
        category: 'Marketing',
        status: 'todo',
        priority: 'medium',
        due_date: '2023-10-28T12:00:00Z',
        progress_percentage: 0,
        linked_vault_ids: '',
    },
    {
        id: 'task-3',
        title: 'Refactor Backend Architecture',
        category: 'Core Dev',
        status: 'in_progress',
        priority: 'critical',
        due_date: '2023-10-24T18:00:00Z',
        progress_percentage: 65,
        linked_vault_ids: 'vault-1,vault-2',
    },
    {
        id: 'task-4',
        title: 'Create component library',
        category: 'Design',
        status: 'done',
        priority: 'high',
        due_date: '2023-10-20T17:00:00Z',
        progress_percentage: 100,
        linked_vault_ids: '',
    },
];

export const mockHabits: HabitMaster[] = [
    { id: 'h1', name: 'Deep Work', target_value: 120, unit: 'minutes' },
    { id: 'h2', name: 'Read', target_value: 20, unit: 'pages' },
    { id: 'h3', name: 'Workout', target_value: 1, unit: 'session' },
    { id: 'h4', name: 'Meditation', target_value: 10, unit: 'minutes' },
];

export const mockHabitLogs: HabitLog[] = [
    { date: '2026-03-08', habit_id: 'h4', status: 'done' },
    { date: '2026-03-09', habit_id: 'h4', status: 'done' },
    { date: '2026-03-10', habit_id: 'h1', status: 'done' },
    { date: '2026-03-10', habit_id: 'h2', status: 'done' },
    { date: '2026-03-10', habit_id: 'h3', status: 'done' },
    { date: '2026-03-10', habit_id: 'h4', status: 'done' },
    { date: '2026-03-11', habit_id: 'h1', status: 'skip' },
    { date: '2026-03-12', habit_id: 'h2', status: 'done' },
];

export const mockJournals: JournalEntry[] = [
    {
        id: 'journal-1',
        date: '2023-10-24',
        time: '08:30',
        title: 'Morning Reflections & Planning',
        content: 'Woke up feeling refreshed after a solid 7.5 hours of sleep. The new morning routine is definitely helping.\n\n### Today\'s Focus\nThe main objective today is to finalize the architecture review.',
        mood: 'great',
        tags: 'morning-routine,planning',
    },
    {
        id: 'journal-2',
        date: '2023-10-23',
        time: '21:15',
        title: 'End of Day Dump',
        content: 'Productive day but feeling a bit mentally drained. The architecture review took longer than expected.',
        mood: 'neutral',
        tags: 'reflection',
    },
];

export const mockLifeMetrics: LifeMetric[] = [
    { date: '2026-03-08', sleep_hours: 7.5, sleep_score: 80, focus_score: 75, social_battery_pct: 60, caffeine_mg: 100 },
    { date: '2026-03-09', sleep_hours: 8.0, sleep_score: 85, focus_score: 82, social_battery_pct: 55, caffeine_mg: 80 },
    { date: '2026-03-10', sleep_hours: 6.5, sleep_score: 70, focus_score: 65, social_battery_pct: 40, caffeine_mg: 150 },
    { date: '2026-03-11', sleep_hours: 7.0, sleep_score: 78, focus_score: 70, social_battery_pct: 45, caffeine_mg: 120 },
    { date: '2026-03-12', sleep_hours: 7.5, sleep_score: 82, focus_score: 85, social_battery_pct: 50, caffeine_mg: 100 },
    { date: '2026-03-13', sleep_hours: 8.0, sleep_score: 88, focus_score: 90, social_battery_pct: 60, caffeine_mg: 60 },
    { date: '2026-03-14', sleep_hours: 8.5, sleep_score: 92, focus_score: 88, social_battery_pct: 70, caffeine_mg: 40 },
    { date: '2026-03-15', sleep_hours: 7.0, sleep_score: 75, focus_score: 72, social_battery_pct: 50, caffeine_mg: 130 },
];
