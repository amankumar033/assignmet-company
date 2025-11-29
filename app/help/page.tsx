'use client';

import Layout from '../components/Layout';

export default function HelpPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Help & Support</h1>
          <p className="text-slate-600">Find answers to common questions</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Getting Started</h2>
            <p className="text-slate-600">
              Welcome to the Employee Management System. Use the navigation menu to access different sections.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Managing Employees</h2>
            <p className="text-slate-600 mb-2">
              To view all employees, navigate to the Employees section. You can switch between Grid and Tile views.
            </p>
            <p className="text-slate-600">
              Click on any employee to see detailed information. Admin users can add, edit, or delete employees.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Reports & Analytics</h2>
            <p className="text-slate-600">
              Access comprehensive reports and analytics in the Reports and Analytics sections to gain insights into employee performance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Need More Help?</h2>
            <p className="text-slate-600">
              For additional support, please contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}



