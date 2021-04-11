import ws from 'ws';

export class WebsocketHandler extends ws.Server {
  broadcast(data: Object) {
    this.clients.forEach((client) => {
      client.send(JSON.stringify(data));
    });
  }
}
