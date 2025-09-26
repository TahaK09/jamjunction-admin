import {
  getTickets,
  getTicketById,
  validateTicket,
} from "../controllers/ticket.mjs";
import express from "express";

const ticketRouter = express.Router();

ticketRouter.get("/", getTickets);
ticketRouter.get("/:ticketId", getTicketById);
ticketRouter.post("/validate/:ticketId", validateTicket);

export default ticketRouter;
