'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile Settings</h1>
          <p className="text-slate-600">Manage your personal information</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <input
              type="text"
              value={user?.username || ''}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
            <input
              type="text"
              value={user?.role || ''}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50"
              disabled
            />
          </div>

          <div className="pt-4">
            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover-lift transition-all duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}



