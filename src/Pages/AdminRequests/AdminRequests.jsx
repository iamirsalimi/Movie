import React, { useState } from 'react'

import { MdEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { FiCheck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

export default function AdminRequests() {
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20">
            <h2 className="text-gray-700 dark:text-white font-vazir text-xl">درخواست ها</h2>
            <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                            <option value="ID">ID</option>
                            <option value="name">ID کاربر</option>
                            <option value="accepted">ثبت شده</option>
                            <option value="pending">در حال بررسی</option>
                            <option value="rejected">رد شده</option>
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
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ID کاربر</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">زمان ارسال</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">جزییات</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 font-vazir">sklhdfsdjf</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">23/12/1403 17:12</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 font-vazir min-w-36 max-w-36">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum libero fugit est? Autem qui non tempore, ut dolorem voluptates! Nisi!</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 font-vazir text-nowrap">در حال بررسی</td>
                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex flex-col items-center justify-center gap-5">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group">
                                            <LuTrash2 className="text-red-500 group-hover:text-white transition-all" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flew-row items-center justify-center gap-2">
                                        <button className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group flex items-center justify-center gap-0.5">
                                            <FiCheck className="text-green-500 group-hover:text-white transition-all" />
                                            <span className="text-green-500 font-vazir group-hover:text-white transition-all text-nowrap">ثبت کردن</span>
                                        </button>

                                        <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group flex items-center justify-center gap-0.5">
                                            <RxCross1 className="text-red-500 group-hover:text-white transition-all" />
                                            <span className="text-red-500 font-vazir group-hover:text-white transition-all text-nowrap">رد کردن</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
