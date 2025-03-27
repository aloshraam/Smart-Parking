import React, { useState, useEffect } from "react";

const TimeSlotSelector = ({ date, onTimeSelect, bookedSlotsDetails }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (date) {
      generateTimeSlots();
      setStartTime(null);
      setEndTime(null);
    }
  }, [date]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 23; hour++) { // 8 AM to 11 PM
      for (let min = 0; min < 60; min += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMin = min.toString().padStart(2, "0");
        slots.push(`${formattedHour}:${formattedMin}`);
      }
    }
    setTimeSlots(slots);
  };

  return (
    <div className="w-full max-w-4xl">
      <h3 className="text-lg font-semibold mb-2 text-center">
        Select Time Slot for {date || "Select Date First"}
      </h3>

      {/* Start Time Selection */}
      <div className="overflow-x-auto whitespace-nowrap bg-gray-800 p-4 rounded-lg shadow-lg">
        <p className="mb-2 text-center">Start Time</p>
        <div className="flex space-x-2">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md text-white font-bold transition ${
                startTime === time ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => { setStartTime(time); setEndTime(null); }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* End Time Selection */}
      {startTime && (
        <div className="overflow-x-auto whitespace-nowrap bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
          <p className="mb-2 text-center">End Time</p>
          <div className="flex space-x-2">
            {timeSlots
              .filter((time) => time > startTime) // Show only times after start time
              .map((time, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md text-white font-bold transition ${
                    endTime === time ? "bg-red-700" : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={() => { setEndTime(time); onTimeSelect(startTime, time); }}
                >
                  {time}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;