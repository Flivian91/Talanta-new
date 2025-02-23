import React from "react";

function UploadNavigation({activeButton, onActiveButton}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center w-full">
        <button
          onClick={() => onActiveButton(1)}
          className={` ${
            activeButton === 1 ? "bg-accent " : " bg-secondary "
          } h-10 w-10  rounded-full border-2 text-black font-semibold flex items-center justify-center`}
        >
          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            1
          </span>
        </button>
        <div className="block bg-gray-400/70 w-full flex-1 h-[1px]"></div>
      </div>
      <div className="flex items-center w-full">
        <button
          onClick={() => onActiveButton(2)}
          className={` ${
            activeButton === 2 ? "bg-accent " : " bg-secondary "
          } h-10 w-10  rounded-full border-2 text-black font-semibold flex items-center justify-center`}
        >
          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        <div className="block bg-gray-400/70 w-full flex-1 h-[1px]"></div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onActiveButton(3)}
          className={` ${
            activeButton === 3 ? "bg-accent " : " bg-secondary "
          } h-10 w-10  rounded-full border-2 text-black font-semibold flex items-center justify-center`}
        >
          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  );
}

export default UploadNavigation;
