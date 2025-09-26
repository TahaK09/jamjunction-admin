import Ticket from "../models/ticketModel.mjs";

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket)
      return res
        .status(404)
        .json({ success: false, error: "Ticket not found" });
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: true, error: err.message });
  }
};

// Controller for Validating a Ticket
export const validateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket)
      return res
        .status(404)
        .json({ success: false, error: "Ticket not found" });

    if (ticket.isUsed)
      return res.status(400).json({
        success: false,
        error: "Ticket has already been used",
        ticket,
      });

    ticket.isUsed = true;
    await ticket.save();

    res.json({
      success: true,
      message: "Ticket validated successfully",
      ticket,
    });

    res.json({ success: true, message: "Ticket validated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
