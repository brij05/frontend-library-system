import React, { useState } from 'react';
import StudentService from '../../services/student.service.js';
import SeatService from '../../services/seat.service.js';

const AssignSeatTabAPI = ({
  libraries,
  timeSlots,
  pricing,
  onSuccess
}) => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    libraryId: '',
    facilityType: '',
    timeSlot: '',
    seatNumber: '',
    joinDate: new Date().toISOString().split('T')[0]
  });
  
  const [availableSeats, setAvailableSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableSeats = async (libraryId, facilityType) => {
    if (!libraryId || !facilityType) return;
    
    try {
      const seats = await SeatService.getAvailableSeats(libraryId, facilityType);
      setAvailableSeats(seats);
    } catch (error) {
      console.error('Error fetching available seats:', error);
      alert('Failed to fetch available seats');
    }
  };

  const handleAssignSeat = async () => {
    if (!newStudent.name || !newStudent.phone || !newStudent.libraryId || 
        !newStudent.facilityType || !newStudent.seatNumber) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      let baseFee = pricing[newStudent.libraryId][newStudent.facilityType];
      
      if (newStudent.timeSlot && newStudent.facilityType === 'Non-AC') {
        const slot = timeSlots.find(ts => ts.label === newStudent.timeSlot);
        if (slot) baseFee = slot.monthlyFee;
      }

      const studentData = {
        name: newStudent.name,
        phone: newStudent.phone,
        libraryId: newStudent.libraryId,
        seatNumber: newStudent.seatNumber,
        facilityType: newStudent.facilityType,
        timeSlot: newStudent.timeSlot || undefined,
        joinDate: newStudent.joinDate,
        baseFee: baseFee
      };

      await StudentService.assignSeat(studentData);

      setNewStudent({
        name: '',
        phone: '',
        libraryId: '',
        facilityType: '',
        timeSlot: '',
        seatNumber: '',
        joinDate: new Date().toISOString().split('T')[0]
      });
      setAvailableSeats([]);

      alert('Seat assigned successfully!');
      
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error('Error assigning seat:', error);
      alert(error.message || 'Failed to assign seat');
    } finally {
      setLoading(false);
    }
  };

  const handleLibraryChange = (libraryId) => {
    setNewStudent({ 
      ...newStudent, 
      libraryId, 
      facilityType: '', 
      timeSlot: '', 
      seatNumber: '' 
    });
    setAvailableSeats([]);
  };

  const handleFacilityChange = (facilityType) => {
    setNewStudent({ ...newStudent, facilityType, timeSlot: '', seatNumber: '' });
    fetchAvailableSeats(newStudent.libraryId, facilityType);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Assign New Seat</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Student Name *</label>
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number *</label>
          <input
            type="tel"
            value={newStudent.phone}
            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
            placeholder="+91-XXXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Library *</label>
          <select
            value={newStudent.libraryId}
            onChange={(e) => handleLibraryChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
          >
            <option value="">Select library</option>
            {libraries.map(lib => (
              <option key={lib._id} value={lib._id}>{lib.name}</option>
            ))}
          </select>
        </div>

        {newStudent.libraryId && (
          <div>
            <label className="block text-sm font-semibold mb-2">Facility Type *</label>
            <select
              value={newStudent.facilityType}
              onChange={(e) => handleFacilityChange(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
            >
              <option value="">Select facility</option>
              {libraries.find(l => l._id === newStudent.libraryId)?.hasAC && (
                <option value="AC">AC</option>
              )}
              {libraries.find(l => l._id === newStudent.libraryId)?.hasNonAC && (
                <option value="Non-AC">Non-AC</option>
              )}
            </select>
          </div>
        )}

        {newStudent.libraryId && newStudent.facilityType === 'Non-AC' && 
         libraries.find(l => l._id === newStudent.libraryId)?.hasTimeBased && (
          <div>
            <label className="block text-sm font-semibold mb-2">Time Slot</label>
            <select
              value={newStudent.timeSlot}
              onChange={(e) => setNewStudent({ ...newStudent, timeSlot: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
            >
              <option value="">Select time slot</option>
              {timeSlots.filter(ts => ts.libraryId._id === newStudent.libraryId).map(slot => (
                <option key={slot._id} value={slot.label}>{slot.label} - ₹{slot.monthlyFee}/month</option>
              ))}
            </select>
          </div>
        )}

        {newStudent.libraryId && newStudent.facilityType && (
          <div>
            <label className="block text-sm font-semibold mb-2">Seat Number *</label>
            <select
              value={newStudent.seatNumber}
              onChange={(e) => setNewStudent({ ...newStudent, seatNumber: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
            >
              <option value="">Select seat</option>
              {availableSeats.map(seat => (
                <option key={seat._id} value={seat.seatNumber}>{seat.seatNumber}</option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-1">
              {availableSeats.length} seats available
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Join Date *</label>
          <input
            type="date"
            value={newStudent.joinDate}
            onChange={(e) => setNewStudent({ ...newStudent, joinDate: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <button
          onClick={handleAssignSeat}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Assigning...' : 'Assign Seat'}
        </button>
      </div>
    </div>
  );
};

export default AssignSeatTabAPI;