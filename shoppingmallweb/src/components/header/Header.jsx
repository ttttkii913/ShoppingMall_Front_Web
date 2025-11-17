import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navigator/Navbar.jsx";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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
  });

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // 로그아웃 확인
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-black text-white flex items-center justify-between px-10 py-3 transition-transform duration-300 z-50
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <h1
          onClick={() => navigate("/")}
          className="text-xl tracking-[0.2em] font-semibold cursor-pointer hover:opacity-60 transition"
        >
          SHOPPING
        </h1>

        <div className="flex items-center gap-6">
          <button className="hover:opacity-60 transition cursor-pointer">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="hover:opacity-60 transition"
          >
            <ShoppingCart size={18} strokeWidth={1.5} />
          </button>
          <div className="w-px h-5 bg-gray-200"></div>
          <button
            onClick={handleAuthClick}
            className="font-kirang tracking-[0.3em] text-ml hover:opacity-60 transition cursor-pointer"
          >
            {isLoggedIn ? "LOGOUT" : "LOGIN"}
          </button>
          <div className="w-px h-5 bg-gray-200"></div>
          <button
            onClick={toggleSidebar}
            className="hover:opacity-60 transition cursor-pointer"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <Navbar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}
