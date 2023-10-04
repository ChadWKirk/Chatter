import { useState } from "react";
import "./Normalize.css";
import "./App.css";

function ChatRoomPage() {
  return (
    <div id="chatRoom--PageContainer">
      <div id="chatRoom--HeaderContainer">
        <h1>Chatter</h1>
        <div>ColorPicker</div>
      </div>
      <div id="chatRoom--ChatContainer">
        <form>
          <input></input>
          <button>Send</button>
        </form>
      </div>
      <div id="chatRoom--OnlineContainer"></div>
    </div>
  );
}

export default ChatRoomPage;
