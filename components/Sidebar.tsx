'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Activity, Database, Settings, Book } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Life Metrics', href: '/metrics', icon: Activity },
    { name: 'Knowledge Vault', href: '/vault', icon: Database },
    { name: 'Task Master', href: '/tasks', icon: CheckSquare },
    { name: 'Journal', href: '/journal', icon: Book },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-surface-darker border-r border-surface-border h-full">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-surface-border shadow-sm" style={{ backgroundImage: 'url("https://picsum.photos/seed/avatar/100/100")' }}></div>
          <div className="flex flex-col">
            <h1 className="text-white text-sm font-semibold leading-tight">Second Brain OS</h1>
            <p className="text-text-secondary text-xs font-normal">v2.4 Connected</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-surface-border/50 text-white' 
                    : 'text-text-secondary hover:bg-surface-border/30 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-primary' : 'group-hover:text-white'
                }`} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-surface-border">
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-10 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/50 transition-all text-sm font-bold tracking-wide">
          <span className="text-lg">+</span>
          <span>Quick Capture</span>
        </button>
      </div>
    </aside>
  );
}
