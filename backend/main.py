from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List, Dict
import uuid

app = FastAPI()


users = []


class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_name: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = {}

        await manager.broadcast(f"{user_name} is joined the game!", room_id)
        if user_name not in self.active_connections[room_id]:
            self.active_connections[room_id][user_name] = {}
            self.active_connections[room_id][user_name]["data"] = {}
        self.active_connections[room_id][user_name]["connection"] = websocket

        await websocket.send_text(f"welcome to quiz game {user_name}")

        print(self.active_connections)

    async def disconnect(self, websocket: WebSocket, room_id: str, user_name: str):
        del self.active_connections[room_id][user_name]
        if not self.active_connections[room_id]:
            del self.active_connections[room_id]

        await manager.broadcast(f"{user_name} left the game!", room_id)

    async def send_personal_message(
        self, message: str, websocket: WebSocket, room_id: str
    ):
        await websocket.send_text(message)

    async def broadcast(self, message: str, room_id: str):
        for client in self.active_connections[room_id].keys():
            await self.active_connections[room_id][client]["connection"].send_text(
                message
            )


manager = ConnectionManager()


@app.websocket("/ws/{room_id}/{user_name}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, user_name: str = ""):
    await manager.connect(websocket, room_id, user_name)
    try:
        while True:
            data = await websocket.receive_text()
            print(data, room_id, user_name)
            # await manager.broadcast("welcome to quiz game", room_id)
            # Broadcast to all connections in the room

    except WebSocketDisconnect:
        await manager.disconnect(websocket, room_id, user_name)


@app.get("/create_room")
async def create_room():
    # Generate a unique room_id
    room_id = str(uuid.uuid4())
    return {"room_id": room_id}
