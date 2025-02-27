import React from "react";

function CommentInput() {
  return (
    <form className="flex items-center gap-2 mt-2">
      <input
        type="text"
        placeholder="Add comment"
        required
        className="w-full border border-gray-200 rounded-sm px-2 py-1 text-base outline-none"
      />
      <button className="bg-secondary px-4 py-1.5 rounded-sm text-white tracking-wide font-semibold text-sm">
        Add
      </button>
    </form>
  );
}

export default CommentInput;
