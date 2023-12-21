import axios from "axios";
import Config from '../../config'

type BookingType = {
  property: string;
  room: string;
  user: string;
  booking_user_name:string
  booking_user_email:string,
  booking_user_phone:Number,
  amount: Number;
  payment:string;
  booking_dates: Date;
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  reviews: string;
  createdAt: Date;
  updatedAt: Date;
  };
const createBooking = () =>{
    
    return new Promise ((resolve, reject)=>{
        axios.post(`${Config.bookingUrl}/createreservation`,{

        })
    })
}