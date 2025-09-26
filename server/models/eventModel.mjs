import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    eventSlug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // e.g. "18:00"
    },
    endTime: {
      type: String, // e.g. "21:00"
    },
    prices: [
      {
        tierName: { type: String, required: true }, // e.g. "Solo", "Group of 4"
        amount: { type: Number, required: true },
      },
    ],
    capacity: {
      type: Number,
      required: true, // max seats/tickets
    },
    ticketsSold: {
      type: Number,
      default: 0, // track how many booked
    },
    category: {
      type: String,
      enum: ["Music", "Workshop", "Theatre", "Sports", "Other"],
      default: "Other",
    },
    organizer: {
      type: String,
      default: "JamJunction Team",
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
