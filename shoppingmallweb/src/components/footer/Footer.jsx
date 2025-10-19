import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      // 닫혀 있을 때만 bottom 여부 반영
      if (!isOpen) {
        setIsBottom(scrolledToBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <footer className="fixed bottom-0 left-0 w-full flex flex-col items-center justify-end transition-all duration-700 ease-in-out z-50">
      <div
        className={`relative w-full transition-all duration-700 ease-in-out overflow-hidden shadow-md flex flex-col items-center justify-center
        ${isOpen ? "bg-[#b8b8b8] rounded-t-[70%] h-[30vh]" : "h-[30px]"}`}
      >
        {/* 화살표 버튼 (맨 아래 도달했거나 열려 있을 때만 표시) */}
        {(isBottom || isOpen) && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-1 text-black hover:opacity-70 transition"s
          >
            {isOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </button>
        )}

        <div
          className={`transition-all duration-700 flex flex-col items-center justify-center
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        >
          <div className="flex justify-between items-center w-full max-w-5xl px-12 text-black font-semibold mt-12 gap-12">
            {/* 왼쪽 CONTACT */}
            <div className="text-left font-kirang space-y-2 tracking-wider leading-relaxed">
              <p className="text-xl">CONTACT</p>
              <p className="text-xl">SHMALL@GMAIL.COM</p>
            </div>

            {/* 중앙 로고 */}
            <div className="text-center bg-white py-5 px-8 rounded shadow-md">
              <h2 className="text-xl tracking-[0.45em] font-semibold">
                S H O P P I N G
              </h2>
              <h2 className="text-xl tracking-[0.45em] font-semibold">M A L L</h2>
            </div>

            {/* 오른쪽 SNS */}
            <div className="text-right font-kirang space-y-2 tracking-wider leading-relaxed">
              <p className="text-xl">TWITTER</p>
              <p className="text-xl">INSTAGRAM</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
