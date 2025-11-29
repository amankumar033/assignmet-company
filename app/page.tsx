'use client';

import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from './components/Layout';
import Link from 'next/link';
import EmployeeGridView from './components/EmployeeGridView';
import EmployeeTileView from './components/EmployeeTileView';
import EmployeeDetailView from './components/EmployeeDetailView';
import type { Employee } from './types';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $pageSize: Int) {
    employees(page: $page, pageSize: $pageSize) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
      }
      totalCount
    }
  }
`;

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const { data, loading } = useQuery(GET_EMPLOYEES, {
    variables: { page: 1, pageSize: 10 },
  });

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetail = () => {
    setSelectedEmployee(null);
  };

  const handleEdit = (employee: Employee) => {
    alert(`Edit functionality for ${employee.name} would be implemented here`);
  };

  const handleFlag = (employee: Employee) => {
    alert(`Flag functionality for ${employee.name} would be implemented here`);
  };

  const handleDelete = (employee: Employee) => {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      alert(`Delete functionality for ${employee.name} would be implemented here`);
    }
  };

  const stats = data
    ? {
        total: data.employees.totalCount,
        avgAttendance: Math.round(
          data.employees.employees.reduce((sum: number, emp: any) => sum + emp.attendance, 0) /
            data.employees.employees.length
        ),
        excellent: data.employees.employees.filter((emp: any) => emp.attendance >= 90).length,
        needsImprovement: data.employees.employees.filter((emp: any) => emp.attendance < 75).length,
      }
    : null;

  const isAdmin = user?.role === 'ADMIN';

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            {isAdmin ? 'Admin Dashboard' : 'Employee Dashboard'}
          </h1>
          <p className="text-gray-500 text-lg">
            {isAdmin
              ? 'Welcome to your employee management dashboard'
              : 'Overview of your employee portal and resources'}
          </p>
        </div>

        {/* Admin view with stats and employee grid/tile */}
        {isAdmin ? (
          <>
            {/* Stats Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-float p-6 group cursor-pointer transition-all duration-500 border-2 border-transparent hover:border-blue-200 relative overflow-hidden hover:scale-[1.03] hover:-translate-y-2">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Employees</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-green-600">+12%</span>
                        <span className="text-green-500 text-xs">↑</span>
                        <span className="text-xs text-gray-400">from last month</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300 shadow-soft">
                      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="card-float p-6 group cursor-pointer transition-all duration-500 border-2 border-transparent hover:border-green-200 relative overflow-hidden hover:scale-[1.03] hover:-translate-y-2">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Avg Attendance</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stats.avgAttendance}%</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-green-600">+8%</span>
                        <span className="text-green-500 text-xs">↑</span>
                        <span className="text-xs text-gray-400">from last month</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300 shadow-soft">
                      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="card-float p-6 group cursor-pointer transition-all duration-500 border-2 border-transparent hover:border-emerald-200 relative overflow-hidden hover:scale-[1.03] hover:-translate-y-2">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Excellent</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stats.excellent}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-green-600">+15%</span>
                        <span className="text-green-500 text-xs">↑</span>
                        <span className="text-xs text-gray-400">from last month</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300 shadow-soft">
                      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="card-float p-6 group cursor-pointer transition-all duration-500 border-2 border-transparent hover:border-amber-200 relative overflow-hidden hover:scale-[1.03] hover:-translate-y-2">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">Needs Improvement</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stats.needsImprovement}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-green-600">+18%</span>
                        <span className="text-green-500 text-xs">↑</span>
                        <span className="text-xs text-gray-400">from last month</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300 shadow-soft">
                      <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Employee section with grid/tile toggle */}
            {data && !loading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Employees Overview</h2>
                    <p className="text-sm text-gray-500 mt-1">Quick view of recent employees</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-md border border-slate-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      📊 Grid
                    </button>
                    <button
                      onClick={() => setViewMode('tile')}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                        viewMode === 'tile'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      🎴 Tile
                    </button>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <EmployeeGridView
                    employees={data.employees.employees}
                    onEmployeeClick={handleEmployeeClick}
                    onEdit={handleEdit}
                    onFlag={handleFlag}
                    onDelete={handleDelete}
                  />
                ) : (
                  <EmployeeTileView
                    employees={data.employees.employees}
                    onEmployeeClick={handleEmployeeClick}
                    onEdit={handleEdit}
                    onFlag={handleFlag}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            )}

            {selectedEmployee && (
              <EmployeeDetailView
                employee={selectedEmployee}
                onClose={handleCloseDetail}
                onEdit={handleEdit}
                onFlag={handleFlag}
                onDelete={handleDelete}
              />
            )}
          </>
        ) : (
          /* Employee dummy dashboard - employee specific sections */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-float p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h2>
              <p className="text-sm text-gray-500 mb-4">
                Single employee statistics based on your activity.
              </p>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Attendance</span>
                  <span className="text-sm font-semibold text-gray-900">92%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Performance</span>
                  <span className="font-semibold text-emerald-600">Excellent</span>
                </div>
              </div>
            </div>
            <div className="card-float p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Reports</h2>
              <p className="text-sm text-gray-500 mb-4">
                Access summaries and downloadable reports related to employees.
              </p>
              <p className="text-sm text-gray-400">
                Use this section to explore attendance and performance reports.
              </p>
            </div>
            <div className="card-float p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
              <p className="text-sm text-gray-500 mb-4">
                Adjust your profile and preferences within the system.
              </p>
              <p className="text-sm text-gray-400">
                Visit the Settings area to update personal and app settings.
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions - Below content */}
        <div className="card-float p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {isAdmin ? (
              <>
                <Link
                  href="/employees/add"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">New Employee</p>
                      <p className="text-sm text-gray-500">Create a new employee record</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/employees"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30 hover:border-green-400 hover:bg-green-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Employee Directory</p>
                      <p className="text-sm text-gray-500">Browse and manage all employees</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/analytics"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Manage Attendance</p>
                      <p className="text-sm text-gray-500">Track attendance and performance analytics</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/reports"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30 hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">View Reports</p>
                      <p className="text-sm text-gray-500">Generate and review key reports</p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/analytics"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30 hover:border-green-400 hover:bg-green-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Open Analytics</p>
                      <p className="text-sm text-gray-500">See high-level attendance analytics</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/reports"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">View Reports</p>
                      <p className="text-sm text-gray-500">See available employee reports</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/settings"
                  className="group relative p-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30 hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-500 ease-out transform hover:scale-[1.03] hover:-translate-y-2 hover:shadow-soft-xl"
                >
                  <div className="flex flex-col items-start space-y-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 16v-2m8-6h-2M6 12H4m14.364 5.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Open Settings</p>
                      <p className="text-sm text-gray-500">Update your preferences</p>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
