import { connect } from "mongoose";
import { DB, PORT, app } from "./app";
import { Kafka, Producer } from "kafkajs";
import { config } from "dotenv";
import Razorpay from "razorpay";
import { consumeEvent } from "./utils/kafkaEventHandler";
config();

export const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

connect(DB as string)
  .then((connection: typeof import("mongoose")) => {
    console.log(`Payment database successfully connected`);
    consumeEvent();
    app.listen(PORT, () => {
      console.log(`Payment Server listening on port ${PORT}`);
    });
  })
  .catch((err: any) => console.log(`Error: ${err}`));
