import React from "react";

function CommentInput({ text, setText, isPending, onCreateComment }) {
  return (
    <form onSubmit={(e) => onCreateComment(e)} className="flex items-center gap-2 mt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isPending}
        type="text"
        placeholder="Add comment"
        required
        className="w-full border disabled:cursor-not-allowed disabled:bg-gray-100 border-gray-200 rounded-sm px-2 py-1 text-base outline-none"
      />
      <button className="bg-secondary px-4 py-1.5 rounded-sm text-white tracking-wide font-semibold text-sm">
        Add
      </button>
    </form>
  );
}

export default CommentInput;
