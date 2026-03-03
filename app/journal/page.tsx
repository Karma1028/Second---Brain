import { Book, Calendar as CalendarIcon, Edit3, ChevronLeft, ChevronRight, MoreHorizontal, Smile, Frown, Meh, Hash, Tag, Clock, Plus } from 'lucide-react';

export default function JournalPage() {
  return (
    <div className="flex-1 flex overflow-hidden bg-background-dark">
      {/* Left: Calendar & Entries List */}
      <div className="w-80 flex flex-col border-r border-surface-border bg-surface-dark/30 shrink-0">
        <div className="p-6 border-b border-surface-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              Journal
            </h2>
            <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Mini Calendar */}
          <div className="bg-surface-dark border border-surface-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <button className="text-text-secondary hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-sm font-bold text-white">October 2023</span>
              <button className="text-text-secondary hover:text-white"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <span key={i} className="text-[10px] font-medium text-text-secondary">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty slots */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`empty-${i}`} className="h-6"></div>
              ))}
              {/* Days */}
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 24;
                const hasEntry = [2, 5, 8, 12, 15, 18, 20, 22, 23, 24].includes(day);
                
                return (
                  <div 
                    key={day} 
                    className={`h-6 w-6 mx-auto rounded-full flex items-center justify-center text-xs cursor-pointer transition-all
                      ${isToday ? 'bg-primary text-background-dark font-bold shadow-[0_0_10px_rgba(13,242,242,0.5)]' : 
                        hasEntry ? 'text-white hover:bg-surface-border' : 'text-text-secondary hover:text-white hover:bg-surface-border/50'
                      }
                    `}
                  >
                    {day}
                    {hasEntry && !isToday && <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-primary/50"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 px-2">Recent Entries</h3>
          
          <div className="p-3 rounded-xl bg-surface-dark border border-primary/30 cursor-pointer relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-medium text-primary">Today, 08:30 AM</span>
              <Smile className="w-4 h-4 text-green-400" />
            </div>
            <h4 className="text-white text-sm font-bold mb-1 truncate">Morning Reflections & Planning</h4>
            <p className="text-text-secondary text-xs line-clamp-2">Woke up feeling refreshed after a solid 7.5 hours of sleep. The new morning routine is definitely helping...</p>
          </div>

          <div className="p-3 rounded-xl bg-background-dark border border-surface-border hover:border-surface-border/80 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-medium text-text-secondary">Yesterday, 09:15 PM</span>
              <Meh className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-slate-300 text-sm font-bold mb-1 truncate">End of Day Dump</h4>
            <p className="text-text-secondary text-xs line-clamp-2">Productive day but feeling a bit mentally drained. The architecture review took longer than expected...</p>
          </div>

          <div className="p-3 rounded-xl bg-background-dark border border-surface-border hover:border-surface-border/80 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-medium text-text-secondary">Oct 22, 07:00 AM</span>
              <Smile className="w-4 h-4 text-green-400" />
            </div>
            <h4 className="text-slate-300 text-sm font-bold mb-1 truncate">Weekend Ideas</h4>
            <p className="text-text-secondary text-xs line-clamp-2">Had a great idea for a new side project while running. Need to sketch out the initial UI concepts...</p>
          </div>
        </div>
      </div>

      {/* Right: Editor Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <header className="px-12 py-8 flex items-center justify-between border-b border-surface-border/50 z-10 shrink-0">
          <div className="flex items-center gap-4 text-text-secondary text-sm">
            <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> October 24, 2023</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 08:30 AM</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-dark border border-surface-border rounded-lg p-1">
              <button className="p-1.5 rounded-md text-text-secondary hover:text-green-400 hover:bg-green-400/10 transition-colors"><Smile className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-md text-text-secondary hover:text-amber-400 hover:bg-amber-400/10 transition-colors"><Meh className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-md text-text-secondary hover:text-rose-400 hover:bg-rose-400/10 transition-colors"><Frown className="w-4 h-4" /></button>
            </div>
            <button className="p-2 text-text-secondary hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-colors">Save</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-12 py-8 z-10">
          <div className="max-w-3xl mx-auto">
            <input 
              type="text" 
              defaultValue="Morning Reflections & Planning"
              className="w-full bg-transparent text-4xl font-bold text-white font-display border-none outline-none mb-6 placeholder:text-surface-border focus:ring-0 p-0"
              placeholder="Entry Title..."
            />
            
            <div className="flex gap-2 mb-8">
              <span className="px-2 py-1 rounded-md bg-surface-dark border border-surface-border text-xs text-text-secondary flex items-center gap-1">
                <Tag className="w-3 h-3" /> morning-routine
              </span>
              <span className="px-2 py-1 rounded-md bg-surface-dark border border-surface-border text-xs text-text-secondary flex items-center gap-1">
                <Tag className="w-3 h-3" /> planning
              </span>
              <button className="px-2 py-1 rounded-md border border-dashed border-surface-border text-xs text-text-secondary hover:text-white hover:border-primary/50 transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Tag
              </button>
            </div>

            <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white prose-a:text-primary max-w-none font-sans text-lg leading-relaxed">
              <p>Woke up feeling refreshed after a solid 7.5 hours of sleep. The new morning routine is definitely helping set a better tone for the day. I didn&apos;t check my phone for the first hour and spent 15 minutes meditating.</p>
              
              <h3>Today&apos;s Focus</h3>
              <p>The main objective today is to finalize the architecture review for the new backend service. It&apos;s a complex task, so I need to block out at least two hours of deep work before lunch.</p>
              
              <ul>
                <li>Review the database schema proposal.</li>
                <li>Draft the API endpoint specifications.</li>
                <li>Sync with the frontend team on data requirements.</li>
              </ul>

              <blockquote>
                &quot;The way we spend our days is, of course, how we spend our lives.&quot; - Annie Dillard
              </blockquote>

              <p>Feeling optimistic about the progress we&apos;re making. Need to remember to take breaks and stay hydrated. The metrics dashboard showed a dip in hydration levels yesterday.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
