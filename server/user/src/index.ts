import { connect } from "mongoose";
import { DB, PORT, app } from "./server";
import { config } from "dotenv";
import { consumeEvents } from "./utils/kafkaEventHandler";
import { Kafka } from "kafkajs";

config();

export const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

connect(DB as string)
  .then((connection) => {
    console.log(
      `👦 User database successfully running on ${connection.connection.host}`
    );
    consumeEvents();
    app.listen(PORT, () => {
      console.log(`👦 User server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));
