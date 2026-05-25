import { useState, useRef, useEffect } from "react";
import { Minus, X, Send, Bot, Droplet } from "lucide-react";
import axios from "axios";
import "../styles/chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]); // Starts empty, no dummy data
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Core function to send messages to your backend
  const sendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    // 1. Instantly show the user's message in the UI
    const newMsg = { id: Date.now(), sender: "user", text: textToSend };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true); // Shows "Bot is typing..." indicator

    try {
      const token = localStorage.getItem("token");

      // 2. POST to FastAPI /chat endpoint
      // Expected FastAPI route: POST /chat  →  { message: string }
      // Expected FastAPI response: { response: string }  OR  { reply: string }
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message: textToSend },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      // 3. Extract bot reply — handles both { response } and { reply } shapes
      const botText =
        res.data?.response ||
        res.data?.reply   ||
        res.data?.message ||
        "I received your message. How else can I help?";

      const aiReply = { id: Date.now() + 1, sender: "ai", text: botText };
      setMessages((prev) => [...prev, aiReply]);

    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorReply = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I'm having trouble connecting to the DonorHub network right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  if (!isOpen) {
    return (
      <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
        <Bot size={28} color="white" />
      </button>
    );
  }

  return (
    <div className="chatbot-window">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="ai-icon-bg">
            <Droplet size={14} color="white" fill="white" />
          </div>
          <div className="ai-title-stack">
            <strong>HemaAssist AI</strong>
            <span><span className="green-dot"></span> ALWAYS ACTIVE</span>
          </div>
        </div>
        <div className="chatbot-header-right">
          <button onClick={() => setIsOpen(false)}><Minus size={18} /></button>
          <button onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chatbot-body">
        {/* Static Welcome Card */}
        <div className="ai-welcome-card">
          <div className="ai-avatar square">
            <Bot size={16} color="white" />
          </div>
          <div className="welcome-text">
            <strong>Welcome to DonorHub</strong>
            <p>I'm here to help with your donation history, centers, or health questions.</p>
          </div>
        </div>

        {/* Dynamic Message Thread */}
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
            {msg.sender === "ai" && (
              <div className="ai-avatar square small">
                <Bot size={14} color="white" />
              </div>
            )}
            <div className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="chat-message-row ai">
             <div className="ai-avatar square small">
                <Bot size={14} color="white" />
              </div>
            <div className="chat-bubble ai typing-indicator">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input Area */}
      <div className="chatbot-footer">
        <div className="suggested-prompts">
          {/* Clicking these now actually sends the message! */}
          <button onClick={() => sendMessage("Center hours?")}>Center hours?</button>
          <button onClick={() => sendMessage("Donation tips")}>Donation tips</button>
        </div>
        
        <form className="chat-input-area" onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            placeholder="Ask anything..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" disabled={!inputText.trim() || isTyping}>
            <Send size={16} color="white" />
          </button>
        </form>
        <div className="chat-disclaimer">
          HEMAASSIST AI CAN MAKE MISTAKES.
        </div>
      </div>
    </div>
  );
}