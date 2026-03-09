import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { employees } from '../utils/employeeData';

export default function Directory({ onViewProfile }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = [...new Set(employees.map(e => e.department))];

  let filteredEmployees = employees;

  if (selectedDepartment) {
    filteredEmployees = filteredEmployees.filter(e => e.department === selectedDepartment);
  }

  if (searchTerm) {
    filteredEmployees = filteredEmployees.filter(e =>
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-6xl font-bold text-slate-900 mb-3">Directory</h1>
        <p className="text-xl text-slate-600 mb-8">Connect with {employees.length} colleagues</p>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6"
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedDepartment(null)}
              className={`px-5 py-2.5 rounded-xl font-semibold ${
                !selectedDepartment ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              All Departments
            </button>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-5 py-2.5 rounded-xl font-semibold ${
                  selectedDepartment === dept ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <p className="text-lg text-slate-600 mb-6">
          Showing {filteredEmployees.length} employees
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={employee.avatar}
                  alt={employee.firstName}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-slate-600">{employee.level}</p>
                  <p className="text-xs text-slate-500">{employee.team}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                  {employee.department}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-4">{employee.email}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${employee.isOnline ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                <span className="text-sm text-slate-600">
                  {employee.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              <button 
                onClick={() => onViewProfile(employee.id)}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}