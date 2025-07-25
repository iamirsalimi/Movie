import React from 'react'

import logo from "../../../public/MovieFlix.png"

import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';

export default function Menu({ showMenu, setShowMenu }) {
    const hideMenu = () => setShowMenu(false)
    const location = useLocation()

    let links = [{ title: 'صفحه اصلی', href: '/', paginate: "/page/" }, { title: 'DMCA', href: '/dmca' }, { title: 'خرید اشتراک', href: 'my-account/userPanel/vip-plan' }, { title: 'فیلم های برتر', href: '/imdb-top/movies' }, { title: 'سریال های برتر', href: '/imdb-top/series' }, { title: 'انیمه های برتر', href: '/imdb-top/anime' }]

    return (
        <div className={`absolute w-full top-0 left-0 z-50 lg:hidden ${showMenu ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>
            <div className={`w-2/3 md:w-1/2 fixed top-0 h-screen bg-white dark:bg-primary flex flex-col transition-all duration-200 ${showMenu ? 'translate-x-0' : 'translate-x-full'} flex flex-col gap-2 py-5 px-2`}>

                <button className="w-fit absolute top-1 right-1 p-1 rounded-sm bg-gray-100 text-gray-800 cursor-pointer" onClick={hideMenu}>
                    <RxCross2 className="text-xl" />
                </button>

                <a href="/" className="inline-flex items-center justify-center gap-0.5 mt-5">
                    <h1 className="text-center font-bold text-3xl text-sky-300">ovieFlix</h1>
                    <div className="w-10 h-10">
                        <img src={logo} className="w-full h-full object-center object-cover" alt="Logo" />
                    </div>
                </a>

                <ul className="mt-5 flex flex-col gap-4 py-5 px-2 border-t border-gray-100 dark:border-secondary">
                    {links.map((link, index) => (
                        <a key={index} href={link.href} className={`${link.href == location.pathname && 'activeLink'}`} >
                            <li className="font-vazir text-lg text-gray-500 p-1 px-2 rounded-lg hover:text-sky-400 dark:text-white transition-colors">{link.title}</li>
                        </a>
                    ))}

                </ul>
            </div>
        </div>
    )
}
