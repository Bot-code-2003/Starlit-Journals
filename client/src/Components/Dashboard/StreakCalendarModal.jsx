"use client";
import { X, Award, Flame, Calendar, Star, TrendingUp } from "lucide-react";
import { useDarkMode } from "../../context/ThemeContext";

const StreakCalendarModal = ({ user, onClose, isVisible }) => {
  const { darkMode } = useDarkMode();

  if (!isVisible) return null;

  // Get motivational message based on streak
  const getMotivationalMessage = (streak) => {
    if (streak === 0) return "Start your journaling journey today!";
    if (streak === 1) return "Great start! Keep the momentum going!";
    if (streak < 5) return "You're building a healthy habit!";
    if (streak < 10) return "Impressive dedication! You're on fire!";
    if (streak < 30)
      return "Amazing consistency! You're transforming your life!";
    return "Extraordinary commitment! You're a journaling master!";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md p-8 rounded-lg shadow-xl ${
          darkMode ? "bg-[#2A2A2A] text-[#F8F1E9]" : "bg-white text-[#1A1A1A]"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header with decorative elements */}
        <div className="text-center mb-6">
          <div className="inline-block relative">
            <Flame className="mx-auto text-[#F4A261] mb-2" size={40} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F4A261] rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold">Your Journaling Streak</h2>
          <p className="text-sm opacity-70 mt-1">
            Track your consistency and build a healthy habit
          </p>
        </div>

        {/* Streak visualization */}
        <div className="flex justify-center mb-8">
          <div
            className={`w-48 h-48 relative flex items-center justify-center rounded-full ${
              darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
            }`}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-[#F4A261]">
                {user?.currentStreak || 0}
              </div>
              <div className="text-sm mt-1 opacity-80">days</div>
            </div>

            {/* Decorative stars */}
            <Star
              className="absolute top-4 right-8 text-[#F4A261] animate-pulse"
              size={16}
            />
            <Star
              className="absolute bottom-10 right-4 text-[#F4A261] animate-pulse"
              size={12}
            />
            <Star
              className="absolute top-10 left-6 text-[#F4A261] animate-pulse"
              size={14}
            />
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded ${
              darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
            } flex items-center`}
          >
            <TrendingUp size={24} className="mr-3 text-[#F4A261]" />
            <div>
              <p className="text-sm opacity-70">Longest Streak</p>
              <p className="text-2xl font-bold">
                {user?.longestStreak || 0} days
              </p>
            </div>
          </div>
          <div
            className={`p-4 rounded ${
              darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
            } flex items-center`}
          >
            <Award size={24} className="mr-3 text-[#F4A261]" />
            <div>
              <p className="text-sm opacity-70">Last Entry</p>
              <p className="text-sm font-medium">
                {user?.lastJournaled
                  ? new Date(user.lastJournaled).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>

        {/* Motivational message */}
        <div
          className={`p-4 rounded-lg mb-6 text-center ${
            darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
          }`}
        >
          <p className="italic">
            {getMotivationalMessage(user?.currentStreak || 0)}
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm opacity-70 mb-4">
            Journal every day to build your streak. Missing a day will reset
            your streak to 1.
          </p>

          <button
            onClick={() => {
              onClose();
              window.location.href = "/profile-settings";
            }}
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-[#F4A261] text-[#1A1A1A]"
                : "bg-[#E68A41] text-white"
            } transition-colors inline-flex items-center hover:opacity-90`}
          >
            <Calendar size={16} className="mr-2" />
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendarModal;
