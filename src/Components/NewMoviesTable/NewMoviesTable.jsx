import React from 'react'

import NewMovieCard from '../NewMovieCard/NewMovieCard';

import { BiSolidMoviePlay } from "react-icons/bi";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";

let thisYear = new Date().getFullYear()

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
                        <span className="text-light-gray dark:text-gray-200 text-xs sm:text-sm font-shabnam-light">دانلود فیلم های جدید</span>
                    </div>
                </div>
                <a
                    href={`/?search-type=advanced&fromYear=${thisYear}`}
                    className="flex items-center justify-center gap-2"
                >
                    <span className="font-shabnam text-light-gray dark:text-white cursor-pointer hidden xs:inline xs:text-xs sm:text-sm">مشاهده بیشتر</span>
                    <span className="bg-sky-500 cursor-pointer p-1 h-fit rounded-md">
                        <PiArrowCircleLeftDuotone className="text-white text-2xl" />
                    </span>
                </a>
            </div>
            <ul className="mt-5 grid grid-cols-4 gap-2">
                {movies.length > 0 ? movies.filter(movie => movie.is_in_new_movies && movie.broadcastStatus == 'released').slice(0, 8).map(movie => (
                    <NewMovieCard key={movie.id} {...movie} />
                )) : (
                    <>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-gray-100 dark:bg-primary rounded-lg h-20"></div>
                    </>
                )}
            </ul>
        </div>
    )
}