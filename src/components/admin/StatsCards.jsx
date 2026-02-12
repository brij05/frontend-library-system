import React from 'react';
import { Users, Armchair, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';

const StatsCards = ({ activeStudents, seats }) => {
  const duePayments = activeStudents.filter(s => s.paymentStatus === 'DUE');
  
  // Calculate total monthly revenue (from PAID students only)
  const paidStudents = activeStudents.filter(s => s.paymentStatus === 'PAID');
  const monthlyRevenue = paidStudents.reduce((total, student) => {
    return total + (student.monthlyFee || 0);
  }, 0);

  // Calculate potential revenue (including DUE payments)
  const potentialRevenue = activeStudents.reduce((total, student) => {
    return total + (student.monthlyFee || 0);
  }, 0);

  const dueAmount = potentialRevenue - monthlyRevenue;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* Monthly Revenue Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-green-100 text-sm font-medium">Monthly Revenue</div>
            <div className="text-3xl font-bold mt-1">₹{monthlyRevenue.toLocaleString()}</div>
          </div>
          <TrendingUp className="w-12 h-12 text-green-200 opacity-50" />
        </div>
        <div className="text-green-100 text-xs mt-2">
          From {paidStudents.length} paid students
        </div>
      </div>

      {/* Active Students */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Active Students</div>
            <div className="text-3xl font-bold text-indigo-600">{activeStudents.length}</div>
          </div>
          <Users className="w-12 h-12 text-indigo-600 opacity-20" />
        </div>
      </div>
      
      {/* Total Seats */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Total Seats</div>
            <div className="text-3xl font-bold text-blue-600">{seats.length}</div>
          </div>
          <Armchair className="w-12 h-12 text-blue-600 opacity-20" />
        </div>
      </div>
      
      {/* Available Seats */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Available Seats</div>
            <div className="text-3xl font-bold text-green-600">{seats.filter(s => !s.isBooked).length}</div>
          </div>
          <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
        </div>
      </div>
      
      {/* Due Payments */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Due Payments</div>
            <div className="text-3xl font-bold text-red-600">{duePayments.length}</div>
            <div className="text-xs text-red-600 mt-1">₹{dueAmount.toLocaleString()} pending</div>
          </div>
          <DollarSign className="w-12 h-12 text-red-600 opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;