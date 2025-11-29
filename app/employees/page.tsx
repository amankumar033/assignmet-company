'use client';

import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from '../components/Layout';
import EmployeeGridView from '../components/EmployeeGridView';
import EmployeeTileView from '../components/EmployeeTileView';
import EmployeeDetailView from '../components/EmployeeDetailView';
import { Employee } from '../types';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $pageSize: Int, $sort: SortInput, $filter: EmployeeFilter) {
    employees(page: $page, pageSize: $pageSize, sort: $sort, filter: $filter) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
      }
      totalCount
      page
      pageSize
      hasNextPage
      hasPreviousPage
    }
  }
`;

export default function EmployeesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const { data, loading, error } = useQuery(GET_EMPLOYEES, {
    variables: {
      page: 1,
      pageSize: 100,
    },
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">All Employees</h1>
            <p className="text-slate-600">Manage and view all employee records</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-md border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                📊 Grid
              </button>
              <button
                onClick={() => setViewMode('tile')}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                  viewMode === 'tile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                🎴 Tile
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-600 font-semibold">Error: {error.message}</p>
          </div>
        )}

        {data && !loading && (
          <>
            <div className="text-sm text-slate-600">
              Showing {data.employees.employees.length} of {data.employees.totalCount} employees
            </div>
            {viewMode === 'grid' ? (
              <EmployeeGridView
                employees={data.employees.employees}
                onEmployeeClick={handleEmployeeClick}
              />
            ) : (
              <EmployeeTileView
                employees={data.employees.employees}
                onEmployeeClick={handleEmployeeClick}
                onEdit={user?.role === 'ADMIN' ? handleEdit : undefined}
                onFlag={handleFlag}
                onDelete={user?.role === 'ADMIN' ? handleDelete : undefined}
              />
            )}
          </>
        )}

        {selectedEmployee && (
          <EmployeeDetailView
            employee={selectedEmployee}
            onClose={handleCloseDetail}
            onEdit={user?.role === 'ADMIN' ? handleEdit : undefined}
            onFlag={handleFlag}
            onDelete={user?.role === 'ADMIN' ? handleDelete : undefined}
          />
        )}
      </div>
    </Layout>
  );
}

