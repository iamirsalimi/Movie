import React, { useContext, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom';

import ThemeContext from '../../Contexts/ThemeContext';

import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCrown } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { HiMenu } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { LuTickets } from "react-icons/lu";
import { AiOutlineComment } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";

let links = [
    { title: 'داشبورد', href: '/my-account/adminPanel/', icon: <LuLayoutDashboard className="text-light-gray dark:text-white text-xl" /> },
    { title: 'ویرایش پروفایل', href: '/my-account/adminPanel/profile-edit', icon: <IoSettingsOutline className="text-light-gray dark:text-white text-xl" /> },
    { title: 'کاربر ها', href: '/my-account/adminPanel/users', icon: <FaUsers className="text-light-gray dark:text-white text-xl" /> },
    { title: 'فیلم ها', href: '/my-account/adminPanel/movies', icon: <BiMoviePlay className="text-light-gray dark:text-white text-xl" /> },
    { title: 'تیکت ها', href: '/my-account/adminPanel/tickets', icon: <LuTickets className="text-light-gray dark:text-white text-xl" /> },
    { title: 'دیدگاه ها', href: '/my-account/adminPanel/comments', icon: <AiOutlineComment className="text-light-gray dark:text-white text-xl" /> },
    { title: 'اعلان ها', href: '/my-account/adminPanel/notifications', icon: <IoNotificationsOutline className="text-light-gray dark:text-white text-xl" /> },
    { title: 'مطالب درخواستی', href: '/my-account/adminPanel/requests', icon: <IoMdAddCircleOutline className="text-light-gray dark:text-white text-xl" /> },
    { title: 'جدول هفتگی', href: '/my-account/adminPanel/weekly-release', icon: <BsCalendarDate className="text-light-gray dark:text-white text-xl" /> },
]

export default function UserPanel() {
    const [showMenu, setShowMenu] = useState(false)

    let location = useLocation().pathname

    let mainLocationObj = links.find(link => link.href.includes(location))
    if (!mainLocationObj) {
        // it means we are in one of subroutes , Route of Dashboard is in every other route's link so we don't need that 
        mainLocationObj = links.slice(1).find(link => location.includes(link.href))
    }

    let dashboardLocation = location.split('/').length == 3 ? location + '/' : location

    let { theme, changeTheme } = useContext(ThemeContext)

    const hideMenu = () => setShowMenu(false)

    return (
        <>
            <div className={`w-full z-50 fixed right-0 top-0 ${showMenu ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 transition-all duration-300 bg-white shadow shadow-black/5 dark:bg-secondary lg:w-1/4 h-screen `}>
                <div className="px-5 py-9 flex flex-col justify-start items-center gap-7 overflow-y-auto pb-12">
                    <button className="block lg:hidden w-fit absolute top-1 right-1 p-1 rounded-sm bg-gray-100 text-gray-800 dark:bg-primary dark:text-white cursor-pointer" onClick={hideMenu}>
                        <RxCross2 className="text-xl" />
                    </button>

                    <div className="flex flex-col items-center gap-5">
                        <div className="relative w-24 h-24 rounded-full bg-gray-400 overflow-hidden ring-8 ring-gray-300/25 dark:ring-gray-700/25">
                            <FaUser className="text-white absolute -bottom-10 left-1/2 -translate-1/2 w-20 h-20" />
                        </div>
                        <h2 className="text-light-gray dark:text-white font-vazir">سلام User خوش آمدید</h2>
                    </div>
                    <div className="w-full flex items-center justify-center gap-4">

                        <button onClick={changeTheme} className="relative flex items-center p-2 xl:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                            {theme == 'dark' ? (
                                <IoSunnyOutline className="stroke-white text-2xl" />
                            ) : (
                                <BsFillMoonStarsFill className="fill-light-gray text-2xl" />
                            )}
                            <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">تغییر تم</span>
                        </button>

                        <a href='notifications' className="relative flex items-center p-2 xl:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                            <IoNotificationsOutline className='text-light-gray dark:text-white text-2xl' />
                            <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">اعلان ها</span>
                        </a>

                        <a href="messages" className="relative flex items-center p-2 xl:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                            <AiOutlineComment className='text-light-gray dark:text-white text-2xl' />
                            <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">کامنت ها</span>
                        </a>

                        <button className="relative flex items-center p-2 xl:p-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all group">
                            <TbLogout2 className='text-red-500 text-2xl' />
                            <span className="inline-block opacity-0 h-5 absolute left-1/2 -top-5 -translate-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-40 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:rotate-45 group-hover:opacity-100 transition-all">خروج از حساب کاربری</span>
                        </button>
                    </div>

                    {/* panel links */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                        {links.map(link => {
                            const isExactMatch = link.href === dashboardLocation
                            const isSubRoute = link.href !== '/my-account/adminPanel/' && location.includes(link.href)
                            const isActive = isExactMatch || isSubRoute

                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`bg-gray-100 dark:bg-primary hover:bg-orange-500/10 transition-colors duration-250 py-3 px-2 rounded-lg cursor-pointer flex flex-col items-center gap-1 ${isActive ? 'activePanelLink' : ''}`}
                                >
                                    {link.icon}
                                    <span className="text-light-gray dark:text-white text-xs font-vazir text-center">{link.title}</span>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-3/4 min-h-screen max-h-fit mr-auto bg-light dark:bg-primary px-2 xs:px-5 py-7">
                <div className="w-full h-full flex flex-col items-center gap-7 mb-10">

                    <div className="w-full flex items-center justify-between">
                        <a href="/" className="flex items-center p-2 rounded-xl border text-light-gray dark:text-white border-gray-300 hover:bg-gray-100 hover:border-gray-200 dark:border-none dark:bg-secondary dark:hover:bg-white/5 cursor-pointer transition-all">
                            <MdKeyboardArrowRight className="stroke-white text-2xl" />
                            <span className="text-sm font-vazir">بازگشت به صفحه اصلی</span>
                        </a>
                        <span className="text-light-gray dark:text-white font-vazir">{mainLocationObj.title}</span>
                    </div>

                    <Outlet />
                </div>
            </div>

            <div className="w-full h-fit flex items-center justify-between z-10 fixed bottom-0 left-0 bg-gray-100 shadow shadow-black/25 dark:bg-secondary px-1 xs:px-5 py-4 lg:hidden">

                <a href="/my-account/userPanel/" className="flex flex-col items-center justify-center gap-1">
                    <LuLayoutDashboard className={`text-light-gray dark:text-white text-xl xs:text-2xl ${dashboardLocation == '/my-account/userPanel/' ? '!text-sky-500' : 'text-light-gray dark:text-white'}`} />
                    <span className={`font-vazir text-xs xs:text-sm ${dashboardLocation == '/my-account/userPanel/' ? '!text-sky-500' : 'text-light-gray dark:text-white'}`}>داشبورد</span>
                </a>

                <a href="/my-account/userPanel/profile-edit" className="flex flex-col items-center justify-center gap-1">
                    <IoSettingsOutline className={`text-light-gray dark:text-white text-xl xs:text-2xl ${location.includes('/my-account/userPanel/profile-edit') ? '!text-sky-500' : 'text-light-gray dark:text-white'}`} />
                    <span className={`font-vazir text-xs xs:text-sm ${location.includes('/my-account/userPanel/profile-edit') ? '!text-sky-500' : 'text-light-gray dark:text-white'}`}>ویرایش</span>
                </a>

                <a href="/my-account/userPanel/messages" className="relative flex flex-col items-center justify-center gap-1">
                    <BiMessageAltDetail className={`text-light-gray dark:text-white text-xl xs:text-2xl ${location.includes('/my-account/userPanel/messages') ? '!text-sky-500' : 'text-light-gray dark:text-white'}`} />
                    <span className={`font-vazir text-xs xs:text-sm ${location.includes('/my-account/userPanel/messages') ? '!text-sky-500' : 'text-light-gray dark:text-white'}`}>پیام ها</span>
                    <span className="absolute -top-1 right-0 w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-xs text-white">0</span>
                </a>

                <div className="my-account/userPanel/flex flex-col items-center justify-center gap-1 cursor-pointer">
                    <TbLogout2 className='text-red-500 text-xl xs:text-2xl' />
                    <span className="text-light-gray dark:text-white font-vazir text-xs xs:text-sm">خروج</span>
                </div>


                <button
                    href="#"
                    className="absolute top-2 left-1/2 -translate-1/2 p-3 py-2 rounded-full bg-gray-100  dark:bg-secondary flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => setShowMenu(true)}
                >
                    <HiMenu className='text-light-gray dark:text-white text-3xl' />
                    <span className="text-light-gray dark:text-white font-vazir text-xs xs:text-sm">منو</span>
                </button>
            </div>
        </>
    )
}
