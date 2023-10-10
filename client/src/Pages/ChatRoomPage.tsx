import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//socket.io
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
//components
import ChatItemList from "../Components/ChatItemList";
import ChatItem from "../Components/ChatItem";

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

  const [onlineNowCount, setOnlineNowCount] = useState("");

  //pull list of users from database
  //runs any time a user is added or removed from databae (online/offline)
  const [onlineNowList, setOnlineNowList] = useState([]);
  useEffect(() => {
    async function checkOnlineUsers() {
      await fetch("http://localhost:5000/checkOnlineUsers", {
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
            console.log(parsedJSON);
            setOnlineNowCount(parsedJSON.length);
            let onlineNowListArr = [];
            for (let i = 0; i < parsedJSON.length; i++) {
              onlineNowListArr.push(
                <div id="chatRoom--OnlineNowItem" key={i}>
                  {parsedJSON[i].name}
                </div>
              );
            }
            setOnlineNowList(onlineNowListArr);
          })
      );
    }
    checkOnlineUsers();
    let chatItemListArr = [];
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
              chatItemListArr.push({
                id: i,
                message: parsedJSON[i].message,
                name: parsedJSON[i].sender,
                date: parsedJSON[i].dateSent,
              });
            }
            setMessageList(chatItemListArr);
          })
      );
    }
    fetchMessages();
  }, []);

  //create message from input field
  const [message, setMessage] = useState();
  //put message that is received in a div element
  const [messageReceived, setMessageReceived] = useState(<div></div>);
  //happens when form is submitted
  //update page with socket
  async function sendMessage(e) {
    console.log("sendMessage activated");
    e.preventDefault();
    //get date of sent message
    const date = new Date();
    //add new message to db
    await fetch("http://localhost:5000/sendMessage", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        message: `${message}`,
        // date: `${date}`,
        name: `${name}`,
      }),
    }).then((response) => {
      console.log(response);
    });

    //clear input field when message gets submitted
    socket.emit("send_message", { name: name, message: message });
    document.getElementById("msgInput").value = "";
    //flip socket state just to get useEffect to fire (below)
    setSocketState(!socketState);
  }
  const [socketState, setSocketState] = useState(true);
  const [messageList, setMessageList] = useState([]);

  //add new message to ChatItemList
  //when socket gets a "receive_message" from express, show the message to everyone by pushing it to messageList
  useEffect(() => {
    console.log("sending msg");
    console.log(messageList);
    let messageListArr = messageList;
    socket.on("receive_message", (data) => {
      messageListArr.push({
        id: messageList.length + 1,
        message: data.message,
        name: data.name,
        // date: parsedJSON[i].dateSent,
      });
      setMessageList(messageListArr);
    });
  }, [socketState]);

  return (
    <div id="chatRoom--PageContainer">
      <div id="chatRoom--ChatContainer">
        <div id="chatRoom--HeaderContainer">
          <h1>Chatter</h1>
          <div>ColorPicker</div>
        </div>
        <div id="chatRoom--ChatItemList">
          {messageList.map((message) => (
            <ChatItem
              Sender={message.name}
              // Time={parsedJSON[i].dateSent}
              Message={message.message}
              key={message.id}
            />
          ))}
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
        <div id="chatRoom--OnlineNowListContainer">{onlineNowList}</div>
      </div>
    </div>
  );
}

export default ChatRoomPage;
