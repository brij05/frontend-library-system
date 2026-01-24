import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const AdminLogin = ({ setView, setIsAdmin }) => {
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setView('admin-dashboard');
      setAdminPassword('');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Settings className="w-16 h-16 mx-auto text-gray-800 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter your password to continue</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
          />
          
          <button
            onClick={handleAdminLogin}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
          
          <button
            onClick={() => setView('landing')}
            className="w-full text-gray-600 hover:text-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
        
       
      </div>
    </div>
  );
};

export default AdminLogin;
