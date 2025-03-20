import React from 'react'

import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";

export default function ActorMovieCard({ id, type, src, mainTitle, rating, genre, desc }) {
    return (
        <a href={`/${type == 'series' ? 'series' : 'movie'}/${id}`}>
            <div className="h-52 shadow shadow-black/5 bg-white dark:bg-secondary rounded-xl p-2 flex gap-3 transition-all hover:-translate-y-4">
                <div className="h-full overflow-hidden rounded-lg w-1/3">
                    <img src={src} className="w-full h-full object-cover object-center" alt="" />
                </div>
                <div className="w-2/3 flex flex-col gap-3 py-1 pl-2">
                    <h2 className="text-light-gray dark:text-white font-vazir text-sm">{mainTitle}</h2>
                    <div className="w-full flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
                        <div className="flex items-center justify-center gap-1">
                            <FaImdb className="text-xl fill-yellow-500" />
                            <span className="font-bold"><span className="text-lg text-yellow-500">{rating[0].rate}</span><span className="text-light-gray dark:text-white">/10</span></span>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                            <SiRottentomatoes className="text-xl fill-red-500" />
                            <span className="font-bold"><span className="text-lg text-light-gray dark:text-white">{rating[1].rate}</span><span className="text-red-500">%</span></span>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                            <SiMetacritic className="text-xl fill-blue-500" />
                            <span className="font-bold"><span className="text-lg text-light-gray dark:text-white">{rating[2].rate}</span><span className="text-blue-500">%</span></span>
                        </div>
                    </div>
                    <ul className="flex items-center justify-start gap-2 flex-wrap">
                        {genre.map(genreItem => (
                            <li className="px-2 py-1 text-nowrap text-center border border-light-gray dark:border-gray-400 text-light-gray dark:text-gray-400 rounded-md text-gray font-vazir text-xs">{genreItem}</li>
                        ))}
                    </ul>
                    <p className="text-light-gray dark:text-white text-justify text-sm font-vazir  line-clamp-3">{desc}</p>
                </div>
            </div>
        </a>
    )
}
