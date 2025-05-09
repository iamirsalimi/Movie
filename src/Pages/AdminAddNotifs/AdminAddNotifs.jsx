import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { MdKeyboardArrowRight } from "react-icons/md";

export default function AdminAddNotifs() {
    const [notifTitle , setNotifTitle] = useState('') 
    const [userId , setUserId] = useState('') 
    const [notifMessage , setNotifMessage] = useState('') 
    
    let { notifId } = useParams()
    console.log(notifId)
    const addNotification = () => {
        let newDate = new Date()
        let newNotifObj = {id : Math.floor(Math.random() * 999), title : notifTitle , message : notifMessage , createdAt : newDate}
        console.log(newNotifObj)
    }

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7">
            <div className="flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">{notifId ? 'آپدیت' : 'ایجاد'} اعلان</h2>
                <a href="/my-account/adminPanel/notifications" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست اعلان ها</span>
                </a>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <ul className="col-start-1 col-end-3 border border-gray-200 dark:border-primary rounded-lg flex flex-col items-center gap-2 py-5">
                    <li className="text-center font-vazir text-red-500">مقدار ID کاربر تنها در صورتی ضروری است که بخواهیم اعلان به کاربر خاصی ارسال شود</li>
                    <li className="text-center font-vazir text-red-500">در صورت ارسال نکردن مقدار ID کاربر اعلان برای تمامی کاربر ها ارسال می شود</li>
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        value={notifTitle}
                        onChange={e => setNotifTitle(e.target.value)}

                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان</span>
                </div>
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ID کاربر</span>
                </div>
                <div className="col-start-1 col-end-3 w-full relative select-none">
                    <textarea
                        className="w-full rounded-md p-3 min-h-36 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        value={notifMessage}
                        onChange={e => setNotifMessage(e.target.value)}
                    ></textarea>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
                </div>

                <button
                    className="col-start-1 col-end-3 py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-all inline-flex items-center justify-center gap-1 text-white font-shabnam text-lg"
                    onClick={addNotification}
                >
                    {notifId ? 'آپدیت اعلان' : 'ایجاد اعلان'}
                
                </button>
            </div>
        </div>
    )
}
