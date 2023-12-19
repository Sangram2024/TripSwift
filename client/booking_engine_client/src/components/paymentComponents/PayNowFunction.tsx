"use client";
import axios from "axios";
import React from "react";

type Props = {};

const PayNowFunction = (props: Props) => {
  const handlePayNowClick = async () => {
    const paymentStatus = "success";

    if (paymentStatus === "success") {
      try {
        const requestData = {
          room: "6580406ee6d93a1f7efce553",
          user: "658040764d2945ddeeb84575",
          property: "6580407ee41a7dd741059380",
          amount: 100.0,
          booking_dates: "2023-12-20",
          payment: "65804086a9317c837f044290",
          status: "pending",
          checkInDate: "2024-02-01",
          checkOutDate: "2024-02-05",
        };

        const response = await axios.post(
          "http://localhost:8080/api/v1/booking/createreservation",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status) {
          console.log(response.data.status);
          console.log("Reservation created successfully");
        } else {
          console.error(
            "Failed to create reservation:",
            response.data.error || "Unknown error"
          );
        }
      } catch (error: any) {
        console.error("An error occurred:", error.message || "Unknown error");
      }
    } else {
      console.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-2">
      <button className="bg-red-600 text-white p-4" onClick={handlePayNowClick}>
        Pay Now
      </button>
    </div>
  );
};

export default PayNowFunction;
