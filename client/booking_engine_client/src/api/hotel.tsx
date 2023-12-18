import axios from "axios";
import Config from '../../config'



export const hotelSearch = (data: any , url:any) =>{
    return new Promise((resolve, reject) =>{
        axios.get(`${Config.searchUrl}/${url}`,{
            data
        }).then((result:any) =>{
            resolve(result.data)
        })
        .catch((error:any)=>{
            console.log("the error",error)
            reject(error)
        })
    })
};