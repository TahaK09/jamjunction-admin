import React from "react";
import { useParams } from "react-router-dom";

function Validate() {
  const params = useParams();
  const { ticketId } = params;

  return <>This is Validate Page for ticket ID: {ticketId}, coming soon!</>;
}

export default Validate;
