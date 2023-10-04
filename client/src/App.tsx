import { useState } from "react";
import "./Normalize.css";
import "./App.css";

function App() {
  return (
    // <div id="enterContainer">
    //   <rect id="rect1"></rect>
    //   <rect id="rect2"></rect>
    //   <circle></circle>
    //   <h1 id="enterH1">Chatter</h1>
    //   <form id="enterForm">
    //     <input id="enterInput" placeholder="Name"></input>
    //     <a id="enterButton" href="#">
    //       Enter Room
    //     </a>
    //   </form>
    // </div>

    <div id="chatRoom--PageContainer">
      <div id="chatRoom--ChatContainer">
        <div id="chatRoom--HeaderContainer">
          <h1>Chatter</h1>
          <div>ColorPicker</div>
        </div>
        <div id="chatRoom--ChatItemList">
          <div id="chatRoom--ChatItem">
            <div id="chatRoom--ChatItemNameAndTime">
              <p id="chatRoom--ChatItemName">ImSoBeast</p>
              <p id="chatRoom--ChatItemTime">Today at 12:30AM</p>
            </div>
            <div id="chatRoom--ChatItemText">HELLO WORLD!</div>
          </div>
        </div>
        <div>
          <form>
            <input placeholder="Type Message Here"></input>
            <button>Send</button>
          </form>
        </div>
      </div>
      <div id="chatRoom--OnlineContainer">
        <h2>Online Now - 12</h2>
        <div id="chatRoom--OnlineNowListContainer">
          <div id="chatRoom--OnlineNowItem">ImSoBeast</div>
        </div>
      </div>
    </div>
  );
}

export default App;
