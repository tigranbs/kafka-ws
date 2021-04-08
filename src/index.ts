import ws from 'ws';
import { Kafka } from 'kafkajs';
import config from './config';

const WSS = new ws.Server({
  port: parseInt(config.port),
});

const kafka = new Kafka({
  clientId: config.kafkaClientId,
  brokers: [...config.kafkaBrokers],
});
