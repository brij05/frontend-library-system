import React from 'react';
import  {MapPin}  from 'lucide-react';

const LibrarySelector = ({
  libraries,
  selectedLibrary,
  setSelectedLibrary,
  setSelectedFacility,
  setSelectedTimeSlot
}) => {
  const handleSelect = (libraryId) => {
    setSelectedLibrary(libraryId);
    setSelectedFacility(null);
    setSelectedTimeSlot(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
         <img
            src="/logo.png"
            alt="Library Logo"
            className="w-6 h-6 object-contain"
          />

        Step 1: Select Library
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {libraries.map((library) => {
          const isSelected =
            selectedLibrary === library._id ||
            selectedLibrary === library.id;

          return (
            <div
              key={library._id || library.id}
              onClick={() => handleSelect(library._id || library.id)}
              className={`cursor-pointer border-2 rounded-lg p-4 transition
                ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              {/* Library Name */}
              <h3 className="text-lg font-bold mb-1">
                {library.name}
              </h3>

              {/* 📍 Library Address */}
              {library.address && (
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {library.address}
                </p>
              )}

              {/* Facility Badges */}
              <div className="flex gap-2 flex-wrap">
                {library.hasAC && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    AC Available
                  </span>
                )}
                {library.hasNonAC && (
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Non-AC Available
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibrarySelector;
