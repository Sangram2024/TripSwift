import axios from "axios";
import Config from '../../config'
import React, { useState, useEffect } from "react";



export const hotelSearch = (data: any) => {
    // Determine whether to use location or destination based on the data object
    const searchKey = data.location ? 'location' : 'destination_type';
    const searchValue = data.location || data.destination;

    console.log("the search value",searchKey,searchValue)
  
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.searchUrl}/${data.url}`, {
          [searchKey]: searchValue,
        })
        .then((result: any) => {
          resolve(result.data);
        })
        .catch((error: any) => {
          console.error("Error in hotelSearch:", error);
          reject(error);
        });
    });
  };