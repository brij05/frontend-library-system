import React, { useState, useEffect, useMemo } from 'react';
import { Armchair, CheckCircle, XCircle } from 'lucide-react';
import seatService from '../../services/seat.service';

const SeatMapVisual = ({ libraryId, facilityType }) => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!libraryId || !facilityType) {
      setSeats([]);
      setLoading(false);
      return;
    }
    fetchSeats();
  }, [libraryId, facilityType]);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const allSeats = await seatService.getAllSeats({ libraryId, facilityType });

      const sortedSeats = Array.isArray(allSeats)
        ? [...allSeats].sort((a, b) => {
            const labelA = String(a.seatNumber || a.seatNo || a.number || "");
            const labelB = String(b.seatNumber || b.seatNo || b.number || "");
            return labelA.localeCompare(labelB, undefined, { 
              numeric: true, 
              sensitivity: 'base' 
            });
          })
        : [];

      setSeats(sortedSeats);
    } catch (error) {
      console.error('❌ Error fetching seats:', error);
      setSeats([]);
    } finally {
      setLoading(false);
    }
  };

  const isSeatBooked = (seat) => seat.isBooked || seat.isOccupied || false;

  const { availableCount, bookedCount } = useMemo(() => {
    const booked = seats.filter(isSeatBooked).length;
    return {
      bookedCount: booked,
      availableCount: seats.length - booked
    };
  }, [seats]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Seat Map</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading seat map...</p>
        </div>
      </div>
    );
  }

  if (!seats.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Seat Map</h2>
        <p className="text-gray-500 text-center py-12">No seats found for this selection</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Armchair className="w-6 h-6 text-indigo-600" />
          Seat Map – {facilityType}
        </h2>

        <div className="flex gap-4 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span>Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <span>Occupied ({bookedCount})</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 sm:p-8 rounded-xl border border-gray-100 overflow-x-auto">
        <div 
          className="grid gap-3 sm:gap-4 mx-auto"
          style={{ 
            gridTemplateColumns: `repeat(10, minmax(60px, 1fr))`,
            minWidth: '650px' 
          }}
        >
          {seats.map((seat) => {
            const booked = isSeatBooked(seat);
            const seatLabel = seat.seatNumber || seat.seatNo || seat.number || '—';

            return (
              <div
                key={seat._id || seat.id}
                className={`relative aspect-square rounded-lg flex items-center justify-center 
                  font-bold text-white shadow-sm transition-all duration-200
                  ${booked 
                    ? 'bg-red-500 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 hover:scale-105 cursor-pointer shadow-md'
                  }
                `}
                title={`Seat ${seatLabel}: ${booked ? 'Occupied' : 'Available'}`}
              >
                <span className="text-base sm:text-lg">{seatLabel}</span>
         
                <div className="absolute -top-1 -right-1">
                  {booked ? (
                    <XCircle className="w-4 h-4 text-white bg-red-700 rounded-full border border-white" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-white bg-green-700 rounded-full border border-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-green-600">{availableCount}</div>
          <p className="text-xs uppercase tracking-widest font-bold text-green-700 mt-1">Available Seats</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-red-600">{bookedCount}</div>
          <p className="text-xs uppercase tracking-widest font-bold text-red-700 mt-1">Occupied Seats</p>
        </div>
      </div>
    </div>
  );
};

export default SeatMapVisual;