import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import LibrarySelector from "./student/LibrarySelector";
import FacilitySelector from "./student/FacilitySelector";
import TimeSlotSelector from "./student/TimeSlotSelector";
import SeatAvailability from "./student/SeatAvailability";
import SeatService from "../services/seat.service";

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

  const facilityRef = useRef(null);
  const timeSlotRef = useRef(null);
  const seatRef = useRef(null);

  const library =
    selectedLibrary && Array.isArray(libraries)
      ? libraries.find(
          (l) => l._id === selectedLibrary || l.id === selectedLibrary
        )
      : null;

  useEffect(() => {
    const loadSeats = async () => {
      if (selectedLibrary && selectedFacility) {
        setLoading(true);
        try {
          const seats = await SeatService.getAvailableSeats(
            selectedLibrary,
            selectedFacility
          );
          setAvailableSeats(seats || []);
        } catch (error) {
          console.error("❌ Error fetching seats:", error);
          setAvailableSeats([]);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSeats();
  }, [selectedLibrary, selectedFacility]);

  useEffect(() => {
    if (selectedLibrary && facilityRef.current) {
      facilityRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedLibrary]);


  useEffect(() => {
    if (selectedFacility && timeSlotRef.current) {
      timeSlotRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedFacility]);

  
  useEffect(() => {
    if (
      (selectedFacility === "AC" ||
        (selectedFacility === "Non-AC" && selectedTimeSlot)) &&
      seatRef.current
    ) {
      seatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedFacility, selectedTimeSlot]);


  let fee = 0;

  if (library && selectedFacility && pricing) {
    const libraryId = library._id || library.id;
    fee = pricing[libraryId]?.[selectedFacility] || 0;

    if (selectedFacility === "Non-AC" && selectedTimeSlot) {
      const slot = timeSlots.find(
        (ts) => ts.label === selectedTimeSlot
      );
      if (slot) fee = slot.monthlyFee;
    }
  }

  const handleReset = () => {
    setView("landing");
    setSelectedLibrary(null);
    setSelectedFacility(null);
    setSelectedTimeSlot(null);
    setAvailableSeats([]);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Book Your Seat</h1>
          <button
            onClick={handleReset}
            className="text-white hover:text-indigo-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* LIBRARY */}
        <LibrarySelector
          libraries={libraries}
          selectedLibrary={selectedLibrary}
          setSelectedLibrary={setSelectedLibrary}
          setSelectedFacility={setSelectedFacility}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />

        {/* FACILITY */}
        {selectedLibrary && library && (
          <div ref={facilityRef}>
            <FacilitySelector
              library={library}
              pricing={pricing}
              selectedLibrary={selectedLibrary}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              setSelectedTimeSlot={setSelectedTimeSlot}
            />
          </div>
        )}

        {/* TIME SLOT */}
        {selectedLibrary &&
          selectedFacility === "Non-AC" &&
          library?.hasTimeBased && (
            <div ref={timeSlotRef}>
              <TimeSlotSelector
                timeSlots={timeSlots.filter((ts) => {
                  const tsLibId = ts.libraryId?._id || ts.libraryId;
                  return tsLibId === selectedLibrary;
                })}
                selectedLibrary={selectedLibrary}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
              />
            </div>
          )}

        {/* SEAT AVAILABILITY */}
        {selectedLibrary &&
          selectedFacility &&
          (!library?.hasTimeBased ||
            selectedFacility === "AC" ||
            selectedTimeSlot) && (
            <div ref={seatRef}>
              <SeatAvailability
                availableSeats={availableSeats}
                fee={fee}
                library={library}
                loading={loading}
                libraryId={selectedLibrary}
                facilityType={selectedFacility}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default StudentFlow;
