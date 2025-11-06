import { useState } from "react";
import CartItem from "../../components/cart/CartItem";

export default function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: "COTTON BAG", option: "ONE", quantity: 1, price: 74000, selected: true },
    { id: 2, name: "COTTON BAG", option: "S", quantity: 2, price: 74000, selected: false },
    { id: 3, name: "COTTON BAG", option: "M", quantity: 1, price: 74000, selected: false },
    { id: 4, name: "COTTON BAG", option: "M", quantity: 1, price: 74000, selected: false },
  ]);

  // 옵션 변경
  const handleUpdateOption = (id, newData) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, option: newData.size, quantity: newData.quantity }
          : item
      )
    );
  };

  // 선택 토글
  const handleToggleSelect = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // 전체 선택 / 해제
  const handleSelectAll = () => {
    const allSelected = items.every((item) => item.selected);
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  // 상품 삭제
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 선택된 상품만 총합 계산
  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 선택된 상품 수
  const selectedCount = items.filter((item) => item.selected).length;

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-32 py-16">
      <h1 className="text-3xl font-bold tracking-widest mb-5 mt-5">CART</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* 왼쪽 - 상품 목록 */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-10 relative">

          {/* 전체 선택 버튼 + 선택된 개수 */}
          <div className="flex justify-between items-center mb-6 mt-[-10px]">
            <button
              onClick={handleSelectAll}
              className="text-[10px] bg-black text-white px-2 py-1 rounded-md hover:bg-gray-600 transition tracking-widest"
            >
              {items.every((item) => item.selected) ? "DESELECT ALL" : "SELECT ALL"}
            </button>
            <span className="text-gray-500 font-pretendard text-sm tracking-widest">
              Selected: {selectedCount} / {items.length}
            </span>
          </div>

          {items.map((item, index) => (
            <div key={item.id} className="relative mb-10">
              {/* 체크박스 */}
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleToggleSelect(item.id)}
                className="absolute top-0 -left-6 w-3 h-3 accent-black cursor-pointer"
              />

              {/* 삭제 버튼 */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute -top-4 right-0 text-gray-400 hover:text-black transition"
              >
                ✕
              </button>

              <CartItem
                item={item}
                onUpdateOption={handleUpdateOption}
                onToggleSelect={() => handleToggleSelect(item.id)}
                onDelete={() => handleDelete(item.id)}
              />

              {index !== items.length - 1 && <hr className="my-8 border-gray-200" />}
            </div>
          ))}
        </div>

        {/* 오른쪽 - 결제 요약 */}
        <div className="bg-white rounded-2xl shadow-sm font-kirang p-10 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex justify-between text-lg font-semibold mb-6 tracking-widest">
              <span>TOTAL PRICE</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button className="bg-black text-white rounded-md py-3 hover:bg-gray-600 transition tracking-widest text-lg">
            ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
