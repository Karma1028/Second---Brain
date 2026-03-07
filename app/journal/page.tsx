"use client";
import { useState } from 'react';
import { Book, Calendar as CalendarIcon, Edit3, ChevronLeft, ChevronRight, MoreHorizontal, Smile, Frown, Meh, Hash, Tag, Clock, Plus } from 'lucide-react';
import { useStore } from '@/hooks/useStore';

export default function JournalPage() {
  const { journals } = useStore();
  const [activeJournalId, setActiveJournalId] = useState<string | null>(null);

  const activeJournal = activeJournalId
    ? journals.find(j => j.id === activeJournalId)
    : journals[0];

  const recentJournals = [...journals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const todayDate = new Date().getDate();

  return (
    <div className="flex-1 flex overflow-hidden bg-background-dark">
      {/* Left: Calendar & Entries List */}
      <div className="w-80 flex flex-col border-r border-surface-border bg-surface-dark/30 shrink-0">
        <div className="p-6 border-b border-surface-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground font-display flex items-center gap-2">
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
              <button className="text-text-secondary hover:text-foreground"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-sm font-bold text-foreground">{currentMonthYear}</span>
              <button className="text-text-secondary hover:text-foreground"><ChevronRight className="w-4 h-4" /></button>
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
                const isToday = day === todayDate;
                const hasEntry = journals.some(j => new Date(j.date).getDate() === day);

                return (
                  <div
                    key={day}
                    className={`h-6 w-6 mx-auto rounded-full flex items-center justify-center text-xs cursor-pointer transition-all
                      ${isToday ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/50' :
                        hasEntry ? 'text-foreground hover:bg-surface-border' : 'text-text-secondary hover:text-foreground hover:bg-surface-border/50'
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
          {recentJournals.map(journal => (
            <div
              key={journal.id}
              onClick={() => setActiveJournalId(journal.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-colors relative overflow-hidden ${activeJournal?.id === journal.id
                ? 'bg-surface-dark border-primary/30'
                : 'bg-background-dark border-surface-border hover:border-surface-border/80'
                }`}
            >
              {activeJournal?.id === journal.id && <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>}
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-medium ${activeJournal?.id === journal.id ? 'text-primary' : 'text-text-secondary'}`}>
                  {new Date(journal.date).toLocaleDateString()} {journal.time}
                </span>
                {journal.mood === 'great' || journal.mood === 'good' ? <Smile className="w-4 h-4 text-green-400" /> :
                  journal.mood === 'neutral' ? <Meh className="w-4 h-4 text-amber-400" /> :
                    <Frown className="w-4 h-4 text-rose-400" />}
              </div>
              <h4 className="text-foreground text-sm font-bold mb-1 truncate">{journal.title}</h4>
              <p className="text-text-secondary text-xs line-clamp-2">{journal.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Editor Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <header className="px-12 py-8 flex items-center justify-between border-b border-surface-border/50 z-10 shrink-0">
          <div className="flex items-center gap-4 text-text-secondary text-sm">
            <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {activeJournal ? new Date(activeJournal.date).toLocaleDateString() : 'No Entry'}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {activeJournal?.time || ''}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-dark border border-surface-border rounded-lg p-1">
              <button className={`p-1.5 rounded-md transition-colors ${activeJournal?.mood === 'great' || activeJournal?.mood === 'good' ? 'text-green-400 bg-green-400/10' : 'text-text-secondary hover:text-green-400 hover:bg-green-400/10'}`}><Smile className="w-4 h-4" /></button>
              <button className={`p-1.5 rounded-md transition-colors ${activeJournal?.mood === 'neutral' ? 'text-amber-400 bg-amber-400/10' : 'text-text-secondary hover:text-amber-400 hover:bg-amber-400/10'}`}><Meh className="w-4 h-4" /></button>
              <button className={`p-1.5 rounded-md transition-colors ${activeJournal?.mood === 'bad' || activeJournal?.mood === 'awful' ? 'text-rose-400 bg-rose-400/10' : 'text-text-secondary hover:text-rose-400 hover:bg-rose-400/10'}`}><Frown className="w-4 h-4" /></button>
            </div>
            <button className="p-2 text-text-secondary hover:text-foreground transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-foreground hover:text-background-dark transition-colors">Save</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-12 py-8 z-10">
          {activeJournal ? (
            <div className="max-w-3xl mx-auto">
              <input
                type="text"
                value={activeJournal.title}
                readOnly
                className="w-full bg-transparent text-4xl font-bold text-foreground font-display border-none outline-none mb-6 placeholder:text-surface-border focus:ring-0 p-0"
                placeholder="Entry Title..."
              />

              <div className="flex gap-2 mb-8">
                {(activeJournal.tags || '').split(',').filter(Boolean).map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-surface-dark border border-surface-border text-xs text-text-secondary flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {tag.trim()}
                  </span>
                ))}
                <button className="px-2 py-1 rounded-md border border-dashed border-surface-border text-xs text-text-secondary hover:text-foreground hover:border-primary/50 transition-colors flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add Tag
                </button>
              </div>

              <div className="prose prose-invert prose-p:text-foreground prose-headings:text-foreground prose-a:text-primary max-w-none font-sans text-lg leading-relaxed whitespace-pre-wrap">
                {activeJournal.content}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-text-secondary">
              Select or create an entry to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
