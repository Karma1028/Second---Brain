import { Sun, ListTodo, MoreHorizontal, Circle, CheckCircle2, HeartPulse, TrendingUp, BookOpen, Droplets, Link as LinkIcon, FileText, Image as ImageIcon, Plus, Database } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      <header className="px-8 py-8 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-white text-3xl font-bold tracking-tight font-display">Good Morning, Architect.</h1>
          <p className="text-text-secondary mt-1 text-sm">System operational. 3 critical tasks pending.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-surface-dark border border-surface-border rounded-full text-xs text-text-secondary flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Online
          </div>
          <div className="text-right">
            <p className="text-white text-sm font-medium">08:42 AM</p>
            <p className="text-text-secondary text-xs">Oct 24, 2023</p>
          </div>
        </div>
      </header>

      <div className="px-8 pb-12 flex flex-col gap-6">
        {/* Morning Briefing Section */}
        <section className="rounded-xl border border-surface-border bg-surface-dark/50 p-6 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                <Sun className="w-4 h-4" />
                <span>Daily briefing</span>
              </div>
              <h2 className="text-white text-2xl font-bold leading-tight font-display">
                Your sleep score is <span className="text-primary">85</span>. Market trends are stable.
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                You have a meeting with the design team at 10:00 AM. 
                Your habit streak for &quot;Deep Work&quot; is at 4 days. Ready to synchronize?
              </p>
            </div>
            <button className="flex-shrink-0 flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary text-background-dark hover:bg-white transition-colors text-sm font-bold">
              <span>Start Day</span>
              <span>→</span>
            </button>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Tasks & Agenda */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Agenda / Tasks */}
            <div className="rounded-xl border border-surface-border bg-surface-dark p-6 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between pb-2 border-b border-surface-border/50">
                <h3 className="text-white text-lg font-bold flex items-center gap-2 font-display">
                  <ListTodo className="w-5 h-5 text-text-secondary" />
                  Agenda
                </h3>
                <button className="text-text-secondary hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {/* Task Item 1 */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 transition-colors group cursor-pointer">
                  <div className="flex-shrink-0 text-text-secondary group-hover:text-primary transition-colors">
                    <Circle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Review Q4 Product Strategy</p>
                    <p className="text-text-secondary text-xs">Project Alpha • High Priority</p>
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 font-medium">
                    Urgent
                  </div>
                </div>
                {/* Task Item 2 */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 transition-colors group cursor-pointer">
                  <div className="flex-shrink-0 text-text-secondary group-hover:text-primary transition-colors">
                    <Circle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Design System Audit</p>
                    <p className="text-text-secondary text-xs">UX Team • Medium Priority</p>
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-surface-border text-text-secondary font-medium">
                    In Progress
                  </div>
                </div>
                {/* Task Item 3 */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 transition-colors group cursor-pointer opacity-60">
                  <div className="flex-shrink-0 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-secondary text-sm font-medium line-through">Morning Workout</p>
                    <p className="text-text-secondary text-xs">Health • Routine</p>
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-green-500/10 text-green-400 font-medium">
                    Done
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vitals & Stats */}
          <div className="flex flex-col gap-6">
            {/* Vitals Chart */}
            <div className="rounded-xl border border-surface-border bg-surface-dark p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-bold flex items-center gap-2 font-display">
                  <HeartPulse className="w-5 h-5 text-text-secondary" />
                  Vitals
                </h3>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">LIVE</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-text-secondary text-sm font-medium">Sleep Quality vs Mood</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-white text-3xl font-bold font-display">Optimal</p>
                  <p className="text-green-500 text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +5%
                  </p>
                </div>
              </div>
              {/* Chart Area */}
              <div className="relative h-40 w-full mt-2">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0df2f2" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#0df2f2" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 35 Q 10 30, 20 25 T 40 20 T 60 15 T 80 10 T 100 5" fill="none" stroke="#0df2f2" strokeLinecap="round" strokeWidth="2"></path>
                  <path d="M0 35 Q 10 30, 20 25 T 40 20 T 60 15 T 80 10 T 100 5 V 50 H 0 Z" fill="url(#chartGradient)" stroke="none"></path>
                  <path d="M0 40 Q 15 35, 30 38 T 50 30 T 70 32 T 90 25 T 100 28" fill="none" stroke="#283939" strokeDasharray="2,2" strokeWidth="2"></path>
                </svg>
                <div className="flex justify-between text-[10px] text-text-secondary font-mono mt-2 uppercase tracking-wider">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            {/* Quick Stats / Habits Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-surface-border bg-surface-dark p-4 flex flex-col justify-between h-32 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <BookOpen className="w-5 h-5 text-text-secondary" />
                  <span className="text-xs font-mono text-text-secondary">READING</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-display">12<span className="text-sm text-text-secondary font-normal ml-1">pgs</span></p>
                  <div className="w-full bg-surface-border h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-surface-border bg-surface-dark p-4 flex flex-col justify-between h-32 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <Droplets className="w-5 h-5 text-text-secondary" />
                  <span className="text-xs font-mono text-text-secondary">HYDRATION</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-display">1.2<span className="text-sm text-text-secondary font-normal ml-1">L</span></p>
                  <div className="w-full bg-surface-border h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources / Vault Preview */}
        <div className="rounded-xl border border-surface-border bg-surface-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-bold flex items-center gap-2 font-display">
              <Database className="w-5 h-5 text-text-secondary" />
              Recent Vault Captures
            </h3>
            <a className="text-sm text-primary hover:text-white transition-colors" href="#">View All</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 cursor-pointer group transition-all">
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                <span className="text-xs text-text-secondary uppercase">Web Clip</span>
              </div>
              <p className="text-white text-sm font-medium line-clamp-2">Understanding Large Language Models: A Guide for Developers</p>
            </div>
            <div className="p-4 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 cursor-pointer group transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                <span className="text-xs text-text-secondary uppercase">Note</span>
              </div>
              <p className="text-white text-sm font-medium line-clamp-2">Ideas for the Q4 marketing campaign sprint</p>
            </div>
            <div className="p-4 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 cursor-pointer group transition-all">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                <span className="text-xs text-text-secondary uppercase">Image</span>
              </div>
              <p className="text-white text-sm font-medium line-clamp-2">Moodboard reference: Cyberpunk architecture</p>
            </div>
            <div className="p-4 rounded-lg bg-background-dark border border-surface-border hover:border-primary/50 cursor-pointer group transition-all flex items-center justify-center">
              <div className="text-text-secondary group-hover:text-primary flex flex-col items-center gap-1 transition-colors">
                <Plus className="w-6 h-6" />
                <span className="text-xs font-medium">Add New</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
