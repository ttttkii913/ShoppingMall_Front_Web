import React from "react";
import sampleImg from "../../assets/image/ProductSample.png";
import MainBg2 from "../../assets/image/MainBg2.png";

export default function MainSection4() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${MainBg2})` }}
    >

      <h2 className="text-5xl font-semibold pr-140 pb-40">WEEKLY BEST</h2>

      <div className="flex gap-16">
        {/* 아이템 1 */}
        <div className="flex flex-col items-center">
          <img
            src={sampleImg}
            alt="best item"
            className="w-48 h-48 object-cover mb-4"
          />
          <div className="text-center font-kirang">
            <p className="font-semibold">BEST SELLER</p>
            <p className="font-semibold">OUTER</p>
            <p>2026 FW</p>
          </div>
        </div>

        {/* 아이템 2 */}
        <div className="flex flex-col items-center">
          <img
            src={sampleImg}
            alt="best item"
            className="w-48 h-48 object-cover mb-4"
          />
          <div className="text-center font-kirang">
            <p className="font-semibold">BEST SELLER</p>
            <p className="font-semibold">OUTER</p>
            <p>2026 FW</p>
          </div>
        </div>
      </div>
    </section>
  );
}
