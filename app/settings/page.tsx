'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Layout, Moon, Sun, Monitor, Smartphone, Key, CreditCard, LogOut, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

type TabId = 'profile' | 'appearance' | 'notifications' | 'privacy' | 'data' | 'api' | 'billing';

const TABS = [
  { id: 'profile', label: 'Account Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Layout },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'data', label: 'Data Management', icon: Database },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'billing', label: 'Billing', icon: CreditCard },
] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const activeTabData = TABS.find(t => t.id === activeTab);

  return (
    <div className="flex-1 flex overflow-hidden bg-background-dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-surface-border bg-surface-dark/30 flex flex-col shrink-0">
        <div className="p-6 border-b border-surface-border">
          <h2 className="text-xl font-bold text-foreground font-display flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            Settings
          </h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-surface-border/50 hover:text-foreground'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-surface-border">
          <button onClick={() => toast('Signing out...', { icon: '👋' })} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all duration-200 active:scale-95 text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-foreground tracking-tight font-display mb-2">{activeTabData?.label}</h1>
            <p className="text-text-secondary text-sm">Manage your {activeTabData?.label.toLowerCase()} settings and preferences.</p>
          </header>

          <div className="flex flex-col gap-8">
            {activeTab === 'profile' && (
              <>
                {/* Profile Section */}
                <section className="bg-surface-dark border border-surface-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-6 font-display">Public Profile</h3>
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-surface-border border-2 border-surface-dark overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/avatar/200/200")' }}></div>
                      <button onClick={() => toast('Opening avatar settings')} className="absolute bottom-0 right-0 p-1.5 bg-primary text-background-dark rounded-full hover:bg-foreground hover:text-background-dark transition-all duration-200 active:scale-90 shadow-lg">
                        <SettingsIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-4 mb-4">
                        <button onClick={() => toast('Select a new avatar image')} className="px-4 py-2 bg-surface-border text-foreground text-sm font-medium rounded-lg hover:bg-surface-border/80 transition-all duration-200 active:scale-95">Change Avatar</button>
                        <button onClick={() => toast('Avatar removed')} className="px-4 py-2 text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-border/50 hover:text-foreground transition-all duration-200 active:scale-95">Remove</button>
                      </div>
                      <p className="text-xs text-text-secondary">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
                      <input type="text" defaultValue="Alex" className="w-full bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Last Name</label>
                      <input type="text" defaultValue="Chen" className="w-full bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                      <input type="email" defaultValue="alex.chen@example.com" className="w-full bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
                      <textarea rows={4} defaultValue="Software Architect & Designer. Building tools for thought." className="w-full bg-background-dark border border-surface-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"></textarea>
                      <p className="text-xs text-text-secondary mt-2">Brief description for your profile. URLs are hyperlinked.</p>
                    </div>
                  </div>
                </section>

                {/* Preferences Section */}
                <section className="bg-surface-dark border border-surface-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-6 font-display">Preferences</h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between pb-6 border-b border-surface-border/50">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Language</h4>
                        <p className="text-xs text-text-secondary">Select your preferred language for the interface.</p>
                      </div>
                      <select className="bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pb-6 border-b border-surface-border/50">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Timezone</h4>
                        <p className="text-xs text-text-secondary">Set your local timezone for accurate scheduling.</p>
                      </div>
                      <select className="bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Coordinated Universal Time (UTC)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Theme</h4>
                        <p className="text-xs text-text-secondary">Customize the look and feel of the application.</p>
                      </div>
                      <div className="flex items-center gap-2 bg-background-dark border border-surface-border rounded-lg p-1">
                        <button onClick={() => toast('Light theme enabled', { icon: '☀️' })} className="p-2 rounded-md text-text-secondary hover:text-foreground transition-all duration-200 active:scale-90"><Sun className="w-4 h-4" /></button>
                        <button onClick={() => toast('Dark theme enabled', { icon: '🌙' })} className="p-2 rounded-md bg-surface-border text-primary shadow-sm transition-all duration-200 active:scale-90"><Moon className="w-4 h-4" /></button>
                        <button onClick={() => toast('System theme enabled', { icon: '💻' })} className="p-2 rounded-md text-text-secondary hover:text-foreground transition-all duration-200 active:scale-90"><Monitor className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-surface-dark border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-display">Danger Zone</h3>
                  <p className="text-sm text-text-secondary mb-6">Irreversible actions regarding your account data.</p>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Delete Account</h4>
                      <p className="text-xs text-text-secondary">Permanently delete your account and all associated data.</p>
                    </div>
                    <button onClick={() => toast.error('Account deletion requested')} className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-sm font-medium hover:bg-rose-500 hover:text-foreground transition-all duration-200 active:scale-95">Delete Account</button>
                  </div>
                </section>

                <div className="flex justify-end gap-4 mt-4">
                  <button onClick={() => toast('Changes discarded')} className="px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-foreground transition-all duration-200 active:scale-95">Cancel</button>
                  <button onClick={() => toast.success('Settings saved successfully')} className="px-6 py-2.5 bg-primary text-background-dark rounded-lg text-sm font-bold hover:bg-foreground hover:text-background-dark transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'profile' && (
              <section className="bg-surface-dark border border-surface-border rounded-2xl p-6 flex flex-col items-center justify-center text-center py-20 opacity-50">
                <SettingsIcon className="w-12 h-12 text-text-secondary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 font-display">{activeTabData?.label} settings are under construction</h3>
                <p className="text-text-secondary text-sm">We are working on bringing this functionality soon.</p>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
