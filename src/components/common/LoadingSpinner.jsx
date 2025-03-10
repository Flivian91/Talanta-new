import React from "react";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5 z-50">
      <div className="h-16 w-16 border-4 border-t-transparent border-b-transparent border-secondary rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
