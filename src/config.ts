// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const ENV = (
  name: string,
  defaultValue: string | null = null,
): string => {
  const value = process.env[name];
  if (value && value.length > 0) {
    return value;
  }
  if (defaultValue) {
    return defaultValue;
  }

  throw new Error(`Environment variable ${name} is required!`);
};

export default {
  port: ENV('PORT', '3000'),
  kafkaClientId: ENV('KAFKA_CLIENT_ID', 'ws-app'),
  kafkaBrokers: ENV('KAFKA_BROKERS', 'localhost:9092').replace(/\s/g, '').split(','),
};
