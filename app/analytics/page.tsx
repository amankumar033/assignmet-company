'use client';

import { useQuery, gql } from '@apollo/client';
import Layout from '../components/Layout';

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

export default function AnalyticsPage() {
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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Analytics</h1>
          <p className="text-slate-600">Detailed insights and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Attendance Trends</h2>
            <div className="space-y-4">
              {employees.slice(0, 10).map((emp: any) => (
                <div key={emp.id} className="flex items-center justify-between">
                  <span className="text-slate-700">{emp.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          emp.attendance >= 90
                            ? 'bg-green-500'
                            : emp.attendance >= 75
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${emp.attendance}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 w-12 text-right">
                      {emp.attendance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Age Distribution</h2>
            <div className="space-y-3">
              {[20, 25, 30, 35, 40].map((age) => {
                const count = employees.filter(
                  (e: any) => e.age >= age && e.age < age + 5
                ).length;
                return (
                  <div key={age}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{age}-{age + 4} years</span>
                      <span className="font-semibold text-slate-800">{count}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / employees.length) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}



