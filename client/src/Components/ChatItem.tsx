import React from "react";
import { useState, useEffect } from "react";

function ChatItem({ Sender, Time, Message }) {
  return (
    <div id="chatRoom--ChatItem">
      <div id="chatRoom--ChatItemNameAndTime">
        <p id="chatRoom--ChatItemName">{Sender}</p>
        <p id="chatRoom--ChatItemTime">Today at {Time}</p>
      </div>
      <div id="chatRoom--ChatItemText">{Message}</div>
    </div>
  );
}

export default ChatItem;
