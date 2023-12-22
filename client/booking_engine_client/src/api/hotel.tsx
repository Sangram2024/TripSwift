import axios from "axios";
import Config from '../../config'
import React, { useState, useEffect } from "react";



export const hotelSearch = (data: any) => {
    // Determine whether to use location or destination based on the data object
    const searchKey = data.location ? 'location' : 'destination_type';
    const searchValue = data.location || data.destination;

    console.log("url",`${Config.searchUrl}/${data.url}`)


    console.log("the search value",searchKey,searchValue)
    if (searchKey == "location"){
      return new Promise((resolve, reject) => {
        axios
          .post(`${Config.searchUrl}/${data.url}`, {
            [searchKey]: searchValue,
            capacity:2
          })
          .then((result: any) => {
            resolve(result.data);
            console.log("all hotel data",result.data)
          })
          .catch((error: any) => {
            console.error("Error in hotelSearch:", error);
            reject(error);
          });
      });
    }
  
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.searchUrl}/${data.url}`, {
          [searchKey]: searchValue,
        })
        .then((result: any) => {
          resolve(result.data);
          console.log("all hotel data",result.data)
        })
        .catch((error: any) => {
          console.error("Error in hotelSearch:", error);
          reject(error);
        });
    });
  };


  export const roomsByProperty = (id:any) =>{
    console.log("id",id)
    return new Promise((resolve, reject)=>{
      axios.get(`${Config.BaseUrl}/api/v1/room/rooms_by_propertyId/${id}`)
      .then((result:any)=>{
        resolve(result.data);
          console.log("all rooms  data",result.data)
      })
      .catch((error: any) => {
        console.error("Error in romms data:", error);
        reject(error);
      });
    })
  };

  export const roomsById = (id:any) =>{
    return new Promise ((resolve, reject)=>{
      axios.get(`${Config.BaseUrl}/api/v1/room/${id}`)
      .then((result:any)=>{
        resolve(result.data)
      })
      .catch((error:any)=>{
        reject(error)
      })
    })
  }