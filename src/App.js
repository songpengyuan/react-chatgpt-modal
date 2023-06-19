import React, { useState } from "react";
import "./App.css";

import ChatgptRobot from "./components/chatgpt-robot/index.tsx";

function App() {
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const handleClckiBtn = () => {
    setVisible(!visible);
  };

  return (
    <div className="App">
      <ChatgptRobot
        visible={visible}
        title="这是自定义title"
        onClose={closeModal}
      />
      <div onClick={handleClckiBtn}>ChatGPT Robot</div>
    </div>
  );
}

export default App;
