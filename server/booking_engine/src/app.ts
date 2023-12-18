import { connect } from "mongoose";
import { DB, PORT, app } from "./server";
import { config } from "dotenv";
import { consumeEvent } from "./utils/kafkaEventHandler";
import { Kafka } from "kafkajs";

config();

export const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

connect(DB as string)
  .then((connection: typeof import("mongoose")) => {
    console.log(`Booking engine database successfully connected`);
    consumeEvent();
    app.listen(PORT, () => {
      console.log(`Booking engine Server listening on port ${PORT}`);
    });
  })
  .catch((err: any) => console.log(`Error: ${err}`));
