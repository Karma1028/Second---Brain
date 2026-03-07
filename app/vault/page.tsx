"use client";

import { Search, Filter, Plus, Folder, FileText, Image as ImageIcon, Link as LinkIcon, MoreVertical, Star, Clock, Hash, Database, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { VaultItem } from '@/types';
import { toast } from 'sonner';

export default function VaultPage() {
  const { vaultItems } = useStore();

  const parseTags = (tags: string) => (tags || '').split(',').map(t => t.trim()).filter(Boolean);
  const allTags = Array.from(new Set(vaultItems.flatMap(item => parseTags(item.tags))));

  const renderVaultItem = (item: VaultItem) => {
    switch (item.type) {
      case 'note':
        return (
          <div key={item.id} className="bg-surface-dark border border-surface-border rounded-xl p-5 hover:border-primary/50 transition-all group cursor-pointer flex flex-col h-64 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <FileText className="w-4 h-4" />
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toast('Options opened for note'); }}
                className="text-text-secondary hover:text-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-90"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-foreground font-bold text-lg mb-2 line-clamp-2 font-display">{item.title}</h3>
            <p className="text-text-secondary text-sm line-clamp-3 mb-4 flex-1">
              {item.content}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-border/50">
              <div className="flex gap-2 flex-wrap">
                {parseTags(item.tags).map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded bg-surface-border text-text-secondary">#{tag}</span>
                ))}
              </div>
              <span className="text-[10px] text-text-secondary">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</span>
            </div>
          </div>
        );
      case 'link':
        return (
          <div key={item.id} className="bg-surface-dark border border-surface-border rounded-xl p-5 hover:border-primary/50 transition-all group cursor-pointer flex flex-col h-64 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toast('Options opened for link'); }}
                className="text-text-secondary hover:text-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-90"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-foreground font-bold text-lg mb-2 line-clamp-2 font-display">{item.title}</h3>
            <p className="text-text-secondary text-sm line-clamp-3 mb-4 flex-1">
              {item.content}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full bg-surface-border flex items-center justify-center text-[8px] text-foreground font-bold">L</div>
              <span className="text-xs text-text-secondary truncate">{item.content}</span>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-border/50">
              <div className="flex gap-2 flex-wrap">
                {parseTags(item.tags).map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded bg-surface-border text-text-secondary">#{tag}</span>
                ))}
              </div>
              <span className="text-[10px] text-text-secondary">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</span>
            </div>
          </div>
        );
      case 'idea':
      case 'resource':
        return (
          <div key={item.id} className="bg-surface-dark border border-surface-border rounded-xl p-0 hover:border-primary/50 transition-all group cursor-pointer flex flex-col h-64 relative overflow-hidden">
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); toast('Options opened for media'); }}
                className="p-1.5 bg-background-dark/80 backdrop-blur-sm rounded-md text-foreground hover:bg-primary hover:text-background-dark transition-all duration-200 active:scale-90"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="h-32 w-full relative overflow-hidden bg-surface-border">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${item.content}")` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
              <div className="absolute bottom-2 left-3 p-1.5 bg-rose-500/20 backdrop-blur-md rounded-lg text-rose-400 border border-rose-500/20">
                <ImageIcon className="w-3 h-3" />
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-foreground font-bold text-sm mb-1 line-clamp-1 font-display">{item.title}</h3>
              <p className="text-text-secondary text-xs line-clamp-2 mb-auto">Media captured</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-border/50">
                <div className="flex gap-2 flex-wrap">
                  {parseTags(item.tags).map(tag => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded bg-surface-border text-text-secondary">#{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] text-text-secondary">{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark">
      {/* Header */}
      <header className="px-8 py-6 border-b border-surface-border flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight font-display">Knowledge Vault</h1>
            <p className="text-text-secondary text-sm">{vaultItems.length} items • {allTags.length} tags</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search vault..."
              className="bg-surface-dark border border-surface-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 w-64 transition-all placeholder:text-text-secondary"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-surface-border text-text-secondary rounded border border-surface-border/50">⌘</kbd>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-surface-border text-text-secondary rounded border border-surface-border/50">K</kbd>
            </div>
          </div>

          <div className="flex items-center bg-surface-dark border border-surface-border rounded-lg p-1">
            <button onClick={() => toast('Switched to Grid View')} className="p-1.5 rounded-md bg-surface-border text-foreground shadow-sm transition-all duration-200 active:scale-95">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => toast('Switched to List View')} className="p-1.5 rounded-md text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95">
              <List className="w-4 h-4" />
            </button>
          </div>

          <button onClick={() => toast('Filter vault items')} className="p-2 rounded-lg border border-surface-border bg-surface-dark text-text-secondary hover:text-foreground hover:border-primary/30 transition-all duration-200 active:scale-95">
            <Filter className="w-4 h-4" />
          </button>

          <button onClick={() => toast.success('Creating a new vault entry')} className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-foreground hover:text-background-dark transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-surface-border bg-surface-dark/30 flex flex-col overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Collections</h3>
            <nav className="flex flex-col gap-1">
              <a href="#" className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  <span>All Items</span>
                </div>
                <span className="text-xs">{vaultItems.length}</span>
              </a>
              <a href="#" className="flex items-center justify-between px-2 py-1.5 rounded-lg text-text-secondary hover:bg-surface-border/50 hover:text-foreground transition-colors text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Favorites</span>
                </div>
                <span className="text-xs">0</span>
              </a>
              <a href="#" className="flex items-center justify-between px-2 py-1.5 rounded-lg text-text-secondary hover:bg-surface-border/50 hover:text-foreground transition-colors text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Recent</span>
                </div>
              </a>
            </nav>
          </div>

          <div className="p-4 border-t border-surface-border flex-1">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Tags</h3>
            <div className="flex flex-wrap gap-2 px-2">
              {allTags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded-md bg-surface-border text-xs text-text-secondary hover:text-foreground hover:bg-surface-border/80 cursor-pointer transition-colors flex items-center gap-1">
                  <Hash className="w-3 h-3" /> {tag}
                </span>
              ))}
              {allTags.length === 0 && (
                <span className="text-xs text-text-secondary px-2">No tags found.</span>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Background Glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
            {vaultItems.map(item => renderVaultItem(item))}
            {vaultItems.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-text-secondary py-20">
                <Database className="w-12 h-12 mb-4 opacity-20" />
                <p>Your Knowledge Vault is empty.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
