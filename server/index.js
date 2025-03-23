import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js"; // Import the User model
import Journal from "./models/journal.js"; // Import the Journal model

import serverless from "serverless-http";

const app = express();

app.use(cors({ origin: "https://cozyminds.vercel.app/" }));
app.use(urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Cozy Minds!");
});

// 🔥 Handle Signup
app.post("/signup", async (req, res) => {
  try {
    const { nickname, email, password, age, gender, subscribe } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // Save new user
    const newUser = new User({
      nickname,
      email,
      password,
      age,
      gender,
      subscribe,
    });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Handle Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Save Journal Entry
app.post("/saveJournal", async (req, res) => {
  try {
    const { userId, title, content, mood, tags, wordCount, date } = req.body;

    // Validate required fields
    if (!userId || !title || !content) {
      return res.status(400).json({
        message:
          "Missing required fields. userId, title, and content are required.",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create new journal entry
    const newJournal = new Journal({
      userId,
      title,
      content,
      mood,
      tags,
      wordCount,
      date: date || new Date(),
    });

    await newJournal.save();

    res.status(201).json({
      message: "Journal entry saved successfully!",
      journal: newJournal,
    });
  } catch (error) {
    console.error("Error saving journal:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// 🔥 Get Journal Entries for a User
app.get("/journals/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Get all journal entries for the user
    const journals = await Journal.find({ userId }).sort({ date: -1 });

    res.status(200).json({ journals });
  } catch (error) {
    console.error("Error fetching journals:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Get a specific journal entry
app.get("/journal/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate journal ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid journal ID format." });
    }

    // Find the journal entry
    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    res.status(200).json({ journal });
  } catch (error) {
    console.error("Error fetching journal:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Update a journal entry
app.put("/journal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood, tags, wordCount } = req.body;

    // Validate journal ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid journal ID format." });
    }

    // Find and update the journal entry
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      { title, content, mood, tags, wordCount, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    res.status(200).json({
      message: "Journal entry updated successfully!",
      journal: updatedJournal,
    });
  } catch (error) {
    console.error("Error updating journal:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Delete a journal entry
app.delete("/journal/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate journal ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid journal ID format." });
    }

    // Find and delete the journal entry
    const deletedJournal = await Journal.findByIdAndDelete(id);

    if (!deletedJournal) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    res.status(200).json({
      message: "Journal entry deleted successfully!",
      journal: deletedJournal,
    });
  } catch (error) {
    console.error("Error deleting journal:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Update user profile
app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, email, age, gender, subscribe } = req.body;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Check if email is already in use by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Email already in use by another account." });
      }
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nickname, email, age, gender, subscribe },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Update user password
app.put("/user/:id/password", async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Validate password
    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // Find and update the user's password
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Verify user password
app.post("/verify-password", async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify password
    const isValid = user.password === password;

    res.status(200).json({ valid: isValid });
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔥 Delete user account
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Delete all user's journal entries
    await Journal.deleteMany({ userId: id });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Account deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Connect to MongoDB and start the server
mongoose
  // .connect("mongodb://localhost:27017/CozyMind")
  .connect(
    "mongodb+srv://madisettydharmadeep:cozyminds@cozyminds.yth43.mongodb.net/?retryWrites=true&w=majority&appName=cozyminds"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000 ");
    });
  })
  .catch((error) => console.log(error));

// export const handler = serverless(app); // ✅ export this
