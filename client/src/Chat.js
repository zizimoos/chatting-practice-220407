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
    if (message !== "") {
      const MessageData = {
        userName,
        room,
        message,
        time:
          String(new Date(Date.now()).getHours()).padStart(2, "0") +
          ":" +
          String(new Date(Date.now()).getMinutes()).padStart(2, "0") +
          ":" +
          String(new Date(Date.now()).getSeconds()).padStart(2, "0"),
      };
      await socket.emit("send_message", MessageData);
      setMessageList((list) => [...list, MessageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("EFFECT", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

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
          type="text"
          placeholder="write your message..."
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <button onClick={sendMessage}>&#9658;</button>
      </ChatFooter>
    </>
  );
}

export default Chat;
