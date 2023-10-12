import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//socket.io
import { socket } from "../socket";

const EnterPage = () => {
  const [name, setName] = useState();
  let navigate = useNavigate();

  async function enterChatServer(e) {
    e.preventDefault();

    await fetch("http://localhost:5000/addUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: `${name}` }),
    }).then((response) =>
      response
        .json()
        .then((resJSON) => JSON.stringify(resJSON))
        .then((stringJSON) => JSON.parse(stringJSON))
        .then((parsedJSON) => {
          console.log(parsedJSON);
          navigate(`/${parsedJSON.insertId}/${name}`);
        })
    );
    socket.emit("check_users", "null");
  }
  return (
    <div id="enterContainer">
      <rect id="rect1"></rect>
      <rect id="rect2"></rect>
      <circle></circle>
      <h1 id="enterH1">Chatter</h1>
      <form id="enterForm" onSubmit={(e) => enterChatServer(e)}>
        <input
          id="enterInput"
          placeholder="Name"
          maxLength="16"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit" id="enterButton">
          Enter Room
        </button>
      </form>
    </div>
  );
};

export default EnterPage;
