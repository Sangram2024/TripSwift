"use client";
import axios from "axios";
import React, { useEffect } from "react";

type Props = {};

const PayNowFunction = (props: Props) => {
  const handlePayNowClick = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>");

    const response = await axios.post(
      "http://localhost:8010/payment/checkout",
      { amount: 20 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response, ">>>>>>>>>>>>>>>>>>>.");

    var options = {
      key: "rzp_test_mBBfOCZrMx5wNc", // Enter the Key ID generated from the Dashboard
      amount: response.data.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Tripswift", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: response.data.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>start>>>>>>.');
        
        verifyPayment(response);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9437948060", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    // const paymentStatus = "success";

    // if (paymentStatus === "success") {
    //   try {
    //     const requestData = {
    //       room: "6580406ee6d93a1f7efce553",
    //       user: "658040764d2945ddeeb84575",
    //       property: "6580407ee41a7dd741059380",
    //       amount: 100.0,
    //       booking_dates: "2023-12-20",
    //       payment: "65804086a9317c837f044290",
    //       status: "pending",
    //       checkInDate: "2024-02-01",
    //       checkOutDate: "2024-02-05",
    //     };

    //     const response = await axios.post(
    //       "http://localhost:8080/api/v1/booking/createreservation",
    //       requestData,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     if (response.data.status) {
    //       console.log(response.data);
    //       console.log(response.data.status);
    //       console.log("Reservation created successfully");
    //     } else {
    //       console.error(
    //         "Failed to create reservation:",
    //         response.data.error || "Unknown error"
    //       );
    //     }
    //   } catch (error: any) {
    //     console.error("An error occurred:", error.message || "Unknown error");
    //   }
    // } else {
    //   console.error("Payment failed. Please try again.");
    // }
  };

  async function verifyPayment(response: any) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>start2>>>>>>.');

    const verify = await axios.post(
      "http://localhost:8010/payment/verify",
      {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(verify, ">>>>>>>>>>>>>>>>>>>>>>>>>>.");
  }
  return (
    <div className="flex justify-center items-center mt-2">
      <button className="bg-red-600 text-white p-4" onClick={handlePayNowClick}>
        Pay Now
      </button>
    </div>
  );
};

export default PayNowFunction;
