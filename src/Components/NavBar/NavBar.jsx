import { useContext } from 'react'
import { useLocation } from 'react-router-dom';

import ThemeContext from '../../Contexts/ThemeContext';

import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function Navbar({ setShowModal, setShowMenu }) {
    let {theme , changeTheme} = useContext(ThemeContext)

    const location = useLocation()



    const ToggleMenu = () => {
        setShowMenu(prev => !prev)
    }

    const showModal = () => {
        setShowModal(true)
    }

    let links = [{title:'صفحه اصلی' , href: '/'}, {title:'خرید اشتراک' , href: '/vip-plan'},{title:'فیلم های برتر' , href: '/imdb-top/movies'},{title:'سریال های برتر' , href: '/imdb-top/series'},{title:'انیمه های برتر' , href: '/imdb-top/anime'},]

    return (
        <nav className="w-full z-40 transition-colors shadow-xl shadow-black/5 bg-white dark:bg-secondary ">
            <div className="mx-auto container flex items-center justify-between py-3 px-7">
                <div className="flex items-center justify-start gap-2 sm:gap-5">

                    <button className="lg:hidden relative p-2 h-5 w-5 rounded-md cursor-pointer" onClick={ToggleMenu}>
                        <span className={`inline-block absolute translate-y-0 right-0 top-0.5 w-full h-0.5 bg-primary dark:bg-white rounded-full`}></span>
                        <span className={`inline-block absolute right-0 top-0.5 translate-y-2 -black-y-1/2 w-2/3 h-0.5 bg-primary dark:bg-white rounded-full`}></span>
                        <span className={`inline-block absolute right-0 top-0.5 translate-y-4 -black-y-1/2 w-1/3 h-0.5 bg-primary dark:bg-white rounded-full`}></span>
                    </button>

                    <a href="/" className="sm:inline-block hidden">
                        <h1 className="text-center font-bold text-3xl dark:text-white text-gray-700">Logo</h1>
                    </a>

                    <ul className="hidden lg:flex items-center gap-1">
                        {links.map(link => (
                            <a href={link.href} className={`${link.href == location.pathname && 'activeLink'}`} >
                                <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-secondary transition-colors">{link.title}</li>
                            </a>
                        ))}

                        {/* <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-secondary transition-colors">خرید اشتراک</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-secondary transition-colors">فیلم های برتر</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-secondary transition-colors">سریال های برتر</li>
                        </a>
                        <a href="#">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-secondary transition-colors">انیمه های برتر</li>
                        </a>
                        <a href="/dmca">
                            <li className="font-vazir text-gray-500  p-1 px-2 rounded-lg hover:bg-gray-50 hover:text-sky-400 dark:text-white dark:hover:bg-secondary transition-colors">DMCA</li>
                        </a> */}
                    </ul>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <button onClick={changeTheme} className="flex items-center p-2 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 cursor-pointer transition-all">
                        {theme == 'dark' ? (
                            <IoSunnyOutline className="stroke-white text-2xl" />
                        ) : (
                            <BsFillMoonStarsFill className="fill-gray-400 text-2xl" />
                        )}
                    </button>
                    <button
                        className="cursor-pointer p-2 rounded-xl border bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-100 dark:border-none dark:bg-primary dark:hover:bg-white/5 transition-all"
                        onClick={showModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-gray-400  dark:stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    <div className="flex items-center justify-center gap-2">
                        <a href="/account/login" className="hidden md:block bg-sky-500 hover:bg-white dark:hover:bg-primary border border-white dark:border-primary hover:border-sky-500 transition-colors p-2 rounded-lg text-white hover:text-sky-500 font-vazir cursor-pointer">حساب کاربری</a>
                        <a href="/account/login" className="md:hidden transition-colors rounded-sm dark:text-white text-gray-500 text-xl font-vazir cursor-pointer">
                            <FaRegUser />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}