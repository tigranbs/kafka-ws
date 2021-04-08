import { Kafka } from 'kafkajs';
import { WebsocketHandler } from './websocket';
import config from './config';

const wss = new WebsocketHandler({
  port: parseInt(config.port),
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: [...config.kafka.brokers],
});

(async () => {
  const consumer = kafka.consumer({ groupId: config.kafka.consumerGroupId });
  await consumer.connect();
  await Promise.all(
    config.kafka.topics.map(topic =>
      consumer.subscribe({ topic: topic, fromBeginning: true }),
    ),
  );
  await consumer.run({
    eachMessage: async ({ message, partition, topic }) => {
      console.log(message, partition, topic);
      if (!message.value) return;
      const wsMessage = {
        value: message.value.toString(),
      };

      console.log(wsMessage);
      wss.broadcast(wsMessage);
    },
  });
})();
