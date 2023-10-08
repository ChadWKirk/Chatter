import React from "react";
import { useState, useEffect } from "react";
import ChatItem from "./ChatItem";

function ChatItemList() {
  const [ChatItemList, setChatItemList] = useState(
    <div id="chatRoom--ChatItemList"></div>
  );
  useEffect(() => {
    let chatItemListArr = [];
    //fetch messages from database
    async function fetchMessages() {
      await fetch("http://localhost:5000/fetchMessages", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => {
            console.log(parsedJSON);
            //add messages to chatItemList
            for (let i = 0; i < parsedJSON.length; i++) {
              chatItemListArr.push(
                <ChatItem
                  Sender={parsedJSON[i].sender}
                  Time={parsedJSON[i].dateSent}
                  Message={parsedJSON[i].message}
                  key={i}
                />
              );
            }
            setChatItemList(
              <div id="chatRoom--ChatItemList">{chatItemListArr}</div>
            );
          })
      );
    }
    fetchMessages();
  }, []);

  return <>{ChatItemList}</>;
}

export default ChatItemList;
