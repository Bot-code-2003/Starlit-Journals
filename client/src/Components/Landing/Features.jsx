import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useDarkMode } from "../../context/ThemeContext";
import {
  PenSquare,
  BarChart2,
  Mail,
  Calendar,
  Laugh,
  MessageSquare,
  Sliders,
  Brain,
} from "lucide-react";

const Features = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const features = [
    {
      icon: (
        <PenSquare
          size={40}
          className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4"
        />
      ),
      h1: "Daily Journaling",
      p: "Scribble your thoughts daily and snag cool monthly recaps!",
    },
    {
      icon: (
        <BarChart2
          size={40}
          className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4"
        />
      ),
      h1: "Mood Dashboard",
      p: "Track your vibes with funky graphs and smart tips!",
    },
    {
      icon: (
        <Mail size={40} className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4" />
      ),
      h1: "Custom Emails",
      p: "Get quirky emails tailored just for you, straight to your inbox!",
    },
    {
      icon: (
        <Calendar
          size={40}
          className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4"
        />
      ),
      h1: "Progress Updates",
      p: "Catch quarterly and yearly updates to see your epic journey!",
    },
    {
      icon: (
        <Laugh size={40} className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4" />
      ),
      h1: "Funny Stories",
      p: "Laugh at a silly story mirroring your monthly adventures!",
    },
    {
      icon: (
        <MessageSquare
          size={40}
          className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4"
        />
      ),
      h1: "AI Chat Friends",
      p: "Chat with AI buddies who feel like your best pals!",
    },
    {
      icon: (
        <Sliders
          size={40}
          className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4"
        />
      ),
      h1: "Enhanced Customization",
      p: "Tweak emails and more with your own funky style!",
    },
    {
      icon: (
        <Brain size={40} className="text-[#FFD7BA] dark:text-[#F8F1E9] mb-4" />
      ),
      h1: "Smart Recommendations",
      p: "Unlock extra clever tips to level up your experience!",
    },
  ];
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored User:", storedUser);

    if (storedUser) {
      setUser(storedUser);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen dark:bg-[#1A1A1A] dark:text-[#F8F1E9] bg-[#F8F1E9] text-[#1A1A1A] font-sans flex flex-col items-center p-6 sm:p-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FFD7BA] to-transparent opacity-70 dark:opacity-20 transition-opacity duration-300"></div>

      {/* Decorative SVG Elements */}
      <div className="absolute top-20 left-10 opacity-20 dark:opacity-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="20"
            y="20"
            width="80"
            height="80"
            stroke="#FFD7BA"
            strokeWidth="3"
            className="dark:stroke-[#F8F1E9]"
          />
          <rect
            x="40"
            y="40"
            width="40"
            height="40"
            stroke="#FFD7BA"
            strokeWidth="3"
            className="dark:stroke-[#F8F1E9]"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 dark:opacity-10">
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="75"
            cy="75"
            r="50"
            stroke="#FFD7BA"
            strokeWidth="3"
            className="dark:stroke-[#F8F1E9]"
          />
          <circle
            cx="75"
            cy="75"
            r="25"
            stroke="#FFD7BA"
            strokeWidth="3"
            className="dark:stroke-[#F8F1E9]"
          />
        </svg>
      </div>

      {/* Navigation */}
      <Navbar
        user={user}
        isScrolled={isScrolled}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-7xl mt-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#FFD7BA] to-[#1A1A1A] dark:to-[#F8F1E9] bg-clip-text text-transparent ">
          Awesome Features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2A2A2A] p-6 border-4 border-[#FFD7BA] dark:border-[#F8F1E9] shadow-xl hover:scale-105 transition-transform duration-300"
            >
              {feature.icon}
              <h2 className="text-2xl font-bold mb-2">{feature.h1}</h2>
              <p className="text-sm opacity-90">{feature.p}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
