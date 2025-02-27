import React from "react";

function CommentPagination() {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="rounded-full text-white font-mono text-xs flex items-center justify-center w-5 h-5 bg-secondary">
        1
      </button>
      <button className="rounded-full text-white font-mono text-xs flex items-center justify-center w-5 h-5 bg-secondary">
        2
      </button>
      <button className="rounded-full text-white font-mono text-xs flex items-center justify-center w-5 h-5 bg-secondary">
        3
      </button>
    </div>
  );
}

export default CommentPagination;
