function SearchOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 h-screen w-full inset-0 backdrop-blur-[4.5px]  z-40 "
    ></div>
  );
}

export default SearchOverlay;
