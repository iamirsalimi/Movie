import React, { useEffect, useState , memo } from 'react'

import { MdOutlineDateRange } from "react-icons/md";

import { getReleases } from '../../Services/Axios/Requests/Releases';

const days = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']

let apiData = {
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Releases?select=*',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

const WeeklyTable = memo(({ movies }) => {
    const [activeDay, setActiveDay] = useState(null)
    const [weekMovies, setWeekMovies] = useState([])
    const [releases, setReleases] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [daysOfWeek, setDaysOfWeek] = useState(null)
    const [dayReleases, setDayReleases] = useState(null)

    const checkDatesOnSameDay = (date1, date2) => {
        let newDate1 = new Date(date1)
        let newDate2 = new Date(date2)

        return (
            newDate1.getFullYear() === newDate2.getFullYear() &&
            newDate1.getMonth() === newDate2.getMonth() &&
            newDate1.getDate() === newDate2.getDate()
        )
    }

    useEffect(() => {
        const getAllReleases = async () => {
            try {
                const data = await getReleases()

                if (data) {
                    let sortedMoviesArray = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    })
                    setReleases(sortedMoviesArray)
                }

                setIsPending(null)
                setError(false)
            } catch (err) {
                console.log('fetch error', err)
                setIsPending(false)
                setError(err)
            }
        }

        if (movies.length > 0) {
            setIsPending(true)
            getAllReleases()
        }
    }, [movies])

    useEffect(() => {
        // to make an array of days of the week with a date object and name of the each day by now
        let dates = [];
        const today = new Date()

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            const dayName = days[currentDate.getDay()]
            const dateObject = currentDate

            dates.push({
                day: dayName,
                date: dateObject,
            });
        }

        setDaysOfWeek(dates)
        setActiveDay(dates[0])
    }, [])

    useEffect(() => {
        if (releases.length > 0 && daysOfWeek.length > 0 && activeDay) {
            // console.log('mount' , releases , daysOfWeek , activeDay)
            let activeDayMovies = releases.filter(movie => movie.release_schedules.filter(schedule => checkDatesOnSameDay(activeDay.date, schedule.date))?.length > 0)
            setWeekMovies(activeDayMovies)
        }
    }, [releases, daysOfWeek, activeDay])

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
                    {daysOfWeek?.map((dayItem, index) => (
                        <li key={index} className={`p-1 hidden first:inline-block first:activeDay md:inline-block rounded-md border border-secondary text-secondary dark:border-white dark:text-white transition-colors font-vazir text-sm cursor-pointer ${activeDay.day == dayItem.day && 'activeDay'}`} onClick={() => setActiveDay(dayItem)}>{dayItem.day}</li>
                    ))}
                </ul>
            </div>
            <ul className="w-full min-h-full md:min-h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 py-4 px-4 h-full bg-light dark:bg-primary rounded-lg">
                {isPending && (
                    <h2 className="md:col-start-1 md:col-end-3 lg:col-end-4 text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                )}

                {error && (
                    <h2 className="md:col-start-1 md:col-end-3 lg:col-end-4 text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                )}

                {isPending == null && (
                    <>
                        {weekMovies.length ? weekMovies?.map(movie => (
                            <li key={movie.id} className="rounded-md bg-light border-2 border-gray-200 dark:border-secondary dark:bg-primary max-h-18 flex gap-1">
                                <div className="w-1/3 p-1.5 h-full rounded-r-md !overflow-hidden">
                                    <img src={movie.movie_cover} className="w-14 h-14 object-cover object-center rounded-md" alt="" />
                                </div>
                                <div className="flex flex-col items-start justify-between py-2 w-full text-sm">
                                    <h1 className="text-secondary font-bold dark:text-white mt-1">{movie.movieTitle}</h1>
                                    {movie.movieType == 'series' && movie?.release_schedules.length > 1 && (
                                        <span className="text-light-gray dark:text-gray-500 font-shabnam">قسمت {movie.release_schedules?.find(movie => checkDatesOnSameDay(activeDay.date , movie.date))?.episode?.episodes.join(',')} فصل  {movie.season_number}</span>
                                    )}
                                </div>
                            </li>
                        )) : (
                            <h1 className="col-start-1 col-end-4 text-center text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-white font-vazir">مقداری وجود ندارد!</h1>
                        )}
                    </>
                )}
            </ul>
        </div>
    )
})

export default WeeklyTable