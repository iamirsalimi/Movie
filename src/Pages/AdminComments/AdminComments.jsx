import React, { useRef, useState } from 'react'

import { FaEye } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

export default function AdminComments() {
    const [showCommentDetails, setShowCommentDetails] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchType, setSearchType] = useState("ID")
    const commentDetailsRef = useRef()

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">دیدگاه ها</h2>
            </div>
            <div className="w-full flex flex-col items-center gap-12">
                {showCommentDetails && (
                    <ul ref={commentDetailsRef} className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary p-2">
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID</h3>
                            <p className="text-primary dark:text-gray-300">#21342134</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID کاربر</h3>
                            <p className="text-primary dark:text-gray-300">21342134</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نام نمایشی کاربر</h3>
                            <p className="text-primary dark:text-gray-300">Alex</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نام فیلم</h3>
                            <p className="text-primary dark:text-gray-300">Openheimer</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ریپلی شده</h3>
                            <p className="text-primary dark:text-gray-300">بله</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">Id کامنت پدر</h3>
                            <p className="text-primary dark:text-gray-300">#12341</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">زمان ثبت کامنت</h3>
                            <p className="text-primary dark:text-gray-300">20:23 20/01/1404</p>
                        </li>
                        <li className="flex flex-col gap-2 w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">متن کامنت</h3>
                            <p className="text-primary dark:text-gray-300 font-vazir">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem at dolore, ab ea optio iusto debitis. Sunt, ea deserunt. Omnis.</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">دارای اسپویل هست؟</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-primary dark:border-gray-600 dark:bg-primary bg-gray-100 text-primary dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" >
                                    <option value="yes">خیر</option>
                                    <option value="no">بله</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-primary dark:text-gray-600 bg-gray-100 dark:bg-primary">دارای اسپویل</span>
                            </div>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">وضعیت تیکت</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center">
                                {/* pending */}
                                <div className="flex flex-col items-center justify-center gap-5">
                                    <span className="text-primary dark:text-white">Pending</span>
                                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                        <button className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group flex items-center justify-center gap-0.5">
                                            <FiCheck className="text-green-500 group-hover:text-white transition-all" />
                                            <span className="text-green-500 font-vazir group-hover:text-white transition-all">قبول کردن</span>
                                        </button>

                                        <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group flex items-center justify-center gap-0.5">
                                            <RxCross1 className="text-red-500 group-hover:text-white transition-all" />
                                            <span className="text-red-500 font-vazir group-hover:text-white transition-all">رد کردن</span>
                                        </button>
                                    </div>
                                </div>

                                {/* accepted */}
                                {/* <span className="bg-green-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                            <FiCheck className="text-green-500 stroke-2 " />
                                            <span className="text-green-500 font-vazir">تایید شده</span>
                                            </span> */}

                                {/* rejected */}
                                {/* <span className="bg-red-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                            <RxCross1 className="text-red-500 stroke-2 " />
                                            <span className="text-red-500 font-vazir">رد شده</span>
                                            </span> */}
                            </div>
                        </li>
                        <div className="w-full grid grid-cols-3 gap-2">
                            <button className="mt-5 w-full bg-sky-500 hover:bg-sky-600 transition-colors text-white py-2 font-vazir text-xl cursor-pointer rounded-lg">آپدیت</button>
                            <button className="mt-5 w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-2 font-vazir text-xl cursor-pointer rounded-lg">مشاهده کامنت</button>
                            <button className="mt-5 w-full bg-red-500 hover:bg-red-600 transition-colors text-white py-2 font-vazir text-xl cursor-pointer rounded-lg">ری ست</button>

                        </div>
                    </ul>
                )}
                <div className="w-full flex flex-col items-center gap-5">
                    <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-red-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                                <option value="ID">ID</option>
                                <option value="title">نام کاربر</option>
                                <option value="type">فیلم</option>
                                <option value="accepted">تایید شده</option>
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
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام کاربر</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">متن کامنت</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">اسپویل</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">زمان ثبت کامنت</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="py-1 px-2 odd:bg-gray-200 dark:odd:bg-primary text-center" >
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 max-w-32">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis minima sit cumque cupiditate. Magnam dolore accusantium possimus facilis debitis!</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center max-w-20">

                                        {/* <span className="bg-green-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                            <FiCheck className="text-green-500 stroke-2 " />
                                            <span className="text-green-500 font-vazir">دارد</span>
                                            </span> */}

                                        <span className="bg-red-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                            <RxCross1 className="text-red-500 stroke-2 " />
                                            <span className="text-red-500 font-vazir">ندارد</span>
                                        </span>

                                    </td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">20:23 20/5/1403</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center max-w-20">
                                        <span>Pending</span>

                                        {/* <span className="bg-green-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                            <FiCheck className="text-green-500 stroke-2 " />
                                            <span className="text-green-500 font-vazir">تایید شده</span>
                                            </span> */}

                                        {/* <span className="bg-red-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                            <RxCross1 className="text-red-500 stroke-2 " />
                                            <span className="text-red-500 font-vazir">رد شده</span>
                                            </span> */}

                                    </td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center flex flex-col items-center justify-center gap-2">
                                        <button
                                            className="p-1.5 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group flex items-center justify-center gap-0.5"
                                            onClick={e => {
                                                setShowCommentDetails(true)
                                                commentDetailsRef.current.scrollIntoView({ behavior: 'smooth' })
                                            }}
                                        >
                                            <FaEye className="text-sky-500 group-hover:text-white transition-all" />
                                            <span className="text-sky-500 font-vazir group-hover:text-white transition-all">مشاهده</span>
                                        </button>
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group flex items-center justify-center gap-0.5">
                                                <FiCheck className="text-green-500 group-hover:text-white transition-all" />
                                                <span className="text-green-500 font-vazir group-hover:text-white transition-all">قبول کردن</span>
                                            </button>

                                            <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group flex items-center justify-center gap-0.5">
                                                <RxCross1 className="text-red-500 group-hover:text-white transition-all" />
                                                <span className="text-red-500 font-vazir group-hover:text-white transition-all">رد کردن</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}