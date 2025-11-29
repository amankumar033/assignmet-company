'use client';

import { useQuery, gql } from '@apollo/client';
import Layout from '../../components/Layout';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $pageSize: Int) {
    employees(page: $page, pageSize: $pageSize) {
      employees {
        id
        name
        age
        class
        attendance
      }
      totalCount
    }
  }
`;

export default function EmployeeReportsPage() {
  const { data, loading } = useQuery(GET_EMPLOYEES, {
    variables: { page: 1, pageSize: 100 },
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const employees = data?.employees?.employees || [];
  const byClass = employees.reduce((acc: any, emp: any) => {
    acc[emp.class] = (acc[emp.class] || 0) + 1;
    return acc;
  }, {});

  const attendanceStats = {
    excellent: employees.filter((e: any) => e.attendance >= 90).length,
    good: employees.filter((e: any) => e.attendance >= 75 && e.attendance < 90).length,
    needsImprovement: employees.filter((e: any) => e.attendance < 75).length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Employee Reports</h1>
          <p className="text-slate-600">Comprehensive reports and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Attendance Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Excellent (≥90%)</span>
                  <span className="font-semibold text-green-600">{attendanceStats.excellent}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${(attendanceStats.excellent / employees.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Good (75-89%)</span>
                  <span className="font-semibold text-yellow-600">{attendanceStats.good}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${(attendanceStats.good / employees.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Needs Improvement (&lt;75%)</span>
                  <span className="font-semibold text-red-600">{attendanceStats.needsImprovement}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: `${(attendanceStats.needsImprovement / employees.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Employees by Class</h3>
            <div className="space-y-3">
              {Object.entries(byClass).map(([className, count]: [string, any]) => (
                <div key={className} className="flex items-center justify-between">
                  <span className="text-slate-600">{className}</span>
                  <span className="font-semibold text-slate-800">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Employees</span>
                <span className="font-semibold text-slate-800">{employees.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Average Attendance</span>
                <span className="font-semibold text-slate-800">
                  {Math.round(
                    employees.reduce((sum: number, e: any) => sum + e.attendance, 0) / employees.length
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}



