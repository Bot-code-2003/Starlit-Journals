import React, { useState, useEffect } from "react";

const Features = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Handle scroll effect
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
    <div
      className={`min-h-screen dark:dark p-6 sm:p-0 dark:bg-[#1A1A1A] dark:text-[#F8F1E9] bg-[#F8F1E9] text-[#1A1A1A] font-sans flex flex-col items-center pt  -12 relative overflow-hidden transition-colors duration-300`}
    >
      {" "}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#FFD7BA] to-transparent opacity-70 dark:opacity-20 transition-opacity duration-300"></div>
      {/* SVG Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10 dark:opacity-5">
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
            stroke={darkMode ? "#F8F1E9" : "#1A1A1A"}
            strokeWidth="2"
          />
          <rect
            x="40"
            y="40"
            width="40"
            height="40"
            stroke={darkMode ? "#F8F1E9" : "#1A1A1A"}
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 dark:opacity-5">
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
            stroke={darkMode ? "#F8F1E9" : "#1A1A1A"}
            strokeWidth="2"
          />
          <circle
            cx="75"
            cy="75"
            r="25"
            stroke={darkMode ? "#F8F1E9" : "#1A1A1A"}
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10 dark:opacity-5">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 50H90M50 10V90"
            stroke={darkMode ? "#F8F1E9" : "#1A1A1A"}
            strokeWidth="2"
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
    </div>
  );
};

export default Features;
