import React from 'react';
import { Users, Settings } from 'lucide-react';

const LandingPage = ({ setView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          

          <img
            src="/logo.png"
            alt="Library Logo"
            className="w-20 h-20 mx-auto mb-4 object-contain"
          />

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome To First Digital Library
          </h1>
          <p className="text-gray-600">
            Choose your seat, time slot, and start studying today
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setView('student')}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            Check Seat Availability
          </button>

          <button
            onClick={() => setView('admin')}
            className="w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
