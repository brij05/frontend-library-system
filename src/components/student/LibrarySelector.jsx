import React from 'react';
import { Building2 } from 'lucide-react';

const LibrarySelector = ({
  libraries,
  selectedLibrary,
  setSelectedLibrary,
  setSelectedFacility,
  setSelectedTimeSlot
}) => {
  const handleSelect = (libId) => {
    console.log('🏛️ Library selected:', libId);
    setSelectedLibrary(libId);
    setSelectedFacility(null);
    setSelectedTimeSlot(null);
  };

  console.log('📚 LibrarySelector - libraries prop:', libraries);

  if (!libraries) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-indigo-600" />
          Step 1: Select Library
        </h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading libraries...</p>
        </div>
      </div>
    );
  }

  if (libraries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-indigo-600" />
          Step 1: Select Library
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">No libraries available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-indigo-600" />
        Step 1: Select Library
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {libraries.map(lib => {
         
          const libraryId = lib._id || lib.id;
          
          return (
            <button
              key={libraryId}
              onClick={() => handleSelect(libraryId)}
              className={`p-4 rounded-lg border-2 transition ${
                selectedLibrary === libraryId
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="font-semibold text-lg">{lib.name}</div>
              <div className="text-sm text-gray-600 mt-2">
                {lib.hasAC && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-xs">
                    AC Available
                  </span>
                )}
                {lib.hasNonAC && (
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Non-AC Available
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LibrarySelector;