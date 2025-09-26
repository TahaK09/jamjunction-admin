import express from "express";
import { createEvent, getEvents, getEventById } from "../controllers/event.mjs";

const eventRouter = express.Router();

eventRouter.post("/", createEvent);
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);

export default eventRouter;
