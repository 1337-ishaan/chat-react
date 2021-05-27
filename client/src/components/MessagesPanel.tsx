import React from "react";

const MessagesPanel = () => {
  let senderID = "2121";
  let receiverID = "8989";
  const messagesData = [
    {
      sender: "2121",
      content: "Hey man, I got a MacBook pro",
      receiver: "8989",
    },
    {
      sender: "8989",
      content: "The M1 chip one o_o ?",
      receiver: "2121",
    },
    {
      sender: "2121",
      content: "Hell yeah",
      receiver: "8989",
    },
    {
      sender: "8989",
      content: "I wannaaaaa seeeeeeeeeeeeeeeeee",
      receiver: "2121",
    },
    {
      sender: "2121",
      content: "For sure bro, let's meet up this weekend ?",
      receiver: "8989",
    },
    {
      sender: "8989",
      content: "Done!!!",
      receiver: "2121",
    },
  ];
  // TODO: to check the logic for rendering alternate messages perfectly
  return (
    <div className="flex flex-col h-screen justify-end ">
      {" "}
      {messagesData.map((messages: any, i: number) => (
        <div>
          <span
            className={`px-4 py-2 my-2 text-xl  rounded-lg inline-block ${
              messages.sender === senderID
                ? "float-right rounded-br-none bg-blue-600 text-white"
                : "bg-gray-300 rounded-bl-none text-black"
            }`}
          >
            {messages.content}{" "}
          </span>
        </div>
      ))}{" "}
    </div>
  );
};

export default MessagesPanel;
