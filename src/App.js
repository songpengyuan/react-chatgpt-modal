import React, { useState } from "react";
import "./App.css";

import ChatgptRobot from "./components/chatgpt-robot/index.tsx";

function App() {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  const handleClckiBtn = () => {
    setVisible(!visible);
  };

  return (
    <div className="App">
      <ChatgptRobot visible={visible} title="" onClose={closeModal} />
      <div onClick={handleClckiBtn} className="start-button">
        ChatGPT Robot
      </div>
    </div>
  );
}

export default App;
