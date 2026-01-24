import React, { useState } from 'react';
import StudentService from '../../services/student.service';

const PaymentTrackingTabAPI = ({ students, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const updatePaymentStatus = async (studentId, status) => {
    setLoading(true);
    try {
      await StudentService.updatePaymentStatus(studentId, status);
      alert('Payment status updated successfully!');
      if (onRefresh) onRefresh();
    } catch (error) {
      alert(error.message || 'Failed to update payment status');
    } finally {
      setLoading(false);
    }
  };

  const activeStudents = students.filter(s => s.isActive);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment Tracking</h2>
      
      <div className="mb-4 flex gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1">
          <div className="text-sm text-gray-600">Paid Students</div>
          <div className="text-2xl font-bold text-green-600">
            {activeStudents.filter(s => s.paymentStatus === 'PAID').length}
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex-1">
          <div className="text-sm text-gray-600">Due Payments</div>
          <div className="text-2xl font-bold text-red-600">
            {activeStudents.filter(s => s.paymentStatus === 'DUE').length}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Monthly Fee</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Payment Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {activeStudents.map(student => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3 text-sm">{student.phone}</td>
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePaymentStatus(student._id, 'PAID')}
                      disabled={loading}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() => updatePaymentStatus(student._id, 'DUE')}
                      disabled={loading}
                      className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition disabled:bg-gray-400"
                    >
                      Mark Due
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTrackingTabAPI;