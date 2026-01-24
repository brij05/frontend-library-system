import React, { useState } from 'react';
import { Building2, LogOut } from 'lucide-react';
import StatsCards from './admin/StatsCards';
import AssignSeatTabAPI from './admin/AssignSeatTab';
import ManageStudentsTabAPI from './admin/ManageStudentsTab';
import PaymentTrackingTabAPI from './admin/PaymentTrackingTab';
import AuthService from '../services/auth.service';

const AdminDashboard = ({
  libraries,
  seats,
  timeSlots,
  students,
  pricing,
  setView,
  setIsAdmin,
  onRefreshSeats,
  onRefreshStudents
}) => {
  const [activeTab, setActiveTab] = useState('assign');

  const handleLogout = () => {
    AuthService.logout();
    setIsAdmin(false);
    setView('landing');
  };

  const handleAssignSuccess = () => {
    onRefreshSeats();
    onRefreshStudents();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <StatsCards
          activeStudents={students.filter(s => s.isActive)}
          seats={seats}
        />

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('assign')}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                  activeTab === 'assign'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Assign Seat
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                  activeTab === 'students'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Manage Students
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                  activeTab === 'payments'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Payment Tracking
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'assign' && (
              <AssignSeatTabAPI
                libraries={libraries}
                timeSlots={timeSlots}
                pricing={pricing}
                onSuccess={handleAssignSuccess}
              />
            )}

            {activeTab === 'students' && (
              <ManageStudentsTabAPI
                libraries={libraries}
                students={students}
                onRefresh={onRefreshStudents}
              />
            )}

            {activeTab === 'payments' && (
              <PaymentTrackingTabAPI
                students={students}
                onRefresh={onRefreshStudents}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;