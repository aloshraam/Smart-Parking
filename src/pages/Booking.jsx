import React, { useState } from "react";

const ParkingSlot = () => {
  const [formData, setFormData] = useState({
    date: "",
    fromTime: "",
    endTime: "",
    vehicalNumber: "",
    vehicleType: "",
  });

  console.log(formData);

  // Function to calculate min endTime (fromTime + 15 minutes)
  const getMinEndTime = () => {
    if (!formData.fromTime) return "07:00"; // Default to parking start time

    let [hours, minutes] = formData.fromTime.split(":").map(Number);
    minutes += 15; // Add 15 minutes

    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }

    const minEndTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return minEndTime > "23:30" ? "23:30" : minEndTime; // Ensure it doesn't exceed 11:30 PM
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Book Your Parking Slot</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">From Time</label>
            <input
              type="time"
              name="fromTime"
              value={formData.fromTime}
              min="07:00"
              max="23:30"
              onChange={(e) => setFormData({ ...formData, fromTime: e.target.value, endTime: "" })}
              required
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              min={getMinEndTime()}
              max="23:30"
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Vehicle Registration No.</label>
            <input
              type="text"
              name="vehicalNumber"
              value={formData.vehicalNumber}
              onChange={(e) => {
                const uppercaseValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                setFormData({ ...formData, vehicalNumber: uppercaseValue });
              }}
              required
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Vehicle Type</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="vehicleType"
                  value="2-wheeler"
                  checked={formData.vehicleType === "2-wheeler"}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                />
                2-Wheeler
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="vehicleType"
                  value="4-wheeler"
                  checked={formData.vehicleType === "4-wheeler"}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                />
                4-Wheeler
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition"
          >
            {formData.date ? `Select Slot for ${formData.date}` : "Select Slot"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParkingSlot;