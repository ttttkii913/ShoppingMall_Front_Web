import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatCustom } from "./ChatCustom";
import UserChatList from "./UserChatList";

function Chatting() {
  const { roomId: routeRoomId } = useParams();
  const navigate = useNavigate();

  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(routeRoomId || null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);
  useEffect(() => {
    const connectChat = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        let finalRoomId = routeRoomId;

        // 1) 방 생성
        if (!routeRoomId) {
          const res = await axios.post(
            "http://localhost:8080/api/chat/rooms",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          finalRoomId = res.data.data.roomId;
          setRoomId(finalRoomId);
          navigate(`/chatting/${finalRoomId}`, { replace: true });
        }

        // 2) 기존 메시지 로드
        const res = await axios.get(
          `http://localhost:8080/api/chat/messages/${finalRoomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const initialMessages = Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setMessages(
          initialMessages.map((m) => ({ ...m, sender: m.senderType }))
        );

        // 3) WebSocket 연결
        const socket = new SockJS("http://localhost:8080/ws");
        const client = over(socket);

        client.connect({ Authorization: `Bearer ${token}` }, () => {
          Object.keys(client.subscriptions).forEach((subId) => {
            client.unsubscribe(subId);
          });

          client.subscribe(
            `/sub/messages/${finalRoomId}`,
            (msg) => {
              const data = JSON.parse(msg.body);
              setMessages((prev) => [
                ...prev,
                { ...data, sender: data.senderType },
              ]);
            },
            { id: `room-${finalRoomId}` }
          );

          setStompClient(client);
        });
      } catch (err) {
        console.error(err);
      }
    };

    connectChat();

    // cleanup
    return () => {
      stompClient?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeRoomId]);

  const handleSendMessage = (text) => {
    if (!stompClient || !roomId || !text.trim()) return;

    stompClient.send(
      "/pub/send",
      {},
      JSON.stringify({ roomId, message: text })
    );
  };

  const handleSelectRoom = (id) => {
    setRoomId(id);
    navigate(`/chatting/${id}`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* LEFT : Chat Room List */}
      <div className="w-1/4 bg-white shadow-md">
        <UserChatList onSelectRoom={handleSelectRoom} currentRoomId={roomId} />
      </div>

      {/* RIGHT : Chatting View */}
      <div className="flex flex-col w-3/4 p-4 mt-12">
        <ChatCustom />
        <MainContainer style={{ width: "100%", height: "100%" }}>
          <ChatContainer>
            <MessageList>
              {messages.map((msg, i) => (
                <Message
                  key={i}
                  model={{
                    message: msg.message,
                    sentTime: msg.createdAt || new Date().toLocaleTimeString(),
                    sender: msg.sender === "USER" ? "Me" : "Admin",
                    direction: msg.sender === "USER" ? "outgoing" : "incoming",
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

export default Chatting;
