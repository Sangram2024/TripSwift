import { connect } from "mongoose";
import { DB, PORT, app } from "./app";
import { Kafka, Producer } from "kafkajs";
import { config } from "dotenv";
config();

export const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

connect(DB as string)
  .then((connection) => {
    console.log(`Authentication database successfully connected`);
    app.listen(PORT, () => {
      console.log(`Authentication Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));
