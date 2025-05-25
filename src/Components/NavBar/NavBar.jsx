import { useContext } from 'react'
import { useLocation } from 'react-router-dom';

import ThemeContext from '../../Contexts/ThemeContext';

import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function Navbar({ setShowModal, setShowMenu, hasUserLoggedIn, user }) {
    let { theme, changeTheme, navFlag } = useContext(ThemeContext)

    const location = useLocation()

    const ToggleMenu = () => {
        setShowMenu(prev => !prev)
    }

    const showModal = () => {
        setShowModal(true)
    }

    let links = [{ title: 'صفحه اصلی', href: '/' }, { title: 'خرید اشتراک', href: 'my-account/userPanel/vip-plan' }, { title: 'فیلم های برتر', href: '/imdb-top/movies' }, { title: 'سریال های برتر', href: '/imdb-top/series' }, { title: 'انیمه های برتر', href: '/imdb-top/anime' },]

    return (
        <nav className={`${navFlag ? 'shadow shadow-black/5 bg-white dark:bg-secondary' : 'absolute top-0'} w-full z-40 transition-colors`}>
            <div className="mx-auto container flex items-center justify-between py-3 px-7">
                <div className="w-2/3 flex items-center justify-between gap-2 sm:gap-5">

                    <button className="lg:hidden relative p-2 h-5 w-5 rounded-md cursor-pointer" onClick={ToggleMenu}>
                        <span className={`inline-block absolute translate-y-0 right-0 top-0.5 w-full h-0.5 ${navFlag ? 'bg-primary dark:bg-white' : 'bg-white'} rounded-full`}></span>
                        <span className={`inline-block absolute right-0 top-0.5 translate-y-2 -black-y-1/2 w-2/3 h-0.5 ${navFlag ? 'bg-primary dark:bg-white' : 'bg-white'} rounded-full`}></span>
                        <span className={`inline-block absolute right-0 top-0.5 translate-y-4 -black-y-1/2 w-1/3 h-0.5 ${navFlag ? 'bg-primary dark:bg-white' : 'bg-white'} rounded-full`}></span>
                    </button>

                    <a href="/" className="lg:inline-block hidden">
                        <h1 className={`text-center font-bold text-3xl ${navFlag ? 'text-gray-600 dark:' : ''}text-white`}>Logo</h1>
                    </a>

                    <ul className="hidden lg:flex items-center gap-1">
                        {links.map(link => {
                            if(link.title == 'خرید اشتراک' && user?.role == 'admin'){
                                return false
                            }

                            return (
                                   <a href={link.href} className={`${link.href == location.pathname && 'activeLink'}`} >
                                       <li className={`font-vazir-light p-1 px-2 rounded-lg  ${navFlag ? 'text-light-gray hover:bg-gray-100 dark:hover:bg-primary dark:' : ''}text-white hover:text-sky-400 transition-colors`}>{link.title}</li>
                                   </a>
                               )
                        })}

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
                    <button onClick={changeTheme} className={`flex items-center p-2 rounded-xl border ${navFlag ? 'bg-white text-light-gray dark:text-white border-gray-300 dark:border-none hover:bg-black/5 dark:hover:bg-white/5 dark:' : 'border-none text-white hover:bg-gray-800 '}bg-primary cursor-pointer transition-all`}>
                        {theme == 'dark' ? (
                            <IoSunnyOutline className="text-2xl" />
                        ) : (
                            <BsFillMoonStarsFill className="text-2xl" />
                        )}
                    </button>
                    <button
                        className={`flex items-center p-2 rounded-xl border ${navFlag ? 'bg-white text-light-gray dark:text-white border-gray-300 dark:border-none hover:bg-black/5 dark:hover:bg-white/5 dark:' : 'border-none text-white hover:bg-gray-800 '}bg-primary cursor-pointer transition-all`}
                        onClick={showModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  dark:stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    {hasUserLoggedIn && (
                        <a href={user?.role == 'admin' ? '/my-account/adminPanel' : '/my-account/userPanel'} className={`relative flex items-center p-2 rounded-xl border ${navFlag ? 'bg-white text-light-gray dark:text-white border-gray-300 dark:border-none hover:bg-black/5 dark:hover:bg-white/5 dark:' : 'border-none text-white hover:bg-gray-800 '}bg-primary cursor-pointer transition-all`}>
                            <IoNotificationsOutline className="text-2xl" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 text-sm flex items-center justify-center rounded-full bg-sky-500 text-white">0</span>
                        </a>
                    )}
                    <div className="flex items-center justify-center gap-2">
                        <a href={hasUserLoggedIn ? `/my-account/${user?.role == 'admin' ? 'adminPanel' : 'userPanel'}` : `/account/login`} className={`hidden md:block bg-sky-500 ${navFlag ? 'hover:bg-white dark:' : 'border-transparent '}hover:bg-primary border hover:border-sky-500 transition-colors p-2 rounded-lg hover:text-sky-500 text-white dark:border-secondary font-vazir cursor-pointer text-nowrap`}>{hasUserLoggedIn ? 'حساب کاربری' : 'ورود / ثبت نام'}</a>
                        <a href="/account/login" className={`md:hidden  relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden`}>
                            <FaUser className="text-gray-400 absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}