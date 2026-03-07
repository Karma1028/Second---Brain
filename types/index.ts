// ─── Core Data Types ────────────────────────────────────────────────────────
// Aligned with the Google Apps Script (GAS) backend schema.

export interface Task {
  id: string;
  title: string;
  category: string;
  status: 'todo' | 'in_progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  due_date: string;
  progress_percentage: number;
  linked_vault_ids: string; // comma-separated UUIDs as a string from GAS
}

export interface HabitMaster {
  id: string;
  name: string;
  target_value: number;
  unit: string;
}

export interface HabitLog {
  date: string; // YYYY-MM-DD
  habit_id: string;
  status: 'done' | 'skip' | 'pending';
}

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'awful';
  tags: string; // comma-separated string from GAS
}

export interface LifeMetric {
  date: string; // YYYY-MM-DD
  sleep_hours: number;
  sleep_score: number;
  focus_score: number;
  social_battery_pct: number;
  caffeine_mg: number;
}

export interface FinanceEntry {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type VaultItemType = 'note' | 'link' | 'idea' | 'resource';

export interface VaultItem {
  id: string;
  type: VaultItemType;
  title: string;
  content: string; // URL or Markdown text
  tags: string; // comma-separated string from GAS
  created_at?: string;
}

export type AIInsightSeverity = 'info' | 'tip' | 'warning' | 'action';

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: AIInsightSeverity;
}

export interface AITelemetry {
  id: string;
  timestamp: string;
  user_prompt: string;
  ai_response: string;
  tools_used: string;
}

export interface RecentTask {
  id: string;
  task: string;
  result: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Legacy aliases for backwards compatibility with UI pages ────────────────
export type TaskItem = Task;
export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];
