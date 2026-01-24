import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import LibrarySelector from './student/LibrarySelector';
import FacilitySelector from './student/FacilitySelector';
import TimeSlotSelector from './student/TimeSlotSelector';
import SeatAvailability from './student/SeatAvailability';
import SeatService from '../services/seat.service';

const StudentFlow = ({
  libraries,
  timeSlots,
  pricing,
  selectedLibrary,
  setSelectedLibrary,
  selectedFacility,
  setSelectedFacility,
  selectedTimeSlot,
  setSelectedTimeSlot,
  setView
}) => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [loading, setLoading] = useState(false);


  const library =
    selectedLibrary && Array.isArray(libraries)
      ? libraries.find(
          l => l._id === selectedLibrary || l.id === selectedLibrary
        )
      : null;

  useEffect(() => {
    if (!selectedLibrary || !selectedFacility) return;


    if (selectedFacility === 'Non-AC' && !selectedTimeSlot) {
      setAvailableSeats([]);
      return;
    }

    const loadSeats = async () => {
      setLoading(true);
      try {
        console.log('🔍 Fetching seats:', {
          selectedLibrary,
          selectedFacility,
          selectedTimeSlot
        });

        const seats = await SeatService.getAvailableSeats(
          selectedLibrary,
          selectedFacility,
          selectedTimeSlot
        );

        console.log('💺 Seats fetched:', seats);
        setAvailableSeats(seats || []);
      } catch (error) {
        console.error('❌ Error fetching seats:', error);
        setAvailableSeats([]);
      } finally {
        setLoading(false);
      }
    };

    loadSeats();
  }, [selectedLibrary, selectedFacility, selectedTimeSlot]);

  let fee = 0;

  if (library && selectedFacility && pricing) {
    const libraryId = library._id || library.id;

    
    fee = pricing[libraryId]?.[selectedFacility] || 0;

    
    if (
      selectedFacility === 'Non-AC' &&
      selectedTimeSlot &&
      Array.isArray(timeSlots)
    ) {
      const slot = timeSlots.find(
        ts => ts.label === selectedTimeSlot
      );

      fee = slot?.monthlyFee || 0;
    }
  }

  const handleReset = () => {
    setView('landing');
    setSelectedLibrary(null);
    setSelectedFacility(null);
    setSelectedTimeSlot(null);
    setAvailableSeats([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          <h1 className="text-xl font-bold">Book Your Seat</h1>
          <button
            onClick={handleReset}
            className="hover:text-indigo-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Step 1: Select Library */}
        <LibrarySelector
          libraries={libraries}
          selectedLibrary={selectedLibrary}
          setSelectedLibrary={setSelectedLibrary}
          setSelectedFacility={setSelectedFacility}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />

        {/* Step 2: Select Facility */}
        {selectedLibrary && library && (
          <FacilitySelector
            library={library}
            pricing={pricing}
            selectedLibrary={selectedLibrary}
            selectedFacility={selectedFacility}
            setSelectedFacility={setSelectedFacility}
            setSelectedTimeSlot={setSelectedTimeSlot}
          />
        )}

        {/* Step 3: Select Time Slot (Non-AC only) */}
        {selectedLibrary &&
          selectedFacility === 'Non-AC' &&
          library?.hasTimeBased && (
            <TimeSlotSelector
              timeSlots={timeSlots.filter(ts => {
                const tsLibId =
                  ts.libraryId?._id || ts.libraryId;
                return tsLibId === selectedLibrary;
              })}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
            />
          )}

        {/* Step 4: Seat Availability + Seat Map */}
        {selectedLibrary &&
          selectedFacility &&
          (selectedFacility === 'AC' ||
            (selectedFacility === 'Non-AC' &&
              selectedTimeSlot)) && (
            <SeatAvailability
              availableSeats={availableSeats}
              fee={fee}
              library={library}
              loading={loading}
              libraryId={selectedLibrary}
              facilityType={selectedFacility}
            />
          )}
      </div>
    </div>
  );
};

export default StudentFlow;
