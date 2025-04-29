import React from "react";

const SideBarSkeleton = () => {
  return (
    <div className="w-64 bg-base-300 p-4 border-r border-base-200">
      <div className="mb-4 h-6 w-32 bg-base-100 rounded animate-pulse"></div>
      <ul className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-3 p-2 rounded-lg bg-base-100 animate-pulse"
          >
            <div className="h-3 w-3 rounded-full bg-neutral"></div>
            <div className="h-4 w-24 bg-neutral rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarSkeleton;
