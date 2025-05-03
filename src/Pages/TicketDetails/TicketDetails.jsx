import React from 'react'

import TicketMessage from '../../Components/TicketMessage/TicketMessage';

import { MdKeyboardArrowRight } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";

export default function TicketDetails() {
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">اطلاعات تیکت</h2>
                    <span className="text-gray-400 dark:text-gray-500 font-vazir text-sm">#82136</span>
                </div>
                <a href="/my-account/userPanel/messages" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400">بازگشت به لیست درخواست ها</span>
                </a>
            </div>

            <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary">
                <li className="flex items-center justify-between w-full font-vazir p-2">
                    <h3 className="text-light-gray dark:text-gray-500">موضوع</h3>
                    <p className="text-primary dark:text-gray-300">خرابی لینک</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2">
                    <h3 className="text-light-gray dark:text-gray-500">وضعیت تیکت</h3>
                    <p className="text-primary dark:text-gray-300">باز</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2">
                    <h3 className="text-light-gray dark:text-gray-500">شماره تیکت</h3>
                    <p className="text-primary dark:text-gray-300">#82136</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2">
                    <h3 className="text-light-gray dark:text-gray-500">تاریخ ایجاد</h3>
                    <p className="text-primary dark:text-gray-300">20/01/1404</p>
                </li>
                <li className="flex items-center justify-between w-full font-vazir p-2">
                    <h3 className="text-light-gray dark:text-gray-500">شماره تیکت</h3>
                    <p className="text-primary dark:text-gray-300">pasdkjgfsa21</p>
                </li>
            </ul>

            <div className="w-full flex flex-col justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg px-2 py-4">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">پیام های تیکت</h2>
                <div className="py-5 px-2 border border-gray-300 dark:border-secondary rounded-lg flex flex-col items-center gap-2">
                    
                    <div className="flex flex-col items-center gap-5">
                        <TicketMessage />
                        <TicketMessage adminFlag />
                        <TicketMessage />
                        <TicketMessage adminFlag />
                    </div>

                    <div className="w-full flex flex-col items-center justify-between gap-2">
                        <div className="col-start-1 col-end-3 w-full relative select-none">
                            <textarea className="w-full resize-none rounded-md p-3 h-20 border border-light-gray dark:border-gray-600 dark:bg-primary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            ></textarea>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-primary">توضیحات</span>
                        </div>
                        <button className="py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-all inline-flex items-center justify-center gap-1">
                            <TbSend2 className="text-white text-lg" />
                            <h2 className="text-white font-shabnam text-lg">ارسال</h2>
                        </button>   
                    </div>
                    
                </div>
            </div>
        </>
    )
}
