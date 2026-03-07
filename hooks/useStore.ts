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
import { fetchAllData, addTask as gasAddTask, updateTask as gasUpdateTask } from '@/lib/gasApi';

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

    updateTaskProgress: async (id: string, progress: number) => {
        const previous = get().tasks;
        // Optimistic update
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, progress_percentage: progress } : t
            ),
        }));
        try {
            await gasUpdateTask(id, { progress_percentage: progress });
        } catch {
            // Rollback on failure
            set({ tasks: previous });
        }
    },
}));

// ─── Legacy type aliases for older components ─────────────────────────────────
export type { Task as TaskItem };
