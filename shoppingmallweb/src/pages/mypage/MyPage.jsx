import { useState, useEffect } from "react";
import UserInfoForm from "./UserInfoForm";
import axiosInstance from "../login/AxiosInstance";
import UserChatList from "../chat/UserChatList";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const [activeMenu, setActiveMenu] = useState("view");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await axiosInstance.get("/mypage/info/view");
        if (res.data.code === 200) setName(res.data.data.name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchName();
  }, []);

  const handleSelectRoom = (id) => {
    setRoomId(id);
    navigate(`/chatting/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#111] pt-10">
      <main className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-2xl font-light tracking-widest mb-8">MYPAGE</h1>

        <div className="flex items-center justify-between border-b-1 border-gray-300 pb-6 mb-10">
          <div>
            <p className="text-2xl font-kirang ml-10">
              Welcome to SHMALL <br />
              {loading ? "..." : `${name} 님`}, 환영합니다.
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

        <div className="grid grid-cols-12 gap-12">
          <aside className="col-span-3 text-ml font-pretendard">
            <div className="mb-10">
              <h1 className="border-b-2 border-gray-700 pb-1 mb-3 tracking-widest">
                INFO
              </h1>
              <ul className="space-y-3 text-[15px]">
                <li
                  onClick={() => setActiveMenu("view")}
                  className={`cursor-pointer ${
                    activeMenu === "view"
                      ? "font-bold text-black"
                      : "text-gray-400"
                  }`}
                >
                  내 정보 조회
                </li>
                <li
                  onClick={() => setActiveMenu("edit")}
                  className={`cursor-pointer ${
                    activeMenu === "edit"
                      ? "font-bold text-black"
                      : "text-gray-400"
                  }`}
                >
                  내 정보 수정
                </li>
              </ul>
            </div>
            <div className="mb-10">
              <h2 className="border-b-2 border-gray-700 pb-1 mb-3 tracking-widest">
                ORDER
              </h2>
              <ul className="space-y-3 text-[15px]">
                <li className="text-gray-400 hover:text-black cursor-pointer">
                  주문 조회
                </li>
                <li className="text-gray-400 hover:text-black cursor-pointer">
                  배송 관리
                </li>
              </ul>
            </div>

            <div>
              <h2 className="border-b-2 border-gray-700 pb-1 mb-3 tracking-wider">
                CHAT
              </h2>
              <ul className="space-y-3 text-[15px]">
                <li
                  onClick={() => setActiveMenu("chat")}
                  className={`cursor-pointer ${
                    activeMenu === "chat"
                      ? "font-bold text-black"
                      : "text-gray-400"
                  }`}
                >
                  내 채팅 조회
                </li>
              </ul>
            </div>
          </aside>
          <section className="col-span-9">
            <h2 className="border-b-2 border-gray-700 pb-1 mb-8 tracking-widest">
              {activeMenu === "chat" ? "CHAT" : "INFO"}
            </h2>

            {activeMenu === "view" && <UserInfoForm mode="view" />}
            {activeMenu === "edit" && (
              <UserInfoForm
                mode="edit"
                onSuccess={(updatedName) => {
                  setActiveMenu("view");
                  setName(updatedName);
                }}
              />
            )}

            {activeMenu === "chat" && (
              <UserChatList
                onSelectRoom={handleSelectRoom}
                currentRoomId={roomId}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
