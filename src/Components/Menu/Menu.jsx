import React from 'react'

import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';

export default function Menu({ showMenu, setShowMenu }) {
    const hideMenu = () => setShowMenu(false)
    const location = useLocation()

    let links = [{ title: 'صفحه اصلی', href: '/' }, { title: 'خرید اشتراک', href: '/vip-plan' }, { title: 'فیلم های برتر', href: '/imdb-top/movies' }, { title: 'سریال های برتر', href: '/imdb-top/series' }, { title: 'انیمه های برتر', href: '/imdb-top/anime' },]

    return (
        <div className={`absolute w-full top-0 left-0 z-50 lg:hidden ${showMenu ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>
            <div className={`w-2/3 md:w-1/2 fixed top-0 h-screen bg-white dark:bg-primary flex flex-col transition-all duration-200 ${showMenu ? 'translate-x-0' : 'translate-x-full'} flex flex-col gap-2 py-5 px-2`}>

                <button className="w-fit absolute top-1 right-1 p-1 rounded-sm bg-gray-100 text-gray-800 cursor-pointer" onClick={hideMenu}>
                    <RxCross2 className="text-xl" />
                </button>

                <a href="">
                    <h1 className="text-center font-bold text-4xl dark:text-white text-gray-700">Logo</h1>
                </a>

                <ul className="mt-5 flex flex-col gap-4 py-5 px-2 border-t border-gray-100 dark:border-secondary">
                    {links.map(link => (
                        <a href={link.href} className={`${link.href == location.pathname && 'activeLink'}`} >
                            <li className="font-vazir text-lg text-gray-500 p-1 px-2 rounded-lg hover:text-sky-400 dark:text-white transition-colors">{link.title}</li>
                        </a>
                    ))}

                    {/* <a href="#">
                        <span className="font-vazir text-lg text-gray-500 p-1 px-2 rounded-lg hover:text-sky-400 dark:text-white transition-colors">خرید اشتراک</span>
                    </a>
                    <a href="#">
                        <span className="font-vazir text-lg text-gray-500 p-1 px-2 rounded-lg hover:text-sky-400 dark:text-white transition-colors">فیلم های برتر</span>
                    </a>
                    <a href="#">
                        <span className="font-vazir text-lg text-gray-500 p-1 px-2 rounded-lg hover:text-sky-400 dark:text-white transition-colors">سریال های برتر</span>
                    </a>
                    <a href="#">
                        <span className="font-vazir text-lg text-gray-500 p-1 px-2 rounded-lg hover:text-sky-400 dark:text-white transition-colors">انیمه های برتر</span>
                    </a> */}
                </ul>
            </div>
        </div>
    )
}
