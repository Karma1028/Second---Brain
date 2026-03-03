import { ChevronRight, Filter, Search, Plus, MoreHorizontal, Clock, PlayCircle, Check, Zap, RotateCcw, Pause, Square, ExternalLink, FileText, Code, Database } from 'lucide-react';

export default function TasksPage() {
  return (
    <div className="flex-1 flex overflow-hidden bg-background-dark">
      {/* Left: Kanban Board */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-surface-border">
        <header className="flex items-center justify-between px-6 py-5 border-b border-surface-border shrink-0">
          <div>
            <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
              <span>Workspace</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Task Master</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight font-display">Active Sprints</h1>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-lg hover:bg-surface-lighter text-text-secondary hover:text-foreground transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-lighter text-text-secondary hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="bg-accent-orange hover:bg-opacity-90 text-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus className="w-5 h-5" /> New Task
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <div className="flex gap-6 h-full min-w-[800px]">
            {/* Column: To Do */}
            <div className="flex-1 flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-surface-border"></span>
                  TO DO
                  <span className="text-xs bg-surface-border px-2 py-0.5 rounded text-text-secondary">3</span>
                </h3>
                <button className="text-text-secondary hover:text-foreground"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-surface-dark p-4 rounded-xl border border-surface-border hover:border-accent-orange/50 hover:shadow-md hover:shadow-accent-orange/10 cursor-pointer group transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-accent-orange bg-accent-orange/10 px-2 py-1 rounded">Backend</span>
                  </div>
                  <h4 className="text-foreground font-medium mb-3 leading-snug">Design database schema for user profiles</h4>
                  <div className="flex items-center justify-between text-text-secondary text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 2h
                    </div>
                    <div className="w-6 h-6 rounded-full bg-surface-border border border-surface-dark"></div>
                  </div>
                </div>
                <div className="bg-surface-dark p-4 rounded-xl border border-surface-border hover:border-accent-orange/50 hover:shadow-md hover:shadow-accent-orange/10 cursor-pointer group transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Marketing</span>
                  </div>
                  <h4 className="text-foreground font-medium mb-3 leading-snug">Draft newsletter content for Q3 launch</h4>
                  <div className="flex items-center justify-between text-text-secondary text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Oct 12
                    </div>
                    <div className="w-6 h-6 rounded-full bg-surface-border border border-surface-dark"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column: In Progress */}
            <div className="flex-1 flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
                  IN PROGRESS
                  <span className="text-xs bg-surface-border px-2 py-0.5 rounded text-text-secondary">1</span>
                </h3>
                <button className="text-text-secondary hover:text-foreground"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-surface-dark p-4 rounded-xl border border-accent-orange border-opacity-40 hover:border-accent-orange hover:shadow-md hover:shadow-accent-orange/20 cursor-pointer group transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-accent-orange bg-accent-orange/10 px-2 py-1 rounded">Core Dev</span>
                    <span className="animate-pulse w-2 h-2 rounded-full bg-accent-orange"></span>
                  </div>
                  <h4 className="text-foreground font-medium mb-3 leading-snug">Refactor Backend Architecture</h4>
                  <div className="w-full bg-surface-border h-1.5 rounded-full mb-3 overflow-hidden">
                    <div className="bg-accent-orange h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary text-xs">
                    <div className="flex items-center gap-1 text-accent-orange">
                      <PlayCircle className="w-4 h-4" /> Active
                    </div>
                    <div className="w-6 h-6 rounded-full bg-surface-border border border-surface-dark"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column: Done */}
            <div className="flex-1 flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  DONE
                  <span className="text-xs bg-surface-border px-2 py-0.5 rounded text-text-secondary">2</span>
                </h3>
                <button className="text-text-secondary hover:text-foreground"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <div className="bg-surface-dark p-4 rounded-xl border border-surface-border cursor-pointer group transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2 py-1 rounded">Design</span>
                  </div>
                  <h4 className="text-foreground font-medium mb-3 line-through text-text-secondary">Create component library</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Deep Work Focus Panel */}
      <div className="w-[420px] bg-surface-darker border-l border-surface-border flex flex-col shrink-0 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-b from-accent-orange/10 to-transparent pointer-events-none"></div>
        <div className="p-8 relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-accent-orange/20 rounded-lg text-accent-orange">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-foreground font-bold text-lg leading-tight font-display">Deep Work Mode</h2>
              <p className="text-accent-orange text-sm font-medium">Focus Phase • 45m remaining</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-10 relative">
            <div className="relative w-48 h-48 rounded-full border-4 border-surface-border flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-accent-orange border-t-transparent animate-[spin_4s_linear_infinite]" style={{ transform: 'rotate(-45deg)' }}></div>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-mono font-bold text-foreground tracking-wider">24:12</span>
                <span className="text-text-secondary text-sm mt-2">UNTIL BREAK</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button className="bg-surface-border hover:bg-surface-border/80 text-foreground p-3 rounded-full transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="bg-accent-orange hover:bg-primary-dim text-foreground p-4 rounded-full shadow-lg shadow-accent-orange/20 transition-colors transform hover:scale-105">
                <Pause className="w-6 h-6" />
              </button>
              <button className="bg-surface-border hover:bg-surface-border/80 text-foreground p-3 rounded-full transition-colors">
                <Square className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 bg-surface-dark border border-accent-orange/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
            <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">Current Objective</h3>
            <p className="text-foreground text-xl font-bold leading-snug mb-4 font-display">Refactor Backend Architecture</p>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-surface-darker h-2 rounded-full overflow-hidden">
                <div className="bg-accent-orange h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-surface-border">
              <button className="flex-1 bg-accent-orange text-foreground text-sm font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                Complete Task
              </button>
              <button className="p-2 text-text-secondary hover:text-foreground bg-surface-darker rounded-lg">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-medium flex items-center gap-2">
                <Database className="w-4 h-4 text-accent-orange" />
                Vault Context
              </h3>
              <button className="text-accent-orange text-xs font-medium hover:underline">Link Note</button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-background-dark p-3 rounded-xl border border-surface-border hover:border-accent-orange/30 transition-colors cursor-pointer flex gap-3 items-start">
                <div className="mt-0.5 text-text-secondary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">System Architecture V2</h4>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">The new monolithic structure requires separation of concerns regarding the auth service...</p>
                </div>
              </div>
              <div className="bg-background-dark p-3 rounded-xl border border-surface-border hover:border-accent-orange/30 transition-colors cursor-pointer flex gap-3 items-start">
                <div className="mt-0.5 text-text-secondary">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">API Endpoint Specs</h4>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">POST /v1/users/auth requires a JWT token in the header and the payload...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
