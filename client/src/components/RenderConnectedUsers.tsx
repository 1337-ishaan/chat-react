import React from "react";

let connectedUsers = [
  {
    username: "Ishaan",
  },
  {
    username: "Yash",
  },
  {
    username: "Rithik",
  },
  {
    username: "Rohan",
  },
  {
    username: "Parva",
  },
  {
    username: "Rajesh",
  },
];

const RenderConnectedUsers = () => {
  return (
    <div className="pl-5">
      <div className="text-4xl my-6 font-extrabold tracking-widest">USERS</div>
      <div>
        {connectedUsers.map((user: { username: string }, i: number) => (
          <div
            className="mb-1 font-medium divide-y divide-light-blue-400  border-b-2 border-blue-500 cursor-pointer  text-2xl"
            key={i}
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderConnectedUsers;
