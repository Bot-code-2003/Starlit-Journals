"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart2 } from "lucide-react";
import { useDarkMode } from "../../context/ThemeContext";
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

const MoodDistribution = ({
  journalEntries,
  selectedMood,
  setSelectedMood,
}) => {
  const { darkMode } = useDarkMode();
  const [currentMonthEntries, setCurrentMonthEntries] = useState([]);

  // Filter entries to only show current month
  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filtered = journalEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    });

    setCurrentMonthEntries(filtered);
  }, [journalEntries]);

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

  // Get mood counts for chart
  const getMoodCounts = () => {
    const counts = {};
    moods.forEach((mood) => {
      counts[mood.name] = 0;
    });

    currentMonthEntries.forEach((entry) => {
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

  // Get current month name
  const getCurrentMonthName = () => {
    return new Date().toLocaleString("default", { month: "long" });
  };

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
      className={`${darkMode ? "bg-[#2A2A2A]" : "bg-white"} shadow-lg p-6 mb-8`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {getCurrentMonthName()} Mood Distribution
        </h2>
        <div className="flex items-center gap-2">
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
          <Link
            to="/mood-distributions"
            className={`px-3 py-1 text-xs flex items-center ${
              darkMode
                ? "bg-[#F4A261] text-[#1A1A1A]"
                : "bg-[#E68A41] text-white"
            }`}
          >
            <BarChart2 size={14} className="mr-1" />
            Detailed View
          </Link>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {currentMonthEntries.length > 0 ? (
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
                      selectedMood && selectedMood !== entry.name ? 0.4 : 0.8
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
              No mood data available for {getCurrentMonthName()}
            </p>
          </div>
        )}
      </div>

      <div className="text-xs opacity-70 mt-4 text-center">
        Based on {currentMonthEntries.length} entries this month. Click on a bar
        to filter by that mood.
      </div>
    </div>
  );
};

export default MoodDistribution;
