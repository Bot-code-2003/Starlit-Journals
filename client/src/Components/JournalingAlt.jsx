import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Sun,
  Moon,
  Save,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";

const JournalingAlt = () => {
  const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
  const { darkMode, setDarkMode } = useDarkMode();
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const textareaRef = useRef(null);
  const titleRef = useRef(null);

  const moods = [
    { emoji: "😊", name: "Happy", color: "#FFB17A" },
    { emoji: "😐", name: "Neutral", color: "#83C5BE" },
    { emoji: "😔", name: "Sad", color: "#7A82AB" },
    { emoji: "😤", name: "Angry", color: "#E07A5F" },
    { emoji: "😟", name: "Anxious", color: "#BC96E6" },
    { emoji: "😴", name: "Tired", color: "#8D99AE" },
    { emoji: "🤔", name: "Reflective", color: "#81B29A" },
    { emoji: "🎉", name: "Excited", color: "#F9C74F" },
  ];

  const availableTags = [
    "Personal",
    "Work",
    "Health",
    "Relationships",
    "Goals",
    "Gratitude",
    "Ideas",
    "Dreams",
    "Challenges",
    "Learning",
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const words = journalText.trim() ? journalText.trim().split(/\s+/) : [];
    setWordCount(words.length);
  }, [journalText]);

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

  const handleSave = async () => {
    if (!journalTitle.trim() || !journalText.trim()) {
      setSaveError("Please add a title and some content to your journal entry");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));

      if (!userData || !userData.id) {
        setSaveError("User not found. Please log in again.");
        setIsSaving(false);
        return;
      }

      const journalEntry = {
        userId: userData.id,
        title: journalTitle,
        mood: selectedMood,
        content: journalText,
        date: new Date(),
        wordCount,
        tags: selectedTags,
      };

      await API.post("/saveJournal", journalEntry);

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Error saving journal:", error);
      setSaveError(
        error.response?.data?.message || "Failed to save journal entry"
      );
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const selectedMoodColor = selectedMood
    ? moods.find((m) => m.name === selectedMood)?.color
    : darkMode
    ? "#F4A261"
    : "#E68A41";

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "dark bg-[#1A1A1A] text-[#F8F1E9]"
          : "bg-[#F8F1E9] text-[#1A1A1A]"
      } font-sans transition-colors duration-300`}
    >
      <nav
        className={`w-full ${
          darkMode
            ? "bg-[#1A1A1A] border-[#333333]"
            : "bg-[#F8F1E9] border-[#DDDDDD]"
        } border-b py-4 px-6 flex justify-between items-center sticky top-0 z-20 shadow-md`}
      >
        <Link to="/" className="flex items-center">
          <div className="text-xl font-bold tracking-tight">
            COZY
            <span
              className={`${darkMode ? "text-[#F4A261]" : "text-[#E68A41]"}`}
            >
              MINDS
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center text-sm opacity-80">
            <Calendar size={16} className="mr-2" />
            {currentDate}
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:text-[#F4A261] transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 flex items-center  ${
              darkMode
                ? "bg-[#F4A261] text-[#1A1A1A] hover:bg-[#F4A261]/90"
                : "bg-[#E68A41] text-white hover:bg-[#E68A41]/90"
            } transition-all duration-200 transform ${
              isSaved ? "scale-105" : ""
            }`}
          >
            {isSaved ? (
              <Check size={16} className="mr-2" />
            ) : isSaving ? (
              <span className="mr-2 animate-spin">⏳</span>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {isSaved ? "Saved" : isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {saveError && (
          <div className="mb-4 p-3 bg-red-100 text-red-800  dark:bg-red-900/30 dark:text-red-200">
            {saveError}
          </div>
        )}

        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowMoodSelector(!showMoodSelector)}
                className={`flex items-center px-4 py-2  ${
                  darkMode
                    ? "bg-[#2A2A2A] hover:bg-[#333333]"
                    : "bg-white hover:bg-[#F8F1E9]"
                } border ${
                  darkMode ? "border-[#333333]" : "border-[#DDDDDD]"
                } transition-colors duration-200 shadow-sm`}
              >
                <div
                  className="w-3 h-3 mr-2"
                  style={{ backgroundColor: selectedMoodColor }}
                ></div>
                <span className="mr-2 font-medium text-sm">Mood</span>
                {selectedMood && (
                  <span className="text-lg">
                    {moods.find((m) => m.name === selectedMood)?.emoji}
                  </span>
                )}
                {showMoodSelector ? (
                  <ChevronUp size={16} className="ml-2 opacity-70" />
                ) : (
                  <ChevronDown size={16} className="ml-2 opacity-70" />
                )}
              </button>
              {showMoodSelector && (
                <div
                  className={`absolute top-full left-0 mt-2 w-72  ${
                    darkMode
                      ? "bg-[#2A2A2A] border-[#333333]"
                      : "bg-white border-[#DDDDDD]"
                  } border shadow-lg z-10 animate-fade-in`}
                >
                  <div className="grid grid-cols-4 p-3 gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood.name}
                        onClick={() => {
                          setSelectedMood(mood.name);
                          setShowMoodSelector(false);
                        }}
                        className={`p-2 text-xl  ${
                          selectedMood === mood.name
                            ? darkMode
                              ? "bg-[#333333]"
                              : "bg-[#F8F1E9]"
                            : ""
                        } hover:${
                          darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
                        } transition-colors duration-150`}
                      >
                        {mood.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowTagSelector(!showTagSelector)}
                className={`flex items-center px-4 py-2  ${
                  darkMode
                    ? "bg-[#2A2A2A] hover:bg-[#333333]"
                    : "bg-white hover:bg-[#F8F1E9]"
                } border ${
                  darkMode ? "border-[#333333]" : "border-[#DDDDDD]"
                } transition-colors duration-200 shadow-sm`}
              >
                <Tag size={16} className="mr-2 opacity-70" />
                <span className="font-medium text-sm">Tags</span>
                {selectedTags.length > 0 && (
                  <span className="ml-2 bg-[#F4A261] text-[#1A1A1A] text-xs px-2 py-0.5">
                    {selectedTags.length}
                  </span>
                )}
                {showTagSelector ? (
                  <ChevronUp size={16} className="ml-2 opacity-70" />
                ) : (
                  <ChevronDown size={16} className="ml-2 opacity-70" />
                )}
              </button>
              {showTagSelector && (
                <div
                  className={`absolute top-full left-0 mt-2 w-72  ${
                    darkMode
                      ? "bg-[#2A2A2A] border-[#333333]"
                      : "bg-white border-[#DDDDDD]"
                  } border shadow-lg z-10 animate-fade-in`}
                >
                  <div className="p-3 flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 text-sm  ${
                          selectedTags.includes(tag)
                            ? "bg-[#F4A261] text-[#1A1A1A]"
                            : darkMode
                            ? "bg-[#333333] hover:bg-[#444444]"
                            : "bg-[#EEEEEE] hover:bg-[#DDDDDD]"
                        } transition-colors duration-150`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-sm opacity-70">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </div>
        </div>

        <div
          className={`${
            darkMode
              ? "bg-[#2A2A2A] border-[#333333]"
              : "bg-white border-[#DDDDDD]"
          } border shadow-lg p-6 transition-all duration-300`}
        >
          <input
            ref={titleRef}
            type="text"
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
            placeholder="Entry Title"
            className={`w-full border-none outline-none text-3xl font-bold mb-6 ${
              darkMode
                ? "bg-[#2A2A2A] text-[#F8F1E9]"
                : "bg-white text-[#1A1A1A]"
            } placeholder-opacity-50 `}
          />
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className={`flex items-center px-3 py-1 ${
                    darkMode ? "bg-[#333333]" : "bg-[#EEEEEE]"
                  } text-sm`}
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {selectedMood && (
            <div className="mb-6 flex items-center text-sm opacity-70">
              <div
                className="w-3 h-3 mr-2"
                style={{ backgroundColor: selectedMoodColor }}
              ></div>
              Feeling {selectedMood.toLowerCase()}
              <span className="ml-2 text-lg">
                {moods.find((m) => m.name === selectedMood)?.emoji}
              </span>
            </div>
          )}
          <textarea
            ref={textareaRef}
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Start writing your thoughts..."
            className={`w-full min-h-[450px] resize-none border-none outline-none ${
              darkMode
                ? "bg-[#2A2A2A] text-[#F8F1E9]"
                : "bg-white text-[#1A1A1A]"
            } text-lg leading-relaxed placeholder-opacity-50 `}
          ></textarea>
        </div>
      </main>

      <div className="md:hidden fixed bottom-6 left-6 text-sm opacity-70">
        {currentDate}
      </div>

      <style jsx>{`
        textarea::-webkit-scrollbar {
          display: none;
        }
        textarea {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JournalingAlt;
