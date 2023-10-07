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
  return (
    <div>
      <Routes>
        {/* <Route path="*" element={<NotFoundPage />}></Route> */}
        <Route path="/" element={<EnterPage />}></Route>
        <Route path="/:id/:name" element={<ChatRoomPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
