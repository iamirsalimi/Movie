import React from 'react'


import NewMovieCard from '../NewMovieCard/NewMovieCard';

import { BiSolidMoviePlay } from "react-icons/bi";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";

export default function NewMoviesTable({ movies }) {
    return (
        <div className="rounded-xl bg-white shadow shadow-black/5 dark:bg-secondary flex flex-col p-3">
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
                    <NewMovieCard {...movie} />
                ))}
            </ul>
        </div>
    )
}