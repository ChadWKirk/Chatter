// React
import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
// CSS
import "./Normalize.css";
import "./App.css";
// Pages
import EnterPage from "./Pages/EnterPage";
import ChatRoomPage from "./Pages/ChatRoomPage";

function App() {
  //test app page functions
  useEffect(() => {
    async function testFetch() {
      await fetch("http://localhost:5000", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) => console.log(response));
    }

    testFetch();
  }, []);
  //chat room page functions
  const [msgValue, setMsgValue] = useState("");
  const [onlineNowCount, setOnlineNowCount] = useState("12");
  useEffect(() => {
    //fetch amount of people online
    //setOnlineCount(fetchedOnlineNowCount) //isn't going to work because of loop but whatever
  }, [onlineNowCount]);
  async function submitMessage(e) {
    e.preventDefault();
    //take input value and send it to server to save into database
  }
  return (
    <div>
      <Routes>
        {/* <Route path="*" element={<NotFoundPage />}></Route> */}
        <Route path="/" element={<EnterPage />}></Route>
        <Route path="/:id/:name" element={<ChatRoomPage />}></Route>
      </Routes>
    </div>
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

    // <div id="chatRoom--PageContainer">
    //   <div id="chatRoom--ChatContainer">
    //     <div id="chatRoom--HeaderContainer">
    //       <h1>Chatter</h1>
    //       <div>ColorPicker</div>
    //     </div>
    //     <div>
    //       <ChatItemList />
    //     </div>

    //     <div>
    //       <form onSubmit={(e) => submitMessage(e)}>
    //         <input
    //           placeholder="Type Message Here"
    //           onChange={(e) => setMsgValue(e.target.value)}
    //         ></input>
    //         <button type="submit">Send</button>
    //       </form>
    //     </div>
    //   </div>
    //   <div id="chatRoom--OnlineContainer">
    //     <h2>Online Now - {onlineNowCount}</h2>
    //     <div id="chatRoom--OnlineNowListContainer">
    //       <div id="chatRoom--OnlineNowItem">ImSoBeast</div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
