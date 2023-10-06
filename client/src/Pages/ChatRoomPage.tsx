import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//socket.io
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function ChatRoomPage() {
  let { id } = useParams();
  let { name } = useParams();
  useEffect(() => {
    //if id in url is not a number, redirect to home page
    if (isNaN(id)) {
      window.location.href = `/`;
    }
    //if id and user are tied together, open chat room. if not, redirect to home
    async function checkUserInUrl() {
      await fetch("/api/checkUser", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: `${id}`, name: `${name}` }),
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => {
            //if name and id don't match to an existing user in database
            if (parsedJSON.length == 0) {
              window.location.href = `/`;
            } else {
              if (parsedJSON[0].name !== name) {
                window.location.href = `/`;
              }
            }
          })
      );
    }
    //if id in url is a number, check if user and id are tied together
    if (!isNaN(id)) {
      checkUserInUrl();
    }
  }, []);
  //create message from input field
  const [message, setMessage] = useState();
  //put message that is received in a div element
  const [messageReceived, setMessageReceived] = useState(<div></div>);
  //happens when form is submitted
  function sendMessage(e) {
    console.log("sendMessage activated");
    //add new message to db
    //add new message to ChatItemList
    //update page with socket
    e.preventDefault();
    //clear input field when message gets submitted
    socket.emit("send_message", { name: name, message: message });
    document.getElementById("msgInput").value = "";
    //flip socket state just to get useEffect to fire
    setSocketState(!socketState);
  }
  const [socketState, setSocketState] = useState(true);
  //when socket gets a "receive_message" from express, show the message to everyone by pushing it to messageQue
  useEffect(() => {
    console.log("sending msg");
    socket.on("receive_message", (data) => {
      setMessageQue((messageQue) => [
        ...messageQue,
        <div id="messageReceived">
          {data.name}:{" "}
          <p style={{ fontWeight: "400", display: "inline" }}>{data.message}</p>
        </div>,
      ]);
    });
  }, [socketState]);
  //set up what message to show
  //the message that is displayed in the DOM
  const [showMsg, setShowMsg] = useState();
  useEffect(() => {
    console.log(messageQue.length, " length");
    console.log(messageQue, " que");
    //when messageQue is changed, show the first entry in messageQue array
    setShowMsg(messageQue[0]);
    //if messageQue.length > 0, every x seconds chop off first entry and show new first entry
    if (messageQue.length > 0) {
      setTimeout(() => {
        let messageQueCopy = messageQue;
        //cut off first 2 because for some reason it is adding the same thing twice when a user sends a message
        messageQueCopy.shift();
        messageQueCopy.shift();
        setMessageQue(messageQueCopy);
        setShowMsg(messageQue[0]);
        console.log(messageQue.length, " length");
        console.log(messageQue, " que");
        //need to make sure timer time is the same as css animation time for fade in/out
      }, 4000);
    }
  }, [messageQue]);

  return (
    <div id="chatRoom--PageContainer">
      <div id="chatRoom--ChatContainer">
        <div id="chatRoom--HeaderContainer">
          <h1>Chatter</h1>
          <div>ColorPicker</div>
        </div>
        <div>
          <ChatItemList />
        </div>

        <div>
          <form onSubmit={(e) => sendMessage(e)}>
            <input
              id="msgInput"
              placeholder="Type Message Here"
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div id="chatRoom--OnlineContainer">
        <h2>Online Now - {onlineNowCount}</h2>
        <div id="chatRoom--OnlineNowListContainer">
          <div id="chatRoom--OnlineNowItem">ImSoBeast</div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;
