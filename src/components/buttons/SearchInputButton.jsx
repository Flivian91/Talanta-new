import { AiOutlineSearch } from "react-icons/ai";
function SearchInputButton({ onClick }) {
  return (
    <div className="flex-1 flex justify-end md:justify-center">
      <button
        onClick={onClick}
        className="text-gray-500 md:hidden inline-block"
      >
        <AiOutlineSearch size={20} />
      </button>
      <div
        onClick={onClick}
        className=" hidden md:flex items-center gap-6 px-4 py-2 shadow border border-gray-3500 rounded text-gray-500 cursor-pointer"
      >
        <button className="">
          <AiOutlineSearch size={20} />
        </button>
        <button className="flex-1 font-normal tracking-wider">
          Search for Talents
        </button>
        <button className="text-sm border px-1.5 py-0.5 rounded-sm">
          Ctrl <span>K</span>
        </button>
      </div>
    </div>
  );
}

export default SearchInputButton;
