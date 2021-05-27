import React from "react";

const SendMessage = () => {
  return (
    <div className="">
      <div className="bg-white flex items-center rounded-full shadow-xl">
        <input
          className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="Message"
          type="text"
          placeholder="Search"
        />

        <div className="p-4">
          <button className="text-3xl bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
          {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
