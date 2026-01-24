import React from 'react';
import { Clock } from 'lucide-react';

const TimeSlotSelector = ({
  timeSlots,
  selectedTimeSlot,
  setSelectedTimeSlot
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Clock className="w-6 h-6 text-indigo-600" />
        Step 3: Select Time Slot
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timeSlots.map(slot => (
          <button
            key={slot._id || slot.id}   
            onClick={() => setSelectedTimeSlot(slot.label)}
            className={`p-4 rounded-lg border-2 transition ${
              selectedTimeSlot === slot.label
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="font-semibold">{slot.label}</div>
            <div className="text-2xl font-bold text-indigo-600 mt-2">
              ₹{slot.monthlyFee}/month
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
