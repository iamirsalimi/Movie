import React from 'react'

import { BiSolidMoviePlay } from "react-icons/bi";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { FaPlay } from "react-icons/fa6";

export default function NewMoviesTable({ movies }) {
    return (
        <div className="rounded-lg bg-white shadow shadow-black/5 dark:bg-secondary flex flex-col p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mr-1">
                    <span className="title-icon">
                        <BiSolidMoviePlay className="fill-white text-3xl" />
                    </span>
                    <div className="flex flex-col gap-1">
                        <span className="text-secondary dark:text-white font-vazir text-sm sm:text-base font-semibold">فیلم های 2025</span>
                        <span className="text-light-gray dark:text-gray-200 text-xs sm:text-sm font-vazir">دانلود فیلم های جدید</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="font-vazir text-light-gray dark:text-white hidden xs:inline xs:text-xs sm:text-sm">مشاهده بیشتر</span>
                    <button className="bg-sky-500 cursor-pointer p-1 h-fit rounded-md">
                        <PiArrowCircleLeftDuotone className="text-white text-2xl" />
                    </button>
                </div>
            </div>
            <ul className="mt-5 grid grid-cols-4 gap-2">
                {movies.slice(0, 8).map(movie => (  
                    <a href="#">
                        <li key={movie.id} className="group overflow-hidden relative rounded-lg h-32 cursor-pointer">
                            <img src={movie.src} className="w-full h-full object-cover object-center" alt="" />
                            <span className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center duration-200"></span>
                            <FaPlay className="text-white text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 transition-all group-hover:opacity-100 group-hover:scale-100 duration-200" />
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    )
}