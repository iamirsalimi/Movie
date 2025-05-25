import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import ActorMovieCard from '../../Components/ActorMovieCard/ActorMovieCard'
import { calculateAge } from '../../utils'

dayjs.extend(jalali)

let apiData = {
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?select=*',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function Actors() {
    const [actorObj, setActorObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [actorMovies, setActorMovies] = useState(null)
    const [actorMovieIsPending, setActorMovieIsPending] = useState(null)
    const [actorMovieError, setActorMovieError] = useState(null)

    let { actorId } = useParams()

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    useEffect(() => {
        const getActorInfo = async (actorId) => {
            try {
                const res = await fetch(`${apiData.getApi}${actorId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setActorObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setActorObj(null)
            }
        }
        getActorInfo(actorId)
    }, [])

    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const res = await fetch(apiData.getAllApi, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    // find the exact obj of movies
                    let actorMoviesArray = actorObj.movies?.map(actorMovie => {
                        return data.find(movie => movie.id === actorMovie.movieId);
                    })
                    setActorMovies(actorMoviesArray)
                    setActorMovieIsPending(false)
                } else {
                    window.location.href = '/'
                }

                setActorMovieError(false)
            } catch (err) {
                console.log('fetch error')
                setActorMovieError(err)
                setActorMovieIsPending(false)
                setActorMovies(null)
            }
        }
        if (actorObj && actorMovies == null) {
            getAllMovies(actorId)
        }
    }, [actorObj])

    return (
        <>
            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm mt-10">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm mt-10">{error.message} </h2>
            )}

            {(!isPending && actorObj) && (
                <div className="flex flex-col gap-5 min-h-screen">
                    <div className="container mx-auto h-fit py-12 flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-5 border-b border-gray-200 dark:border-secondary px-10 lg:px-0">
                        <div className="flex items-center justify-center rounded-full overflow-hidden h-32 min-w-32">
                            <img src={actorObj.src} alt="" className="w-full h-full object-cover object-center" />
                        </div>
                        <div className="h-full flex flex-col items-center md:items-start justify-between gap-2">
                            <h2 className="text-gray-700 dark:text-white font-bold">{actorObj.originalName || actorObj.fulLName}</h2>
                            <div className="flex items-center gap-5">
                                <div className="flex items-center justify-center gap-1 font-vazir">
                                    <span className="text-light-gray dark:text-gray-500">تولد :</span>
                                    <span className="text-light-gray dark:text-gray-500">{actorObj.birthDate ? getDate(actorObj.birthDate) : 'نامشخص'}</span>
                                </div>

                                {actorObj.originalName && (
                                    <div className="flex items-center justify-center gap-1 font-vazir">
                                        <span className="text-light-gray dark:text-gray-500">نام کامل :</span>
                                        <span className="text-light-gray dark:text-gray-500">{actorObj.fullName}</span>
                                    </div>
                                )}

                                {actorObj.birthDate && (
                                    <div className="flex items-center justify-center gap-1 font-vazir">
                                        <span className="text-light-gray dark:text-gray-500">سن :</span>
                                        <span className="text-light-gray dark:text-gray-500">{calculateAge(actorObj.birthDate)} سال</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-center gap-1 font-vazir">
                                    <span className="text-light-gray dark:text-gray-500">ملیت :</span>
                                    <span className="text-light-gray dark:text-gray-500">{actorObj.nationality}</span>
                                </div>
                            </div>
                            <p className="text-light-gray dark:text-gray-400 font-vazir-light text-center md:text-justify">{actorObj.biography}</p>
                        </div>
                    </div>
                    <div className="container mx-auto py-5 space-y-9 px-5">
                        <h2 className="text-center lg:text-justify text-gray-700 dark:text-white text-2xl font-vazir">مجموعه آثار</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                            {actorMovieIsPending && (
                                <h2 className="text-center md:col-start-1 md:col-end-3 xl:col-end-4 font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
                            )}

                            {actorMovieError && (
                                <h2 className="text-center md:col-start-1 md:col-end-3 xl:col-end-4 font-vazir text-red-500 text-sm">{error.message} </h2>
                            )}


                            {!actorMovieIsPending && (
                                <>
                                    {actorMovies?.length != 0 ? actorMovies?.map(movie => (
                                        <ActorMovieCard {...movie} />
                                    )) : (
                                        <h2 className="text-center md:col-start-1 md:col-end-3 xl:col-end-4 font-vazir text-red-500 text-sm">اثری برای {actorObj.fullName} ثبت نشده</h2>

                                    )}
                                </>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}
