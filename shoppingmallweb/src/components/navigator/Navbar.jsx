import { Link } from "react-router-dom";

export default function Navbar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-30 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-110 bg-[#b8b8b8] shadow-xl z-40 transform transition-transform duration-500
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        rounded-l-[50%] overflow-hidden flex flex-col`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            X
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center font-kirang font-semibold text-3xl p-60 gap-15 text-gray-800 tracking-[1rem]">
          <Link to="/" onClick={onClose} className="hover:text-blue-500 transition">HOME</Link>
          <Link to="/mypage" onClick={onClose} className="hover:text-blue-500 transition">MYPAGE</Link>
          <Link to="/product" onClick={onClose} className="hover:text-blue-500 transition">PRODUCT</Link>
        </nav>

        <p className="text-lg absolute right-0 bottom-10 pr-10 text-gray-700 font-kirang">
          CONTACT <br />
          SHMALL@GMAIL.COM
        </p>
      </div>
    </>
  );
}
