import { Moon, Brain, Battery, Coffee, MoreHorizontal, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export default function MetricsPage() {
  return (
    <div className="flex-1 flex flex-col relative">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="flex items-center justify-between px-8 py-6 z-10 shrink-0">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground mb-1 font-display">Cognitive Analytics</h2>
          <p className="text-text-secondary text-sm">Biometrics & Productivity Correlation Analysis</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-dark border border-surface-border p-1 rounded-xl">
          <button className="px-4 py-1.5 text-xs font-medium text-foreground bg-primary/20 rounded-lg border border-primary/20 shadow-sm transition-all hover:bg-primary/30">Today</button>
          <button className="px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-foreground transition-colors">7D</button>
          <button className="px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-foreground transition-colors">30D</button>
          <button className="px-4 py-1.5 text-xs font-medium text-text-secondary hover:text-foreground transition-colors">All</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 pb-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {/* KPI Cards Row */}
          <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Moon className="w-5 h-5" />
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 5%
              </span>
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">Avg Sleep</h3>
            <p className="text-2xl font-bold text-foreground tracking-tight font-display">7h 12m</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500/20">
              <div className="h-full bg-indigo-500 w-[75%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            </div>
          </div>

          <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 12%
              </span>
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">Focus Score</h3>
            <p className="text-2xl font-bold text-foreground tracking-tight font-display">84<span className="text-text-secondary text-lg font-normal">/100</span></p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20">
              <div className="h-full bg-primary w-[84%] shadow-[0_0_10px_rgba(13,242,242,0.5)]"></div>
            </div>
          </div>

          <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                <Battery className="w-5 h-5" />
              </div>
              <span className="text-rose-400 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> 10%
              </span>
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">Social Battery</h3>
            <p className="text-2xl font-bold text-foreground tracking-tight font-display">45%</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-rose-500/20">
              <div className="h-full bg-rose-500 w-[45%] shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
            </div>
          </div>

          <div className="bg-surface-dark border border-surface-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> 20%
              </span>
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">Caffeine</h3>
            <p className="text-2xl font-bold text-foreground tracking-tight font-display">120<span className="text-text-secondary text-lg font-normal">mg</span></p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500/20">
              <div className="h-full bg-amber-500 w-[30%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>
          </div>

          {/* Radar Chart Container */}
          <div className="lg:col-span-2 min-h-[400px] bg-surface-dark border border-surface-border rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 z-10">
              <div>
                <h3 className="text-foreground font-bold text-lg font-display">Balance Analysis</h3>
                <p className="text-text-secondary text-xs">Multi-variable correlation</p>
              </div>
              <button className="text-text-secondary hover:text-primary transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 border border-surface-border rounded-full"></div>
                <div className="absolute inset-8 border border-surface-border rounded-full"></div>
                <div className="absolute inset-16 border border-surface-border rounded-full"></div>
                <div className="absolute inset-24 border border-surface-border rounded-full"></div>
                <div className="absolute w-full h-px bg-surface-border top-1/2 left-0"></div>
                <div className="absolute h-full w-px bg-surface-border left-1/2 top-0"></div>
                <div className="absolute w-full h-px bg-surface-border top-1/2 left-0 rotate-45"></div>
                <div className="absolute h-full w-px bg-surface-border left-1/2 top-0 rotate-45"></div>
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]" viewBox="0 0 100 100">
                  <polygon fill="rgba(139, 92, 246, 0.2)" points="50,10 90,45 80,85 20,80 15,40" stroke="#8b5cf6" strokeWidth="2"></polygon>
                  <circle cx="50" cy="10" fill="#fff" r="2"></circle>
                  <circle cx="90" cy="45" fill="#fff" r="2"></circle>
                  <circle cx="80" cy="85" fill="#fff" r="2"></circle>
                  <circle cx="20" cy="80" fill="#fff" r="2"></circle>
                  <circle cx="15" cy="40" fill="#fff" r="2"></circle>
                </svg>
                <span className="absolute -top-6 text-xs text-text-secondary font-medium">Focus</span>
                <span className="absolute -bottom-6 text-xs text-text-secondary font-medium">Sleep</span>
                <span className="absolute -left-12 text-xs text-text-secondary font-medium">Caffeine</span>
                <span className="absolute -right-10 text-xs text-text-secondary font-medium">Social</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-xs text-foreground">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-surface-border"></div>
                <span className="text-xs text-foreground">Average</span>
              </div>
            </div>
          </div>

          {/* Scatter Plot Container */}
          <div className="lg:col-span-2 min-h-[400px] bg-surface-dark border border-surface-border rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-foreground font-bold text-lg font-display">Productivity vs. Sleep</h3>
                <p className="text-text-secondary text-xs">Positive Correlation Detected</p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-darker rounded border border-surface-border text-[10px] text-text-secondary">R² = 0.82</span>
              </div>
            </div>
            <div className="flex-1 w-full relative pt-4 pl-4 pb-8 pr-2">
              <div className="h-full w-full border-l border-b border-surface-border relative">
                <div className="absolute w-full h-px bg-surface-border bottom-[25%]"></div>
                <div className="absolute w-full h-px bg-surface-border bottom-[50%]"></div>
                <div className="absolute w-full h-px bg-surface-border bottom-[75%]"></div>
                
                {/* Data Points */}
                <div className="absolute left-[10%] bottom-[20%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[20%] bottom-[35%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[30%] bottom-[25%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[40%] bottom-[45%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[45%] bottom-[50%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[55%] bottom-[60%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[65%] bottom-[55%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[75%] bottom-[75%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[85%] bottom-[80%] w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                <div className="absolute left-[92%] bottom-[70%] w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#0df2f2] ring-2 ring-white"></div>
                
                {/* Trend Line */}
                <div className="absolute bottom-[20%] left-[10%] w-[85%] h-0.5 bg-gradient-to-r from-white/10 via-primary/50 to-primary origin-bottom-left" style={{ transform: 'rotate(-35deg)' }}></div>
                
                {/* Labels */}
                <div className="absolute -bottom-6 left-0 text-[10px] text-text-secondary">4h</div>
                <div className="absolute -bottom-6 left-1/4 text-[10px] text-text-secondary">6h</div>
                <div className="absolute -bottom-6 left-1/2 text-[10px] text-text-secondary">8h</div>
                <div className="absolute -bottom-6 left-3/4 text-[10px] text-text-secondary">10h</div>
                <div className="absolute -bottom-6 right-0 text-[10px] text-text-secondary">12h</div>
              </div>
              <div className="absolute -left-6 top-1/2 -rotate-90 text-[10px] text-text-secondary">Productivity Score</div>
            </div>
          </div>

          {/* Pie Chart / Time Distribution */}
          <div className="lg:col-span-1 min-h-[350px] bg-surface-dark border border-surface-border rounded-2xl p-6 flex flex-col">
            <h3 className="text-foreground font-bold text-lg mb-6 font-display">Time Distribution</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="60, 100" strokeLinecap="round" strokeWidth="4"></path>
                  <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="25, 100" strokeDashoffset="-65" strokeLinecap="round" strokeWidth="4"></path>
                  <path className="text-surface-border" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="10, 100" strokeDashoffset="-92" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground font-display">6.5h</span>
                  <span className="text-[10px] text-text-secondary">Deep Work</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_#0df2f2]"></div>
                    <span className="text-foreground">Deep Work</span>
                  </div>
                  <span className="text-foreground font-medium">60%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_#8b5cf6]"></div>
                    <span className="text-foreground">Meetings</span>
                  </div>
                  <span className="text-foreground font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-surface-border"></div>
                    <span className="text-foreground">Shallow Work</span>
                  </div>
                  <span className="text-foreground font-medium">15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights List */}
          <div className="lg:col-span-3 min-h-[350px] bg-surface-dark border border-surface-border rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-surface-border">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-lg font-display">AI Anomaly Detection</h3>
                  <p className="text-text-secondary text-xs">Based on last 24h biometrics</p>
                </div>
              </div>
              <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">View All Analysis</button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-darker border border-surface-border hover:border-primary/20 transition-all group">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">Caffeine Threshold Exceeded</h4>
                    <span className="text-[10px] text-text-secondary">2h ago</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    You&apos;ve consumed 120mg of caffeine after 2 PM. Based on your historical data (R²=0.82), this reduces your deep sleep duration by approximately 45 minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-darker border border-surface-border hover:border-primary/20 transition-all group">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#8b5cf6]"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-foreground text-sm font-medium group-hover:text-secondary transition-colors">Peak Focus Window Incoming</h4>
                    <span className="text-[10px] text-text-secondary">Now</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Your circadian rhythm suggests your highest cognitive output window is between 10:00 AM and 11:30 AM. Suggested task: &quot;Q3 Strategy Planning&quot;.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
