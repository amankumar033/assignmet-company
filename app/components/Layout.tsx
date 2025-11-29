'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';
import LoginModal from './LoginModal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setIsLoggedIn(true);
            setUser(parsedUser);
            setIsInitialized(true);
          } catch (e) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setUser(null);
            setIsInitialized(true);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setIsInitialized(true);
        }
      } catch (e) {
        setIsLoggedIn(false);
        setUser(null);
        setIsInitialized(true);
      }
    };

    // Initial check on mount
    checkAuth();
    
    // Check auth on storage changes (from other tabs/windows only)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array - only run on mount

  const handleLoginSuccess = (token: string, userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowLoginModal(true);
  };

  // Don't redirect if we're on a login page or not initialized yet
  const isLoginPage = pathname === '/login' || pathname === '/login/admin' || pathname === '/login/employee';
  
  // Wait for initialization before checking auth
  if (!isInitialized) {
    return null; // Show nothing while checking auth
  }
  
  if (!isLoggedIn && !isLoginPage) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }
  
  // If on login page and logged in, don't render Layout
  if (isLoginPage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-soft-lg border-b border-gray-200/50 sticky top-0 z-[50]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <HamburgerMenu />
              <Link
                href="/"
                className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-all duration-500 header-content"
              >
                <span className="hidden sm:inline">
                  {user?.role === 'EMPLOYEE' ? 'Employee Portal' : 'Employee Management'}
                </span>
                <span className="sm:hidden">
                  {user?.role === 'EMPLOYEE' ? 'Portal' : 'Management'}
                </span>
              </Link>
            </div>

            {/* Navigation Menu in Header - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex items-center space-x-2 flex-1 justify-center px-8 header-content">
              {(user?.role === 'ADMIN'
                ? [
                    { label: 'Home', href: '/' },
                    { label: 'Employees', href: '/employees' },
                    { label: 'Analytics', href: '/analytics' },
                    { label: 'Reports', href: '/reports' },
                    { label: 'Settings', href: '/settings' },
                  ]
                : [
                    { label: 'Home', href: '/' },
                    { label: 'Analytics', href: '/analytics' },
                    { label: 'Reports', href: '/reports' },
                    { label: 'Settings', href: '/settings' },
                  ]
              ).map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative group ${
                      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                    {/* Active underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                    {/* Hover underline */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User info and logout - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4 header-content">
              <div className="hidden sm:block text-sm text-gray-600">
                Welcome, <span className="font-semibold text-gray-900">{user?.username}</span>
                <span className="ml-2 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {user?.role}
                </span>
              </div>
              <div className="sm:hidden text-xs text-gray-600 font-semibold">
                {user?.username}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

