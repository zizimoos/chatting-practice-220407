import React from "react";
import styled from "styled-components";

const ChatHeader = styled.div``;
const ChatBody = styled.div``;
const ChatFooter = styled.div``;
const Input = styled.input``;

function Chat({ socket, userName, room }) {
  return (
    <>
      <ChatHeader>
        <p>Live Chat</p>
      </ChatHeader>
      <ChatBody></ChatBody>
      <ChatFooter>
        <Input type="text" placeholder="write your message..."></Input>
        <button>&#9658;</button>
      </ChatFooter>
    </>
  );
}

export default Chat;
