import CartitemImg from "../../assets/image/ProductItemImg.png"

export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-8">
      {/* 상품 이미지 */}
      <img
        src={CartitemImg}
        alt={item.name}
        className="w-40 h-40 object-cover rounded-md shadow-sm"
      />

      {/* 상품 정보 */}
      <div className="flex flex-col font-kirang justify-between flex-1 h-40 py-1">
        <div>
          <h2 className="font-semibold text-lg tracking-wider uppercase">
            {item.name}
          </h2>
          <p className="text-ml text-gray-600 mt-1">- {item.option}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-medium text-gray-800">
            ${item.price.toLocaleString()}
          </span>
          <button className="text-sm tracking-widest bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-800 transition">
            CHANGE OPTION
          </button>
        </div>
      </div>
    </div>
  );
}
