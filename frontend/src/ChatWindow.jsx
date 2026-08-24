import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext";
import { useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChat,
    setPrevChat,
    setCurrThreadId,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setNewChat(false);
    console.log(prompt, currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      let res = await response.json();
      console.log(res);

      if (!response.ok) {
        console.log("API Error:", res.error);
        return;
      }

      setReply(res.reply);
      setCurrThreadId(res.threadId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //append new chat to previous chats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChat((prevChat) => [
        ...prevChat,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);

  const handleProfileClick = () =>{
    setIsOpen(!isOpen);
  }
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          NexaAI <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-solid fa-user" onClick={handleProfileClick}></i>
          </span>
        </div>
      </div>

      {
        isOpen && 
        <div className="dropDown">
          <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
        </div>
      }

      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getReply();
              }
            }}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">ChatGPT can make mistakes. Check important info.</p>
      </div>
    </div>
  );
}

export default ChatWindow;
