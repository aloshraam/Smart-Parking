import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ParkingArea = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const slots = Array.from({ length: 40 }, (_, index) => ({ id: index + 1, booked: false }));

  const handleSlotClick = (slotId) => {
    setSelectedSlot(slotId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full bg-gray-900 sm:hidden h-10"></div> {/* Extra spacing for small screens */}
      <div className="flex items-center w-full max-w-5xl px-4">
        <button onClick={() => navigate('/')} className="text-white text-lg font-bold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-4">⬅ Back</button>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center flex-grow">Select a Parking Slot</h2>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4 bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md text-white font-bold transition ${
              selectedSlot === slot.id ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={() => handleSlotClick(slot.id)}
          >
            {slot.id}
          </button>
        ))}
      </div>
      {selectedSlot && (
        <div className="mt-4 flex space-x-4">
          <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded" onClick={() => alert(`Slot ${selectedSlot} booked successfully!`)}>
            Book Slot {selectedSlot}
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded" onClick={() => setSelectedSlot(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ParkingArea;
