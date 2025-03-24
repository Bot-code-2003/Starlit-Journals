import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Components
import LandingPage from "./Components/Landing/LandingPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Journaling from "./Components/Journaling";
import JournalingAlt from "./Components/JournalingAlt";
import Dashboard from "./Components/Dashboard";
import JournalEntry from "./Components/JournalEntry";
import JournalEntries from "./Components/JournalEntries";
import ProfileSettings from "./Components/ProfileSettings";
import Features from "./Components/Landing/Features";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/journaling" element={<Journaling />} />
            <Route path="/journaling-alt" element={<JournalingAlt />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal/:id" element={<JournalEntry />} />
            <Route path="/journal-entries" element={<JournalEntries />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
