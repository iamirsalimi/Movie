import React, { useState } from 'react'

import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

export default function ProfileEdit() {
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showRepeatPass, setRepeatShowPass] = useState(false)


  const toggleShowingPassHandler = (setShowPass) => {
    setShowPass(prev => !prev)
  }


  return (
    <form className="p-4 flex flex-col gap-7 panel-box rounded-2xl">

      {/* Update Profile Informations */}
      <ul className="col-start-1 col-end-4 bg-red-400 rounded-xl py-5 px-2 flex flex-col items-center gap-2 font-vazir text-white">
        <li className="text-center">نام كاربري نميتواند با اعداد شروع شود همچنين بايد حداقل 5 و حداكثر 16 كاراكتر باشد</li>
        <li className="text-center">نام كاربري شما در بخش كامنت ها نمايش داده مي شود درصورتي كه نام نمایشی خود را مشخص نكرده باشيد</li>
        <li className="text-center">رمز عبور حداقل ميتواند 8 و حداکثر 16 کاراکتر می تواند باشد</li>
        <li className="text-center">رمز عبور باید حداقل یک حرف کوچک ،حداقل یک حرف بزرگ ، حداقل یک کارکتر (یکی از مقادیر # و @ و _ و .) و حداقل یک عدد داشته باشد</li>
      </ul>

      <div className="grid grid-cols-2 gap-5">
        {/* First Name */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          // {...userNameBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام</span>
        </div>

        {/* last Name */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          // {...userNameBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام خانوادگی</span>
        </div>

        {/* Shown Name */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          // {...userNameBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام نمایشی</span>
          <span className="font-shabnam text-sm text-sky-400 ">با این نام در سایت شناخته خواهید شد</span>
        </div>

        {/* Email */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          // {...userNameBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">ایمیل</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <h2 className="col-start-1 col-end-4 font-vazir text-gray-800 dark:text-white text-lg">تغییر رمز عبور</h2>
        {/* Current Password */}
        <div className="w-full relative select-none">
          <input
            type={`${showCurrentPass ? 'text' : 'password'}`}
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
          // {...passwordBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">رمز عبور فعلی</span>
          <div onClick={() => toggleShowingPassHandler(setShowCurrentPass)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-500 transition-all peer-focus:!text-sky-500">
            {showCurrentPass ? (
              <PiEyeClosedBold className="text-2xl" />
            ) : (
              <PiEyeBold className="text-2xl" />
            )}
          </div>
        </div>

        {/* New Password */}
        <div className="w-full relative select-none">
          <input
            type={`${showPass ? 'text' : 'password'}`}
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
          // {...passwordBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">رمز عبور جدید</span>
          <div onClick={() => toggleShowingPassHandler(setShowPass)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-500 transition-all peer-focus:!text-sky-500">
            {showPass ? (
              <PiEyeClosedBold className="text-2xl" />
            ) : (
              <PiEyeBold className="text-2xl" />
            )}
          </div>
        </div>

        {/* Repeat New Password */}
        <div className="w-full relative select-none">
          <input
            type={`${showRepeatPass ? 'text' : 'password'}`}
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
          // {...passwordBinding}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary"> تکرار رمز عبور جدید</span>
          <div onClick={() => toggleShowingPassHandler(setRepeatShowPass)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-500 transition-all peer-focus:!text-sky-500">
            {showRepeatPass ? (
              <PiEyeClosedBold className="text-2xl" />
            ) : (
              <PiEyeBold className="text-2xl" />
            )}
          </div>
        </div>
      </div>
      <button className="py-2 rounded-sm bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer">به روزرسانی پروفایل</button>
    </form>
  )
}
