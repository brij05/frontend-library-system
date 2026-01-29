import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import SeatMapVisual from './SeatMapVisual';

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
             <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Seat Layout
        </h2>

        <SeatMapVisual
          libraryId={libraryId}
          facilityType={facilityType}
        />
      </div>

            {/* Payment Info */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-4">
                Monthly Fee: ₹{fee}
              </h3>
<div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
  <h4 className="mb-3 font-semibold text-gray-900">
    Please follow these steps to register and secure your seat:
  </h4>

  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-800">
    
    <li>
      <span className="font-medium">Send your details:</span>{" "}
      Contact the library owner via WhatsApp or Call at{" "}
      <span className="font-semibold">{library.whatsapp}</span> and share:
      
      <div className="mt-2 ml-4 rounded border border-yellow-200 bg-white p-2 text-xs">
        <ul className="list-disc list-inside space-y-1">
          <li>Full Name & Mobile Number</li>
          <li>Library Name & Location</li>
          <li>Chosen Seat Number</li>
          <li>Category (Full Day / Half Day)</li>
        </ul>
      </div>
    </li>

    <li>
      <span className="font-medium">Price calculation:</span>{" "}
      The owner will verify your details and calculate the fee based on the
      remaining days in the current month.
    </li>

    <li>
      <span className="font-medium">Payment:</span>{" "}
      Once confirmed, please pay using the QR code below and share the payment
      screenshot for seat activation.
    </li>

  </ol>
</div>


              {/* Payment QR */}
              <div className="text-center">
                <img
                  src={library.paytmQR}
                  alt="Paytm QR"
                  className="mx-auto mb-4 w-80 h-80 object-contain border-4 border-gray-300 rounded-lg"
                />

               <a
  href={`https://wa.me/${library.whatsapp.replace(/[^0-9]/g, "")}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
>
  <FaWhatsapp className="h-5 w-5" />
  Click Here to Share Payment Screenshot on WhatsApp
</a>

              </div>
            </div>
          </>
        )}
      </div>

   
     
    </div>
  );
};

export default SeatAvailability;
