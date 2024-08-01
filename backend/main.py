from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List, Dict
import uuid

app = FastAPI()


users = []


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)
        print(self.active_connections)

    def disconnect(self, websocket: WebSocket, room_id: str):
        self.active_connections[room_id].remove(websocket)
        if not self.active_connections[room_id]:
            del self.active_connections[room_id]

    async def send_personal_message(
        self, message: str, websocket: WebSocket, room_id: str
    ):
        await websocket.send_text(message)

    async def broadcast(self, message: str, room_id: str):
        for connection in self.active_connections[room_id]:
            print(connection)
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast("welcome to quiz game", room_id)
            # Broadcast to all connections in the room

    except WebSocketDisconnect:
        manager.disconnect(websocket, room_id)


@app.get("/create_room")
async def create_room():
    # Generate a unique room_id
    room_id = str(uuid.uuid4())
    return {"room_id": room_id}
