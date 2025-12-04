import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axiosInstance from "../login/AxiosInstance";
import { ChatCustom } from "./ChatCustom";

export default function AdminChat() {
  const [stompClient, setStompClient] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // 방 목록 가져오기
  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axiosInstance.get(`/admin/chat/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data.data || []);
    } catch (err) {
      console.error("채팅방 목록 불러오기 실패:", err);
      if (err.response?.status === 403) {
        alert("권한이 없습니다. 관리자 계정으로 로그인하세요.");
      }
    }
  };

  // 선택된 방 메시지 가져오기
  const fetchMessages = async (roomId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axiosInstance.get(`/admin/chat/messages/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("메시지 불러오기 실패:", err);
      if (err.response?.status === 403) {
        alert("권한이 없습니다. 관리자 계정으로 로그인하세요.");
      }
    }
  };

  // 방 목록 로드
  useEffect(() => {
    fetchRooms();
  }, []);

  // 방 선택 시 메시지 로딩 + WebSocket 연결
  useEffect(() => {
    if (!selectedRoom) return;

    fetchMessages(selectedRoom.roomId);

    const token = localStorage.getItem("accessToken");
    const socket = new SockJS("http://localhost:8080/ws");
    const client = over(socket);

    client.connect({ Authorization: `Bearer ${token}` }, () => {
      client.subscribe(`/sub/messages/${selectedRoom.roomId}`, (msg) => {
        const data = JSON.parse(msg.body);
        setMessages((prev) => [...prev, data]);
      });
      setStompClient(client);
    });

    return () => {
      if (client.connected) client.disconnect();
    };
  }, [selectedRoom]);

  // 메시지 전송
  const handleSendMessage = (text) => {
    if (!stompClient || !text.trim()) return;

    const msgData = {
      roomId: selectedRoom.roomId,
      senderId: 999, // 관리자 ID
      senderType: "ADMIN",
      message: text,
    };

    stompClient.send("/pub/admin/send", {}, JSON.stringify(msgData));
  };

  // 스크롤 최하단
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* 왼쪽 채팅 리스트 */}
      <div className="w-1/4 bg-white overflow-y-auto p-4 flex flex-col hide-scrollbar">
        <h2 className="text-xl font-bold mt-12 mb-2 text-left">채팅방 목록</h2>
        <div className="flex flex-col gap-2 flex-1">
          {rooms.map((room) => (
            <button
              key={room.roomId}
              className={`w-full text-left p-3 rounded-lg shadow-sm transition-all duration-200
                ${
                  selectedRoom?.roomId === room.roomId
                    ? "bg-blue-200 border border-blue-400"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => setSelectedRoom(room)}
            >
              <p className="font-semibold">방 ID: {room.roomId}</p>
              <p className="text-sm text-gray-600">
                고객: {room.user?.id || room.userId}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 오른쪽 채팅 */}
      <div className="w-3/4 flex flex-col p-4 mt-12">
        <ChatCustom />
        <MainContainer className="flex-1">
          <ChatContainer>
            <MessageList className="flex-1">
              {messages.map((msg, i) => (
                <Message
                  key={i}
                  model={{
                    message: msg.message,
                    sender: msg.senderType === "ADMIN" ? "Admin" : "User",
                    direction:
                      msg.senderType === "ADMIN" ? "outgoing" : "incoming",
                    sentTime: new Date(msg.createdAt).toLocaleTimeString(),
                  }}
                />
              ))}
              <div ref={messagesEndRef} />
            </MessageList>
            <MessageInput
              placeholder="메시지 입력..."
              onSend={handleSendMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
