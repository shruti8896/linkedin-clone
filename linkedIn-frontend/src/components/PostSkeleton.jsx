import React from "react";

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md animate-pulse">
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>

        <div className="flex-1">
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
          <div className="h-3 w-28 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>

      <div className="h-4 bg-gray-300 rounded mt-6"></div>
      <div className="h-4 bg-gray-200 rounded mt-3 w-4/5"></div>

      <div className="h-64 bg-gray-200 rounded mt-5"></div>
    </div>
  );
};

export default PostSkeleton;
