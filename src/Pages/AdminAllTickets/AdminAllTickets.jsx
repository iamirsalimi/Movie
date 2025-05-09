import React, { useState } from 'react'

import { FaEye } from "react-icons/fa";

export default function AdminAllTickets() {
    const [searchValue, setSearchValue] = useState('')
    const [searchType, setSearchType] = useState("ID")

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">تیکت ها</h2>
            </div>
            <div className="flex flex-col items-center gap-5">
                <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                            <option value="ID">ID</option>
                            <option value="title">عنوان تیکت</option>
                            <option value="type">دپارتمان</option>
                            <option value="order">اولویت</option>
                            <option value="open">باز</option>
                            <option value="pending">در حال بررسی</option>
                            <option value="answered">پاسخ داده شده</option>
                            <option value="closed">بسته شده</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
                    </div>
                </div>

                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                    <table className="w-full">
                        <thead className="min-w-full">
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان تيكت</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">دپارتمان</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Id کاربر</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ ثبت تیکت</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت تیکت</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">اولویت</th>
                                {/* عادی یا فوری */}
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="py-1 px-2 odd:bg-gray-200 dark:odd:bg-secondary text-center" >
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex123</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">8234</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">20/5/1403</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">در حال بررسی</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عادی</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                    <a href="/my-account/adminPanel/edit-ticket/1234" className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group">
                                        <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
