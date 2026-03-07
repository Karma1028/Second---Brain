'use client';

import { useState } from 'react';
import { ChevronRight, Filter, Search, Plus, MoreHorizontal, Clock, PlayCircle, Check, Zap, RotateCcw, Pause, Square, ExternalLink, FileText, Code, Database, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { linkVaultItemsToTask } from '@/lib/api';
import { toast } from 'sonner';

export default function TasksPage() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('Work');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [taskDueDate, setTaskDueDate] = useState('');

  const { tasks, vaultItems, addTask } = useStore();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) {
      toast.error('Please enter a task title');
      return;
    }

    try {
      await addTask({
        id: crypto.randomUUID(),
        title: taskTitle,
        category: taskCategory,
        status: 'todo',
        priority: taskPriority,
        due_date: taskDueDate || new Date().toISOString().split('T')[0],
        progress_percentage: 0,
        linked_vault_ids: ''
      });

      toast.success('Task created successfully!');
      setIsNewTaskModalOpen(false);
      setTaskTitle('');
      setTaskCategory('Work');
      setTaskPriority('medium');
      setTaskDueDate('');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const activeTask = inProgressTasks[0] || null;
  const activeVaultItems = activeTask ? linkVaultItemsToTask(activeTask.linked_vault_ids, vaultItems) : [];

  const getCategoryColor = (category: string) => {
    // Generate a pseudo-random color based on string length just for visuals
    const colors = [
      'text-accent-orange bg-accent-orange/10',
      'text-blue-400 bg-blue-400/10',
      'text-purple-400 bg-purple-400/10',
      'text-emerald-400 bg-emerald-400/10',
      'text-pink-400 bg-pink-400/10'
    ];
    return colors[category.length % colors.length];
  };

  const getVaultIcon = (type: string) => {
    switch (type) {
      case 'note': return <FileText className="w-4 h-4" />;
      case 'link': return <LinkIcon className="w-4 h-4" />;
      case 'video':
      case 'image': return <ImageIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

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
            <button
              onClick={() => toast('Filter options coming soon', { icon: '🔍' })}
              className="p-2 rounded-lg hover:bg-surface-lighter text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              onClick={() => toast('Search functionality active', { icon: '🔍' })}
              className="p-2 rounded-lg hover:bg-surface-lighter text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="bg-accent-orange hover:bg-opacity-90 text-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 active:scale-95"
            >
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
                  <span className="text-xs bg-surface-border px-2 py-0.5 rounded text-text-secondary">{todoTasks.length}</span>
                </h3>
                <button onClick={() => toast('Column options opened')} className="text-text-secondary hover:text-foreground transition-all duration-200 active:scale-90"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-3">
                {todoTasks.map(task => (
                  <div key={task.id} className="bg-surface-dark p-4 rounded-xl border border-surface-border hover:border-accent-orange/50 hover:shadow-md hover:shadow-accent-orange/10 cursor-pointer group transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(task.category)}`}>{task.category}</span>
                    </div>
                    <h4 className="text-foreground font-medium mb-3 leading-snug">{task.title}</h4>
                    <div className="flex items-center justify-between text-text-secondary text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {new Date(task.due_date).toLocaleDateString()}
                      </div>
                      <div className="px-2 py-1 rounded text-xs bg-surface-border text-foreground font-medium capitalize">{task.priority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: In Progress */}
            <div className="flex-1 flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
                  IN PROGRESS
                  <span className="text-xs bg-surface-border px-2 py-0.5 rounded text-text-secondary">{inProgressTasks.length}</span>
                </h3>
                <button onClick={() => toast('Column options opened')} className="text-text-secondary hover:text-foreground transition-all duration-200 active:scale-90"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-3">
                {inProgressTasks.map(task => (
                  <div key={task.id} className="bg-surface-dark p-4 rounded-xl border border-accent-orange border-opacity-40 hover:border-accent-orange hover:shadow-md hover:shadow-accent-orange/20 cursor-pointer group transition-all relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(task.category)}`}>{task.category}</span>
                      {activeTask?.id === task.id && <span className="animate-pulse w-2 h-2 rounded-full bg-accent-orange"></span>}
                    </div>
                    <h4 className="text-foreground font-medium mb-3 leading-snug">{task.title}</h4>
                    <div className="w-full bg-surface-border h-1.5 rounded-full mb-3 overflow-hidden">
                      <div className="bg-accent-orange h-full rounded-full" style={{ width: `${task.progress_percentage}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-text-secondary text-xs">
                      <div className="flex items-center gap-1 text-accent-orange">
                        <PlayCircle className="w-4 h-4" /> Active
                      </div>
                      <div className="px-2 py-1 rounded text-xs bg-surface-border text-foreground font-medium capitalize">{task.priority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: Done */}
            <div className="flex-1 flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  DONE
                  <span className="text-xs bg-surface-border px-2 py-0.5 rounded text-text-secondary">{doneTasks.length}</span>
                </h3>
                <button onClick={() => toast('Column options opened')} className="text-text-secondary hover:text-foreground transition-all duration-200 active:scale-90"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col gap-3 opacity-60 hover:opacity-100 transition-opacity">
                {doneTasks.map(task => (
                  <div key={task.id} className="bg-surface-dark p-4 rounded-xl border border-surface-border cursor-pointer group transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(task.category)}`}>{task.category}</span>
                    </div>
                    <h4 className="text-foreground font-medium mb-3 line-through text-text-secondary">{task.title}</h4>
                  </div>
                ))}
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
              <p className="text-accent-orange text-sm font-medium">Focus Phase • Active Sync</p>
            </div>
          </div>

          {!activeTask ? (
            <div className="flex items-center justify-center h-full flex-1 text-text-secondary">
              <p>No active tasks in progress.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center py-6 relative">
                <div className="relative w-48 h-48 rounded-full border-4 border-surface-border flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-accent-orange border-t-transparent animate-[spin_4s_linear_infinite]" style={{ transform: 'rotate(-45deg)' }}></div>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-mono font-bold text-foreground tracking-wider">24:12</span>
                    <span className="text-text-secondary text-sm mt-2">UNTIL BREAK</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => toast('Timer reset', { icon: '🔄' })} className="bg-surface-border hover:bg-surface-border/80 text-foreground p-3 rounded-full transition-all duration-200 active:scale-90">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button onClick={() => toast('Timer paused')} className="bg-accent-orange hover:bg-primary-dim text-foreground p-4 rounded-full shadow-lg shadow-accent-orange/20 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Pause className="w-6 h-6" />
                  </button>
                  <button onClick={() => toast('Focus session stopped', { icon: '⏹️' })} className="bg-surface-border hover:bg-surface-border/80 text-foreground p-3 rounded-full transition-all duration-200 active:scale-90">
                    <Square className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-surface-dark border border-accent-orange/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
                <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">Current Objective</h3>
                <p className="text-foreground text-xl font-bold leading-snug mb-4 font-display">{activeTask.title}</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Progress</span>
                    <span>{activeTask.progress_percentage}%</span>
                  </div>
                  <div className="w-full bg-surface-darker h-2 rounded-full overflow-hidden">
                    <div className="bg-accent-orange h-full rounded-full" style={{ width: `${activeTask.progress_percentage}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-surface-border">
                  <button onClick={() => toast.success('Task marked as completed! 🎉')} className="flex-1 bg-accent-orange text-foreground text-sm font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 active:scale-95">
                    Complete Task
                  </button>
                  <button onClick={() => toast('Opening task details')} className="p-2 text-text-secondary hover:text-foreground bg-surface-darker rounded-lg transition-all duration-200 active:scale-90">
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
                  <button onClick={() => toast('Link Note drawer opened')} className="text-accent-orange text-xs font-medium hover:underline transition-all duration-200 active:scale-95">Link Note</button>
                </div>
                <div className="flex flex-col gap-3">
                  {activeVaultItems.length > 0 ? (
                    activeVaultItems.map(item => (
                      <div key={item.id} className="bg-background-dark p-3 rounded-xl border border-surface-border hover:border-accent-orange/30 transition-colors cursor-pointer flex gap-3 items-start">
                        <div className="mt-0.5 text-text-secondary">
                          {getVaultIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                          <p className="text-xs text-text-secondary mt-1 line-clamp-2">{item.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-text-secondary text-sm">No linked items in the vault.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isNewTaskModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-surface-border">
              <h2 className="text-lg font-bold text-foreground font-display">New Task</h2>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-text-secondary hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Design new landing page"
                  className="w-full bg-surface-dark border border-surface-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent-orange transition-colors"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent-orange transition-colors"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Learning">Learning</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full bg-surface-dark border border-surface-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent-orange transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full bg-surface-dark border border-surface-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 text-text-secondary hover:text-foreground font-medium transition-colors active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-orange hover:bg-opacity-90 text-foreground font-medium rounded-lg transition-all active:scale-95"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
