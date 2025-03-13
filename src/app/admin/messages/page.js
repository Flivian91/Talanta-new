"use client";
import { useState } from "react";
import { FaPaperPlane, FaSmile, FaSearch } from "react-icons/fa";

const dummyChats = [
  { id: 1, name: "John Doe (Sponsor)", lastMessage: "Can we schedule a call?", unread: 2 },
  { id: 2, name: "Jane Smith (Sponsor)", lastMessage: "Thanks for the support!", unread: 0 },
  { id: 3, name: "Mark Wilson (Sponsor)", lastMessage: "I’d like to discuss talent investment.", unread: 1 },
];

export default function AdminMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chats, setChats] = useState(dummyChats);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function sendMessage() {
    if (!messageInput.trim()) return;
    alert(`Message sent: ${messageInput}`);
    setMessageInput("");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for Chat List */}
      <div className="w-1/3 bg-white shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Messages</h2>

        {/* Search Chat */}
        <div className="flex items-center border p-2 rounded-md mb-4">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search sponsors..."
            className="ml-2 outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Chat List */}
        {filteredChats.length === 0 ? (
          <p className="text-gray-500">No conversations found.</p>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded-lg flex justify-between items-center cursor-pointer mb-2 ${
                selectedChat?.id === chat.id ? "bg-blue-100" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div>
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {chat.unread}
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 bg-white shadow-md flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center">
              <h2 className="text-xl font-bold">{selectedChat.name}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col space-y-4">
                <div className="self-start bg-gray-200 p-3 rounded-lg max-w-sm">
                  <p>Hello, how can I assist you?</p>
                </div>
                <div className="self-end bg-blue-500 text-white p-3 rounded-lg max-w-sm">
                  <p>{selectedChat.lastMessage}</p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t flex items-center">
              <FaSmile className="text-gray-500 cursor-pointer mr-2" />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
