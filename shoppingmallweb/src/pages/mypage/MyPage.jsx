export default function Mypage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#111] pt-10">

      {/* Main */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        {/* Title */}
        <h1 className="text-2xl font-light tracking-widest mb-8">MYPAGE</h1>

        {/* Welcome + status */}
        <div className="flex items-center justify-between border-b-1 border-gray-300 pb-6 mb-10">
          <div>
            <p className="text-2xl font-kirang ml-10">
              Welcome to SHMALL <br /> 
              님, 환영합니다.
            </p>
          </div>
          <div className="flex space-x-25 text-center font-pretendard mr-10">
            <div>
              <p className="text-sm mb-1">입금전</p>
              <p className="font-semibold">0</p>
            </div>
            <div>
              <p className="text-sm mb-1">배송준비중</p>
              <p className="font-semibold">0</p>
            </div>
            <div>
              <p className="text-sm mb-1">배송중</p>
              <p className="font-semibold">0</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-12">
          {/* Left Menu */}
          <aside className="col-span-3 text-ml font-pretendard">
            <div className="mb-10">
              <h1 className="border-b-2 border-gray-700 pb-1 mb-3 tracking-widest">INFO</h1>
              <ul className="space-y-3 text-[15px]">
                <li className="text-gray-400 hover:text-black cursor-pointer">내 정보 조회</li>
                <li className="text-gray-400 hover:text-black cursor-pointer">내 정보 수정</li>
              </ul>
            </div>
            <div>
              <h2 className="border-b-2 border-gray-700 pb-1 mb-3 tracking-widest">ORDER</h2>
              <ul className="space-y-3 text-[15px]">
                <li className="text-gray-400 hover:text-black cursor-pointer">주문 조회</li>
                <li className="text-gray-400 hover:text-black cursor-pointer">배송 관리</li>
              </ul>
            </div>
          </aside>

          {/* Right Info Form */}
          <section className="col-span-9">
            <h2 className="border-b-2 border-gray-700 pb-1 mb-8 tracking-widest">INFO</h2>
            <form className="space-y-10 text-ml font-kirang tracking-widest">
              {["ID", "PASSWORD", "EMAIL", "PHONE", "ADDRESS", "BIRTHDAY"].map((label) => (
                <div key={label} className="flex items-center">
                  <label className="w-32 font-regular">{label}</label>
                  <input
                    type="text"
                    className="tracking-[0.3rem] flex-1 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
              ))}
              <div className="flex justify-center pt-9">
                <button
                  type="submit"
                  className="w-200 bg-black text-white py-3 tracking-[0.3rem] rounded-xs hover:bg-gray-800 transition-all"
                >
                  CONFIRM
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
