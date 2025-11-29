'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Employees', href: '/employees', icon: '👥' },
  { label: 'Analytics', href: '/analytics', icon: '📊' },
  { label: 'Reports', href: '/reports', icon: '📄' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function HorizontalMenu() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                    isActive
                      ? 'text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 shadow-soft'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white hover:scale-105 hover:-translate-y-0.5 hover:shadow-soft-lg'
                  } group`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

