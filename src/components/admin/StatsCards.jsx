import React from 'react';
import { Users, Armchair, CheckCircle, DollarSign } from 'lucide-react';

const StatsCards = ({ activeStudents, seats }) => {
  const duePayments = activeStudents.filter(s => s.paymentStatus === 'DUE');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Active Students</div>
            <div className="text-3xl font-bold text-indigo-600">{activeStudents.length}</div>
          </div>
          <Users className="w-12 h-12 text-indigo-600 opacity-20" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Total Seats</div>
            <div className="text-3xl font-bold text-blue-600">{seats.length}</div>
          </div>
          <Armchair className="w-12 h-12 text-blue-600 opacity-20" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Available Seats</div>
            <div className="text-3xl font-bold text-green-600">{seats.filter(s => !s.isBooked).length}</div>
          </div>
          <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-sm">Due Payments</div>
            <div className="text-3xl font-bold text-red-600">{duePayments.length}</div>
          </div>
          <DollarSign className="w-12 h-12 text-red-600 opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;