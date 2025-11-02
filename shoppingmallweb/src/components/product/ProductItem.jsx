import ProductItemImg from "../../assets/image/ProductItemImg.png";

export default function ProductItem({ product }) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <img
        src={ProductItemImg}
        alt={product.name}
        className="w-full max-w-[260px] h-[360px] object-cover rounded-lg"
      />
      <h3 className="mt-3 text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.price.toLocaleString()}원</p>
    </div>
  );
}
