FROM node:lts-alpine

ADD yarn.lock /app/yarn.lock
ADD package.json /app/package.json

WORKDIR /app

RUN yarn

ENV SERVER=1

ADD . /app

RUN yarn build

CMD [ "node", "dist" ]
