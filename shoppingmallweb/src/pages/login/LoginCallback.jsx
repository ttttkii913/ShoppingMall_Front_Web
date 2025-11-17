import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function LoginCallback() {
  const { provider } = useParams(); // google | kakao | naver
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const code = searchParams.get("code");
    const selectedRole = searchParams.get("state"); // 탭에서 보낸 역할(USER / SELLER)

    if (!code) {
      alert("인증 코드가 없습니다.");
      navigate("/login");
      return;
    }

    const handleSocialLogin = async () => {
      try {
        const providerConfig = {
          google: {
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
            redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
            endpoint: "/login/google",
          },
          kakao: {
            clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
            redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            endpoint: "/login/kakao",
          },
          naver: {
            clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
            clientSecret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
            redirectUri: import.meta.env.VITE_NAVER_REDIRECT_URI,
            endpoint: "/login/naver",
          },
        };

        const config = providerConfig[provider];
        if (!config) throw new Error("지원하지 않는 provider");

        const res = await axios.get(`${BACKEND_URL}${config.endpoint}`, {
          params: {
            code,
            state: selectedRole,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            redirectUri: config.redirectUri,
          },
        });

        const { accessToken, userType } = res.data.data;
        const normalizedUserType = userType.replace("ROLE_", "");

        // 선택한 역할과 서버에서 반환한 역할 비교
        if (selectedRole !== normalizedUserType) {
          alert(
            `선택한 역할(${selectedRole})로 로그인할 수 없습니다. 현재 계정은 ${normalizedUserType} 계정입니다.`
          );
          navigate("/login");
          return;
        }

        // 로그인 처리
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("state", userType);

        navigate("/");
      } catch (err) {
        console.error(err);
        alert("소셜 로그인 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    handleSocialLogin();
  }, [provider, searchParams, navigate, BACKEND_URL]);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-regular">소셜 로그인 처리 중...</p>
      </div>
    </div>
  );
}
