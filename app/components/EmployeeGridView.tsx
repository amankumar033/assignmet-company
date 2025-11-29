'use client';

import { Employee } from '../types';

interface EmployeeGridViewProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  onFlag?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
}

export default function EmployeeGridView({
  employees,
  onEmployeeClick,
  onEdit,
  onFlag,
  onDelete,
}: EmployeeGridViewProps) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-soft-lg rounded-2xl">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject 1
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject 2
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject 3
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {(onEdit || onFlag || onDelete) && (
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {employees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="transition-all duration-300 ease-out hover:bg-blue-50/60 group cursor-pointer hover:-translate-y-1 hover:shadow-soft-lg hover:border hover:border-blue-200/80"
                  onClick={() => onEmployeeClick(employee)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-800">
                    {employee.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1.5 inline-flex text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-100 group-hover:shadow-soft transition-all duration-300">
                      {employee.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-800">
                    {employee.subjects[0] || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-800">
                    {employee.subjects[1] || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-800">
                    {employee.subjects[2] || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-semibold group-hover:text-gray-900">{employee.attendance}%</span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            employee.attendance >= 90
                              ? 'bg-green-500'
                              : employee.attendance >= 75
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${employee.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-lg ${
                        employee.attendance >= 90
                          ? 'bg-green-50 text-green-700 group-hover:bg-green-100'
                          : employee.attendance >= 75
                          ? 'bg-yellow-50 text-yellow-700 group-hover:bg-yellow-100'
                          : 'bg-red-50 text-red-700 group-hover:bg-red-100'
                      } group-hover:shadow-soft transition-all duration-300`}
                    >
                      {employee.attendance >= 90 ? 'Excellent' : employee.attendance >= 75 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                  {(onEdit || onFlag || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(employee);
                            }}
                            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                          >
                            Edit
                          </button>
                        )}
                        {onFlag && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onFlag(employee);
                            }}
                            className="text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium"
                          >
                            Flag
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(employee);
                            }}
                            className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
