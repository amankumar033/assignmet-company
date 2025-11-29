'use client';

import { Employee } from '../types';

interface EmployeeDetailViewProps {
  employee: Employee;
  onClose: () => void;
  onEdit?: (employee: Employee) => void;
  onFlag?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
}

export default function EmployeeDetailView({
  employee,
  onClose,
  onEdit,
  onFlag,
  onDelete,
}: EmployeeDetailViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="relative bg-slate-800 p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            ✕
          </button>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white/30">
              {employee.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{employee.name}</h2>
              <p className="text-white/90 text-lg">{employee.class}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover-lift transition-shadow duration-200">
              <p className="text-sm text-gray-600 mb-1">Age</p>
              <p className="text-2xl font-bold text-gray-900">{employee.age} years</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover-lift transition-shadow duration-200">
              <p className="text-sm text-gray-600 mb-1">Attendance</p>
              <div className="flex items-center space-x-3">
                <p className="text-2xl font-bold text-gray-900">{employee.attendance}%</p>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
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
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📚</span>
              Subjects
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {employee.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 hover-lift transition-all duration-200"
                >
                  <p className="font-semibold text-gray-800">{subject}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Performance Status
            </h3>
            <div
              className={`p-4 rounded-xl ${
                employee.attendance >= 90
                  ? 'bg-green-50 border-2 border-green-200'
                  : employee.attendance >= 75
                  ? 'bg-yellow-50 border-2 border-yellow-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <p className="font-semibold text-gray-800">
                {employee.attendance >= 90
                  ? 'Excellent Performance'
                  : employee.attendance >= 75
                  ? 'Good Performance'
                  : 'Needs Improvement'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Attendance rate of {employee.attendance}% indicates{' '}
                {employee.attendance >= 90
                  ? 'outstanding commitment and reliability.'
                  : employee.attendance >= 75
                  ? 'consistent participation.'
                  : 'areas for improvement in attendance.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          {(onEdit || onFlag || onDelete) && (
            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              {onEdit && (
                <button
                  onClick={() => onEdit(employee)}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-soft hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-soft-xl"
                >
                  ✏️ Edit
                </button>
              )}
              {onFlag && (
                <button
                  onClick={() => onFlag(employee)}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold shadow-soft hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-soft-xl"
                >
                  🚩 Flag
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(employee)}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-soft hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-soft-xl"
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-colors duration-200"
          >
            ← Back to View
          </button>
        </div>
      </div>
    </div>
  );
}

