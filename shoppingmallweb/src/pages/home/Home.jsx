import MainBgImg1 from "../../assets/image/MainBg1.png";

export default function Home() {
  return (
    <main className="w-full">
      <section className="h-screen bg-scroll bg-contain bg-no-repeat bg-center overflow-y-auto"
        style={{
          backgroundImage: `url(${MainBgImg1})`,
        }}
      >
        <div className="w-full h-full bg-black/10 flex flex-col items-end justify-center pr-70 pt-80">
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

      <section
        className="w-full h-screen bg-cover bg-center">
        <div className="w-full h-full bg-black/20 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">Main 2</h1>
        </div>
      </section>    
      
    </main>
  );
}
