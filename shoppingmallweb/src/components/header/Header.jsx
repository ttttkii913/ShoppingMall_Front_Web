import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Navbar from "../../components/navigator/Navbar.jsx";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      // 아래로 스크롤시 안 보이게
      setVisible(false);
    } else {
      // 위로 스크롤시 보이게 
      setVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-black text-white flex items-center justify-between px-10 py-3 transition-transform duration-300 z-50
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <h1 className="text-xl tracking-[0.2em] font-semibold">SHOPPING</h1>

        <div className="flex items-center gap-6">
          <button className="hover:opacity-60 transition">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-60 transition">
            <ShoppingCart size={18} strokeWidth={1.5} />
          </button>
          <div className="w-px h-5 bg-gray-200"></div>
          <button className="font-kirang tracking-[0.3em] text-ml hover:opacity-60 transition">
            Login
          </button>
          <div className="w-px h-5 bg-gray-200"></div>
          <button onClick={toggleSidebar} className="hover:opacity-60 transition">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <Navbar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}
