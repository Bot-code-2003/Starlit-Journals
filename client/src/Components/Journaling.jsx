"use client";

import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Save, Info, Clock, Calendar, X, Check } from "lucide-react";

const Journaling = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [isHardMode, setIsHardMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showMoodTooltip, setShowMoodTooltip] = useState(null);
  const [showHardModeTooltip, setShowHardModeTooltip] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const textareaRef = useRef(null);

  // Mood options with emojis and descriptions
  const moods = [
    { emoji: "😄", name: "Happy", description: "Feeling joyful and content" },
    { emoji: "😐", name: "Neutral", description: "Neither good nor bad" },
    { emoji: "☹️", name: "Sad", description: "Feeling down or blue" },
    { emoji: "😡", name: "Angry", description: "Frustrated or irritated" },
    { emoji: "😰", name: "Anxious", description: "Worried or nervous" },
    { emoji: "🥱", name: "Tired", description: "Low energy or exhausted" },
    {
      emoji: "🤔",
      name: "Reflective",
      description: "Thoughtful and introspective",
    },
    { emoji: "🥳", name: "Excited", description: "Enthusiastic and energized" },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Calculate word count
  useEffect(() => {
    const words = journalText.trim() ? journalText.trim().split(/\s+/) : [];
    setWordCount(words.length);
  }, [journalText]);

  // Set current date
  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  // Handle save
  const handleSave = () => {
    if (isHardMode && wordCount > 300) {
      // Show error if over word limit in hard mode
      alert(
        "Please reduce your entry to 300 words or less to save in Hard Mode."
      );
      return;
    }

    // Save logic would go here
    console.log("Saving journal entry:", {
      mood: selectedMood,
      text: journalText,
      date: new Date(),
      wordCount,
      mode: isHardMode ? "Hard" : "Easy",
    });

    // Show saved indicator
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Focus textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Check if over word limit
  const isOverWordLimit = isHardMode && wordCount > 300;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "dark bg-[#1A1A1A] text-[#F8F1E9]"
          : "bg-[#F8F1E9] text-[#1A1A1A]"
      } font-sans flex flex-col items-center px-6 py-12 transition-colors duration-300`}
    >
      {/* Header with date and controls */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-8 z-10">
        <div className="flex items-center">
          <Calendar size={18} className="mr-2 opacity-70" />
          <span className="text-sm opacity-70">{currentDate}</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:text-[#F4A261] transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleSave}
            className={`px-4 py-2 flex items-center ${
              isDarkMode
                ? "bg-[#F4A261] text-[#1A1A1A]"
                : "bg-[#1A1A1A] text-white"
            } hover:opacity-90 transition-opacity ${
              isOverWordLimit ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isOverWordLimit}
          >
            {isSaved ? (
              <Check size={18} className="mr-1" />
            ) : (
              <Save size={18} className="mr-1" />
            )}
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </header>

      {/* Main journaling area */}
      <main className="w-full max-w-3xl flex flex-col z-10">
        {/* Mood selector */}
        <div
          className={`w-full ${
            isDarkMode ? "bg-[#2A2A2A]" : "bg-white"
          } shadow-sharp p-6 mb-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">How are you feeling today?</h2>
            <div className="text-xs opacity-70">Select one</div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {moods.map((mood) => (
              <div
                key={mood.name}
                className="relative"
                onMouseEnter={() => setShowMoodTooltip(mood.name)}
                onMouseLeave={() => setShowMoodTooltip(null)}
              >
                <button
                  onClick={() => setSelectedMood(mood.name)}
                  className={`text-3xl p-2 transition-transform hover:scale-110 ${
                    selectedMood === mood.name
                      ? isDarkMode
                        ? "bg-[#F4A261]/20"
                        : "bg-[#F4A261]/10"
                      : ""
                  }`}
                  aria-label={mood.name}
                >
                  {mood.emoji}
                </button>

                {/* Selected indicator */}
                {selectedMood === mood.name && (
                  <div
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 ${
                      isDarkMode ? "bg-[#F4A261]" : "bg-[#F4A261]"
                    }`}
                  ></div>
                )}

                {/* Tooltip */}
                {showMoodTooltip === mood.name && (
                  <div
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 ${
                      isDarkMode
                        ? "bg-[#1A1A1A] text-[#F8F1E9]"
                        : "bg-[#1A1A1A] text-white"
                    } px-3 py-1 text-xs whitespace-nowrap shadow-sharp z-10`}
                  >
                    <div className="font-bold">{mood.name}</div>
                    <div className="text-xs opacity-80">{mood.description}</div>
                    <div
                      className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 ${
                        isDarkMode ? "bg-[#1A1A1A]" : "bg-[#1A1A1A]"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Writing mode toggle */}
        <div
          className={`w-full ${
            isDarkMode ? "bg-[#2A2A2A]" : "bg-white"
          } shadow-sharp p-6 mb-6`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-lg font-bold mr-2">Writing Mode</h2>
              <div
                className="relative"
                onMouseEnter={() => setShowHardModeTooltip(true)}
                onMouseLeave={() => setShowHardModeTooltip(false)}
              >
                <Info size={16} className="opacity-70 cursor-help" />

                {/* Hard Mode Tooltip */}
                {showHardModeTooltip && (
                  <div
                    className={`absolute -top-20 left-1/2 transform -translate-x-1/2 ${
                      isDarkMode
                        ? "bg-[#1A1A1A] text-[#F8F1E9]"
                        : "bg-[#1A1A1A] text-white"
                    } px-3 py-2 text-xs w-60 shadow-sharp z-10`}
                  >
                    <div className="font-bold mb-1">Hard Mode</div>
                    <div className="text-xs opacity-80">
                      Challenges your thinking and writing skills by limiting
                      you to 300 words.
                    </div>
                    <div
                      className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 ${
                        isDarkMode ? "bg-[#1A1A1A]" : "bg-[#1A1A1A]"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsHardMode(false)}
                className={`px-3 py-1 text-sm ${
                  !isHardMode
                    ? isDarkMode
                      ? "bg-[#F4A261] text-[#1A1A1A]"
                      : "bg-[#1A1A1A] text-white"
                    : isDarkMode
                    ? "bg-[#2A2A2A] text-[#F8F1E9]"
                    : "bg-[#F8F1E9] text-[#1A1A1A]"
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setIsHardMode(true)}
                className={`px-3 py-1 text-sm ${
                  isHardMode
                    ? isDarkMode
                      ? "bg-[#F4A261] text-[#1A1A1A]"
                      : "bg-[#1A1A1A] text-white"
                    : isDarkMode
                    ? "bg-[#2A2A2A] text-[#F8F1E9]"
                    : "bg-[#F8F1E9] text-[#1A1A1A]"
                }`}
              >
                Hard
              </button>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <Clock size={14} className="mr-1 opacity-70" />
            <span className="text-xs opacity-70">
              {isHardMode ? "300 words max" : "Unlimited words"}
            </span>
          </div>
        </div>

        {/* Journal entry textarea */}
        <div
          className={`w-full ${
            isDarkMode ? "bg-[#2A2A2A]" : "bg-white"
          } shadow-sharp p-6 mb-6 flex flex-col`}
        >
          <textarea
            ref={textareaRef}
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Start writing your thoughts here..."
            className={`w-full min-h-[300px] resize-none border-none outline-none ${
              isDarkMode
                ? "bg-[#2A2A2A] text-[#F8F1E9]"
                : "bg-white text-[#1A1A1A]"
            } placeholder-opacity-50 text-lg leading-relaxed`}
          ></textarea>

          <div
            className={`flex justify-between items-center mt-4 pt-4 ${
              isDarkMode
                ? "border-t border-[#333333]"
                : "border-t border-[#EEEEEE]"
            }`}
          >
            <div className="flex items-center">
              {selectedMood && (
                <div className="flex items-center mr-4">
                  <span className="text-sm opacity-70 mr-2">Mood:</span>
                  <span className="text-lg">
                    {moods.find((m) => m.name === selectedMood)?.emoji}
                  </span>
                </div>
              )}
            </div>

            <div
              className={`text-sm ${
                isHardMode && wordCount > 300 ? "text-red-500" : "opacity-70"
              }`}
            >
              {wordCount} {wordCount === 1 ? "word" : "words"}
              {isHardMode && ` / 300`}
            </div>
          </div>
        </div>

        {/* Word limit warning */}
        {isHardMode && wordCount > 300 && (
          <div
            className={`w-full ${
              isDarkMode ? "bg-red-900/20" : "bg-red-100"
            } p-4 mb-6 flex items-center justify-between`}
          >
            <div className="flex items-center">
              <X size={16} className="text-red-500 mr-2" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                You're {wordCount - 300} words over the Hard Mode limit.
              </span>
            </div>
            <button
              onClick={() => setIsHardMode(false)}
              className={`text-xs ${
                isDarkMode ? "text-[#F4A261]" : "text-[#E68A41]"
              } hover:underline`}
            >
              Switch to Easy Mode
            </button>
          </div>
        )}
      </main>

      {/* Prompts for inspiration (optional) */}
      <div className="w-full max-w-3xl mt-8 z-10">
        <div className="text-sm opacity-70 mb-2">Need inspiration?</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "What made you smile today?",
            "What's one thing you learned recently?",
            "Describe a challenge you're facing right now.",
            "What are you grateful for today?",
          ].map((prompt, index) => (
            <button
              key={index}
              onClick={() =>
                setJournalText((prev) =>
                  prev ? `${prev}\n\n${prompt}\n` : `${prompt}\n`
                )
              }
              className={`text-left p-4 ${
                isDarkMode
                  ? "bg-[#2A2A2A] hover:bg-[#333333]"
                  : "bg-white hover:bg-[#F5F5F5]"
              } shadow-sharp transition-colors`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .shadow-sharp {
          box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.1);
        }

        .dark .shadow-sharp {
          box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.05);
        }

        textarea::placeholder {
          opacity: 0.5;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        textarea::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        textarea {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Journaling;
