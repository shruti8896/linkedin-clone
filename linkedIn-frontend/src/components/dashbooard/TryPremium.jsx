import React from "react";

function TryPremium() {
  return (
    <div className="flex-[2.5] mt-3  bg-white rounded-xl p-3 shadow-xl relative">
      <p className="text-gray-500 text-xs">Access Exclusive tools & insights</p>
      <div className="flex flex-row gap-2">
        <div className="w-3 h-3 mt-1 bg-amber-600"></div>
        <p className="text-xs mt-0.5">Try Premium for free</p>
      </div>
    </div>
  );
}

export default TryPremium;
