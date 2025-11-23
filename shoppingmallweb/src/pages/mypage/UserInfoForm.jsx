import React, { useEffect, useState } from "react";
import axiosInstance from "../login/AxiosInstance";

export default function UserInfoForm({ mode = "view", onSuccess }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/mypage/info/view");
        if (res.data.code === 200) setUserInfo(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch("/mypage/info/change", userInfo);
      if (res.data.code === 200) { 
        alert("정보가 수정되었습니다.");
        if (onSuccess) onSuccess(userInfo.name);
      } else alert("수정 실패");
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const fields = [
    { label: "ID", name: "userId" },
    { label: "NAME", name: "name" },
    { label: "EMAIL", name: "email" },
    { label: "PHONE", name: "phone" },
    { label: "ADDRESS", name: "address" },
    { label: "BIRTHDAY", name: "birthDay" },
    { label: "STATUS", name: "userStatus" },
  ];

  return (
    <form
      className="space-y-9 font-kirang tracking-widest"
      onSubmit={mode === "edit" ? handleSubmit : (e) => e.preventDefault()}
    >
      {fields.map((field) => {
        const isEditable =
          mode === "edit" &&
          field.name !== "userId" &&
          field.name !== "userStatus"; 
        return (
          <div key={field.name} className="flex items-center">
            <label className="w-32 font-normal">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={userInfo[field.name] ?? ""}
              onChange={isEditable ? handleChange : undefined}
              readOnly={!isEditable}
              placeholder="정보 없음"
              className={`flex-1 border-b border-gray-300 focus:outline-none bg-transparent ${
                isEditable ? "focus:border-black" : "text-[#a5a3a0]"
              }`}
            />
          </div>
        );
      })}
      {mode === "edit" && (
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-210 bg-black cursor-pointer text-white py-3 font-kirang tracking-[0.4rem] rounded-xs hover:bg-gray-700 transition-all"
          >
            CONFIRM
          </button>
        </div>
      )}
    </form>
  );
}
