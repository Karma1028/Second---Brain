import {
    Task,
    HabitMaster,
    HabitLog,
    JournalEntry,
    LifeMetric,
    FinanceEntry,
    VaultItem,
    AIInsight,
    AITelemetry,
    RecentTask,
    Message,
} from '@/types';

// ─── GAS Webhook Configuration ───────────────────────────────────────────────
const GAS_URL =
    process.env.NEXT_PUBLIC_GAS_URL ||
    'https://script.google.com/macros/s/AKfycbyTU3VTeki8c2h2EP30ohu838M851jQKeDNi6hdfYD5OMUGU_0adyzy0jC0rzBjaUE/exec';

type GasAction =
    | 'write'
    | 'read'
    | 'update'
    | 'delete'
    | 'upsert'
    | 'memory_read'
    | 'memory_write'
    | 'memory_clear';

interface GasPayload {
    action: GasAction;
    sheet?: string;
    data?: Record<string, unknown>;
    filter?: Record<string, string>;
    search_target?: string;
    id?: string;
    chat_id?: string;
    role?: string;
    content?: string;
}

interface GasResponse<T = unknown> {
    status: 'ok' | 'error' | 'alive';
    result?: T;
    message?: string;
}

// ─── Core Fetch Helper ───────────────────────────────────────────────────────
export async function gas<T = unknown>(payload: GasPayload): Promise<T> {
    const res = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    });
    const json: GasResponse<T> = await res.json();
    if (json.status === 'error') throw new Error(json.message || 'GAS API error');
    return json.result as T;
}

// ─── Tasks ───────────────────────────────────────────────────────────────────
export const getTasks = (filter?: Record<string, string>) =>
    gas<{ rows: Task[] }>({ action: 'read', sheet: 'Task_Master', filter });

export const addTask = (data: Partial<Task>) =>
    gas({ action: 'write', sheet: 'Task_Master', data });

export const updateTask = (id: string, data: Partial<Task>) =>
    gas({ action: 'update', sheet: 'Task_Master', id, data });

// ─── Habits ──────────────────────────────────────────────────────────────────
export const getHabitsMaster = () =>
    gas<{ rows: HabitMaster[] }>({ action: 'read', sheet: 'Habits_Master' });

export const addHabitMaster = (data: Partial<HabitMaster>) =>
    gas({ action: 'write', sheet: 'Habits_Master', data });

export const getHabitsLog = (date?: string) =>
    gas<{ rows: HabitLog[] }>({ action: 'read', sheet: 'Habits_Log', filter: date ? { date } : {} });

export const logHabit = (data: { habit_id: string; status: string; date?: string }) =>
    gas({ action: 'write', sheet: 'Habits_Log', data });

// ─── Journal ─────────────────────────────────────────────────────────────────
export const getJournal = (date?: string) =>
    gas<{ rows: JournalEntry[] }>({ action: 'read', sheet: 'Daily_Journal', filter: date ? { date } : {} });

export const addJournalEntry = (data: Partial<JournalEntry>) =>
    gas({ action: 'write', sheet: 'Daily_Journal', data });

// ─── Life Metrics ────────────────────────────────────────────────────────────
export const getLifeMetrics = (date?: string) =>
    gas<{ rows: LifeMetric[] }>({ action: 'read', sheet: 'Life_Metrics', filter: date ? { date } : {} });

export const logMetrics = (data: Partial<LifeMetric>) =>
    gas({ action: 'upsert', sheet: 'Life_Metrics', data: { id_field: 'date', ...data } });

// ─── Finance ─────────────────────────────────────────────────────────────────
export const getFinance = (filter?: Record<string, string>) =>
    gas<{ rows: FinanceEntry[] }>({ action: 'read', sheet: 'Finance_Tracker', filter });

export const addFinanceEntry = (data: Partial<FinanceEntry>) =>
    gas({ action: 'write', sheet: 'Finance_Tracker', data });

// ─── Knowledge Vault ─────────────────────────────────────────────────────────
export const getVault = (search?: string) =>
    gas<{ rows: VaultItem[] }>({ action: 'read', sheet: 'Vault_Items', search_target: search });

export const addVaultItem = (data: Partial<VaultItem>) =>
    gas({ action: 'write', sheet: 'Vault_Items', data });

// ─── AI Insights ─────────────────────────────────────────────────────────────
export const getInsights = () =>
    gas<{ rows: AIInsight[] }>({ action: 'read', sheet: 'AI_Insights' });

// ─── Agent Activity ───────────────────────────────────────────────────────────
export const getTelemetry = () =>
    gas<{ rows: AITelemetry[] }>({ action: 'read', sheet: 'AI_Telemetry' });

export const getRecentTasks = () =>
    gas<{ rows: RecentTask[] }>({ action: 'read', sheet: 'Recent_Tasks' });

// ─── Conversation Memory ──────────────────────────────────────────────────────
export const getMemory = (chatId: string) =>
    gas<{ messages: Message[]; context: string }>({ action: 'memory_read', chat_id: chatId });

// ─── Health Check ─────────────────────────────────────────────────────────────
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const res = await fetch(GAS_URL);
        const json: GasResponse = await res.json();
        return json.status === 'alive' || json.status === 'ok';
    } catch {
        return false;
    }
}

// ─── Utility: Fetch All Data (used by Zustand store) ─────────────────────────
export async function fetchAllData() {
    const [
        tasksRes,
        habitsRes,
        habitLogsRes,
        journalRes,
        metricsRes,
        vaultRes,
        insightsRes,
    ] = await Promise.allSettled([
        getTasks(),
        getHabitsMaster(),
        getHabitsLog(),
        getJournal(),
        getLifeMetrics(),
        getVault(),
        getInsights(),
    ]);

    const getValue = <T>(res: PromiseSettledResult<{ rows: T[] }>): T[] =>
        res.status === 'fulfilled' ? res.value?.rows ?? [] : [];

    return {
        tasks: getValue(tasksRes as PromiseSettledResult<{ rows: Task[] }>),
        habits: getValue(habitsRes as PromiseSettledResult<{ rows: HabitMaster[] }>),
        habitLogs: getValue(habitLogsRes as PromiseSettledResult<{ rows: HabitLog[] }>),
        journals: getValue(journalRes as PromiseSettledResult<{ rows: JournalEntry[] }>),
        lifeMetrics: getValue(metricsRes as PromiseSettledResult<{ rows: LifeMetric[] }>),
        vaultItems: getValue(vaultRes as PromiseSettledResult<{ rows: VaultItem[] }>),
        aiInsights: getValue(insightsRes as PromiseSettledResult<{ rows: AIInsight[] }>),
    };
}

// ─── Legacy: Relational mapping utility ──────────────────────────────────────
export function linkVaultItemsToTask(
    linkedIds: string,
    vaultItems: VaultItem[]
): VaultItem[] {
    if (!linkedIds) return [];
    const ids = linkedIds.split(',').map((id) => id.trim());
    return vaultItems.filter((item) => ids.includes(item.id));
}
