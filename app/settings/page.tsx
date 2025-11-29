'use client';

import Link from 'next/link';
import Layout from '../components/Layout';

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/settings/profile"
            className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Profile Settings</h3>
                <p className="text-sm text-slate-600">Update your personal information</p>
              </div>
            </div>
          </Link>

          <Link
            href="/settings/preferences"
            className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Preferences</h3>
                <p className="text-sm text-slate-600">Customize your experience</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}




