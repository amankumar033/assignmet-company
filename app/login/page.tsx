'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Login Options */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
         

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-lg mb-10">Choose your login type</p>

          {/* Login Options */}
          <div className="space-y-4">
            <Link
              href="/login/admin"
              className="block p-6 rounded-xl border-2 border-blue-200 bg-blue-50/30 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-soft-lg group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Admin Login</h3>
                  <p className="text-sm text-gray-600">Full access to all features</p>
                </div>
              </div>
            </Link>

            <Link
              href="/login/employee"
              className="block p-6 rounded-xl border-2 border-gray-200 bg-gray-50/30 hover:border-green-400 hover:bg-green-50/30 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-soft-lg group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Employee Login</h3>
                  <p className="text-sm text-gray-600">View and manage your profile</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 items-center justify-center p-8">
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">Employee Management</h2>
          <p className="text-xl text-blue-50 font-light">Manage your business efficiently</p>
        </div>
      </div>
    </div>
  );
}
