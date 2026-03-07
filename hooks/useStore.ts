'use client';

import { create } from 'zustand';
import {
    VaultItem,
    AIInsight,
    Task,
    HabitMaster,
    HabitLog,
    JournalEntry,
    LifeMetric,
    FinanceEntry,
} from '@/types';
import { fetchAllData, addTask as gasAddTask, updateTask as gasUpdateTask, addHabitMaster as gasAddHabitMaster } from '@/lib/gasApi';

interface AppState {
    // Data from GAS
    vaultItems: VaultItem[];
    aiInsights: AIInsight[];
    tasks: Task[];
    habits: HabitMaster[];
    habitLogs: HabitLog[];
    journals: JournalEntry[];
    lifeMetrics: LifeMetric[];
    financeEntries: FinanceEntry[];

    // Global UI State
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchAllData: () => Promise<void>;
    addTask: (task: Task) => Promise<void>;
    updateTaskProgress: (id: string, progress: number) => Promise<void>;
    toggleHabitLog: (habitId: string, date: string) => void;
    addJournalEntry: (entry: JournalEntry) => void;
    updateJournalMood: (id: string, mood: JournalEntry['mood']) => void;
    addVaultItem: (item: VaultItem) => void;
    addHabit: (habit: HabitMaster) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
    vaultItems: [],
    aiInsights: [],
    tasks: [],
    habits: [],
    habitLogs: [],
    journals: [],
    lifeMetrics: [],
    financeEntries: [],
    isLoading: false,
    error: null,

    fetchAllData: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchAllData();
            set({ ...data, isLoading: false });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to load data from backend.';
            set({ error: message, isLoading: false });
        }
    },

    addTask: async (task: Task) => {
        // Optimistic update
        set((state) => ({ tasks: [...state.tasks, task] }));
        try {
            await gasAddTask(task);
        } catch {
            // Rollback on failure
            set((state) => ({ tasks: state.tasks.filter((t) => t.id !== task.id) }));
        }
    },

    addHabit: async (habit: HabitMaster) => {
        set((state) => ({ habits: [...state.habits, habit] }));
        try {
            await gasAddHabitMaster(habit);
        } catch {
            set((state) => ({ habits: state.habits.filter((h) => h.id !== habit.id) }));
        }
    },

    updateTaskProgress: async (id: string, progress: number) => {
        const previous = get().tasks;
        // Optimistic update
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, progress_percentage: progress, status: progress === 100 ? 'done' : 'in_progress' } : t
            ),
        }));
        try {
            await gasUpdateTask(id, { progress_percentage: progress, status: progress === 100 ? 'done' : 'in_progress' });
        } catch {
            // Rollback on failure
            set({ tasks: previous });
        }
    },

    toggleHabitLog: (habitId: string, date: string) => {
        set((state) => {
            const existingLog = state.habitLogs.find(l => l.habit_id === habitId && l.date === date);
            if (existingLog && existingLog.status === 'done') {
                return { habitLogs: state.habitLogs.filter(l => !(l.habit_id === habitId && l.date === date)) };
            } else {
                const newLog = {
                    id: crypto.randomUUID(),
                    habit_id: habitId,
                    date: date,
                    status: 'done' as const,
                    value: 0
                };
                return { habitLogs: [...state.habitLogs, newLog] };
            }
        });
    },

    addJournalEntry: (entry: JournalEntry) => {
        set((state) => ({ journals: [entry, ...state.journals] }));
    },

    updateJournalMood: (id: string, mood: JournalEntry['mood']) => {
        set((state) => ({
            journals: state.journals.map((j) =>
                j.id === id ? { ...j, mood } : j
            )
        }));
    },

    addVaultItem: (item: VaultItem) => {
        set((state) => ({ vaultItems: [item, ...state.vaultItems] }));
    },
}));

// ─── Legacy type aliases for older components ─────────────────────────────────
export type { Task as TaskItem };
