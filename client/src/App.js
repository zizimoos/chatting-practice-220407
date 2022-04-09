import styled from "styled-components";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io("http://localhost:3003");

const Container = styled.div`
  width: 768px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input``;

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (userName && room) {
      socket.emit("join_room", { userName, room });
    }
  };

  return (
    <Container>
      <h1>Hello World</h1>
      <Input
        type="text"
        placeholder="yourname"
        onChange={(e) => setUserName(e.currentTarget.value)}
      ></Input>
      <Input
        type="text"
        placeholder="roomNumber"
        onChange={(e) => setRoom(e.currentTarget.value)}
      ></Input>
      <button onClick={joinRoom}>Join a Room</button>
      <Chat socket={socket} userName={userName} room={room}></Chat>
    </Container>
  );
}

export default App;
