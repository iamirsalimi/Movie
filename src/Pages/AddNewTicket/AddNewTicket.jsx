import React from 'react'

import { MdKeyboardArrowRight } from "react-icons/md";



export default function AddNewTicket() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-gray-700 dark:text-white font-vazir text-lg sm:text-xl lg:text-2xl">تیکت جدید</h2>
        <a href="/my-account/userPanel/messages" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
          <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400" />
          <span className="text-light-gray dark:text-gray-400 text-xs md:text-base">بازگشت به لیست درخواست ها</span>
        </a>
      </div>
      
      <form className="w-full grid grid-cols-2 gap-5 gap-y-7">
        <div className="w-full col-start-1 col-end-3 md:col-end-2 relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان</span>
        </div>

        <div className="w-full col-start-1 col-end-3 md:col-start-2 md:col-end-3 relative select-none">
          <select name="" id="" className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value="">
            <option value="">مشکل پرداخت</option>
            <option value="">مشکل در پخبش فیلم</option>
            <option value="">کندی یا بافر زیاد</option>
            <option value="">لینک خراب</option>
            <option value="">درخواست اشتراک ویژه</option>
            <option value="">پیشنهاد یا انتقاد</option>
            <option value="">مشکل ورود/اکانت</option>
          </select>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">دپارتمان</span>
        </div>

        <div className="col-start-1 col-end-3 w-full relative select-none">
          <textarea className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          ></textarea>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
        </div>

        <button className="col-start-1 col-end-3 w-full bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer rounded-md py-2 text-white font-vazir">ارسال</button>
      </form >
    </>
  )
}
