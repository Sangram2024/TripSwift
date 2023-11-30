import { connect } from "mongoose";
import { DB, PORT, app } from "./app";
import { Kafka, Producer } from "kafkajs";
import { config } from "dotenv";
config();

const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

export async function produceEvent(
  topic: string,
  key: string,
  message: Object | Array<any>
) {
  const producer = kafkaClient.producer();

  console.log(`Connecting producer ...`);
  await producer.connect();

  console.log(`Producer connected successfully ...`);

  await producer.send({
    topic,
    messages: [{ key, value: JSON.stringify(message) }],
  });

  await producer.disconnect();
}

connect(DB as string)
  .then((connection) => {
    console.log(
      `Database successfully running on ${connection.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`Auth Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));
