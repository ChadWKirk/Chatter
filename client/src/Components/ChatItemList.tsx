import React from "react";
import { useState, useEffect } from "react";
import ChatItem from "./ChatItem";

function ChatItemList({ messageList }) {
  return (
    <>
      {messageList.map((message) => (
        <ChatItem
          Sender={message.name}
          // Time={parsedJSON[i].dateSent}
          Message={message.message}
          key={message.id}
        />
      ))}
    </>
  );
}

export default ChatItemList;
