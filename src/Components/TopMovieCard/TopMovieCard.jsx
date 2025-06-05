import React from 'react'

import { FaStar } from "react-icons/fa6";

export default function TopMovieCard({id , movieType , cover , title , imdb_score , index}) {
    return (
        <a href={`/${movieType}/${id}`} className="flex flex-col gap-2 items-center transition-all hover:-translate-y-2 group">
            <div className="relative h-70 rounded-lg border border-transparent transition-all duration-200 group-hover:border-primary dark:group-hover:border-white">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <img src={cover} className="w-full h-full object-cover object-center" alt="" />
                    <span className="inline-block absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary to-black/0"></span>
                </div>
                <span className="absolute z-20 -top-4 -right-3 min-w-9 h-9 font-bold p-1 py-2 text-base rounded-full flex items-center justify-center bg-yellow-400 border-2 border-light dark:border-primary text-white dark:text-primary">{index}</span>
                <span className="absolute z-20 bottom-2 left-2 font-bold text-base text-gray-200 inline-flex items-center justify-center gap-1">
                    <span>{imdb_score}</span>
                    <FaStar className="text-lg" />
                </span>
            </div>
            <span className="text-light-gray dark:text-white font-semibold line-clamp-1">{title}</span>
        </a>
    )
}
