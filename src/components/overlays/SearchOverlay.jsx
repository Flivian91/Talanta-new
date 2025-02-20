function SearchOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 h-screen w-full inset-0 bg-black bg-opacity-50 z-40 "
    ></div>
  );
}

export default SearchOverlay;
