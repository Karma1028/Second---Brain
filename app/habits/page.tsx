"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check, Flame, Activity, TrendingUp, Calendar as CalendarIcon, Moon, X } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { toast } from 'sonner';

export default function HabitsPage() {
  const { habits, habitLogs, lifeMetrics, journals, toggleHabitLog, addHabit } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitTarget, setHabitTarget] = useState('1');
  const [habitUnit, setHabitUnit] = useState('times');

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) {
      toast.error('Habit name is required');
      return;
    }

    await addHabit({
      id: crypto.randomUUID(),
      name: habitName,
      target_value: parseInt(habitTarget) || 1,
      unit: habitUnit
    });

    toast.success('Habit created successfully!');
    setIsModalOpen(false);
    setHabitName('');
    setHabitTarget('1');
    setHabitUnit('times');
  };

  const getDaysArray = function (numDays = 15) {
    const daysArr = [];
    const today = new Date();
    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      daysArr.push({
        day: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
        date: d.getDate().toString(),
        fullDate: dateStr
      });
    }
    return daysArr;
  };

  const days = getDaysArray();

  const displayHabits = habits.map(habit => {
    const completions = days.map((d, index) => {
      const log = habitLogs.find(l => l.habit_id === habit.id && l.date === d.fullDate);
      return log && log.status === 'done' ? index : -1;
    }).filter(idx => idx !== -1);

    const doneCount = completions.length;
    const progress = Math.round((doneCount / days.length) * 100);

    return {
      id: habit.id,
      name: habit.name,
      target: habit.target_value,
      unit: habit.unit,
      actual: days.length,
      done: doneCount,
      progress: progress || 0,
      completions: completions
    };
  });

  const moodValues = days.map(d => {
    const journal = journals.find(j => j.date === d.fullDate);
    if (!journal) return 0;
    return journal.mood === 'great' ? 5 : journal.mood === 'good' ? 4 : journal.mood === 'neutral' ? 3 : journal.mood === 'bad' ? 2 : 1;
  });

  const sleepValues = days.map(d => {
    const metric = lifeMetrics.find(m => m.date === d.fullDate);
    return metric ? metric.sleep_hours : 0;
  });

  const displayMetrics = [
    { name: 'Mood', type: 'rating', values: moodValues },
    { name: 'Sleep Hours', type: 'number', values: sleepValues },
  ];

  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark">
      <header className="flex items-center justify-between px-8 py-6 border-b border-surface-border shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight font-display">Habit Grid</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-orange/10 text-accent-orange rounded-full text-sm font-medium">
            <Flame className="w-4 h-4" />
            <span>12 Day Streak</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface-dark border border-surface-border rounded-lg p-1">
            <button className="p-1 hover:bg-surface-border rounded text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium px-2 text-foreground">{currentMonthYear}</span>
            <button className="p-1 hover:bg-surface-border rounded text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-foreground hover:text-background-dark transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> New Habit
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-surface-dark border border-surface-border rounded-2xl overflow-hidden flex flex-col min-w-[1000px]">
          {/* Header Row */}
          <div className="flex border-b border-surface-border bg-surface-darker">
            <div className="w-64 shrink-0 p-4 font-medium text-text-secondary text-sm flex items-center">
              HABIT
            </div>
            <div className="flex-1 flex">
              {days.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-center py-2 border-l border-surface-border/50 min-w-[40px]">
                  <span className="text-[10px] text-text-secondary font-medium">{d.day}</span>
                  <span className={`text-sm font-bold ${i === 2 ? 'text-primary' : 'text-foreground'}`}>{d.date}</span>
                </div>
              ))}
            </div>
            <div className="w-48 shrink-0 flex border-l border-surface-border">
              <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-text-secondary tracking-wider">ACTUAL</div>
              <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-text-secondary tracking-wider border-l border-surface-border/50">DONE</div>
              <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-text-secondary tracking-wider border-l border-surface-border/50">PROG</div>
            </div>
          </div>

          {/* Habits Rows */}
          <div className="flex flex-col">
            {displayHabits.map((habit, hIdx) => (
              <div key={hIdx} className="flex border-b border-surface-border/50 hover:bg-surface-border/10 transition-colors group">
                <div className="w-64 shrink-0 p-4 font-medium text-foreground text-sm flex items-center">
                  {habit.name}
                </div>
                <div className="flex-1 flex">
                  {days.map((_, dIdx) => {
                    const isDone = habit.completions.includes(dIdx);
                    const dateStr = days[dIdx].fullDate;

                    return (
                      <div key={dIdx} className="flex-1 flex items-center justify-center border-l border-surface-border/50 p-1 min-w-[40px]">
                        <button
                          onClick={() => {
                            toggleHabitLog(habit.id, dateStr);
                            if (!isDone) {
                              toast.success(`Completed ${habit.name}!`);
                            }
                          }}
                          className={`w-full h-8 rounded flex items-center justify-center transition-all duration-200 active:scale-90 ${isDone
                            ? 'bg-primary text-background-dark shadow-[0_0_10px_rgba(13,242,242,0.3)]'
                            : 'hover:bg-surface-border/50 text-transparent hover:text-text-secondary/50'
                            }`}>
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="w-48 shrink-0 flex border-l border-surface-border">
                  <div className="flex-1 flex items-center justify-center text-sm text-text-secondary">{habit.actual}</div>
                  <div className="flex-1 flex items-center justify-center text-sm font-bold text-foreground border-l border-surface-border/50">{habit.done}</div>
                  <div className="flex-1 flex items-center justify-center px-2 border-l border-surface-border/50">
                    <div className="w-full bg-surface-border h-1.5 rounded-full overflow-hidden flex items-center relative">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${habit.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Rows */}
          <div className="flex flex-col border-t-2 border-surface-border">
            {displayMetrics.map((metric, mIdx) => (
              <div key={mIdx} className="flex border-b border-surface-border/50 bg-surface-darker/50">
                <div className="w-64 shrink-0 p-4 font-medium text-text-secondary text-sm flex items-center gap-2">
                  {metric.name === 'Mood' ? <Activity className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {metric.name}
                </div>
                <div className="flex-1 flex">
                  {metric.values.map((val, dIdx) => (
                    <div key={dIdx} className="flex-1 flex items-center justify-center border-l border-surface-border/50 min-w-[40px]">
                      <span className="text-xs text-text-secondary font-mono">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="w-48 shrink-0 flex border-l border-surface-border bg-surface-darker">
                  <div className="flex-1 flex items-center justify-center text-[10px] text-text-secondary uppercase tracking-wider">Avg</div>
                  <div className="flex-[2] flex items-center justify-center text-sm font-bold text-foreground border-l border-surface-border/50">
                    {(metric.values.reduce((a, b) => a + b, 0) / metric.values.length).toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Rows */}
          <div className="flex flex-col border-t-2 border-surface-border bg-surface-darker">
            <div className="flex border-b border-surface-border/50">
              <div className="w-64 shrink-0 p-3 text-xs font-bold text-text-secondary text-right flex items-center justify-end tracking-wider">
                DONE
              </div>
              <div className="flex-1 flex">
                {days.map((_, dIdx) => {
                  const doneCount = displayHabits.filter(h => h.completions.includes(dIdx)).length;
                  return (
                    <div key={dIdx} className="flex-1 flex items-center justify-center border-l border-surface-border/50 min-w-[40px]">
                      <span className={`text-xs font-bold ${doneCount > 0 ? 'text-primary' : 'text-text-secondary'}`}>{doneCount}</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-48 shrink-0 border-l border-surface-border"></div>
            </div>
            <div className="flex border-b border-surface-border/50">
              <div className="w-64 shrink-0 p-3 text-xs font-bold text-text-secondary text-right flex items-center justify-end tracking-wider">
                PERCENTAGE
              </div>
              <div className="flex-1 flex">
                {days.map((_, dIdx) => {
                  const doneCount = displayHabits.filter(h => h.completions.includes(dIdx)).length;
                  const percentage = displayHabits.length > 0 ? Math.round((doneCount / displayHabits.length) * 100) : 0;
                  return (
                    <div key={dIdx} className="flex-1 flex items-center justify-center border-l border-surface-border/50 min-w-[40px]">
                      <span className={`text-[10px] font-bold ${percentage === 100 ? 'text-primary' : 'text-foreground'}`}>{percentage}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-48 shrink-0 border-l border-surface-border"></div>
            </div>
          </div>

          {/* Progress Trend Chart */}
          <div className="flex h-32 bg-surface-darker relative overflow-hidden">
            <div className="w-64 shrink-0 p-4 text-xs font-bold text-text-secondary text-right flex items-center justify-end tracking-wider z-10">
              PROGRESS TREND
            </div>
            <div className="flex-1 relative border-l border-surface-border">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0df2f2" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#0df2f2" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 100 L0 50 Q 5 50, 10 75 T 20 50 T 30 75 T 40 25 T 50 50 T 60 25 T 70 0 T 80 50 T 90 25 T 100 50 L100 100 Z" fill="url(#trendGradient)" stroke="none"></path>
                <path d="M0 50 Q 5 50, 10 75 T 20 50 T 30 75 T 40 25 T 50 50 T 60 25 T 70 0 T 80 50 T 90 25 T 100 50" fill="none" stroke="#0df2f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <div className="w-48 shrink-0 border-l border-surface-border z-10"></div>
          </div>
        </div>
      </div>

      {/* New Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface-dark border border-surface-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-surface-border">
              <h2 className="text-xl font-bold text-foreground font-display">Create New Habit</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHabit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">Habit Name</label>
                <input
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g. Read 10 pages, Drink Water..."
                  className="bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-surface-border"
                  autoFocus
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-medium text-text-secondary">Daily Target</label>
                  <input
                    type="number"
                    value={habitTarget}
                    onChange={(e) => setHabitTarget(e.target.value)}
                    min="1"
                    className="bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-medium text-text-secondary">Unit</label>
                  <input
                    type="text"
                    value={habitUnit}
                    onChange={(e) => setHabitUnit(e.target.value)}
                    placeholder="e.g. times, pages, mins"
                    className="bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-surface-border"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-foreground hover:bg-surface-border transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-background-dark px-6 py-2 rounded-lg text-sm font-bold hover:bg-foreground hover:text-background-dark transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
