"use client"

import { UserForm } from '@/components/forms/UserForm';
import BackButton from '@/components/ui/buttons/BackButton';
import { useRouter } from 'next/router';
import React,{useEffect, useState} from "react";
import { useSearchParams } from 'next/navigation';
import { roomsById } from '@/api/hotel';




const page = () =>{
    const params = useSearchParams()
    const roomId = params.get("id")
    const [room, setRoom] = useState(null)

    // console.log("room details", room)

    useEffect(() => {
        if (roomId) {
          roomsById(roomId)
          .then(async (response)=>{
            if(response){
            setRoom(response)
            }
          })
          .catch((error)=>{
            console.log(error)
          })
        }
      }, [params]);

    return(
        <>
        <div className='m-8'>

        <BackButton/>
        </div>
        <UserForm roomData={room}/>
        </>
    )
}

export default page