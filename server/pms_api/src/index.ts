import { connect } from "mongoose";
import { DB, PORT, app } from "./server";
import { config } from "dotenv";
import {handlerUserCreateEvent} from "./utils/kafkaEventHandler";
import {Kafka} from "kafkajs";

config();

export const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

connect(DB as string)
  .then((connection) =>{
    console.log(
      `Database successfully running on ${connection.connection.host}`
    )
    handlerUserCreateEvent();
    app.listen(PORT, () => {
      console.log(`Pms server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));