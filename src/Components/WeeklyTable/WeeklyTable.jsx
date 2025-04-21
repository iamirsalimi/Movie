import React, { useEffect, useState } from 'react'

import { MdOutlineDateRange } from "react-icons/md";

const days = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه' , 'شنبه']

export default function WeeklyTable({ movieTable , movies }) {
    let date = new Date()

    const [activeDay, setActiveDay] = useState(days[date.getDay()])
    const [weekMovies , setWeekMovies] = useState([])

    let firstArray = days.slice(date.getDay())
    let secondArray = days.slice(0 , date.getDay())
    let daysArray = firstArray.concat(secondArray)

    useEffect(() => {
        let movieArray = movieTable[activeDay].map(movie => [...movies.filter(movieItem => movieItem.id == movie.movieId) , movie.newEpisode])
        setWeekMovies(movieArray)
    } , [activeDay])

    return (
        <div className="bg-white shadow shadow-black/5 dark:bg-secondary min-h-32 rounded-xl p-1.5 flex flex-col">
            <div className="flex items-center justify-between py-2 px-2">
                <div className="flex items-center justify-center gap-5">
                    <div className="title-icon">
                        <MdOutlineDateRange className="text-white text-2xl" />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-0.5">
                        <span className="text-secondary dark:text-white font-vazir text-sm md:text-md">جدول پخش هفتگی</span>
                        <span className="text-light-gray dark:text-slate-300 font-shabnam-light text-xs md:text-sm">در حال پخش / انتشار</span>
                    </div>

                </div>
                <ul className="flex items-center gap-2">
                    {daysArray.map((day, index) => (
                        <li key={index} className={`p-1 hidden first:inline-block first:activeDay md:inline-block rounded-md border border-secondary text-secondary dark:border-white dark:text-white transition-colors font-vazir text-sm cursor-pointer ${activeDay == day && 'activeDay'}`} onClick={() => setActiveDay(day)}>{day}</li>
                    ))}
                </ul>
            </div>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 py-4 px-4 h-full bg-light dark:bg-primary rounded-lg">
                {weekMovies.length ? weekMovies.map(movie => (
                    <li key={movie[0].id} className="rounded-md bg-light border-2 border-gray-200 dark:border-secondary dark:bg-primary max-h-18 flex gap-1">
                        <div className="w-1/3 p-1.5 h-full rounded-r-md !overflow-hidden">
                            <img src={movie[0].src} className="w-14 h-14 object-cover object-center rounded-md" alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between py-2 w-full text-sm">
                            <h1 className="text-secondary font-bold dark:text-white mt-1">{movie[0].title}</h1>
                            <span className={`${movie[1] == null && 'hidden'} text-red-500 font-shabnam-light`}>قسمت {movie[1]?.episode} فصل  {movie[1]?.season}</span>
                        </div>
                    </li>
                )) : (
                    <h1 className="col-start-1 col-end-4 text-center text-2xl text-gray-500 dark:text-white font-vazir">مقداری وجود ندارد!</h1>
                )}
            </ul>
        </div>
    )
}
