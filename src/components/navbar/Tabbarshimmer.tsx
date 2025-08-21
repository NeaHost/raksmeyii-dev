import React from "react";
import "./tabbar.css"; // Add custom styles here
function TabbarShimmer() {
  const shimmerCards = Array.from({ length: 12 }); // Adjust the length for more/less cards

  return (
    <div className="tab-bar-container">
      <div className="tab-bar">
        {shimmerCards.map((tab, index) => (
          <button
            key={index}
            id={`tab-${index}`}
            className={`bg-gray-300 mx-4 px-10 py-4 rounded`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default TabbarShimmer;
