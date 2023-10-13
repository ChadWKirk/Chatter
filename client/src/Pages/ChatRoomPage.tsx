import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//socket.io
import { socket } from "../socket";
//components
import ChatItemList from "../Components/ChatItemList";
import ChatItem from "../Components/ChatItem";

function ChatRoomPage() {
  //NOTES
  //How to deal with time zones for chat app:

  // When user joins room, get current date and time for user

  // translate military time to normal time and get AM if under 12 and PM if 12 or over hours

  // if a message's date is not that same day, change "Today at" to "mm/dd/yyyy"

  
  let { id } = useParams();
  let { name } = useParams();
  const [messageList, setMessageList] = useState([]);
  //when window closes, remove user from db
  window.addEventListener("unload", (ev) => {
    ev.preventDefault();
    socket.emit("close", { id: id });
  });
  //check online users from socket when user is added or removed
  socket.on("show_users", (users) => {
    setOnlineNowCount(users.length);
    let onlineNowListArr = [];
    for (let i = 0; i < users.length; i++) {
      onlineNowListArr.push(
        <div id="chatRoom--OnlineNowItem" key={i}>
          {users[i].name}
        </div>
      );
    }
    setOnlineNowList(onlineNowListArr);
  });
  useEffect(() => {
    //if id in url is not a number, redirect to home page
    if (isNaN(id)) {
      window.location.href = `/`;
    }
    //if id and user are tied together, open chat room. if not, redirect to home
    async function checkUserInUrl() {
      await fetch("http://localhost:5000/checkUser", {
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

    console.log(messageList, " from empty useeffect");
  }, []);

  const [onlineNowCount, setOnlineNowCount] = useState("");
  const [socketState, setSocketState] = useState(true);

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
            console.log(parsedJSON, " online users");
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
            console.log(parsedJSON, " from fetch messages parsedJSON");
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
    console.log(messageList, " from fetchMessages()");
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
        name: `${name}`,
        date: `${date}`,
      }),
    }).then((response) => {
      socket.emit("send_message", { name: name, message: message, date: date });
    });

    //clear input field when message gets submitted

    document.getElementById("msgInput").value = "";
    //flip socket state just to get useEffect to fire (below)
    // setSocketState(!socketState);
  }

  //add new message to ChatItemList
  //when socket gets a "receive_message" from express, show the message to everyone by pushing it to messageList
  useEffect(() => {
    console.log("sending msg");
    console.log(messageList + " from socket state useeffect");
    socket.on("receive_message", (data) => {
      console.log("socket on");
      const newMsg = {
        id: messageList.length + 1,
        message: data.message,
        name: data.name,
        date: data.date,
      };
      setMessageList((messageList) => [...messageList, newMsg]);
    });
    return function cleanup() {
      socket.removeListener("receive_message");
    };
    // return () => socket.disconnect();
  }, [socketState]);

  return (
    <div id="chatRoom--PageContainer">
      <div id="chatRoom--ChatContainer">
        <div id="chatRoom--HeaderContainer">
          <h1>Chatter</h1>
          <div>ColorPicker</div>
        </div>
        <div id="chatRoom--ChatItemList">
          <ChatItemList messageList={messageList} />
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
