import { ChevronLeft, ChevronRight, Plus, Check, Flame, Activity, TrendingUp, Calendar as CalendarIcon, Moon } from 'lucide-react';

export default function HabitsPage() {
  const days = [
    { day: 'S', date: '8' }, { day: 'M', date: '9' }, { day: 'T', date: '10' },
    { day: 'W', date: '11' }, { day: 'T', date: '12' }, { day: 'F', date: '13' },
    { day: 'S', date: '14' }, { day: 'S', date: '15' }, { day: 'M', date: '16' },
    { day: 'T', date: '17' }, { day: 'W', date: '18' }, { day: 'T', date: '19' },
    { day: 'F', date: '20' }, { day: 'S', date: '21' }, { day: 'S', date: '22' },
  ];

  const habits = [
    { name: 'Deep Work (2h)', actual: 15, done: 12, progress: 80, completions: [2, 10, 11, 12, 13] },
    { name: 'Read 20 pages', actual: 15, done: 10, progress: 66, completions: [2, 3, 8, 9, 10, 14] },
    { name: 'Workout', actual: 15, done: 8, progress: 53, completions: [2, 4, 6, 9, 11, 13] },
    { name: 'Meditation (10m)', actual: 15, done: 14, progress: 93, completions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14] },
  ];

  const metrics = [
    { name: 'Mood', type: 'rating', values: [4, 4, 5, 3, 4, 4, 5, 4, 3, 4, 5, 4, 4, 5, 4] },
    { name: 'Sleep Hours', type: 'number', values: [7.5, 8, 6.5, 7, 7.5, 8, 8.5, 7, 6, 7.5, 8, 7, 7.5, 8, 7.5] },
  ];

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
            <button className="p-1 hover:bg-surface-border rounded text-text-secondary hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium px-2 text-foreground">March 2026</span>
            <button className="p-1 hover:bg-surface-border rounded text-text-secondary hover:text-foreground transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-foreground hover:text-background-dark transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
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
            {habits.map((habit, hIdx) => (
              <div key={hIdx} className="flex border-b border-surface-border/50 hover:bg-surface-border/10 transition-colors group">
                <div className="w-64 shrink-0 p-4 font-medium text-foreground text-sm flex items-center">
                  {habit.name}
                </div>
                <div className="flex-1 flex">
                  {days.map((_, dIdx) => {
                    const isDone = habit.completions.includes(dIdx);
                    return (
                      <div key={dIdx} className="flex-1 flex items-center justify-center border-l border-surface-border/50 p-1 min-w-[40px]">
                        <button className={`w-full h-8 rounded flex items-center justify-center transition-all ${
                          isDone 
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
            {metrics.map((metric, mIdx) => (
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
                  const doneCount = habits.filter(h => h.completions.includes(dIdx)).length;
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
                  const doneCount = habits.filter(h => h.completions.includes(dIdx)).length;
                  const percentage = Math.round((doneCount / habits.length) * 100);
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
    </div>
  );
}
