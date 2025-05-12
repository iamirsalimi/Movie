import React, { useRef, useState } from 'react'

import { FaEye } from "react-icons/fa";

export default function AllWeeklyReleases() {
    const [showMovieReleaseDetails, setShowMovieReleaseDetails] = useState(false)

    const movieReleaseDetailsRef = useRef(null)

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">لیست هفتگی فیلم ها</h2>
                <a href="/my-account/adminPanel/weekly-release/add-release" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors">افزودن پخش جدید</a>
            </div>
            <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                {showMovieReleaseDetails && (
                    <ul ref={movieReleaseDetailsRef} className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary p-2">
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID</h3>
                            <p className="text-primary dark:text-gray-300">#21342134</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID فیلم</h3>
                            <p className="text-primary dark:text-gray-300">21342134</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نوع فیلم</h3>
                            <p className="text-primary dark:text-gray-300">فیلم</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">تاریخ انتشار</h3>
                            <p className="text-primary dark:text-gray-300">20/01/1404</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">شماره فصل</h3>
                            <p className="text-primary dark:text-gray-300">-</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">شروع قسمت</h3>
                            <p className="text-primary dark:text-gray-300">-</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">تعداد قسمت ها</h3>
                            <p className="text-primary dark:text-gray-300">-</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">فاصله بین هر قسمت</h3>
                            <p className="text-primary dark:text-gray-300">-</p>
                        </li>
                    </ul>
                )}
                <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value="">
                            <option value="ID">ID</option>
                            <option value="movieId">ID فیلم</option>
                            <option value="series">سریال</option>
                            <option value="movie">فیلم</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
                    </div>
                </div>

                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                    <table className="w-full">
                        <thead className="min-w-full">
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ID فیلم</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نوع فیلم</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ انتشار</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">شماره فصل</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تعداد قسمت ها</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5 odd:bg-gray-200 dark:odd:bg-primary" >
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">2341234</td>
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">2134</td>
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">movie</td>
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">12/2/2026</td>
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">-</td>
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">-</td>
                                <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">
                                    <button
                                        className="p-1.5 rounded-md mx-auto cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group flex items-center justify-center gap-0.5"
                                        onClick={e => {
                                            setShowMovieReleaseDetails(true)
                                            movieReleaseDetailsRef.current.scrollIntoView({ behavior: 'smooth' })
                                        }}
                                    >
                                        <FaEye className="text-sky-500 group-hover:text-white transition-all" />
                                        <span className="text-sky-500 font-vazir group-hover:text-white transition-all">مشاهده</span>
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
