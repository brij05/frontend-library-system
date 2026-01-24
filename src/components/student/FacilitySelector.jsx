import React from 'react';
import { Armchair } from 'lucide-react';

const FacilitySelector = ({
  library,
  pricing,
  selectedLibrary,
  selectedFacility,
  setSelectedFacility,
  setSelectedTimeSlot
}) => {
  

  if (!library || !pricing || !pricing[selectedLibrary]) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gray-100 rounded"></div>
          <div className="h-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Armchair className="w-6 h-6 text-indigo-600" />
        Step 2: Select Facility
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        {library?.hasAC && (
          <button
            onClick={() => {
              setSelectedFacility('AC');
              setSelectedTimeSlot(null);
            }}
            className={`p-4 rounded-lg border-2 transition ${
              selectedFacility === 'AC'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="font-semibold">AC Facility</div>
            <div className="text-2xl font-bold text-indigo-600 mt-2">
              
              ₹{pricing[selectedLibrary]?.AC || '0'}/month
            </div>
          </button>
        )}
        
        {library?.hasNonAC && (
          <button
            onClick={() => setSelectedFacility('Non-AC')}
            className={`p-4 rounded-lg border-2 transition ${
              selectedFacility === 'Non-AC'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="font-semibold">Non-AC Facility</div>
            <div className="text-2xl font-bold text-green-600 mt-2">
             
              ₹{pricing[selectedLibrary]?.['Non-AC'] || '0'}/month
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default FacilitySelector;