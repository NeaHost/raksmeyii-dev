import React from "react";
import "./shimmer.css";

function ShimmerGrid() {
  const shimmerCards = Array.from({ length: 12 }); // Adjust the length for more/less cards

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="shimmer-card bg-white p-2 relative z-0 rounded-xl shadow-sm h-[21rem] flex flex-col justify-between"
        >
          {/* Image placeholder */}
          <div className="shimmer w-full h-48 rounded bg-gray-200"></div>

          {/* Text placeholder */}
          <div className="mt-2">
            <div className="shimmer h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="shimmer h-6 w-full bg-gray-200 rounded mt-1"></div>
          </div>

          {/* Footer placeholder */}
          <div className="flex justify-between items-center mt-4">
            <div className="shimmer h-6 w-16 bg-gray-200 rounded"></div>
            <div className="shimmer h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShimmerGrid;
