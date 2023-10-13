import React from "react";
import { useState, useEffect } from "react";

function ChatItem({ Sender, Date, Message }) {
  return (
    <div id="chatRoom--ChatItem">
      <div id="chatRoom--ChatItemNameAndTime">
        <p id="chatRoom--ChatItemName">{Sender}</p>
        <p id="chatRoom--ChatItemTime">Today at {Date}</p>
      </div>
      <div id="chatRoom--ChatItemText">{Message}</div>
    </div>
  );
}

export default ChatItem;
