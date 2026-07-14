import React from "react";

function TryPremium() {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-1.5 group">
      <p className="text-gray-500 text-[10.5px] leading-tight font-normal">
        Access exclusive tools & insights
      </p>
      <div className="flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded bg-amber-500 flex items-center justify-center text-[8px] text-white font-bold shadow-xs">
          🔑
        </div>
        <span className="text-[11.5px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          Try Premium for free
        </span>
      </div>
    </div>
  );
}

export default TryPremium;
