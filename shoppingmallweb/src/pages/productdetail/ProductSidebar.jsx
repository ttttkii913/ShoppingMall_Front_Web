import { useState } from "react";
import { Star, X } from "lucide-react";

import ColorWhiteImg from "../../assets/image/ProductItemImg.png";
import ColorBlackImg from "../../assets/image/ProductItemImg.png";
import ColorBlueImg from "../../assets/image/ProductItemImg.png";

export default function ProductSidebar({ product }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (!product) return null;

  const colors = [
    { name: "white", img: ColorWhiteImg },
    { name: "black", img: ColorBlackImg },
    { name: "blue", img: ColorBlueImg },
  ];

  const addOption = (color, size) => {
    const newOption = {
      color,
      size,
      quantity: 1,
      id: `${color}-${size}`,
    };

    setSelectedOptions((prev) => {
      const exists = prev.some(
        (opt) => opt.color === color && opt.size === size
      );
      if (exists) return prev;
      return [...prev, newOption];
    });
  };

  // option
  const handleSelectColor = (color) => {
    setSelectedColor(color);
    addOption(color, selectedSize);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    addOption(selectedColor, size);
  };

  const handleQuantityChange = (id, type) => {
    setSelectedOptions((prev) =>
      prev.map((opt) =>
        opt.id === id
          ? {
              ...opt,
              quantity:
                type === "plus"
                  ? opt.quantity + 1
                  : opt.quantity > 1
                  ? opt.quantity - 1
                  : 1,
            }
          : opt
      )
    );
  };

  const handleRemoveOption = (id) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  return (
    <div className="hidden md:block">
  <div className="fixed top-20 right-20 w-[28%] max-h-[calc(100vh-100px)] overflow-auto hide-scrollbar bg-white rounded-2xl shadow-md p-6 space-y-5 font-pretendard">
        {/* 브랜드 영역 */}
        <div className="flex justify-between items-center text-sm font-pretendard text-gray-500">
          <span className="font-semibold">BRAND NAME</span>
          <span>❤️ 1.2천</span>
        </div>

        {/* 카테고리 */}
        <div className="text-sm text-gray-500">
          잡화 <span className="text-gray-400">{">"}</span> 가방
        </div>

        {/* 상품명 */}
        <h2 className="text-xl font-bold tracking-wider">{product.name}</h2>

        {/* 별점 */}
        <div className="flex items-center space-x-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500">(후기 32개)</span>
        </div>

        {/* 가격 */}
        <div className="mt-3 space-y-1">
          <p className="text-sm text-gray-400 line-through">89,000원</p>
          <div className="text-2xl font-bold">
            <span className="text-black mr-2">45%</span>
            <span className="text-red-600">49,000원</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">최대 적립금 2,500원</p>
        </div>

        {/* 색상 선택 */}
        <div className="space-y-3 mt-4">
          <label className="block text-sm text-gray-500 mb-1">색상</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => handleSelectColor(color.name)}
                className={`w-15 h-15 border-1 p-1 transition ${
                  selectedColor === color.name
                    ? "border-gray-900 scale-105"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <img
                  src={color.img}
                  alt={color.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* 사이즈 선택 */}
          <label className="block text-sm text-gray-500 mt-4 mb-1">
            사이즈
          </label>
          <select
            value={selectedSize}
            onChange={(e) => handleSelectSize(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {["S", "M", "L", "XL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div className="text-xs text-gray-500">
            비슷한 체형은 M을 많이 구매했어요
          </div>
        </div>

        {/* 옵션 박스 */}
        {selectedOptions.length > 0 && (
          <div className="mt-5 space-y-2 border-t border-gray-200 pt-3">
            {selectedOptions.map((opt) => (
              <div
                key={opt.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm space-y-2"
              >
                <div className="flex justify-between">
                  {/* 왼쪽: 옵션 정보 */}
                  <div className="flex flex-col">
                    <p className="font-medium">
                      {opt.color.toUpperCase()} / {opt.size}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      색상: {opt.color.toUpperCase()} / 사이즈: {opt.size}
                    </div>
                  </div>

                  {/* 오른쪽: 삭제 버튼 */}
                  <button
                    onClick={() => handleRemoveOption(opt.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 옵션 내 수량 조절 */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(opt.id, "minus")}
                      className="w-7 h-7 border border-gray-300 rounded-lg flex items-center justify-center text-sm hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{opt.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(opt.id, "plus")}
                      className="w-7 h-7 border border-gray-300 rounded-lg flex items-center justify-center text-sm hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-medium text-gray-700">
                    {(49000 * opt.quantity).toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 장바구니 / 구매 버튼 */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            장바구니
          </button>
          <button className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-700">
            구매하기
          </button>
        </div>

        {/* 관심 */}
        <div className="flex items-center justify-start mt-2 text-sm text-gray-500 gap-1">
          <span>❤️ 2.1천</span>
        </div>

        {/* 도착 안내 */}
        <div className="mt-3 p-3 bg-gray-100 text-gray-500 text-sm rounded-lg">
          11.20 도착 예정
        </div>
      </div>
    </div>
  );
}
