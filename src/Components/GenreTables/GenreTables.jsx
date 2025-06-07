import React, { useEffect, useRef, useState } from 'react'

import { FaTheaterMasks } from "react-icons/fa";

export default function GenreTables({ genre, movies }) {
    const [activeType, setActiveType] = useState('movie')
    const [activeTypeArray, setActiveTypeArray] = useState(genre[activeType])
    const [genresCount, setGenresCount] = useState({})
    // console.log(genre[activeType] , movies)

    const allGenres = {
        movie: {
            'اکشن': 'action',
            'ترسناک': 'horror',
            'انیمیشن': 'animation',
            'تاریخی': 'history',
            'جنایی': 'crime',
            'جنگی': 'war',
            'خانوادگی': 'family',
            'درام': 'drama',
            'زندگی نامه': 'biography',
            'عاشقانه': 'romance',
            'علمی تخیلی': 'sci-fi',
            'فانتزی': 'fantasy',
            'کمدی': 'comedy',
            'کوتاه': 'short',
            'ماجراجویی': 'adventure',
            'انیمه': 'anime',
            'مستند': 'documentary',
            'معمایی': 'mystery',
            'موزیکال': 'musical',
            'وسترن': 'western',
            'نوآر': 'noir',
            'هیجان انگیز': 'thriller',
            'ورزشی': 'sport',
        },
        series: {
            'اکشن': 'action',
            'Talk-Show': 'talk-show',
            'ترسناک': 'horror',
            'انیمیشن': 'animation',
            'تاریخی': 'history',
            'جنایی': 'crime',
            'جنگی': 'war',
            'خانوادگی': 'family',
            'درام': 'drama',
            'زندگی نامه': 'biography',
            'عاشقانه': 'romance',
            'علمی تخیلی': 'sci-fi',
            'فانتزی': 'fantasy',
            'کمدی': 'comedy',
            'کوتاه': 'short',
            'انیمه': 'anime',
            'ماجراجویی': 'adventure',
            'مستند': 'documentary',
            'معمایی': 'mystery',
            'موزیکال': 'musical',
            'وسترن': 'western',
            'نوآر': 'noir',
            'هیجان انگیز': 'thriller',
            'ورزشی': 'sport',
            'موسیقی': 'music',
        }
    }

    let inputFilmRef = useRef(null)
    let inputSerialRef = useRef(null)

    // console.log(activeType , activeTypeArray)

    let newGenre = null
    let newGenres = {}

    useEffect(() => {
        setActiveTypeArray(genre[activeType])
    }, [activeType])

    useEffect(() => {
        activeTypeArray.forEach(genre => {
            newGenre = movies.filter(movie => movie.movieType == activeType).reduce((prev, current) => {
                return { ...prev, [genre]: current.genres.some(genreItem => genreItem == genre) ? (prev[genre] ? prev[genre] + 1 : 1) : (prev[genre] ? prev[genre] : 0) }
            }, {})
            newGenres = { ...newGenres, ...newGenre }
        })
        setGenresCount(newGenres)
    }, [activeTypeArray, movies])

    useEffect(() => {
        if (activeType == 'movie') {
            inputFilmRef.current.checked = true
        } else {
            inputSerialRef.current.checked = true
        }
    }, [])

    const changeMovieType = e => {
        let genreType = e.target.dataset.type
        setActiveType(genreType)
    }

    return (
        <div className="rounded-xl bg-white shadow shadow-black/5 dark:bg-secondary flex flex-col p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mr-1">
                    <span className="title-icon">
                        <FaTheaterMasks className="fill-white text-3xl" />
                    </span>
                    <div className="flex flex-col gap-1">
                        <span className="text-secondary dark:text-white font-vazir font-semibold">ژانر ها</span>
                        <span className="text-light-gray dark:text-gray-200 text-xs sm:text-sm font-shabnam-light">فیلم و سریال</span>
                    </div>
                </div>
                <div className="genreType flex items-center justify-center gap-1 p-1 bg-sky-100 dark:bg-primary rounded-full">
                    <input type="radio" ref={inputFilmRef} name="genreTypes" id="genre-film" className="hidden" onChange={changeMovieType} data-type="movie" />
                    <label htmlFor="genre-film" className="font-vazir text-light-gray dark:text-white text-sm transition-colors p-2 rounded-full cursor-pointer select-none" >فیلم</label>

                    <input type="radio" ref={inputSerialRef} name="genreTypes" id="genre-serial" className="hidden" onChange={changeMovieType} data-type="series" />
                    <label htmlFor="genre-serial" className="font-vazir text-light-gray dark:text-white text-sm transition-colors p-2 rounded-full cursor-pointer select-none">سریال</label>
                </div>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-2">
                {activeTypeArray.map((genre , index) => (
                    <a key={index} href={`/?search-type=advanced&movieType=${activeType}&genre=${allGenres[activeType][genre]}`}>
                        <li className="group relative font-shabnam-light rounded-lg bg-light hover:bg-sky-500 dark:bg-primary dark:hover:bg-sky-700 transition-colors duration-200 py-2 px-3 cursor-pointer flex items-center justify-between">
                            <span className="text-light-gray group-hover:text-white dark:text-white">{genre}</span>
                            <span className="text-light-gray dark:text-white opacity-100 group-hover:translate-x-2 group-hover:opacity-0 transition-all">{genresCount[genre]}</span>
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    )
}
