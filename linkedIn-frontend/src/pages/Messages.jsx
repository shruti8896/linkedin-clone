import React, { useState } from "react";
import profileImage from "../assets/profile-picture.png";
import Navbar from "../components/Navbar";

const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    headline: "Frontend Developer @ Google",
    lastMessage: "Sure, let's connect tomorrow!",
    time: "2m",
  },
  {
    id: 2,
    name: "Ananya Gupta",
    headline: "Software Engineer @ Microsoft",
    lastMessage: "Thanks for sharing.",
    time: "1h",
  },
  {
    id: 3,
    name: "Amit Verma",
    headline: "Backend Developer",
    lastMessage: "Can you review my PR?",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Priya Singh",
    headline: "UI/UX Designer",
    lastMessage: "Awesome project 👏",
    time: "2d",
  },
];

const dummyMessages = [
  {
    sender: "them",
    text: "Hi Shruti! Hope you're doing well.",
  },
  {
    sender: "me",
    text: "Hi Rahul! Yes, doing great. How about you?",
  },
  {
    sender: "them",
    text: "Doing good. Wanted to discuss a React opportunity.",
  },
  {
    sender: "me",
    text: "Sure! Let's discuss.",
  },
];

function Messages() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto h-[85vh] bg-white rounded-xl shadow-lg overflow-hidden flex">
      

      {/* Left Panel */}
      <div className="w-[35%] border-r flex flex-col">

        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Messages</h1>

          <input
            type="text"
            placeholder="Search messages"
            className="mt-3 w-full rounded-lg border px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="overflow-y-auto flex-1">

          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation)}
              className={`flex cursor-pointer gap-3 p-4 hover:bg-gray-100 transition ${
                selectedChat.id === conversation.id
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              <img
                src={profileImage}
                alt=""
                className="h-14 w-14 rounded-full"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h2 className="font-semibold">
                    {conversation.name}
                  </h2>

                  <span className="text-xs text-gray-500">
                    {conversation.time}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {conversation.headline}
                </p>

                <p className="text-sm truncate mt-1">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="border-b p-4 flex items-center gap-3">
          <img
            src={profileImage}
            alt=""
            className="h-12 w-12 rounded-full"
          />

          <div>
            <h2 className="font-semibold text-lg">
              {selectedChat.name}
            </h2>

            <p className="text-sm text-gray-500">
              {selectedChat.headline}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-5 space-y-4">

          {dummyMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-3 ${
                  message.sender === "me"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

        </div>

        {/* Input */}
        <div className="border-t p-4 flex gap-3">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          />

          <button className="bg-blue-600 text-white px-6 rounded-full hover:bg-blue-700 transition">
            Send
          </button>
        </div>

      </div>

    </div>
    </div>
  );
}

export default Messages;