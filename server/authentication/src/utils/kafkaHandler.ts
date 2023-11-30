import { kafkaClient } from "..";

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

    messages: [{ key, partition: 0, value: JSON.stringify(message) }],
  });

  await producer.disconnect();
}
