import React, { useState } from 'react'

import UserInfoModal from '../../Components/UserInfoModal/UserModalInfo'

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { TbTicket } from "react-icons/tb";

export default function AllUsers() {
    const [showModal, setShowModal] = useState(false)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')

    return (
        <>
            <div className=" w-full panel-box py-4 px-5 flex flex-col gap-7">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">کاربر ها</h2>
                </div>
                <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">

                    <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                                <option value="ID">ID</option>
                                <option value="name">نام</option>
                                <option value="username">نام کاربری</option>
                                <option value="email">ایمیل</option>
                                <option value="with-vip-plan">کاربر های دارای اشتراک</option>
                                <option value="without-vip-plan">کاربر های یدون اشتراک</option>
                                <option value="banned-users">کاربر های بن شده</option>
                                <option value="unbanned-users">کاربر های بن نشده</option>
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
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام کاربری</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ایمیل</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ عضویت</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">اشتراک</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت حساب</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex123</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex29@gmail.com</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">20/5/1403</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ندارد</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">فعال</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                        <a
                                            href="/my-account/adminPanel/users/edit-user/1234"
                                            className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                        >
                                            <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                        </a>

                                        <a
                                            href="/my-account/adminPanel/users/user-details/1234"
                                            className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                                        >
                                            <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                        </a>

                                        <button className="p-1 rounded-md cursor-pointer bg-orange-200 hover:bg-orange-500 transition-colors group">
                                            <TbTicket className="text-orange-500 group-hover:text-white transition-all" />
                                        </button>

                                        <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group">
                                            <FaBan className="text-red-500 group-hover:text-white transition-all" />
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <UserInfoModal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}
