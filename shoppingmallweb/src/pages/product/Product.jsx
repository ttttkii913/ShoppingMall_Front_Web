import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../login/AxiosInstance.jsx";
import ProductItem from "../../components/product/ProductItem.jsx";

export default function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const loader = useRef(null);

  // 상품 조회
  const fetchProducts = useCallback(async () => {
  if (isLoading || isLast) return;

  try {
    setIsLoading(true);
    const res = await axiosInstance.get(`/product/all?page=${page}&size=6`);
    const list = res.data?.data?.products || [];

    if (list.length < 6) setIsLast(true);

    const mapped = list.map((p) => ({
      id: p.productId,
      name: p.name,
      price: p.price.toLocaleString(),
      image: p.imageUrl || null,
      options: p.options,
    }));

    setProducts((prev) => [...prev, ...mapped]);
  } catch (e) {
    console.error("상품 조회 실패:", e);
  } finally {
    setIsLoading(false);
  }
}, [page, isLoading, isLast]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 무한스크롤 IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [isLoading, isLast]);

  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pt-20">
      {/* 상단 필터 라인 */}
      <div className="sticky top-20 z-10 w-full border-b border-gray-200">
        <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto px-8 py-4 text-gray-400 text-sm tracking-[0.15em]">
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
      </div>

      {/* 상품 목록 */}
      <div
        className="
          grid grid-cols-3 gap-x-8 gap-y-16
          justify-center
          w-full max-w-[1200px]
          px-8 mt-10
        "
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClickProduct(product.id)}
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>

      {/* 로딩 트리거 */}
      <div ref={loader} className="h-20 flex justify-center items-center">
        {isLoading && (
          <div className="animate-pulse text-gray-400 font-kirang">
            Loading...
          </div>
        )}
        {!isLoading && isLast && (
          <span className="text-gray-400 text-sm font-kirang">마지막 상품입니다.</span>
        )}
      </div>
    </div>
  );
}
