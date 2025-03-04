import React, { useState } from "react";

const ParkingSlot = () => {
  const [formData, setFormData] = useState({
    date: "",
    fromTime: "",
    endTime: ""
  });


  console.log(formData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Book Your Parking Slot</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Date</label>
            <input type="date" name="date" value={formData.date} onChange={e=>{setFormData({...formData, date : e.target.value})}} required 
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium">From Time</label>
            <input type="time" name="fromTime" value={formData.fromTime} onChange={e=>{setFormData({...formData, fromTime : e.target.value})}} required 
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium">End Time</label>
            <input type="time" name="endTime" value={formData.endTime} onChange={e=>{setFormData({...formData, endTime : e.target.value})}} required 
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <button type="submit"  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition">
            {formData.date ? `Select Slot for ${formData.date}` : "Select Slot"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParkingSlot;
