import { useEffect, useState } from "react"

import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function Navbar({ theme, setTheme, setShowModal, setShowMenu }) {

    const changeTheme = () => {
        setTheme(prev => {
            localStorage.setItem('theme', 'dark' == prev ? 'light' : 'dark')
            document.documentElement.classList.toggle('dark')
            return 'dark' == prev ? 'light' : 'dark'
        })
    }

    const ToggleMenu = () => {
        setShowMenu(prev => !prev)
    }

    const showModal = () => {
        setShowModal(true)
    }

    return (
        <nav className="w-full z-40 transition-colors fixed shadow-xl shadow-black/5 bg-white dark:bg-primary ">
            <div className="mx-auto container flex items-center justify-between py-3 px-7">
                <div className="flex items-center justify-start gap-2 sm:gap-5">

                    <button className="lg:hidden relative p-2 h-5 w-5 rounded-md cursor-pointer" onClick={ToggleMenu}>
                        <span className={`inline-block absolute translate-y-0 right-0 top-0.5 w-full h-0.5 bg-primary dark:bg-white rounded-full`}></span>
                        <span className={`inline-block absolute right-0 top-0.5 translate-y-2 -black-y-1/2 w-2/3 h-0.5 bg-primary dark:bg-white rounded-full`}></span>
                        <span className={`inline-block absolute right-0 top-0.5 translate-y-4 -black-y-1/2 w-1/3 h-0.5 bg-primary dark:bg-white rounded-full`}></span>
                    </button>

                    <a href="" className="sm:inline-block hidden">
                        <h1 className="text-center font-bold text-3xl dark:text-white text-gray-700">Logo</h1>
                    </a>

                    <ul className="hidden lg:flex items-center gap-1">
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-primary transition-colors">صفحه اصلی</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-primary transition-colors">خرید اشتراک</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-primary transition-colors">فیلم های برتر</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-primary transition-colors">سریال های برتر</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-primary transition-colors">انیمه های برتر</li>
                        </a>
                    </ul>
                </div>
                <div className="flex items-center justify-end gap-3 sm:gap-2">
                    <button onClick={changeTheme} className="flex items-center p-0.5 cursor-pointer transition-colors">
                        {theme == 'dark' ? (
                            <IoSunnyOutline className="stroke-white text-2xl" />
                        ) : (
                            <BsFillMoonStarsFill className="fill-gray-500 text-xl" />
                        )}
                    </button>
                    <button
                        className="p-1 cursor-pointer transition-colors"
                        onClick={showModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-gray-500  dark:stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    <div className="flex items-center justify-center gap-2">
                        <button className="hidden md:block bg-sky-400 hover:bg-sky-500 transition-colors py-1 px-2 sm:px-4 rounded-sm text-white font-vazir cursor-pointer">ورود</button>
                        <button className="hidden md:block transition-colors rounded-sm dark:text-white text-gray-500  font-vazir cursor-pointer">ثبت نام</button>
                        <button className="md:hidden transition-colors rounded-sm dark:text-white text-gray-500 text-xl font-vazir cursor-pointer">
                            <FaRegUser />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}