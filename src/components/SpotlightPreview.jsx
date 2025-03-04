import React from "react";
import Spotlight from "../components/ui/Spotlight";
import ButtonsCard from "../components/ui/ButtonsCard"; // Import the updated component

const SpotlightPreview = () => {
  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="absolute -top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 text-center">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Smart <br /> Parking System.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto">
          Smart Parking System helps efficiently manage parking spaces by guiding users to available spots. 
          This software optimizes space utilization and reduces congestion by providing real-time parking updates.
        </p>
      </div>

      {/* Border Magic Button */}
      <div className="mt-8">
        <ButtonsCard />
      </div>
    </div>
  );
};

export default SpotlightPreview;