import CartItem from "../../components/cart/CartItem";

export default function Cart() {
  // 더미 데이터
  const items = [
    {
      id: 1,
      name: "COTTON BAG",
      option: "FREE / ONE",
      price: 74000,
    },
    {
      id: 2,
      name: "COTTON BAG",
      option: "FREE / ONE",
      price: 74000,
    },
    {
      id: 3,
      name: "COTTON BAG",
      option: "FREE / ONE",
      price: 74000,
    },
  ];

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-32 py-16">
      <h1 className="text-3xl font-bold tracking-widest mb-5 mt-5">CART</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* 왼쪽 - 상품 목록 */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-10">
          {items.map((item, index) => (
            <div key={item.id}>
              <CartItem item={item} />
              {index !== items.length - 1 && (
                <hr className="my-8 border-gray-200" />
              )}
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

          <button className="bg-black text-white rounded-md py-3 hover:bg-gray-800 transition tracking-widest text-lg">
            ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
