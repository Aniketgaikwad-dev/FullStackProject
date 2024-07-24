from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

app = FastAPI()


users = []


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("Accepting client connection...")
    await websocket.accept()
    while True:
        try:
            # Wait for any message from the client
            data = await websocket.receive_text()
            print(data)
            # Send message to the client
            a = 1000
            await websocket.send_text("hehhet")
            # while a != 0:
            #     await websocket.send_text("Response from Websocket")
            #     a -= 1
            print("Sending")
            # print(data)
        except WebSocketDisconnect:
            #  manager.disconnect(websocket)
            # await manager.broadcast(f"Client #{client_id} left the chat")
            # print("error:", e)
            break
    print("Bye..")
