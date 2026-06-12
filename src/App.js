
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import Sidebar from "./components/Sidebar";
import PromptCards from "./components/PromptCards";
import ThemeToggle from "./components/ThemeToggle";
import VoiceInput from "./components/VoiceInput";
import ExportPDF from "./components/ExportPDF";
import CodeBlock from "./components/CodeBlock";

import "./App.css";

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  const sendMessage = async () => {

    if (!message.trim() || loading)
      return;

    const userMessage = message;

    setHistory((prev) => [
      ...prev,
      userMessage,
    ]);

    const newChat = [
      ...chat,
      {
        sender: "user",
        text: userMessage,
      },
    ];

    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {

      const res = await fetch(
        "https://coding-mentor-llm.onrender.com/ask",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt: userMessage,
          }),
        }
      );

      const data =
        await res.json();

      let currentText = "";

      setChat([
        ...newChat,
        {
          sender: "ai",
          text: "",
        },
      ]);

      for (
        let i = 0;
        i < data.response.length;
        i++
      ) {

        currentText +=
          data.response[i];

        setChat([
          ...newChat,
          {
            sender: "ai",
            text: currentText,
          },
        ]);

        await new Promise(
          (resolve) =>
            setTimeout(resolve, 5)
        );
      }

    } catch (error) {

      setChat([
        ...newChat,
        {
          sender: "ai",
          text:
            "⚠️ Unable to connect to the AI server.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (

    <div
      className={
        darkMode
          ? "app dark"
          : "app light"
      }
    >

      <Sidebar
        history={history}
      />

      <div className="main">

        <div className="header">

          <div>

            <h1>
              💻 Rishitha Srija AI Coding Mentor
            </h1>

            <p>
              Learn, Debug,
              and Master Coding
            </p>

          </div>

          <ThemeToggle
            darkMode={
              darkMode
            }
            setDarkMode={
              setDarkMode
            }
          />

        </div>

        <PromptCards
          setMessage={
            setMessage
          }
        />

        <div className="chat-box">

          {chat.length === 0 && (

            <div className="welcome">

              <h2>
                👋 Welcome!
              </h2>

              <p>
                Ask me anything about
                React, Java,
                Python, DSA,
                AI, Machine Learning,
                Competitive Programming
                and more.
              </p>

            </div>
          )}

          {chat.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}
                className={`message ${msg.sender}`}
              >

                <div className="avatar">

                  {msg.sender === "user"
                    ? "👩‍💻"
                    : "🤖"}

                </div>

                <div className="bubble">

                  {msg.sender ===
                  "ai" ? (

                    <ReactMarkdown
                      components={{
                        code:
                          CodeBlock,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>

                  ) : (
                    msg.text
                  )}

                </div>

              </div>
            )
          )}

          {loading && (

            <div className="message ai">

              <div className="avatar">
                🤖
              </div>

              <div className="bubble typing">
                Thinking...
              </div>

            </div>
          )}

          <div
            ref={chatEndRef}
          ></div>

        </div>

        <div className="input-box">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Ask a coding question..."
          />

          <VoiceInput
            setMessage={
              setMessage
            }
          />

          <ExportPDF
            chat={chat}
          />

          <button
            onClick={
              sendMessage
            }
            disabled={loading}
          >
            {loading
              ? "..."
              : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;

