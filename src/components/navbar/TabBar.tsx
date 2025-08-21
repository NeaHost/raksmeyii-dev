import React, { useState, useRef } from "react";
import "./tabbar.css"; // Add custom styles here
import CategoryModel from "../../model/category_model";

interface TabBarProps {
  tabs: CategoryModel[];
  activeTab: CategoryModel | null;
  onTabClick: (category: CategoryModel) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabClick,
}: TabBarProps) => {
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (index: number, tab: CategoryModel) => {
    onTabClick(tab);
    // Scroll to the clicked tab horizontally only
    const tabElement = document.getElementById(`tab-${index}`);
    const container = tabContainerRef.current;

    if (tabElement && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = tabElement.getBoundingClientRect();
      const offset = tabRect.left - containerRect.left + container.scrollLeft;

      container.scrollTo({
        left: offset - container.offsetWidth / 2 + tabRect.width / 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="tab-bar-container">
      <div className="tab-bar" ref={tabContainerRef}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            id={`tab-${index}`}
            className={`tab-item ${activeTab?.id === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(index, tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
