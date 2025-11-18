import React, { useState } from "react";

export default function Join() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    emailVerify: "",
    phone: "",
    address: "",
    birthday: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-30">
      {/* Form */}
      <main className="w-full max-w-md mt-5 px-6">
        <h2 className="text-3xl font-semibold text-center mb-4 tracking-widest">JOIN</h2>
        <hr className="mb-6 border-1"/>
        <form
          className=" p-1 rounded-lg space-y-4 font-kirang tracking-wider"
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>

          {/* Email & Send Button */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">EMAIL</label>
            <div className="flex space-x-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
                required
              />
              <button
                type="button"
                className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                SEND
              </button>
            </div>
          </div>

          {/* Email Verify */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">EMAIL VERIFY</label>
            <input
              type="text"
              name="emailVerify"
              value={formData.emailVerify}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">PHONE</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ADDRESS</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
            />
          </div>

          {/* Birthday */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">BIRTHDAY</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 mt-7 font-regular tracking-widest rounded hover:bg-gray-600 transition"
          >
            JOIN
          </button>
        </form>
      </main>
    </div>
  );
}