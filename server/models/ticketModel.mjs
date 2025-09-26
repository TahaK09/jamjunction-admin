import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // reference to your Event model
      required: true,
    },
    bookingId: {
      type: String,
      unique: true,
      required: true, // e.g. JAM-A12F9C
    },
    orderId: {
      type: String,
      required: true, // Razorpay order ID
    },
    quantity: {
      type: Number,
      default: 1, // number of tickets booked
    },
    price: {
      type: Number,
      required: true, // total amount paid
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentId: {
      type: String, // store Razorpay/Stripe/UPI txn id
    },
    qrCode: {
      type: String, // store base64 image or URL to QR code
    },
    isUsed: {
      type: Boolean,
      default: false, // mark true once scanned at entry
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;
