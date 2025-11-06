import { useState } from "react";

export default function OptionModal({ isOpen, onClose, onSave }) {
  const [selectedSize, setSelectedSize] = useState("ONE");
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null; 

  const handleSave = () => {
    onSave({ size: selectedSize, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-8 w-[90%] max-w-md shadow-lg relative">
        <h3 className="text-xl font-semibold mb-6 text-center tracking-wider">
          CHANGE OPTION
        </h3>

        {/* 사이즈 선택 */}
        <div className="mb-5">
          <label className="block  font-pretendard text-sm font-medium mb-2">SIZE</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="ONE">ONE</option>
            <option value="Small">S</option>
            <option value="Medium">M</option>
            <option value="Large">L</option>
          </select>
        </div>

        {/* 수량 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 font-pretendard">QUANTITY</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition font-kirang"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition font-kirang"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
