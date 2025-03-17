"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  ChevronDown,
  BarChart2,
  Mail,
  Coffee,
  Zap,
  Brain,
  TrendingUp,
  Search,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Peace");
  const [isScrolled, setIsScrolled] = useState(false);
  // const [darkMode, setdarkMode] = useState(false);

  const { darkMode, setDarkMode } = useDarkMode();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Subscribed: ${email} to ${category}`);

    // Show success message
    const button = e.target.querySelector("button");
    const originalText = button.innerHTML;
    button.innerHTML = "Success!";

    setTimeout(() => {
      button.innerHTML = originalText;
      setEmail("");
    }, 2000);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    // setdarkMode(!darkMode);
    // document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen dark:dark dark:bg-[#1A1A1A] dark:text-[#F8F1E9] bg-[#F8F1E9] text-[#1A1A1A] font-sans flex flex-col items-center px-6 py-12 relative overflow-hidden transition-colors duration-300`}
    >
      {/* Gradient Accents */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#FFD7BA] to-transparent opacity-70 dark:opacity-20 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/4 bg-gradient-to-t from-[#A9D6E5] to-transparent opacity-50 dark:opacity-20 transition-opacity duration-300"></div>

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? "bg-[#1A1A1A]/90 backdrop-blur-sm"
              : "bg-[#F8F1E9]/90 backdrop-blur-sm"
            : ""
        } py-4`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-xl font-bold tracking-wider">
            COZY
            <span
              className={`${darkMode ? "text-[#F4A261]" : "text-[#E68A41]"}`}
            >
              MINDS
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {["Home", "Features", "Pricing", "About"].map((item) => (
              <button
                key={item}
                className="font-medium hover:text-[#F4A261] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:text-[#F4A261] transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to={"/login"}
              className={`px-4 py-2 ${
                darkMode
                  ? "bg-[#F4A261] text-[#1A1A1A]"
                  : "bg-[#1A1A1A] text-white"
              } hover:opacity-90 transition-opacity`}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="z-10 text-center mt-24 mb-16">
        <div className="inline-block mb-4 px-3 py-1 border border-[#1A1A1A] dark:border-[#F8F1E9] text-xs font-medium tracking-wider">
          MENTAL CLARITY
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-[0.1em] mb-6">
          Cozy Minds
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-70 font-medium max-w-xl mx-auto">
          Clarity starts here—sharp and simple. A minimalist approach to mental
          wellness.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            className={`px-6 py-3 ${
              darkMode
                ? "bg-[#F4A261] text-[#1A1A1A]"
                : "bg-[#1A1A1A] text-white"
            } hover:opacity-90 transition-opacity flex items-center space-x-2 group`}
          >
            <span>Get Started</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="z-10 flex flex-col items-center gap-24 w-full max-w-6xl">
        {/* Stats Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[#1A1A1A]/10 dark:border-[#F8F1E9]/10 py-12">
          {[
            { number: "10K+", label: "Active Users", icon: <Users /> },
            {
              number: "98%",
              label: "Satisfaction Rate",
              icon: <Star size={24} />,
            },
            {
              number: "24/7",
              label: "Mental Support",
              icon: <Brain size={24} />,
            },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-3 opacity-80">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-sm opacity-70 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Row */}
        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch w-full">
          {/* Feature 1: Daily Motivational Email */}
          <div
            className={`w-full md:w-1/2 h-auto ${
              darkMode
                ? "bg-[#2A2A2A]"
                : "bg-gradient-to-br from-[#FFD7BA] to-[#F4A261]"
            } p-8 flex flex-col justify-between shadow-sharp hover:translate-y-[-4px] transition-all duration-300`}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <Mail size={28} className="opacity-80" />
                <div
                  className={`px-2 py-1 text-xs font-medium ${
                    darkMode
                      ? "bg-[#F4A261] text-[#1A1A1A]"
                      : "bg-[#1A1A1A] text-white"
                  }`}
                >
                  DAILY INSIGHT
                </div>
              </div>
              <h2 className="text-3xl font-semibold">Daily Spark</h2>
              <p className="mt-4 text-base opacity-80 font-medium">
                One bold email daily—your pick: Peace, Productivity,
                Mindfulness, or Stress Relief.
              </p>
            </div>
            <ul className="mt-8 space-y-4 font-medium">
              <li className="flex items-start space-x-3">
                <Coffee size={18} className="mt-0.5 opacity-70" />
                <span>Quote to ignite your day</span>
              </li>
              <li className="flex items-start space-x-3">
                <Zap size={18} className="mt-0.5 opacity-70" />
                <span>Step to shift your vibe</span>
              </li>
              <li className="flex items-start space-x-3">
                <Brain size={18} className="mt-0.5 opacity-70" />
                <span>Thought to hold close</span>
              </li>
            </ul>
          </div>

          {/* Feature 2: Mood Tracking Dashboard */}
          <div
            className={`w-full md:w-1/2 h-auto ${
              darkMode
                ? "bg-[#2A2A2A]"
                : "bg-gradient-to-br from-[#A9D6E5] to-[#61A5C2]"
            } p-8 flex flex-col justify-between shadow-sharp hover:translate-y-[-4px] transition-all duration-300`}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <BarChart2 size={28} className="opacity-80" />
                <div
                  className={`px-2 py-1 text-xs font-medium ${
                    darkMode
                      ? "bg-[#61A5C2] text-[#1A1A1A]"
                      : "bg-[#1A1A1A] text-white"
                  }`}
                >
                  ANALYTICS
                </div>
              </div>
              <h2 className="text-3xl font-semibold">Mood Grid</h2>
              <p className="mt-4 text-base opacity-80 font-medium">
                Track your pulse—see what shapes your calm and take control of
                your mental landscape.
              </p>
            </div>
            <ul className="mt-8 space-y-4 font-medium">
              <li className="flex items-start space-x-3">
                <TrendingUp size={18} className="mt-0.5 opacity-70" />
                <span>Map your emotional flow</span>
              </li>
              <li className="flex items-start space-x-3">
                <Search size={18} className="mt-0.5 opacity-70" />
                <span>Pinpoint your triggers</span>
              </li>
              <li className="flex items-start space-x-3">
                <Star size={18} className="mt-0.5 opacity-70" />
                <span>Own your mental space</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full py-12">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-3 py-1 border border-[#1A1A1A] dark:border-[#F8F1E9] text-xs font-medium tracking-wider">
              THE PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-base opacity-70 font-medium max-w-xl mx-auto">
              Three simple steps to mental clarity and improved focus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                step: "01",
                title: "Sign Up",
                description:
                  "Choose your focus area and create your account in less than a minute.",
                icon: <Mail size={24} />,
              },
              {
                step: "02",
                title: "Daily Practice",
                description:
                  "Receive tailored content and track your progress with simple tools.",
                icon: <Coffee size={24} />,
              },
              {
                step: "03",
                title: "See Results",
                description:
                  "Watch your mental clarity improve with consistent, mindful practice.",
                icon: <TrendingUp size={24} />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-8 ${
                  darkMode ? "bg-[#2A2A2A]" : "bg-white"
                } shadow-sharp`}
              >
                <div className="text-sm font-bold text-[#F4A261] mb-4">
                  {item.step}
                </div>
                <div className="mb-4 opacity-80">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="opacity-70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signup Block */}
        <div
          className={`w-full max-w-2xl ${
            darkMode ? "bg-[#2A2A2A]" : "bg-white"
          } p-8 shadow-sharp border-t-4 border-[#F4A261]`}
        >
          <h3 className="text-2xl font-semibold text-center mb-6">
            Join the Calm
          </h3>
          <p className="text-center opacity-70 mb-8 max-w-md mx-auto">
            Sign up for our daily insights and start your journey to mental
            clarity today.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-3 appearance-none ${
                  darkMode
                    ? "bg-[#1A1A1A] border-[#333333]"
                    : "bg-[#F8F1E9] border-[#D9D9D9]"
                } border text-current focus:outline-none focus:border-[#F4A261] transition-all duration-300`}
              >
                <option value="Peace">Peace</option>
                <option value="Productivity">Productivity</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Overcoming Stress">Overcoming Stress</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-70"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`flex-1 px-4 py-3 ${
                  darkMode
                    ? "bg-[#1A1A1A] border-[#333333]"
                    : "bg-[#F8F1E9] border-[#D9D9D9]"
                } border text-current focus:outline-none focus:border-[#F4A261] transition-all duration-300`}
                required
              />
              <button
                type="submit"
                className={`px-6 py-3 ${
                  darkMode
                    ? "bg-[#F4A261] text-[#1A1A1A]"
                    : "bg-[#F4A261] text-white"
                } hover:opacity-90 transition-all duration-300`}
              >
                Sign Up
              </button>
            </div>
            <p className="text-xs opacity-60 text-center mt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </main>

      {/* Testimonials */}
      <section className="z-10 w-full max-w-6xl py-24">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 border border-[#1A1A1A] dark:border-[#F8F1E9] text-xs font-medium tracking-wider">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "The daily emails have transformed my morning routine. I feel more focused and prepared for the day.",
              author: "Alex K.",
              role: "Marketing Director",
            },
            {
              quote:
                "Mood Grid helped me identify patterns in my stress levels. Now I can anticipate and manage them better.",
              author: "Jamie T.",
              role: "Software Engineer",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className={`p-8 ${
                darkMode ? "bg-[#2A2A2A]" : "bg-white"
              } shadow-sharp`}
            >
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="text-[#F4A261] fill-current"
                  />
                ))}
              </div>
              <p className="text-lg mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center ${
                    darkMode
                      ? "bg-[#F4A261] text-[#1A1A1A]"
                      : "bg-[#1A1A1A] text-white"
                  }`}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="z-10 w-full max-w-6xl py-16 mb-12">
        <div
          className={`w-full p-12 ${
            darkMode ? "bg-[#2A2A2A]" : "bg-[#1A1A1A] text-white"
          } shadow-sharp`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p
                className={`opacity-80 max-w-md ${
                  darkMode ? "" : "text-white/80"
                }`}
              >
                Join thousands who have transformed their mental clarity with
                Cozy Minds.
              </p>
            </div>
            <button
              className={`px-8 py-4 ${
                darkMode
                  ? "bg-[#F4A261] text-[#1A1A1A]"
                  : "bg-white text-[#1A1A1A]"
              } hover:opacity-90 transition-opacity whitespace-nowrap`}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="z-10 w-full max-w-6xl py-12 border-t border-[#1A1A1A]/10 dark:border-[#F8F1E9]/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold tracking-wider mb-4">
              COZY
              <span
                className={`${darkMode ? "text-[#F4A261]" : "text-[#E68A41]"}`}
              >
                MINDS
              </span>
            </div>
            <p className="opacity-70 text-sm">
              Bringing mental clarity to your daily life with minimalist,
              effective tools.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Testimonials", "FAQ"],
            },
            {
              title: "Company",
              links: ["About", "Team", "Careers", "Press"],
            },
            {
              title: "Resources",
              links: ["Blog", "Support", "Contact", "Privacy"],
            },
          ].map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-70 hover:opacity-100 hover:text-[#F4A261] transition-all text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1A1A1A]/10 dark:border-[#F8F1E9]/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Cozy Minds • Built for your calm
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="opacity-60 hover:opacity-100 hover:text-[#F4A261] transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              className="opacity-60 hover:opacity-100 hover:text-[#F4A261] transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              className="opacity-60 hover:opacity-100 hover:text-[#F4A261] transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 9H2V21H6V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              className="opacity-60 hover:opacity-100 hover:text-[#F4A261] transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8V8.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        .shadow-sharp {
          box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.1);
        }

        .dark .shadow-sharp {
          box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.05);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Custom Users icon component
const Users = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LandingPage;
