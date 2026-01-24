import React, { useState } from 'react';
import StudentService from '../../services/student.service';
import ConfirmDialog from '../common/ConfirmDialog';

const ManageStudentsTabAPI = ({ libraries, students, onRefresh }) => {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, studentId: null });
  const [loading, setLoading] = useState(false);

  const handleReleaseSeat = async (studentId) => {
    setConfirmDialog({ isOpen: true, studentId });
  };

  const confirmRelease = async () => {
    setLoading(true);
    try {
      await StudentService.releaseSeat(confirmDialog.studentId);
      alert('Seat released successfully!');
      setConfirmDialog({ isOpen: false, studentId: null });
      if (onRefresh) onRefresh();
    } catch (error) {
      alert(error.message || 'Failed to release seat');
    } finally {
      setLoading(false);
    }
  };

  const activeStudents = students.filter(s => s.isActive);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Students</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Library</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Seat</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Facility</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Fee</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {activeStudents.map(student => {
              const lib = libraries.find(l => l._id === student.libraryId?._id || l._id === student.libraryId);
              return (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3 text-sm">{student.phone}</td>
                  <td className="px-4 py-3 text-sm">{lib?.name || student.libraryId?.name}</td>
                  <td className="px-4 py-3 font-semibold">{student.seatNumber}</td>
                  <td className="px-4 py-3 text-sm">{student.facilityType}</td>
                  <td className="px-4 py-3 font-semibold">₹{student.monthlyFee}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      student.paymentStatus === 'PAID' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleReleaseSeat(student._id)}
                      disabled={loading}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition disabled:bg-gray-400"
                    >
                      Release
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {activeStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No active students found
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Release Seat"
        message="Are you sure you want to release this seat? This action cannot be undone."
        onConfirm={confirmRelease}
        onCancel={() => setConfirmDialog({ isOpen: false, studentId: null })}
        type="danger"
      />
    </div>
  );
};

export default ManageStudentsTabAPI;