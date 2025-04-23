"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState('')
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = 'লগইন ইউজার'
  });

  const handleChange = (val) => {
    setUser({ ...user, [val.target.name]: val.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();
      console.log(data)
      if (data.message) {
        setLoading(false);
        setMessage(data.message);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
      if (data.success) {
        setLoading(false);
        router.push("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start px-20 py-5 cursor-pointer relative sm:px-0">
      <img
        src="/bg/login-background.png"
        alt=""
        className="w-full absolute -bottom-7 sm:z-20"
      />

      <div className="w-full h-auto flex flex-col items-center justify-start gap-y-14 sm:px-5 sm:gap-y-10">
        <div className="h-32 w-[550px] rounded-lg border-2 border-[#dadfd9] bg-[#d2e3d0] p-3 sm:w-full sm:h-auto">
          <p className="font-semibold text-[#665743] ">
            অফিস ব্যবহারকারীগণ কর্তৃক লগইন করতে কোন সমস্যা পরিলক্ষিত হলে বা বদলি
            জনিত কারণে সহায়তার জন্য নিম্নের নাম্বারে যোগাযোগ করুনঃ তৃপ্তি ভৌমিকঃ
            ০১৮৯৬০৪৭১১৭ <br /> যুবায়ের আহমেদঃ ০১৮৯৬০৪৭১১১
          </p>
        </div>
        <div className="h-auto w-[450px] border border-gray-300 rounded-lg p-5 flex flex-col items-center justify-start gap-y-5 pb-16 bg-white z-10 relative sm:w-full sm:pb-12">
          {loading && (
            <div className="flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 bg-white">
              <img
                src="/loader/images.png"
                className="h-20 animate-pulse "
                alt=""
              />
            </div>
          )}

          {
            message && (
              <p className=" absolute top-1/2 -translate-y-1/2 px-8 py-2 bg-red-500 text-white text-lg font-semibold z-20">{message}</p>
            )
          }

          <img src="/logos/logo2.jpg" alt="" className="h-16" />
          <p className="text-lg">লগইন করুন</p>

          <div className="w-full h-14 border border-gray-300 rounded-lg relative  text-sm">
            <p className=" absolute -top-[10px] text-base left-[16px] bg-white">
              ইউজারনেম
            </p>
            <input
              type="text"
              className="w-full h-full bg-transparent outline-none px-4 placeholder:text-[#999495]"
              placeholder="ইউজারনেম"
              name="username"
              value={user.username}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full h-14 border border-gray-300 rounded-lg relative  text-sm">
            <p className=" absolute -top-[10px] text-base left-[16px] bg-white">
              পাসওয়ার্ড
            </p>
            <input
              type="password"
              className="w-full h-full bg-transparent outline-none px-4 placeholder:text-[#999495]"
              placeholder="পাসওয়ার্ড"
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full h-auto flex flex-col items-end justify-center -mt-2 text-sm font-[600] text-red-600 gap-y-1">
            <Link href="" className="underline">
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
            <Link href="" className="underline">
              রেজিস্ট্রেশন করুন
            </Link>
          </div>

          <div className="w-full h-auto flex flex-col items-center justify-center gap-y-5">
            <button
              className="w-60 text-center text-white py-2 font-bold rounded-3xl bg-[#12623d]"
              onClick={handleSubmit}
            >
              লগইন করুন
            </button>
            <div className="w-full flex items-center justify-center gap-x-5">
              <div className="w-1/2 h-px bg-gray-300 "></div>
              <p className="text-2xl text-gray-500 font-medium">or</p>
              <div className="w-1/2 h-px bg-gray-300 "></div>
            </div>
            <Link
              href=""
              className="w-60 text-center text-white py-2 font-bold rounded-3xl bg-[#12623d]"
            >
              GEMS এর মাধ্যমে লগইন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
