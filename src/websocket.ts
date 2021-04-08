import ws from 'ws';
import config from './config';

export class WebsocketHandler extends ws.Server {
  broadcast(data: Object) {
    this.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
    });
  }
}
