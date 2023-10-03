import { useState } from "react";
import "./Normalize.css";
import "./App.css";

function App() {
  return (
    <div id="enterContainer">
      <rect id="rect1"></rect>
      <rect id="rect2"></rect>
      <circle></circle>
      <h1 id="enterH1">Chatter</h1>
      <form id="enterForm">
        <input id="enterInput" placeholder="Name"></input>
        <a id="enterButton" href="#">
          Enter Room
        </a>
      </form>
    </div>
  );
}

export default App;
