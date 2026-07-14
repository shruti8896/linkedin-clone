import React from "react";
import { BsInfoSquareFill } from "react-icons/bs";

function LinkedinNews() {
  const newsStories = [
    {
      title: "Top finance trends to watch",
      time: "1d ago",
      readers: "10,240 readers",
    },
    {
      title: "Remote work options rise in tech",
      time: "2d ago",
      readers: "8,950 readers",
    },
    {
      title: "How to ace your next React interview",
      time: "12h ago",
      readers: "14,320 readers",
    },
    {
      title: "The rise of agentic AI developers",
      time: "3d ago",
      readers: "22,110 readers",
    },
    {
      title: "Startups securing series A funding",
      time: "4d ago",
      readers: "5,640 readers",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-800">LinkedIn News</h2>
        <BsInfoSquareFill size={12} className="text-gray-500 cursor-help hover:text-gray-700 transition-colors" title="About LinkedIn News" />
      </div>

      <p className="text-xs text-gray-400 font-medium -mt-1">Top Stories</p>

      {/* Stories list */}
      <div className="flex flex-col gap-2.5 mt-1">
        {newsStories.map((story, i) => (
          <div 
            key={i} 
            className="flex gap-2.5 items-start p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            {/* Small bullet dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 flex-shrink-0 group-hover:bg-blue-600 transition-colors"></span>
            
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors group-hover:underline break-words line-clamp-2">
                {story.title}
              </h3>
              <p className="text-[10px] text-gray-400 mt-1 font-normal">
                {story.time} • {story.readers}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedinNews;
