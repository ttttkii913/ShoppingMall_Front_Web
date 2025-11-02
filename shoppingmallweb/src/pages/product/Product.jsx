import { useEffect, useState, useRef, useCallback } from "react";
import ProductItem from "../../components/product/ProductItem.jsx";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  // 상품 데이터 로드
  const fetchProducts = useCallback(() => {
    const newProducts = Array.from({ length: 6 }).map((_, i) => ({
      id: (page - 1) * 6 + i + 1,
      name: "COTTON BAG",
      price: "74,000",
    }));
    setProducts((prev) => [...prev, ...newProducts]);
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Intersection Observer (무한 스크롤)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center mt-20">
      {/* 상단 필터 라인 */}
      <div className="flex justify-between items-center w-full max-w-[1200px] px-8 mt-10 mb-6 text-gray-400 text-sm tracking-[0.15em]">
        <span className="flex gap-4 font-semibold font-kirang text-gray-400 text-xl">
          {["TOP", "OUTER", "PANTS", "ETC"].map((category) => (
            <button
              key={category}
              className="hover:text-[#d4a56d] transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </span>
        <div className="flex gap-4 font-pretendard text-sm text-gray-400">
          {["출시순", "낮은 가격순", "높은 가격순", "인기상품"].map((sort) => (
            <button
              key={sort}
              className="hover:text-black transition-colors duration-200"
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* 상품 목록 */}
      <div
        className="
          grid grid-cols-3 gap-x-8 gap-y-16
          justify-center
          w-full max-w-[1200px]
          px-8
        "
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* 로딩 트리거 */}
      <div
        ref={loader}
        className="h-20 flex justify-center items-center text-gray-500 animate-pulse"
      >
        Loading more...
      </div>  
    </div>
  );
}
