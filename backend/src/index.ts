import {WebSocket, WebSocketServer} from "ws";
import { ChatManager } from "./chatManager";

const wss = new WebSocketServer({ port: 8080 });

const chatManager = new ChatManager();
wss.on("connection", (ws: WebSocket) => {
    // chat.addClient(ws);
    chatManager.addClient(ws);

    ws.on("disconnect", () => {
        chatManager.removeClient(ws);
    })
});

console.log("WebSocket server started on ws://localhost:8080");