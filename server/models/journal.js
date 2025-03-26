import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: [
        "Happy",
        "Neutral",
        "Sad",
        "Angry",
        "Anxious",
        "Tired",
        "Reflective",
        "Excited",
      ],
      required: false,
    },
    tags: [
      {
        type: String,
      },
    ],
    wordCount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }
  // { timestamps: true }
);

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;
