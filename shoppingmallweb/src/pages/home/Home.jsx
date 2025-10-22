import MainBgImg1 from "../../assets/image/MainBg1.png";
import MainProductSection from "../../components/home/MainProductSection";

export default function Home() {
  return (
    <main className="w-full bg-[#ffffff]">
      {/* section 1 */}
      <section
        className="h-screen bg-scroll bg-contain bg-no-repeat bg-center overflow-y-auto"
        style={{
          backgroundImage: `url(${MainBgImg1})`,
        }}
      >
        <div className="w-full h-full flex flex-col items-end justify-center pr-70 pt-80">
          <div className="text-left text-black ">
            <h1 className="text-[3rem] font-bold tracking-widest mb-3">
              SHOPPING MALL <br /> FIND YOUR OOTD
            </h1>
            <h1 className="text-[2.5rem] font-semibold tracking-wider">
              @SHMALL.COM
            </h1>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="relative w-full h-screen flex items-center justify-center">
        <h1
          className="absolute top-0 left-1/2 -translate-x-1/2 text-[40rem] md:text-[20rem] sm:text-[15rem] font-extrabold text-gray-400 opacity-20 tracking-[4rem] z-0 select-none"
          style={{ marginTop: "-4vw" }}
        >
          SHOPPING
        </h1>

        <div className="w-[88%] max-w-[1400px] font-kirang flex items-center justify-between relative z-10">
          <div className="flex flex-col items-start ml-6">
            <h2 className="text-[2.8rem] font-bold tracking-wider mb-3">
              ALL PRODUCT
            </h2>
            <button className="text-[#d4c0a1] font-semibold text-[1.5rem] flex items-center gap-2 hover:translate-x-2 transition-transform">
              VIEW →
            </button>
          </div>

          <MainProductSection />
        </div>

        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 w-[75%] h-[1.5px] bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
      </section>
    </main>
  );
}
