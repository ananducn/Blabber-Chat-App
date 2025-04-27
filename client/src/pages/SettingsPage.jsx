import React from "react";
import useThemeStore from "../store/useThemeStore.js";
import { THEME } from "../constants/index.js";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 px-4 pt-[96px] pb-6 overflow-y-auto">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-neutral-content">
          Select Theme
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {THEME.map((item) => (
            <button
              key={item}
              className={`flex flex-col items-center gap-1.5 p-2  rounded-lg transition-colors ${
                theme === item ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(item)}
            >
              <div className="flex gap-1 w-full h-8 p-2" data-theme={item}>
                <div className="flex-1 rounded bg-primary"></div>
                <div className="flex-1 rounded bg-secondary"></div>
                <div className="flex-1 rounded bg-accent"></div>
                <div className="flex-1 rounded bg-neutral"></div>
              </div>

              <span className="text-[11px] font-medium truncate text-center w-full">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-base-content opacity-70">
            Tap a theme to instantly preview it
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
