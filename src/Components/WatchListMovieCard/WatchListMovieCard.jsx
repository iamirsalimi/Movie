import React from 'react'

import { LiaTrashAlt } from "react-icons/lia";

export default function WatchListMovieCard({id , type , title , src}) {
    return (
        <a href={`/${type == 'series' ? 'series' : 'movie'}/${id}`} className="relative pb-2 group">
            <li key={id} className={`group overflow-hidden relative rounded-t-lg h-64 cursor-pointer`}>
                <img src={src} className="w-full h-full object-cover object-center" alt="" />
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-white/0 flex items-center justify-center duration-200"></span>
                <span className="text-nowrap line-clamp-1 absolute text-sm opacity-0 bottom-1 left-1/2 -translate-1/2 scale-50 text-white transition-all group-hover:scale-100 group-hover:opacity-100 duration-200">{title}</span>
            </li>
            <span className={`border-2 border-white dark:border-primary font-vazir text-xs absolute top-0 left-1/2 -translate-1/2 inline-block px-3 py-0.5 rounded-full text-white dark:text-primary ${type == 'series' ? 'bg-red-500' : 'bg-sky-500'}`}>{type == 'series' ? 'سریال' : 'فیلم'}</span>
            <div className="absolute -bottom-13 left-1/2 -translate-1/2 w-full flex items-center justify-center py-2 rounded-b-lg transition-all bg-gray-100 hover:bg-black/10 dark:bg-primary dark:hover:bg-dark/5">
                <LiaTrashAlt className="text-2xl text-light-gray dark:text-white" />
            </div>
        </a>
    )
}
