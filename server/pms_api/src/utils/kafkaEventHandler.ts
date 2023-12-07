import { kafkaClient } from "..";

import  User  from "../model/user.model";

// export  async function handlerUserCreateEvent () {
//     const consumer = kafkaClient.consumer({groupId:"auth-group"})

//     console.log(`Consumer connecting ...`);
//   await consumer.connect();
//   console.log(`Consumer connected successfully ...`);

//   await consumer.subscribe({
//     topics: [process.env.KAFKA_AUTH_TOPIC as string],
//     fromBeginning: true,
//   });

//   await consumer.run({
//     eachMessage: async ({topic, partition, message}) =>{
//         console.log("the consumer message",message)
//         const userEvent = JSON.parse(message.value?.toString() || "{}");

//         console.log("user data in pms",message)

//         if(userEvent.user_Id){
//             console.log(`[${topic}]: PART:${partition}: User Created - UserID: `, userEvent.userId);
//             await createUserModel(userEvent.userId, userEvent.role );

//         }
//     }
//   })
// };

// async function createUserModel(userId:string, role:string) {
//     try{
//         const newUser = new User({
//             user_Id: userId,
//             role:role
//             // Set other property fields as needed
//           });
      
//           // Save the new property to the database
//           const savedProperty = await newUser.save();
//           console.log("user model created:", savedProperty);


//     }
//     catch (error){
//         console.error("Error updating user model:", error);

//     }
    
// }

export async function handlerUserCreateEvent() {
    const consumer = kafkaClient.consumer({ groupId: "auth-group" });
  
    console.log(`Consumer connecting ...`);
    await consumer.connect();
    console.log(`Consumer connected successfully ...`);
  
    await consumer.subscribe({
      topics: [process.env.KAFKA_AUTH_TOPIC as string],
      fromBeginning: true,
    });
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log(`[${topic}]: PART:${partition}: `, message.value?.toString());
        const userEvent = JSON.parse(message.value?.toString() || "{}");
        console.log("user Event",userEvent)
        if(userEvent._id){
            await createUserModel(userEvent._id, userEvent.role );
            
             }
      },
    });
  }


  async function createUserModel(userId:string, role:string) {
        try{
            const newUser = new User({
                userId: userId,
                role:role
                // Set other property fields as needed
              });
          
              // Save the new property to the database
              const savedProperty = await newUser.save();
              console.log("user model created:", savedProperty);
    
    
        }
        catch (error){
            console.error("Error updating user model:", error);
    
        }
        
    }



  