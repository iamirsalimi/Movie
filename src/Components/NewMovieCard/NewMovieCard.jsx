import React from 'react'

import { FaPlay } from "react-icons/fa6";

export default function NewMovieCard({ id , movieId, src , cover, title, movieType , showTitle }) {
    return (
        <a href={`/${movieType == 'series' ? 'series' : 'movie'}/${movieId}`} className="relative pb-2 group">
            <li key={id} className={`group overflow-hidden relative rounded-lg ${showTitle ? 'h-40' : 'h-32'} cursor-pointer`}>
                <img src={cover} className="w-full h-full object-cover object-center" alt="" />
                <span className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center duration-200"></span>
                {!showTitle && (
                    <FaPlay className="text-white text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 transition-all group-hover:opacity-100 group-hover:scale-100 duration-200" />
                )}
            </li>
            {showTitle && (
                <span className="text-nowrap line-clamp-1 absolute text-xs -bottom-7 left-1/2 -translate-1/2 text-gray-700 dark:text-white  opacity-100 transition-all group-hover:-translate-y-3 group-hover:opacity-0">{title}</span>
            )}
        </a>
    )
}
