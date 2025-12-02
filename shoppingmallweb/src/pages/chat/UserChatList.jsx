import { useEffect, useState } from "react";
import axiosInstance from "../login/AxiosInstance";

export default function UserChatList({ onSelectRoom, currentRoomId }) {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/chat/rooms`
      );
      const data = res.data.data;
      setRooms(data || []);
    } catch (err) {
      console.error("채팅방 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-white p-4">
      {/* 새 채팅 버튼 */}
      <div className="p-4 border-b mt-10">
        <button
          onClick={() => onSelectRoom("new")}
          className="w-full bg-black text-white px-4 py-2 rounded font-pretendard text-sm hover:bg-gray-600"
        >
          새 채팅 시작하기
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4 mt-7 text-left">채팅방 목록</h2>
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto hide-scrollbar">
        {rooms.map((room) => {
          const isActive = Number(room.roomId) === Number(currentRoomId);
          return (
            <button
              key={room.roomId}
              onClick={() => onSelectRoom(room.roomId)}
              className={`w-full text-left p-3 rounded-lg shadow-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-200 border border-blue-400"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <p className="font-semibold">{room.title || "상담 채팅"}</p>
              <p className="text-sm text-gray-600">Room ID: {room.roomId}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
