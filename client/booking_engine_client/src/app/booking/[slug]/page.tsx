import { UserForm } from '@/components/forms/UserForm';
import BackButton from '@/components/ui/buttons/BackButton';
import { useRouter } from 'next/router';
import React from "react";

const page = () =>{
    return(
        <>
        <div className='m-8'>

        <BackButton/>
        </div>
        <UserForm/>
        </>
    )
}

export default page