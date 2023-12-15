import Hotel from "../model/hotel.model";
import { PropertyAddress } from "../model/property.address.model";
import { PropertyAminite } from "../model/property.aminites.model";
import { PropertyInfo,PropertyInfoType } from "../model/property.info.model";
import {Location, LocationType} from "../model/property.location.model";
import { Room } from "../model/room.model";
import elasticClient from "../service/elasticsearch";


// export async function createRoomIndexAndDoc() {

//   const propertyInfo = await Room.find().lean();
//   const client = elasticClient();

//   try {
//     propertyInfo.forEach(async (element) => {
//       const { _id, ...rest } = element;
//       const result = await client.index({
//         index: "property_room",
//         id: _id,
//         body: rest,
//       });
//     });
//   } catch (error) {
//     console.log("Error while indexing PropertyRoom to elasticsearch", error);
//   }
// }

export async function createPropertyIndexAndDoc() {
  // const propertyAminite = await PropertyAminite.find().lean();

  const location =  await Location.find().populate({path:'propertyId'}).populate({
    path: 'propertyId',
    populate: {
      path: 'property_aminite',
      model: 'PropertyAminite'
    }
  }).lean();
  
  const client = elasticClient();
  try {
    location.forEach(async (element) => {
      const { _id, ...rest } = element;
      const restData:LocationType & { room? : Array<any> | string} = rest;
      if(rest?.propertyId._id){
       const room =  await Room.find({propertyInfo_id:rest?.propertyId._id}).lean();
       restData.room = room;
      }
      const result = await client.index({
        index: "property_data",
        id: _id,
        body: restData,
      });
    });
  } catch (error) {
    console.log("Error while indexing Property to elasticsearch", error);
  }
}

