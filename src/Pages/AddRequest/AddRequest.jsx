import React from 'react'

import { MdKeyboardArrowRight } from "react-icons/md";

export default function AddRequest() {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-10">
        <h2 className="text-gray-700 dark:text-white font-vazir text-sm xs:text-base md:text-lg lg:text-xl">درخواست جدید</h2>
        <a href="/my-account/userPanel/requests" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
          <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-xs sm:text-base md:text-xl lg:text-2xl" />
          <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs md:text-sm lg:text-base">بازگشت به لیست درخواست ها</span>
        </a>
      </div>

      <form action="" className="mt-5 flex flex-col gap-7 items-center w-full">
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان فیلم / سریال / انیمه</span>
        </div>

        <div className="w-full relative select-none">
          <textarea className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          ></textarea>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
        </div>

        <button className="w-full bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer rounded-md py-2 text-white font-vazir">ارسال</button>
      </form>
    </>
  )
}
