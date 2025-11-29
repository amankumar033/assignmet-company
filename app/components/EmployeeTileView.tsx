'use client';

import { useState } from 'react';
import { Employee } from '../types';

interface EmployeeTileViewProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
  onEdit?: (employee: Employee) => void;
  onFlag?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
}

export default function EmployeeTileView({
  employees,
  onEmployeeClick,
  onEdit,
  onFlag,
  onDelete,
}: EmployeeTileViewProps) {
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee, index) => (
        <div
          key={employee.id}
          className="relative group card-float cursor-pointer overflow-hidden"
          onClick={() => onEmployeeClick(employee)}
          onMouseEnter={() => setHoveredTile(employee.id)}
          onMouseLeave={() => {
            setHoveredTile(null);
            setShowMenu(null);
          }}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-slate-50/0 group-hover:bg-slate-50/50 transition-all duration-300" />

          {/* Action button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(showMenu === employee.id ? null : employee.id);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft hover:bg-blue-50 hover:border-2 hover:border-blue-200 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-soft-lg text-gray-600 hover:text-blue-600"
            >
              <span className="text-xl">⋯</span>
            </button>

            {/* Dropdown menu */}
            {showMenu === employee.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20 animate-fade-in">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(employee);
                      setShowMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                )}
                {onFlag && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFlag(employee);
                      setShowMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>🚩</span>
                    <span>Flag</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(employee);
                      setShowMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 relative z-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-soft group-hover:bg-blue-600 transition-all duration-300">
                {employee.name.charAt(0)}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  employee.attendance >= 90
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : employee.attendance >= 75
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {employee.attendance}%
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Age: {employee.age}</p>
            <p className="text-sm font-semibold text-blue-600 mb-4">{employee.class}</p>

            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">Subjects:</p>
              <div className="flex flex-wrap gap-2">
                {employee.subjects.slice(0, 2).map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors duration-200 border border-slate-200"
                  >
                    {subject}
                  </span>
                ))}
                {employee.subjects.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    +{employee.subjects.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom border effect */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      ))}
    </div>
  );
}

