import { kafkaClient } from "..";

export async function initAdmin() {
  const admin = kafkaClient.admin();
  console.log("Admin connecting ...");
  admin.connect();
  console.log("Admin connected successfully ...");

  console.log("Creating topic ...");
  await admin.createTopics({
    topics: [
      {
        topic: "auth",
        numPartitions: 1,
      },
    ],
  });
  console.log("Topics created successfully ...");

  console.log("Admin disconnecting ...");
  await admin.disconnect();
  console.log("Admin disconnected successfully ...");
}

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

export async function consumeEvent() {
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
    },
  });
}
