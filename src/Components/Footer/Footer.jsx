import React from 'react'

import { IoLogoInstagram } from "react-icons/io";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import logo from "../../../public/MovieFlix.png"

let links = [{ title: 'صفحه اصلی', href: '/' }, { title: 'DMCA', href: '/dmca' }, { title: 'خرید اشتراک', href: '/vip-plan' }, { title: 'فیلم های برتر', href: '/imdb-top/movies' }, { title: 'سریال های برتر', href: '/imdb-top/series' }, { title: 'انیمه های برتر', href: '/imdb-top/anime' }]

export default function Footer() {
    return (
        <footer className='mt-12 bg-white dark:bg-secondary pt-10 flex flex-col gap-5'>
            <div className="container px-5 mx-auto flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 lg:gap-x-2 gap-y-5 py-7">
                    <div className="flex flex-col items-center md:items-start gap-2 md:pl-5">
                        <a href="/" className="lg:inline-flex hidden items-center justify-center gap-0.5">
                            <h1 className="text-center font-bold text-2xl text-sky-300">ovieFlix</h1>
                            <div className="w-7 h-7">
                                <img src={logo} className="w-full h-full object-center object-cover" alt="Logo" />
                            </div>
                        </a>
                        <p className="font-vazir text-light-gray dark:text-gray-400 text-center md:text-justify">دانلود رایگان فیلم و سریال با زیرنویس فارسی چسبیده و دوبله فارسی</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-5">
                        <h2 className="text-sky-500 font-bold font-vazir text-2xl">دسترسی سریع</h2>
                        <ul className="grid grid-cols-2 items-center place-items-center md:place-items-start gap-2">
                            {links.map((link, index) => (
                                <a key={index} href={link.href} >
                                    <li className="text-light-gray dark:text-white hover:text-sky-300 transition-colors font-vazir">{link.title}</li>
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center gap-3">
                        <a href="#" className="inline-block w-full">
                            <div className="bg-gradient-to-r z-20 from-(--purpleCustom) to-(--orangeCustom) w-full rounded-xl p-4 flex items-center justify-between">
                                <span className="font-vazir text-white font-semibold">اينستاگرام ما</span>
                                <IoLogoInstagram className="text-white text-4xl" />
                            </div>

                        </a>
                        <a href="#" className="inline-block w-full">
                            <div className="bg-gradient-to-r z-20 from-blue-600 to-sky-400 w-full p-4 rounded-xl flex items-center justify-between">
                                <span className="font-vazir text-white font-semibold">تلگرام ما</span>
                                <PiTelegramLogoDuotone className="text-white text-4xl" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full bg-gray-100 dark:bg-primary py-3">
                <h2 className="container mx-auto text-gray-500 dark:text-white font-vazir text-center text-sm md:text-base md:text-justify">تمامی حقوق مادی و معنوی سایت متعلق به LOGO میباشد</h2>
            </div>
        </footer>
    )
}
