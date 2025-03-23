import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";
import { Calendar, Tag, BarChart2, ArrowLeft } from "lucide-react";
import axios from "axios";

const JournalEntry = () => {
  const { id } = useParams();
  const { darkMode } = useDarkMode();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournalEntry = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/journal/${id}`);
        setEntry(response.data.journal); // Corrected to match backend response
      } catch (err) {
        console.error("Error fetching journal entry:", err);
        setError("Failed to load journal entry. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntry();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-[#1A1A1A] text-[#F8F1E9]"
            : "bg-[#F8F1E9] text-[#1A1A1A]"
        }`}
      >
        <p className="text-lg font-medium tracking-wide">LOADING ENTRY...</p>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          darkMode
            ? "bg-[#1A1A1A] text-[#F8F1E9]"
            : "bg-[#F8F1E9] text-[#1A1A1A]"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-wider mb-4">
          {error ? "ERROR" : "NO ENTRY FOUND"}
        </h2>
        <p className="text-sm opacity-60 mb-6 tracking-wide">
          {error || "This journal entry doesn’t exist or has been removed."}
        </p>
        <Link
          to="/dashboard"
          className={`flex items-center space-x-2 px-6 py-2 ${
            darkMode
              ? "bg-[#F4A261] text-[#1A1A1A]"
              : "bg-[#1A1A1A] text-[#F8F1E9]"
          } hover:opacity-80 transition-all shadow-sharp`}
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium tracking-wide">
            BACK TO DASHBOARD
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#1A1A1A] text-[#F8F1E9]" : "bg-[#F8F1E9] text-[#1A1A1A]"
      } flex flex-col items-center px-6 py-12 relative overflow-hidden transition-colors duration-300`}
    >
      {/* Gradient Accents */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#FFD7BA] opacity-20 dark:opacity-10 transform -skew-y-12"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-[#A9D6E5] opacity-20 dark:opacity-10 transform skew-y-12"></div>

      {/* Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-8 z-10">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-2 px-4 py-2 ${
            darkMode
              ? "bg-[#2A2A2A] text-[#F8F1E9] hover:bg-[#F4A261] hover:text-[#1A1A1A]"
              : "bg-[#1A1A1A] text-[#F8F1E9] hover:bg-[#F4A261]"
          } shadow-sharp hover:shadow-none transition-all duration-200`}
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium tracking-wider">BACK</span>
        </Link>
      </div>

      {/* Journal Container */}
      <div
        className={`w-full max-w-4xl ${
          darkMode ? "bg-[#2A2A2A]" : "bg-white"
        } p-8 shadow-sharp border-t-8 border-[#F4A261] z-10`}
      >
        {/* Header Section */}
        <div className="border-b border-[#1A1A1A]/10 dark:border-[#F8F1E9]/10 pb-6 mb-6">
          <h1 className="text-5xl font-bold tracking-[0.1em] mb-2">
            {entry.title.toUpperCase()}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs opacity-60 tracking-wide">
            <div className="flex items-center space-x-2">
              <Calendar size={14} />
              <span>
                {new Date(entry.date)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart2 size={14} />
              <span>{entry.wordCount} WORDS</span>
            </div>
          </div>
        </div>

        {/* Mood & Tags Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
          <div>
            <span
              className={`inline-block px-4 py-1 text-sm font-medium tracking-wide ${
                entry.mood === "Angry"
                  ? "bg-red-500/20 text-red-500 border-red-500"
                  : entry.mood === "Happy"
                  ? "bg-green-500/20 text-green-500 border-green-500"
                  : entry.mood === "Sad"
                  ? "bg-blue-500/20 text-blue-500 border-blue-500"
                  : "bg-[#F4A261]/20 text-[#F4A261] border-[#F4A261]"
              } border`}
            >
              MOOD: {entry.mood ? entry.mood.toUpperCase() : "NOT SET"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.tags && entry.tags.length > 0 ? (
              entry.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium tracking-wide ${
                    darkMode
                      ? "bg-[#F4A261]/10 text-[#F4A261] border-[#F4A261]"
                      : "bg-[#1A1A1A]/10 text-[#1A1A1A] border-[#1A1A1A]"
                  } border`}
                >
                  <Tag size={12} />
                  <span>{tag.toUpperCase()}</span>
                </span>
              ))
            ) : (
              <span className="text-xs opacity-60 tracking-wide">NO TAGS</span>
            )}
          </div>
        </div>

        {/* Journal Content */}
        <div
          className={`text-lg leading-relaxed tracking-wide ${
            darkMode ? "text-[#F8F1E9]/90" : "text-[#1A1A1A]/90"
          }`}
        >
          <p>{entry.content}</p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .shadow-sharp {
          box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
        }

        .dark .shadow-sharp {
          box-shadow: 8px 8px 0px rgba(255, 255, 255, 0.05);
        }

        * {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default JournalEntry;
