import sampleImg from "../../assets/image/ProductSample.png";
import { useRef, useState, useEffect } from "react";

export default function MainProductSection() {
  const scrollRef = useRef(null);
  const [indicatorPos, setIndicatorPos] = useState(0);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth - el.clientWidth;
      const progress = scrollLeft / scrollWidth;

      // 진한 밑줄 위치 (0~100%)
      setIndicatorPos(progress * 100);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [1, 2, 3, 4, 5, 6];

  return (
    <div className="relative w-[70%] flex flex-col items-center">
      {/* 슬라이드 영역 + 버튼 */}
      <div className="relative w-full flex items-center">
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-[-40px] z-10 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
        >
          ←
        </button>

        {/* 슬라이드 영역 */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll scroll-smooth pb-2 hide-scrollbar"
        >
          {products.map((_, i) => (
            <div
              key={i}
              className="min-w-[250px] h-[330px] bg-gray-100 rounded-md overflow-hidden shadow-sm relative cursor-pointer"
            >
              <img
                src={sampleImg}
                alt={`product-${i}`}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-[-40px] z-10 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
        >
          →
        </button>
      </div>

      {/* 밑줄 + 이동하는 진한 부분 */}
      <div className="relative w-full h-[3px] bg-gray-300 mt-6 rounded-full overflow-hidden">
        <div
          className="absolute top-0 h-full bg-black rounded-full transition-all duration-150 w-[20%]"
          style={{ left: `${indicatorPos}%`, transform: "translateX(-50%)" }}
        />
      </div>
    </div>
  );
}
