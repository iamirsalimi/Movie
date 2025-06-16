import React from 'react'

import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";

export default function ActorMovieCard({ id, movieType, cover, mainTitle, imdb_score , rotten_score , metacritic_score, genres, description }) {
    return (
        <a href={`/${movieType == 'series' ? 'series' : 'movie'}/${id}`}>
            <div className="sm:h-52 shadow shadow-black/5 bg-white dark:bg-secondary rounded-xl p-2 flex flex-col sm:flex-row gap-3 transition-all hover:-translate-y-4">
                <div className="min-h-52 max-h-80 sm:min-h-full sm:h-full overflow-hidden rounded-lg sm:w-1/3 w-full">
                    <img src={cover} className="w-full h-full object-cover object-center" alt="" />
                </div>
                <div className="sm:w-2/3 w-full flex flex-col gap-3 py-1 pl-2">
                    <h2 className="text-light-gray dark:text-white font-vazir text-sm text-center sm:text-justify">{mainTitle}</h2>
                    <div className="w-full flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
                        <div className="flex items-center justify-center gap-1">
                            <FaImdb className="text-base sm:text-lg md:text-xl fill-yellow-500" />
                            <span className="font-bold"><span className="text-base md:text-lg text-yellow-500">{imdb_score}</span><span className="text-light-gray dark:text-white">/10</span></span>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                            <SiRottentomatoes className="text-base sm:text-lg md:text-xl fill-red-500" />
                            <span className="font-bold"><span className="text-base md:text-lg text-light-gray dark:text-white">{rotten_score}</span><span className="text-red-500">%</span></span>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                            <SiMetacritic className="text-base sm:text-lg md:text-xl fill-blue-500" />
                            <span className="font-bold"><span className="text-base md:text-lg text-light-gray dark:text-white">{metacritic_score}</span><span className="text-blue-500">%</span></span>
                        </div>
                    </div>
                    <ul className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        {genres?.map((genreItem , index) => (
                            <li key={index} className="px-2 py-1 text-nowrap text-center border border-light-gray dark:border-gray-400 text-light-gray dark:text-gray-400 rounded-md text-gray font-vazir text-xs">{genreItem}</li>
                        ))}
                    </ul>
                    <p className="text-light-gray dark:text-white text-justify text-sm font-vazir-light line-clamp-3">{description}</p>
                </div>
            </div>
        </a>
    )
}
