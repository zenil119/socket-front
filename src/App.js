import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
const App = () => {
  const [message, setMessage] = useState("");
  const [messageRecived, setMessageRecived] = useState("");
  const [disconnectMessage, setDisconnectMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  const disconnect = () => {
    socket.emit("disconnect_user", { message:"User is disconnectd" });
  };

  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessageRecived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Message...."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={disconnect}>Disconnect</button>
      <h1>Message:</h1>
      {messageRecived}
    </div>
  );
};

export default App;
