"use client";
import { useState } from "react";
import { FiSend, FiUser, FiCheckCircle } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const dummyMessages = [
  { id: 1, sender: "Talent John", message: "Hello! I'm interested in sponsorship.", time: new Date(), read: false },
  { id: 2, sender: "You", message: "Tell me more about your talent.", time: new Date(Date.now() - 5 * 60 * 1000), read: true },
  { id: 3, sender: "Talent John", message: "I am a dancer and I need support.", time: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false },
];

export default function SponsorMessagesPage() {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  function sendMessage() {
    if (!newMessage.trim()) return;
    const messageObj = {
      id: messages.length + 1,
      sender: "You",
      message: newMessage,
      time: new Date(),
      read: true,
    };
    setMessages([...messages, messageObj]);
    setNewMessage("");
  }

  return (
    <div className="p-6 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto bg-white shadow-md p-4 rounded-lg space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[75%] ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
              <div className="flex items-center gap-2">
                <FiUser className="text-lg" />
                <span className="font-semibold">{msg.sender}</span>
              </div>
              <p className="mt-1">{msg.message}</p>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                {msg.read && <FiCheckCircle />}
                {dayjs(msg.time).fromNow()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-md p-3 outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
          <FiSend />
        </button>
      </div>
    </div>
  );
}
