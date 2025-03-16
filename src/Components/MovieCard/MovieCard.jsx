import React from 'react'

import { FaTheaterMasks } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa6";
import { RiTimer2Line } from "react-icons/ri";
import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
import { BiLike } from "react-icons/bi";
import { IoLanguageSharp } from "react-icons/io5";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { BsFillCcSquareFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

export default function MovieCard({ id , title, mainTitle, type , desc, src, languages, countries, genre, rating, year, time, dubed, subtitle, quality }) {

    const calcRates = rates => {
        let likedRates = rates.filter(rate => rate.liked).length
        let totalRate = Math.round(likedRates / rates.length * 100)

        return totalRate
    }

    return (
        <div className="bg-white shadow shadow-black/5 dark:bg-secondary rounded-xl p-4 flex flex-col md:flex-row gap-y-5 gap-x-5">
            <div className="relative w-full md:w-1/3 min-h-full">
                <div className="w-full max-h-[450px] md:h-full md:min-h-full relative rounded-lg overflow-hidden group">
                    <img src={src} className="w-full md:max-h-full h-full object-cover object-center" alt="" />
                    <span className="absolute top-0 left-0 w-full h-full bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"></span>
                </div>
                <div className="absolute top-2 flex items-center justify-between w-full px-2">
                    <span className="inline-block bg-light dark:bg-primary rounded-full py-1 px-2 text-secondary dark:text-white text-sm">{quality}</span>
                    <span className="inline-block bg-light dark:bg-primary rounded-full p-2 text-secondary dark:text-white cursor-pointer group">
                        <CiBookmark className="text-secondary dark:text-white text-xl opacity-75" />
                        <span className="inline-block opacity-0 h-5 absolute left-5 -top-7 -translate-x-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-10 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:rotate-45 group-hover:opacity-100 transition-all">افزودن به لیست تماشا</span>
                    </span>
                </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-5">
                <h1 className="text-light-gray dark:text-white text-xl md:text-2xl font-bold font-vazir line-clamp-1">{mainTitle}</h1>

                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center justify-center gap-1">
                        <FaImdb className="text-2xl sm:text-3xl fill-yellow-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-yellow-500">{rating[0].rate}</span><span className="text-light-gray dark:text-white">/10</span></span>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <SiRottentomatoes className="text-2xl sm:text-3xl fill-red-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-light-gray dark:text-white">{rating[1].rate}</span><span className="text-red-500">%</span></span>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <SiMetacritic className="text-2xl sm:text-3xl fill-blue-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-light-gray dark:text-white">{rating[2].rate}</span><span className="text-blue-500">%</span></span>
                    </div>

                    <div className="hidden sm:flex items-center justify-center gap-1">
                        <BiLike className="text-2xl sm:text-3xl fill-green-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-light-gray dark:text-white">{calcRates(rating[3].rates)}</span><span className="text-green-500">%</span> <span className="text-sm text-light-gray dark:text-gray-100 font-vazir">({rating[3].rates.length} رای)</span> </span>
                    </div>
                </div>

                <ul className="flex flex-col gap-1">
                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <FaTheaterMasks className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-sky-100 dark:bg-primary"></i>
                        <span className="text-nowrap text-light-gray dark:text-white font-vazir text-xs sm:text-base">{genre.map(genreItem => (
                            <span className="group px-0.5 md:px-1"><span>{genreItem}</span><span className="group-last:hidden text-slate-400"> .</span></span>
                        ))}</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <MdOutlineDateRange className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-dark bg-sky-100 dark:bg-primary"></i>
                        <span className="text-light-gray dark:text-white font-vazir text-nowrap font-semibold text-xs sm:text-base">{year}</span>
                    </li>

                    {/* <li className="flex items-center justify-between">
                        <span className="bg-primary p-2 rounded-lg">
                            <FaRegFlag className="text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-primary"></i>
                        <span className="text-nowrap text-white font-vazir">{countries.map(country => (
                            <span className="group px-1"><span>{country}</span><span className="group-last:hidden text-slate-400"> .</span></span>
                        ))}</span>
                    </li> */}

                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <RiTimer2Line className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px bg-sky-100 mx-2 dark:bg-primary"></i>
                        <span className="text-light-gray dark:text-white font-vazir text-nowrap text-xs sm:text-base">{time}</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <IoLanguageSharp className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-sky-100 dark:bg-primary"></i>
                        <span className="text-nowrap text-light-gray dark:text-white font-vazir text-xs sm:text-base">{languages.map(language => (
                            <span className="group px-1"><span>{language}</span><span className="group-last:hidden text-slate-400"> .</span></span>
                        ))}</span>
                    </li>
                </ul>

                <div className="flex items-center gap-2">
                    {subtitle && (
                        <div className="w-fit h-fit flex items-center justify-center gap-1 rounded-md p-2 bg-sky-100 dark:bg-sky-300 glass-effect">
                            <BsFillCcSquareFill className="text-md md:text-xl fill-sky-500 dark:fill-sky-700" />
                            <span className="text-sm md:text-md text-sky-500 dark:text-sky-700 font-vazir">زیرنویس فارسی</span>
                        </div>
                    )}

                    {dubed && (
                        <div className="w-fit h-fit flex items-center justify-center gap-1 rounded-md p-2 bg-red-100 dark:bg-red-300 glass-effect">
                            <FaMicrophoneAlt className="text-md md:text-xl fill-red-500 dark:fill-red-600" />
                            <span className="text-sm md:text-md text-red-400 dark:text-red-600 font-vazir">دوبله فارسی</span>
                        </div>
                    )}
                </div>

                <div className="border-2 border-light dark:border-primary rounded-lg p-2 flex flex-col gap-1 md:gap-2">
                    <h1 className="text-gray-500 dark:text-white font-vazir font-bold text-sm md:text-md">خلاصه داستان</h1>
                    <span className="font-vazir text-slate-400 dark:text-slate-300 text-sm space-x-1">
                        <span>{desc}</span>
                        <a href={`${type}/${id}`} className="group text-sky-600 dark:text-yellow-500 space-x-1">
                            <span>دانلود/جزییات بیشتر</span>
                            <PiArrowCircleLeftDuotone className="inline fill-sky-600 dark:fill-yellow-500 text-2xl group-hover:-translate-x-2 transition-all duration-150" />
                        </a>

                    </span>

                </div>
            </div>
        </div>
    )
}
