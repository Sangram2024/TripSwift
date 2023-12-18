import axios from "axios";
import Config from '../../config'

type DestinationTypeData = {
    destination_type: string;
  };

export const getAllHotelsByDestination = (data: DestinationTypeData) =>{
    return new Promise((resolve, reject) =>{
        axios.get(`${Config.BaseUrl}/login`,{
            data
        }).then((result) =>{
            resolve(result.data)
        })
        .catch((error)=>{
            console.log("the error",error)
            reject(error)
        })
    })
};