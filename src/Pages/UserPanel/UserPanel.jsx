import React, { useContext } from 'react'
import { useLocation, Outlet } from 'react-router-dom';

import ThemeContext from '../../Contexts/ThemeContext';

import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";

let links = [
    { title: 'داشبورد', href: '/my-account/userPanel/', icon: <LuLayoutDashboard className="text-light-gray dark:text-white text-xl" /> },
    { title: 'ویرایش پروفایل', href: '/my-account/userPanel/profile-edit', icon: <IoSettingsOutline className="text-light-gray dark:text-white text-xl" /> },
    { title: 'اشتراک ویژه', href: '/my-account/userPanel/vip-plan', icon: <FaCrown className="text-light-gray dark:text-white text-xl" n /> },
    { title: 'لیست تماشا', href: '/my-account/userPanel/watchList', icon: <CiBookmark className="text-light-gray dark:text-white text-xl" /> },
    { title: 'اعلان ها', href: '/my-account/userPanel/notifications', icon: <IoNotificationsOutline className="text-light-gray dark:text-white text-xl" /> },
    { title: 'مطالب درخواستی', href: '/my-account/userPanel/requests', icon: <IoMdAddCircleOutline className="text-light-gray dark:text-white text-xl" /> },
    { title: 'دیدگاه ها', href: '/my-account/userPanel/comments', icon: <FaCommentDots className="text-light-gray dark:text-white text-xl" /> },
    { title: 'پیام ها', href: '/my-account/userPanel/messages', icon: <BiMessageAltDetail className="text-light-gray dark:text-white text-xl" /> },
]

export default function UserPanel() {
    let location = useLocation().pathname
    location = location.split('/').length == 3 ? location + '/' : location

    let { theme, changeTheme } = useContext(ThemeContext)

    return (
        <>
            <div className="w-full fixed bg-white shadow shadow-black/5 dark:bg-secondary lg:w-1/3 xl:w-1/4 h-screen px-5 py-9 flex flex-col justify-start items-center gap-10">
                <div className="flex flex-col items-center gap-5">
                    <div className="relative w-24 h-24 rounded-full bg-gray-400 overflow-hidden ring-8 ring-gray-700/25">
                        <FaUser className="text-white absolute -bottom-10 left-1/2 -translate-1/2 w-20 h-20" />
                    </div>
                    <h2 className="text-light-gray dark:text-white font-vazir">سلام User خوش آمدید</h2>
                </div>
                <div className="w-full flex items-center justify-center gap-4">

                    <button onClick={changeTheme} className="relative flex items-center p-2 lg:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                        {theme == 'dark' ? (
                            <IoSunnyOutline className="stroke-white text-2xl" />
                        ) : (
                            <BsFillMoonStarsFill className="fill-light-gray text-2xl" />
                        )}
                        <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">تغییر تم</span>
                    </button>

                    <a href='notifications' className="relative flex items-center p-2 lg:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                        <IoNotificationsOutline className='text-light-gray dark:text-white text-2xl' />
                        <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">اعلان ها</span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-sm text-white">0</span>
                    </a>

                    <a href="messages" className="relative flex items-center p-2 lg:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                        <BiMessageAltDetail className='text-light-gray dark:text-white text-2xl' />
                        <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">پیام ها</span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-sm text-white">0</span>
                    </a>

                    <button className="relative flex items-center p-2 lg:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                        <TbLogout2 className='text-red-500 text-2xl' />
                        <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">خروج از حساب کاربری</span>
                    </button>

                    {/* <button className="p-2 rounded-sm border-2 flex items-center justify-center border-gray-100 dark:border-primary cursor-pointer relative group">
                        <TbLogout2 className='text-red-500 text-2xl' />
                        <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">خروج از حساب کاربری</span>
                    </button> */}
                </div>

                {/* panel links */}
                <div className="grid grid-cols-2 gap-2 w-full">
                    {links.map(link => (
                        <a href={link.href} className={`bg-gray-100 dark:bg-primary hover:bg-orange-500/10 transition-colors duration-250 py-3 px-2 rounded-lg cursor-pointer flex flex-col items-center gap-1 ${link.href == location ? 'activePanelLink' : ''}`}>
                            {link.icon}
                            <span className="text-light-gray dark:text-white text-xs font-vazir text-center">{link.title}</span>
                        </a>
                    ))}
                </div>

            </div>
            <div className="h-screen w-3/4 mr-auto bg-light dark:bg-primary px-5 py-7">
                <div className="w-full h-full flex flex-col items-center gap-2 ">

                    <div className="w-full flex items-center justify-between">
                        <a href="/" className="flex items-center p-2 rounded-xl border text-light-gray dark:text-white border-gray-300 hover:bg-gray-100 hover:border-gray-200 dark:border-none dark:bg-secondary dark:hover:bg-white/5 cursor-pointer transition-all">
                            <MdKeyboardArrowRight className="stroke-white text-2xl" />
                            <span className="text-sm font-vazir">بازگشت به صفحه اصلی</span>
                        </a>
                        <span className="text-light-gray dark:text-white font-vazir">داشبورد</span>
                    </div>

                    <Outlet />
                </div>
            </div>
        </>
    )
}
