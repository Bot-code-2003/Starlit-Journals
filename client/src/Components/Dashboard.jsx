"use client";

import { useState, useEffect } from "react";
import { useDarkMode } from "../context/ThemeContext";
import axios from "axios";
import {
  Sun,
  Moon,
  Calendar,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Tag,
  Trash2,
  BarChart2,
  PieChart,
  Clock,
  Plus,
  BookOpen,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const Dashboard = () => {
  const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

  const { darkMode, setDarkMode } = useDarkMode();
  const [journalEntries, setJournalEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(6);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Mood options with emojis, descriptions and colors
  const moods = [
    {
      emoji: "😄",
      name: "Happy",
      description: "Feeling joyful and content",
      color: "#FFB17A",
    },
    {
      emoji: "😐",
      name: "Neutral",
      description: "Neither good nor bad",
      color: "#83C5BE",
    },
    {
      emoji: "😔",
      name: "Sad",
      description: "Feeling down or blue",
      color: "#7A82AB",
    },
    {
      emoji: "😡",
      name: "Angry",
      description: "Frustrated or irritated",
      color: "#E07A5F",
    },
    {
      emoji: "😰",
      name: "Anxious",
      description: "Worried or nervous",
      color: "#BC96E6",
    },
    {
      emoji: "🥱",
      name: "Tired",
      description: "Low energy or exhausted",
      color: "#8D99AE",
    },
    {
      emoji: "🤔",
      name: "Reflective",
      description: "Thoughtful and introspective",
      color: "#81B29A",
    },
    {
      emoji: "🥳",
      name: "Excited",
      description: "Enthusiastic and energized",
      color: "#F9C74F",
    },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Load user data and journal entries
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        setUserData(user);

        if (!user) {
          navigate("/login");
          return;
        }

        // Fetch journal entries from the server
        const response = await API.get(`/journals/${user.id}`);
        setJournalEntries(response.data.journals || []);
        setFilteredEntries(response.data.journals || []);
      } catch (err) {
        console.error("Error fetching journal entries:", err);
        setError("Failed to load journal entries. Please try again later.");
        setJournalEntries([]);
        setFilteredEntries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Filter entries based on search, mood, tag, and period
  useEffect(() => {
    let filtered = [...journalEntries];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (entry) =>
          entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by mood
    if (selectedMood) {
      filtered = filtered.filter((entry) => entry.mood === selectedMood);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(
        (entry) => entry.tags && entry.tags.includes(selectedTag)
      );
    }

    // Filter by period
    if (selectedPeriod !== "all") {
      const now = new Date();
      let startDate;

      switch (selectedPeriod) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered.filter(
          (entry) => new Date(entry.date) >= startDate
        );
      }
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredEntries(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [journalEntries, searchQuery, selectedMood, selectedTag, selectedPeriod]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Delete an entry
  const deleteEntry = async (id) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      try {
        await API.delete(`/journal/${id}`);
        setJournalEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== id)
        );
      } catch (err) {
        console.error("Error deleting entry:", err);
        alert("Failed to delete entry. Please try again.");
      }
    }
  };

  // Get mood counts for chart
  const getMoodCounts = () => {
    const counts = {};
    moods.forEach((mood) => {
      counts[mood.name] = 0;
    });

    journalEntries.forEach((entry) => {
      if (entry.mood) {
        counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      }
    });

    return counts;
  };

  // Prepare data for Recharts
  const getMoodChartData = () => {
    const moodCounts = getMoodCounts();
    return moods.map((mood) => ({
      name: mood.name,
      emoji: mood.emoji,
      count: moodCounts[mood.name] || 0,
      color: mood.color,
    }));
  };

  // Get all unique tags from entries
  const getAllTags = () => {
    const tags = new Set();
    journalEntries.forEach((entry) => {
      if (entry.tags && entry.tags.length) {
        entry.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags);
  };

  // Get word count stats
  const getWordCountStats = () => {
    if (!journalEntries.length) return { total: 0, average: 0, max: 0 };

    const total = journalEntries.reduce(
      (sum, entry) => sum + (entry.wordCount || 0),
      0
    );
    const average = Math.round(total / journalEntries.length);
    const max = Math.max(
      ...journalEntries.map((entry) => entry.wordCount || 0)
    );

    return { total, average, max };
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get mood color
  const getMoodColor = (moodName) => {
    return moods.find((m) => m.name === moodName)?.color || "#CCCCCC";
  };

  // Get mood emoji
  const getMoodEmoji = (moodName) => {
    return moods.find((m) => m.name === moodName)?.emoji || "😶";
  };

  // Word count stats
  const wordCountStats = getWordCountStats();

  // Mood counts
  const moodCounts = getMoodCounts();

  // All tags
  const allTags = getAllTags();

  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className={`p-3 ${
            darkMode ? "bg-[#333333]" : "bg-white"
          } shadow-lg border ${
            darkMode ? "border-[#444444]" : "border-[#EEEEEE]"
          }`}
        >
          <p className="font-medium flex items-center">
            <span className="mr-2">{data.emoji}</span>
            {data.name}
          </p>
          <p className="text-sm mt-1">
            <span className="font-medium">{data.count}</span> entries
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "dark bg-[#1A1A1A] text-[#F8F1E9]"
          : "bg-[#F8F1E9] text-[#1A1A1A]"
      } font-sans transition-colors duration-300`}
    >
      {/* Top navigation bar */}
      <nav
        className={`w-full ${
          darkMode
            ? "bg-[#1A1A1A]/90 backdrop-blur-sm border-b border-[#333333]"
            : "bg-[#F8F1E9]/90 backdrop-blur-sm border-b border-[#DDDDDD]"
        } py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-20`}
      >
        <Link to={"/"} className="flex items-center">
          <div className="text-lg font-bold tracking-wider">
            COZY
            <span
              className={`${darkMode ? "text-[#F4A261]" : "text-[#E68A41]"}`}
            >
              MINDS
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {userData && (
            <Link
              to="/profile-settings"
              className="hidden md:flex items-center mr-4"
            >
              <div className="w-8 h-8 bg-[#F4A261] flex items-center justify-center text-[#1A1A1A] font-medium mr-2">
                {userData.nickname?.charAt(0).toUpperCase() || "U"}
              </div>
              <span>{userData.nickname || "User"}</span>
            </Link>
          )}

          <button
            onClick={toggleDarkMode}
            className="p-2 hover:text-[#F4A261] transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/journaling-alt"
            className={`hidden md:flex items-center px-4 py-2 ${
              darkMode
                ? "bg-[#F4A261] text-[#1A1A1A]"
                : "bg-[#E68A41] text-white"
            } hover:opacity-90 transition-opacity`}
          >
            <Plus size={18} className="mr-2" />
            New Entry
          </Link>

          <button
            onClick={handleLogout}
            className={`flex items-center px-4 py-2 ${
              darkMode
                ? "border border-[#333333] hover:bg-[#2A2A2A]"
                : "border border-[#DDDDDD] hover:bg-white"
            } transition-colors`}
          >
            <LogOut size={18} />
            <span className="hidden md:inline ml-2">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userData?.nickname || "User"}
          </h1>
          <p className="opacity-70">
            Track your mood, thoughts, and personal growth journey
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/journaling-alt"
            className={`flex items-center p-6 ${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg hover:translate-y-[-2px] transition-all duration-300`}
          >
            <div
              className={`p-3 mr-4 ${
                darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
              }`}
            >
              <Plus size={24} className="text-[#F4A261]" />
            </div>
            <div>
              <h3 className="font-bold mb-1">New Journal Entry</h3>
              <p className="text-sm opacity-70">
                Record your thoughts and feelings
              </p>
            </div>
          </Link>

          <Link
            to="/journal-entries"
            className={`flex items-center p-6 ${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg hover:translate-y-[-2px] transition-all duration-300`}
          >
            <div
              className={`p-3 mr-4 ${
                darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
              }`}
            >
              <BookOpen size={24} className="text-[#F4A261]" />
            </div>
            <div>
              <h3 className="font-bold mb-1">View All Entries</h3>
              <p className="text-sm opacity-70">Browse your journal history</p>
            </div>
          </Link>

          <Link
            to="/profile-settings"
            className={`flex items-center p-6 ${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg hover:translate-y-[-2px] transition-all duration-300`}
          >
            <div
              className={`p-3 mr-4 ${
                darkMode ? "bg-[#333333]" : "bg-[#F8F1E9]"
              }`}
            >
              <User size={24} className="text-[#F4A261]" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Profile Settings</h3>
              <p className="text-sm opacity-70">Manage your account</p>
            </div>
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg p-6`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm opacity-70 mb-1">Total Entries</h3>
                <p className="text-3xl font-bold">{journalEntries.length}</p>
              </div>
              <Calendar size={24} className="opacity-70" />
            </div>
            <div className="flex justify-between text-sm opacity-70">
              <span>
                First Entry:{" "}
                {journalEntries.length
                  ? formatDate(
                      journalEntries.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )[0].date
                    )
                  : "N/A"}
              </span>
            </div>
          </div>

          <div
            className={`${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg p-6`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm opacity-70 mb-1">Word Count</h3>
                <p className="text-3xl font-bold">
                  {wordCountStats.total.toLocaleString()}
                </p>
              </div>
              <BarChart2 size={24} className="opacity-70" />
            </div>
            <div className="flex justify-between text-sm opacity-70">
              <span>Average: {wordCountStats.average} words</span>
              <span>Max: {wordCountStats.max} words</span>
            </div>
          </div>

          <div
            className={`${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg p-6`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm opacity-70 mb-1">Most Common Mood</h3>
                {journalEntries.length ? (
                  <div className="flex items-center">
                    <span className="text-3xl mr-2">
                      {getMoodEmoji(
                        Object.entries(moodCounts).sort(
                          (a, b) => b[1] - a[1]
                        )[0]?.[0]
                      )}
                    </span>
                    <span className="text-xl font-bold">
                      {
                        Object.entries(moodCounts).sort(
                          (a, b) => b[1] - a[1]
                        )[0]?.[0]
                      }
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-bold">No entries yet</p>
                )}
              </div>
              <PieChart size={24} className="opacity-70" />
            </div>
            <div className="flex justify-between text-sm opacity-70">
              <span>
                Mood entries:{" "}
                {Object.values(moodCounts).reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Mood Distribution Chart */}
        <div
          className={`${
            darkMode ? "bg-[#2A2A2A]" : "bg-white"
          } shadow-lg p-6 mb-8`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Mood Distribution</h2>
            {selectedMood && (
              <button
                onClick={() => setSelectedMood(null)}
                className={`px-3 py-1 text-xs ${
                  darkMode
                    ? "bg-[#333333] hover:bg-[#444444]"
                    : "bg-[#EEEEEE] hover:bg-[#DDDDDD]"
                } transition-colors`}
              >
                Reset filter
              </button>
            )}
          </div>

          <div className="h-[300px] w-full">
            {journalEntries.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getMoodChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={darkMode ? "#333333" : "#EEEEEE"}
                  />
                  {/* <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: darkMode ? "#333333" : "#DDDDDD" }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    /> */}
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={{ stroke: darkMode ? "#333333" : "#DDDDDD" }}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[2, 2, 0, 0]}
                    onClick={(data) => setSelectedMood(data.name)}
                    className="cursor-pointer"
                  >
                    {getMoodChartData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={
                          selectedMood && selectedMood !== entry.name
                            ? 0.4
                            : 0.8
                        }
                      />
                    ))}
                    <LabelList
                      dataKey="emoji"
                      position="top"
                      style={{ fontSize: "16px" }}
                      offset={10}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-center opacity-70">
                  No mood data available yet
                </p>
              </div>
            )}
          </div>

          <div className="text-xs opacity-70 mt-4 text-center">
            Based on {journalEntries.length} entries. Click on a bar to filter
            by that mood.
          </div>
        </div>

        {/* Filters and search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70"
            />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${
                darkMode
                  ? "bg-[#2A2A2A] border-[#333333]"
                  : "bg-white border-[#DDDDDD]"
              } border focus:outline-none`}
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-2 ${
                darkMode ? "bg-[#2A2A2A]" : "bg-white"
              } border ${darkMode ? "border-[#333333]" : "border-[#DDDDDD]"}`}
            >
              <Filter size={16} className="mr-2 opacity-70" />
              <span>Filters</span>
              <ChevronDown size={16} className="ml-2 opacity-70" />
            </button>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`px-3 py-2 ${
                darkMode
                  ? "bg-[#2A2A2A] border-[#333333]"
                  : "bg-white border-[#DDDDDD]"
              } border focus:outline-none appearance-none pr-8 relative`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
              }}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div
            className={`${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg p-4 mb-6 animate-fadeIn`}
          >
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Filter by Mood</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMood(null)}
                  className={`px-3 py-1 text-xs ${
                    !selectedMood
                      ? darkMode
                        ? "bg-[#F4A261] text-[#1A1A1A]"
                        : "bg-[#1A1A1A] text-white"
                      : darkMode
                      ? "bg-[#333333]"
                      : "bg-[#EEEEEE]"
                  }`}
                >
                  All Moods
                </button>
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`flex items-center px-3 py-1 text-xs ${
                      selectedMood === mood.name
                        ? darkMode
                          ? "bg-[#F4A261] text-[#1A1A1A]"
                          : "bg-[#1A1A1A] text-white"
                        : darkMode
                        ? "bg-[#333333]"
                        : "bg-[#EEEEEE]"
                    }`}
                  >
                    <span className="mr-1">{mood.emoji}</span>
                    <span>{mood.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {allTags.length > 0 && (
              <>
                <h3 className="text-sm font-medium mb-2">Filter by Tag</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 text-xs ${
                      !selectedTag
                        ? darkMode
                          ? "bg-[#F4A261] text-[#1A1A1A]"
                          : "bg-[#1A1A1A] text-white"
                        : darkMode
                        ? "bg-[#333333]"
                        : "bg-[#EEEEEE]"
                    }`}
                  >
                    All Tags
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`flex items-center px-3 py-1 text-xs ${
                        selectedTag === tag
                          ? darkMode
                            ? "bg-[#F4A261] text-[#1A1A1A]"
                            : "bg-[#1A1A1A] text-white"
                          : darkMode
                          ? "bg-[#333333]"
                          : "bg-[#EEEEEE]"
                      }`}
                    >
                      <Tag size={12} className="mr-1 opacity-70" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div
            className={`${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg p-8 text-center`}
          >
            <p className="text-lg">Loading journal entries...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            className={`${
              darkMode ? "bg-[#2A2A2A]" : "bg-white"
            } shadow-lg p-8 text-center border-l-4 border-red-500`}
          >
            <p className="text-lg mb-2">Error</p>
            <p className="opacity-70">{error}</p>
          </div>
        )}

        {/* Journal entries */}
        {!isLoading && !error && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Recent Entries ({filteredEntries.length})
            </h2>

            {filteredEntries.length === 0 ? (
              <div
                className={`${
                  darkMode ? "bg-[#2A2A2A]" : "bg-white"
                } shadow-lg p-8 text-center`}
              >
                <p className="text-lg mb-2">No journal entries found</p>
                <p className="opacity-70">
                  {journalEntries.length === 0
                    ? "Start journaling to see your entries here"
                    : "Try adjusting your filters or search query"}
                </p>
                <Link
                  to="/journaling-alt"
                  className={`inline-flex items-center mt-4 px-4 py-2 ${
                    darkMode
                      ? "bg-[#F4A261] text-[#1A1A1A]"
                      : "bg-[#E68A41] text-white"
                  } hover:opacity-90 transition-opacity`}
                >
                  <Plus size={18} className="mr-2" />
                  New Entry
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEntries.map((entry) => (
                  <Link
                    to={`/journal/${entry._id}`}
                    key={entry._id}
                    className={`${
                      darkMode ? "bg-[#2A2A2A]" : "bg-white"
                    } shadow-lg p-6 flex flex-col h-full relative group cursor-pointer overflow-hidden`}
                  >
                    {/* Mood indicator */}
                    {entry.mood && (
                      <div
                        className="absolute top-0 left-0 w-2 h-full"
                        style={{ backgroundColor: getMoodColor(entry.mood) }}
                      ></div>
                    )}

                    <div className="mb-2 flex justify-between items-start pl-3">
                      <h3 className="text-lg font-bold line-clamp-1 pr-6">
                        {entry.title}
                      </h3>
                      {entry.mood && (
                        <span className="text-xl" title={entry.mood}>
                          {getMoodEmoji(entry.mood)}
                        </span>
                      )}
                    </div>

                    <div className="text-sm opacity-70 mb-3 flex items-center pl-3">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(entry.date)}</span>
                    </div>

                    <p className="line-clamp-4 mb-4 flex-grow opacity-90 pl-3">
                      {entry.content}
                    </p>

                    <div className="mt-auto pl-3">
                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-0.5 ${
                                darkMode ? "bg-[#333333]" : "bg-[#EEEEEE]"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center text-xs opacity-70">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{entry.wordCount} words</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons (visible on hover) */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteEntry(entry._id);
                        }}
                        className="p-1 hover:text-red-500 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-[#F4A261]"
                }`}
              >
                <ArrowLeft size={16} />
              </button>

              <div className="mx-4">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-[#F4A261]"
                }`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile action button */}
      <Link
        to="/journaling-alt"
        className={`md:hidden fixed bottom-6 right-6 w-14 h-14 ${
          darkMode ? "bg-[#F4A261]" : "bg-[#E68A41]"
        } flex items-center justify-center shadow-lg`}
      >
        <Plus
          size={24}
          className={darkMode ? "text-[#1A1A1A]" : "text-white"}
        />
      </Link>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
