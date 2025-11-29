'use client';

import Layout from '../components/Layout';

export default function ReportsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Reports</h1>
          <p className="text-slate-600">Generate and view various reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Attendance Report</h3>
                <p className="text-sm text-slate-600">Monthly attendance summary</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Performance Report</h3>
                <p className="text-sm text-slate-600">Employee performance metrics</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Department Report</h3>
                <p className="text-sm text-slate-600">Department-wise analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}



