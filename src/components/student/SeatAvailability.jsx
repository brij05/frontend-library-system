import React from 'react';
import { Phone } from 'lucide-react';
import SeatMapVisual from './SeatMapVisual';
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const SeatAvailability = ({
  availableSeats,
  fee,
  library,
  loading,
  libraryId,
  facilityType
}) => {
  return (
    <div className="space-y-8">
     
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Seat Availability & Payment
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">
              Loading seat availability...
            </p>
          </div>
        ) : (
          <>
            {/* Seat Count */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {availableSeats.length}
                </div>
                <div className="text-gray-700 font-semibold">
                  Seats Available
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-4">
                Monthly Fee: ₹{fee}
              </h3>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-3">
                  Payment Instructions:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Scan the QR code below to pay via Paytm</li>
                  <li>Take a screenshot of the payment confirmation</li>
                  <li>
                    Send the screenshot to WhatsApp:{' '}
                    <span className="font-semibold">
                      {library.whatsapp}
                    </span>
                  </li>
                  <li>Admin will verify and assign your seat</li>
                </ol>
              </div>

              {/* Payment QR */}
              
              <div className="text-center">
                <img
                 src={`${BACKEND_BASE_URL}${library.paytmQR}`} 
                  alt="Paytm QR"
                  className="mx-auto mb-4 w-80 h-80 object-contain border-4 border-gray-300 rounded-lg"
                />

                <a
                  href={`https://wa.me/${library.whatsapp.replace(
                    /[^0-9]/g,
                    ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Send Payment Screenshot on WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </div>

   
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Seat Layout
        </h2>

        <SeatMapVisual
          libraryId={libraryId}
          facilityType={facilityType}
        />
      </div>
    </div>
  );
};

export default SeatAvailability;
