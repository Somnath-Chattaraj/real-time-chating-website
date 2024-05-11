import { WebSocket } from "ws";
import { Chat } from "./chat";
import { JOIN_CHAT } from "./message";

export class ChatManager {
    // private clients: WebSocket[] = [];
    private chats: Chat[] = [];
    private clients: WebSocket[];
    private pendingClients: WebSocket | null;

    constructor () {
        this.clients = [];
        this.pendingClients = null;
        this.clients = []
    }

    
    addClient(client: WebSocket) {
        this.clients.push(client);
        this.processPendingClients(client);
    }
    
    removeClient(client: WebSocket) {
        this.clients = this.clients.filter(c => c !== client);
    }
    
    // public broadcast(message: string) {
    //     this.clients.forEach(client => {
    //     client.send(message);
    //     });
    // }

    private processPendingClients(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === JOIN_CHAT) {
                if (this.pendingClients) {
                    const chat = new Chat(this.pendingClients, socket);
                    this.chats.push(chat);
                    this.pendingClients = null;
                    chat.startChat(socket);
                } else {
                    this.pendingClients = socket;
                }
            }
        });

    }
}