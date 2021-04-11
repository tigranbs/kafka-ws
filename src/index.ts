import { Kafka } from 'kafkajs';
import { WebsocketHandler } from './websocket';
import config from './config';

const wss = new WebsocketHandler({
  port: parseInt(config.port, 10),
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
};

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: [...config.kafka.brokers],
});

setInterval(async () => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({ topic: config.kafka.topics[0], messages: [{ value: 'TEST' }] });
  await producer.disconnect();
}, 10000);

(async () => {
  const consumer = kafka.consumer({ groupId: config.kafka.consumerGroupId });
  await consumer.connect();
  await Promise.all(
    config.kafka.topics.map((topic) => consumer.subscribe({ topic, fromBeginning: true })),
  );
  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const wsMessage = {
        value: message.value.toString(),
      };

      console.log(wsMessage);
      wss.broadcast(wsMessage);
    },
  });
})();
