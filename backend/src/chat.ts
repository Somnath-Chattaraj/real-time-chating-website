import WebSocket from 'ws';


export class Chat {
    public client1: WebSocket;
    public client2: WebSocket;

    constructor(client1: WebSocket, client2: WebSocket) {
        this.client1 = client1;
        this.client2 = client2;

        this.client1.send(JSON.stringify({ type: "join_chat", message: "You are now connected to the chat" }));
        this.client2.send(JSON.stringify({ type: "join_chat", message: "You are now connected to the chat" }));
    }

    startChat(client : WebSocket) {
        
        if (client === this.client2) {
            this.client2.on("message", (data) => {
                const message = JSON.parse(data.toString());
                if (this.client1) {
                    console.log("client2", message.message);
                    this.client1.send(JSON.stringify({message: message.message}));
                }
            });
        }

        if (client === this.client1) {
            this.client1.on("message", (data) => {
                const message = JSON.parse(data.toString());
                if (this.client2) {
                    console.log("client1", message.message);
                    this.client2.send(JSON.stringify({message: message.message}));
                }
            });
        }
    }
}

