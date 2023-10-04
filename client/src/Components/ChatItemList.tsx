import React from "react";
import { useState, useEffect } from "react";
import ChatItem from "./ChatItem";

function ChatItemList() {
  const [ChatItemList, setChatItemList] = useState(
    <div id="chatRoom--ChatItemList"></div>
  );
  useEffect(() => {
    //fetch messages from database
    //add messages to ChatItemList
    //test items
    const chatArray = [
      <ChatItem
        Sender={"ImSoBeast"}
        Time={"12:30AM"}
        Message={"HELLO WORLD!"}
      />,
      <ChatItem
        Sender={"ImSoAwesome"}
        Time={"12:30AM"}
        Message={"HELLO WORLD!"}
      />,
      <ChatItem
        Sender={"ImSoCool"}
        Time={"12:30AM"}
        Message={"HELLO WORLD!"}
      />,
    ];
    setChatItemList(chatArray);
  }, []);

  return <>{ChatItemList}</>;
}

export default ChatItemList;
