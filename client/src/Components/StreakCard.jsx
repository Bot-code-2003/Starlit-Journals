// StreakCard.jsx
"use client";

import { Flame, Award } from "lucide-react";
import { useDarkMode } from "../context/ThemeContext";

const StreakCard = () => {
  const { darkMode } = useDarkMode();

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const currentStreak = user?.currentStreak || 0;
  const longestStreak = user?.longestStreak || 0;
  const lastJournaled = user?.lastJournaled
    ? new Date(user.lastJournaled).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  // Inspirational quote
  const quote = "The secret of getting ahead is getting started.";
  const quoteAuthor = "Mark Twain";

  return (
    <div
      className={`p-6 shadow-lg mb-6 ${
        darkMode ? "bg-[#2A2A2A] text-[#F8F1E9]" : "bg-white text-[#1A1A1A]"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Flame className="mr-2 text-[#F4A261]" />
        Your Streak Journey
      </h2>

      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`p-4 ${
            darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
          } flex items-center`}
        >
          <Flame size={24} className="mr-3 text-[#F4A261]" />
          <div>
            <p className="text-sm opacity-70">Current Streak</p>
            <p className="text-2xl font-bold">{currentStreak} days</p>
          </div>
        </div>
        <div
          className={`p-4 ${
            darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
          } flex items-center`}
        >
          <Award size={24} className="mr-3 text-[#F4A261]" />
          <div>
            <p className="text-sm opacity-70">Longest Streak</p>
            <p className="text-2xl font-bold">{longestStreak} days</p>
          </div>
        </div>
      </div>

      {/* Last Journaled */}
      <div className="mb-6">
        <p className="text-sm opacity-70">Last Journaled</p>
        <p className="text-lg font-medium">{lastJournaled}</p>
      </div>

      {/* Inspirational Quote */}
      <div
        className={`p-4 italic text-center border-t ${
          darkMode ? "border-[#333333]" : "border-[#DDDDDD]"
        }`}
      >
        <p className="text-sm opacity-90">"{quote}"</p>
        <p className="text-xs opacity-70 mt-1">— {quoteAuthor}</p>
      </div>
    </div>
  );
};

export default StreakCard;
