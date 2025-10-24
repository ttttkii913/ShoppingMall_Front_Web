import MainBestSellerImg from "../../assets/image/MainBestSellerImg.png";
import ProductSample from "../../assets/image/ProductSample.png";

export default function MainBestSeller() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="relative w-full h-screen"
        style={{
          backgroundImage: `url(${MainBestSellerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 상단 오른쪽 아이템 */}
        <div className="absolute top-[6.5%] right-[11.8%] flex flex-row-reverse items-center gap-5">
          <img
            src={ProductSample}
            alt="product"
            className="w-[345px] h-[345px] object-cover shadow-lg"
          />
          <div className="text-right text-black pr-7">
            <h2 className="text-[3rem] font-extrabold tracking-wider mb-10">
              PRODUCT
            </h2>
            <p className="text-[1.8rem] font-kirang">
              BEST SELLER <br />
              OUTER <br />
              2026 FW <br />
            </p>
          </div>
        </div>

        {/* 하단 왼쪽 아이템 */}
        <div className="absolute bottom-[7%] left-[12.2%] flex items-center gap-10">
          <img
            src={ProductSample}
            alt="product"
            className="w-[345px] h-[345px] object-cover shadow-lg"
          />
          <div className="text-black">
            <h2 className="text-[3rem] font-extrabold tracking-wider mb-10">
              PRODUCT
            </h2>
            <p className="text-[1.8rem] font-kirang">
              BEST SELLER <br />
              OUTER <br />
              2026 FW <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
