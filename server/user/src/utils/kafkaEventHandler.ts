import { kafkaClient } from "..";
import User from "../models/user/user.model";

export async function consumeEvents() {
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
      console.log("user Event", userEvent);
      if (userEvent._id) {
        await createUserModel(
          userEvent._id,
          userEvent.role,
          userEvent.firstName,
          userEvent.lastName,
          userEvent.email,
          userEvent.password
        );
      }
    },
  });
}

async function createUserModel(
  userId: string,
  role: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const newUser = new User({
      _id: userId,
      role: role,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    // Save the new property to the database
    const userData = await newUser.save();
    console.log("user model created in :", userData);
  } catch (error) {
    console.error("Error updating user model:", error);
  }
}
