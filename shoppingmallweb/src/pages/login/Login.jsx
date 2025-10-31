import React, { useState, useRef, useEffect } from "react";
import GoogleLogin from "../../assets/image/GoogleLogin.png";
import KakaoLogin from "../../assets/image/KakaoLogin.png";
import NaverLogin from "../../assets/image/NaverLogin.png";

export default function Login() {
  const [tab, setTab] = useState("member");
  const memberRef = useRef(null);
  const sellerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeRef = tab === "member" ? memberRef.current : sellerRef.current;
    if (activeRef) {
      const { offsetLeft, offsetWidth } = activeRef;
      setIndicatorStyle({
        left: offsetLeft + offsetWidth / 2,
        width: offsetWidth * 1,
      });
    }
  }, [tab]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-[Poppins]">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-medium tracking-[0.5em] mb-8">Login</h2>

          {/* MEMBER / SELLER 탭 */}
          <div className="relative flex gap-20 justify-center mb-10 text-ml font-medium font-kirang tracking-widest">
            <button
              ref={memberRef}
              onClick={() => setTab("member")}
              className={`px-6 pb-2 transition-colors duration-300 ${
                tab === "member"
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              MEMBER
            </button>
            <button
              ref={sellerRef}
              onClick={() => setTab("seller")}
              className={`px-6 pb-2 transition-colors duration-300 ${
                tab === "seller"
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              SELLER
            </button>

            {/* 밑줄 */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-300 rounded-full overflow-hidden">
              <div
                className="absolute top-0 h-full bg-black rounded-full transition-all duration-500 ease-in-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>

          {/* 로그인 폼 */}
          <form className="flex flex-col gap-4 mt-6">
            <div className="flex gap-2 justify-center font-kirang">
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="border border-gray-300 px-4 py-3 text-sm tracking-widest text-gray-700 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="border border-gray-300 px-4 py-3 text-sm tracking-widest text-gray-700 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 font-semibold tracking-[0.4em] hover:bg-gray-800 transition h-[98px]"
              >
                Login
              </button>
            </div>
          </form>

          {/* id 관련 */}
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <button className="hover:underline">아이디 찾기</button>
            <button className="hover:underline">비밀번호 찾기</button>
            <button className="hover:underline">회원가입</button>
          </div>

          {/* SNS 로그인 */}
          <div className="mt-10 w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-sm font-kirang tracking-[0.3em] text-gray-500">
                SNS
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center gap-6">
              <img
                src={KakaoLogin}
                alt="Kakao"
                className="w-36 h-9 cursor-pointer"
              />
              <img
                src={NaverLogin}
                alt="Naver"
                className="w-36 h-9 cursor-pointer"
              />
              <img
                src={GoogleLogin}
                alt="Google"
                className="w-36 h-9 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
