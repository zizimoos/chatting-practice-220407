import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ChatHeader = styled.div``;
const ChatBody = styled.div`
  width: 360px;
  height: 500px;
  background-color: #f5f5f5;
`;
const ChatFooter = styled.div``;
const Input = styled.input``;

function Chat({ socket, userName, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (message) {
      await socket.emit("send_message", {
        userName,
        room,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", ({ userName, message, time }) => {
      setMessageList((current) => [...current, { userName, message, time }]);
    });
  }, [socket]);
  console.log(messageList);
  return (
    <>
      <ChatHeader>
        <p>Live Chat</p>
      </ChatHeader>
      <ChatBody>
        {messageList.map((m, index) => (
          <div key={index}>
            <p>{m.userName}</p>
            <p>{m.message}</p>
            <p>{m.time}</p>
          </div>
        ))}
      </ChatBody>
      <ChatFooter>
        <Input
          value={message}
          type="text"
          placeholder="write your message..."
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></Input>
        <button onClick={sendMessage}>&#9658;</button>
      </ChatFooter>
    </>
  );
}

export default Chat;
