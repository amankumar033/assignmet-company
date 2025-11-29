'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: MenuItem[];
}

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        setRole(parsed.role || null);
      }
    } catch {
      setRole(null);
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Employees',
      submenu:
        role === 'ADMIN'
          ? [
              { label: 'All Employees', href: '/employees' },
              { label: 'Add Employee', href: '/employees/add' },
              { label: 'Reports', href: '/employees/reports' },
            ]
          : [
              // For employees, only show a simple reports link under Employees
              { label: 'Reports', href: '/employees/reports' },
            ],
    },
    {
      label: 'Settings',
      submenu: [
        { label: 'Profile', href: '/settings/profile' },
        { label: 'Preferences', href: '/settings/preferences' },
      ],
    },
    {
      label: 'Help',
      href: '/help',
    },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      <div className="relative" style={{ zIndex: 9999 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-soft hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 group"
          style={{ zIndex: 9999 }}
          aria-label="Toggle menu"
        >
        <span
          className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
          }`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
          }`}
        />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent"
            style={{ zIndex: 9998 }}
            onClick={() => setIsOpen(false)}
          />
          <nav 
            className="fixed top-0 left-0 h-screen w-80 bg-white shadow-soft-xl overflow-y-auto animate-slide-in-left border-r border-gray-100"
            style={{ zIndex: 9999 }}
          >
            <div className="p-6 bg-gradient-to-b from-blue-50/50 to-white">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-300 hover:translate-x-2 hover:shadow-soft group"
                        >
                          <span className="font-semibold">{item.label}</span>
                          <span
                            className={`transform transition-transform duration-300 text-gray-400 ${
                              openSubmenu === item.label ? 'rotate-90 text-blue-600' : ''
                            }`}
                          >
                            ▶
                          </span>
                        </button>
                        {openSubmenu === item.label && (
                          <ul className="mt-2 ml-4 space-y-1 animate-fade-in">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.label}>
                                <Link
                                  href={subItem.href || '#'}
                                  className={`block px-4 py-2.5 rounded-lg transition-all duration-300 hover:translate-x-2 ${
                                    pathname === subItem.href
                                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-soft'
                                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white hover:text-blue-700 hover:shadow-soft'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href || '#'}
                        className={`block px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-2 ${
                          pathname === item.href
                            ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-soft'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white hover:shadow-soft'
                        } font-semibold`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

