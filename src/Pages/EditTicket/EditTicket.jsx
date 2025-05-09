import React from 'react'

import TicketMessage from '../../Components/TicketMessage/TicketMessage';
import { useParams } from 'react-router-dom'

import { MdKeyboardArrowRight } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";

export default function EditTicket() {
    const { ticketId } = useParams()
    return (
        <div className="panel-box py-4 px-5 flex flex-col items-center gap-5">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-sm sm:text-base md:text-xl">اطلاعات تیکت</h2>
                    <span className="text-gray-400 dark:text-gray-500 font-vazir hidden sm:inline text-sm">#{ticketId}</span>
                </div>
                <a href="/my-account/adminPanel/tickets" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-xs xs:text-sm md:text-base">بازگشت به لیست تیکت ها</span>
                </a>
            </div>

            <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary">
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">موضوع</h3>
                    <p className="text-primary dark:text-gray-300">خرابی لینک</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">شماره تیکت</h3>
                    <p className="text-primary dark:text-gray-300">#82136</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">ID کاربر</h3>
                    <p className="text-primary dark:text-gray-300">21342134</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">نام کاربر</h3>
                    <p className="text-primary dark:text-gray-300">Alex</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">نام کاربری کاربر</h3>
                    <p className="text-primary dark:text-gray-300">Alex1234</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">ایمیل کاربر</h3>
                    <p className="text-primary dark:text-gray-300">Alex12342gmail.com</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">اولویت</h3>
                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" >
                            <option value="normal">عادي</option>
                            <option value="instant">فوری</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">اولویت</span>
                    </div>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">وضعیت تیکت</h3>
                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" >
                            <option value="open">باز</option>
                            <option value="pending">در حال بررسی</option>
                            <option value="answered">پاسخ داده شده</option>
                            <option value="closed">بسته شده</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">وضعیت تیکت</span>
                    </div>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">تاریخ ایجاد</h3>
                    <p className="text-primary dark:text-gray-300">20/01/1404</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                    <h3 className="text-light-gray dark:text-gray-500">شماره تیکت</h3>
                    <p className="text-primary dark:text-gray-300">pasdkjgfsa21</p>
                </li>
                <button className="py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-all inline-flex items-center justify-center gap-1 text-white font-shabnam text-lg">آپدیت</button>
            </ul>

            <div className="w-full flex flex-col justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg px-2 py-4">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">پیام های تیکت</h2>
                <div className="py-5 px-2 border border-gray-300 dark:border-secondary rounded-lg flex flex-col items-center gap-7 sm:gap-5 lg:gap-2">

                    <div className="flex flex-col items-center gap-7 sm:gap-5">
                        <TicketMessage />
                        <TicketMessage receiveFlag />
                        <TicketMessage />
                        <TicketMessage receiveFlag />
                    </div>

                    <div className="w-full flex flex-col items-center justify-between gap-2">
                        <div className="col-start-1 col-end-3 w-full relative select-none">
                            <textarea className="w-full resize-none rounded-md p-3 h-32 overflow-y-auto border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            ></textarea>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">توضیحات</span>
                        </div>
                        <button className="py-1 w-full rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all inline-flex items-center justify-center gap-1">
                            <TbSend2 className="text-white text-lg" />
                            <h2 className="text-white font-shabnam text-lg">ارسال</h2>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
