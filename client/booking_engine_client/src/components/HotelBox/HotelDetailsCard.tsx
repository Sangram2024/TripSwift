"use client"

import React,{useState,useEffect} from "react";
import { CalenderIcon } from "../ui/CalenderIcon";
import { GuestIcon } from "../ui/GuestIcon";
import { Star } from "../ui/Star";
import Image from "next/image";
import Img from "@/components/assets/doublebedroom.jpg";
import { useDispatch, useSelector } from "@/Redux/store";
import {useSearchParams} from 'next/navigation'

const HotelDetailsCard = (data:any) => {

  const [isClickable, setIsClickable] = useState("")
  const [bookData, setBookData] = useState({
    property: "",
    room: "",
    user:"",
    booking_user_name:"",
    booking_user_email:"",
    booking_user_phone:"",
    amount: "",
    payment:"",
    booking_dates: "",
    status: "",
    checkInDate: "",
    checkOutDate: "",
    reviews: ""
    
  })

  const query = useSearchParams()

  const imageUrl =
    "https://www.google.com/uhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpn6wvs8jjO-kh6Bpu53TdGrl5cKHmdERfPw&usqp=CAUrl?sa=i&url=https%3A%2F%2Fwww.businessinsider.in%2Fheres-why-hotel-room-rates-in-india-may-double-in-the-next-3-to-4-years%2Farticleshow%2F68664363.cms&psig=AOvVaw3vS1qmib69i8JDrURQt4ky&ust=1702532564318000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOipkKLai4MDFQAAAAAdAAAAABAE";
  const rating = 4.5;
  const roomName = "Deluxe Double Room";
  const description =
    "Spacious and comfortable room with a king-size bed and balcony.";
  const type = "Dulex";
  const bookingDateFrom = "2023-12-24";
  const bookingDateTo = "2023-12-27";
  const price = data?.data?.roomData?.data?.price;
  const discount = 0.1;
  const buttonText = "Book Now";

  const discountAmount = Math.round(price * discount);
  const totalPrice = price; // Replace with your actual total price
  const instantDiscount = 50; // Replace with your actual instant discount
  const couponDiscount = 100; // Replace with your actual coupon discount
  const payableAmount = totalPrice - instantDiscount - couponDiscount;

  console.log("inside the hotel card",bookData);

  const dispatch = useDispatch();

 
  const authUser = useSelector((state) => state.authReducer.user);

  const formUser = useSelector((state) => state.userFormReducer.formData);

  console.log(formUser.firstName);

  console.log(authUser?._id, "user data in hotel details card");




  console.log(formUser, "user data in hotel details card");
    const propertyId = formUser?.firstName
    console.log("-------------------------",propertyId)

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} filled={rating > i ? true : false} />);
    }




  const handlePayNowClick = async (payableAmount:any) => {
    // console.log(">>>>>>>>>>>>>>>>>>>");

    const response = await axios.post(
      "http://localhost:8010/payment/checkout",
      { amount: payableAmount },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response, ">>>>>>>>>>>>>>>>>>>.");

    var options = {
      key: "rzp_test_mBBfOCZrMx5wNc", // Enter the Key ID generated from the Dashboard
      amount: response.data.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: response.data.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>start>>>>>>.');
        
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
    
  };

  async function verifyPayment(response: any) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>start2>>>>>>.');

    const verify = await axios.post(
      "http://localhost:8010/payment/verify",
      {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        roomData:data?.data?.roomData
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(verify.data.status == 'success'){
      reserved_room('success');
    }
    // console.log(verify, ">>>>>>>>>>>>>>>>>>>>>>>>>>.");
  }

  // console.log(data?.data,'>>>>>>>>>>>>>.ss');
 
  
  async function reserved_room(paymentStatus:string) {

     if (paymentStatus === "success") {
      let currentDate = new Date().toJSON().slice(0, 10);
      try {
        const requestData = {
          room: data?.data?.roomData.data._id,
          user: authUser._id,
          property: data?.data?.roomData.data.propertyInfo_id,
          amount: payableAmount,
          booking_dates: currentDate,
          payment: "65804086a9317c837f044290",
          status: "pending",
          checkInDate: bookingDateFrom,
          checkOutDate: bookingDateTo,
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
          console.log(response.data,'>>>>>>>>>>>>>>>>.');
          console.log(response.data.status);
          console.log("Reservation created successfully");
          router.push('/')
          
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
    
  }

  return (
    <div className="bg-white shadow-md rounded overflow-hidden max-w-2xl mx-auto border">
      <div className="flex flex-col">
        <div className="flex justify-between m-4">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {data?.data?.roomData?.data?.name}
            </h2>

            <p className="text-gray-600  mb-4">
              {data?.data?.roomData?.data?.description}
            </p>
            <div className="flex items-center ">
              <span className="text-sm text-gray-600  mr-2">{rating}</span>
              {stars}
              <span className="text-xs text-gray-600 ml-2">(251 ratings)</span>
            </div>
          </div>

          <div className="border-solid border-1 border-gray-300 p-0.5">
            <Image src={Img} width={300} height={100} alt="hotel image" />
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center mb-6">
            <span className="text-gray-700 font-bold flex items-center">
              <span className="mr-1">
                <GuestIcon />
              </span>
              {type}
            </span>
          </div>
          <div className="flex items-center mb-6">
            <span className="text-gray-700 font-bold flex items-center">
              <span className="mr-1">
                <CalenderIcon />
              </span>
              {bookingDateFrom} - {bookingDateTo}
            </span>
          </div>
          <hr className="my-3 border-gray-200 mb-4" />

          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 mr-2">
              Room Price for 1 Night X 1 Guest:
            </span>
            <span className="text-lg  text-gray-800">{totalPrice}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 mr-2">Instant discount:</span>
            <span className="text-sm  text-gray-500">-{instantDiscount}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600 mr-2"> Coupon Discount:</span>
            <span className="text-sm  text-gray-500">-{couponDiscount}</span>
          </div>
          <div className="flex items-center justify-between ">
            <span className="text-gray-600 mr-2">Payable Amount:</span>
            <span className="text-lg font-bold text-gray-800">
              {payableAmount}
            </span>
          </div>
          <div className="flex justify-end mt-8 mb-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700"
          // onClick={handleClick}
        >
          {buttonText}
        </button>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsCard;
