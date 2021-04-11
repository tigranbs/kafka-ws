# About

This project aims to make a simple distribution of Kafka consumer messages over Websocket by giving ability to spread across subscribed channels and data based conditional checking.

# Getting started

To run this project locally you just need Kafka on your environment or just use a provided Docker-Compose file to run project with pre-configured stuff.

Main configuration is inside `src/config.ts`, which is all based on environment variables, so you can just provide it during project run or change default values if you don't know how to change environment variables :)

## Running Docker-Compose

Currently app is configured to publish producer messages every 10 seconds, just to try out Websocket broadcasting that we have. To run everything just hit

```bash
# It will take about 10 seconds startup time
# because Kafka and Zookeeper have large uptimes 🤷‍♂️
docker-compose up -d
```

After all services is up you can make a connection to `ws://localhost:3000` which is the default client connection for receiving Websocket connections.
You can use some Google Chrome extension like [Smart Websocket Client](https://chrome.google.com/webstore/detail/smart-websocket-client/omalebghpgejjiaoknljcfmglgbpocdp) or just connect with a plain JS if you have a handy script.
