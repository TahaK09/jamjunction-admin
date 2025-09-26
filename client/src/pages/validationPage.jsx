import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Check from "../assets/check_icon.png";
import Lottie from "lottie-react";
import validateAnimation from "../assets/LoadingAnimation.json";

function Validate() {
  const { ticketId } = useParams();
  const [isValidating, setIsValidating] = useState(true);
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    const validateTicket = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/tickets/validate/${ticketId}`,
          { method: "POST" }
        );
        const data = await response.json();
        setValidationResult(data);
      } catch (err) {
        setValidationResult({ success: false, error: "Network error" });
      } finally {
        setIsValidating(false);
      }
    };
    validateTicket();
  }, [ticketId]);

  if (validationResult?.success) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-8">
        <img src={Check} alt="Success" className="w-24 h-24" />
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600 mt-4 text-center">
          Ticket Validated Successfully
        </div>
        <div className="text-base sm:text-lg text-gray-500 mt-2 text-center">
          Ticket ID: <span className="font-mono break-all">{ticketId}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-8">
      <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-red-600 mt-4 text-center">
        Validation Failed: Invalid Ticket
      </div>
      <div className="text-base sm:text-lg text-gray-500 mt-2 text-center">
        Ticket ID: <span className="font-mono break-all">{ticketId}</span>
      </div>
    </div>
  );
}

export default Validate;
