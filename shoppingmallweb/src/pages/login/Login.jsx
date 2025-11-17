import React, { useState, useRef, useEffect } from "react";
import GoogleLogin from "../../assets/image/GoogleLogin.png";
import KakaoLogin from "../../assets/image/KakaoLogin.png";
import NaverLogin from "../../assets/image/NaverLogin.png";

export default function Login() {
  const [tab, setTab] = useState("member"); // member / seller
  const memberRef = useRef(null);
  const sellerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeRef = tab === "member" ? memberRef.current : sellerRef.current;
    if (activeRef) {
      const { offsetLeft, offsetWidth } = activeRef;
      setIndicatorStyle({
        left: offsetLeft + offsetWidth / 2,
        width: offsetWidth,
      });
    }
  }, [tab]);

  const getSocialLoginUrl = (provider) => {
    const status = tab === "seller" ? "SELLER" : "USER"; // 탭 선택에 따라 전송
    const state = encodeURIComponent(status);

    const config = {
      google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        scope: "email profile",
      },
      kakao: {
        clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        authUrl: "https://kauth.kakao.com/oauth/authorize",
        scope: "profile_nickname,profile_image,account_email",
      },
      naver: {
        clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
        redirectUri: import.meta.env.VITE_NAVER_REDIRECT_URI,
        authUrl: "https://nid.naver.com/oauth2.0/authorize",
        scope: "name,email",
        state: crypto.randomUUID(),
      },
    };

    const c = config[provider];
    if (!c) return null;

    let url = `${c.authUrl}?client_id=${c.clientId}&redirect_uri=${encodeURIComponent(
      c.redirectUri
    )}&response_type=code`;

    if (c.scope) url += `&scope=${encodeURIComponent(c.scope)}`;

    // 카카오/구글은 선택 상태(USER/SELLER) 전달
    if (provider === "kakao" || provider === "google") {
      url += `&state=${state}`;
    } else if (c.state) {
      url += `&state=${c.state}`;
    }

    return url;
  };

  const handleSocialLogin = (provider) => {
    const url = getSocialLoginUrl(provider);
    if (url) window.location.href = url;
  };

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
                tab === "member" ? "text-black" : "text-gray-400 hover:text-black"
              }`}
            >
              MEMBER
            </button>
            <button
              ref={sellerRef}
              onClick={() => setTab("seller")}
              className={`px-6 pb-2 transition-colors duration-300 ${
                tab === "seller" ? "text-black" : "text-gray-400 hover:text-black"
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
                onClick={() => handleSocialLogin("kakao")}
              />
              <img
                src={NaverLogin}
                alt="Naver"
                className="w-36 h-9 cursor-pointer"
                onClick={() => handleSocialLogin("naver")}
              />
              <img
                src={GoogleLogin}
                alt="Google"
                className="w-36 h-9 cursor-pointer"
                onClick={() => handleSocialLogin("google")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
