import React from "react";
import { useState, useEffect } from "react";
import ChatItem from "./ChatItem";

function ChatItemList({ messageList }) {
  return (
    <>
      {messageList.map((message) => (
        <ChatItem
          Sender={message.name}
          Date={message.date}
          Message={message.message}
          key={message.id}
        />
      ))}
    </>
  );
}

export default ChatItemList;
