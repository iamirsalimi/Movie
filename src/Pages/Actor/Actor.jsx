import React, { useState, useEffect } from 'react'

import Loader from './../../Components/Loader/Loader'
import { useParams } from 'react-router-dom'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import ActorMovieCard from './../../Components/ActorMovieCard/ActorMovieCard'
import { calculateAge } from './../../utils'

dayjs.extend(jalali)

import { getMovies } from './../../Services/Axios/Requests/Movies';
import { getCastById } from './../../Services/Axios/Requests/Actors';
import { Helmet } from 'react-helmet-async';

export default function Actors() {
    const [actorObj, setActorObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [actorMovies, setActorMovies] = useState(null)
    const [actorMovieIsPending, setActorMovieIsPending] = useState(true)
    const [actorMovieError, setActorMovieError] = useState(null)
    const [loading, setLoading] = useState(true)

    let { actorId } = useParams()

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    useEffect(() => {
        const getActorInfo = async (actorId) => {
            try {
                const data = await getCastById(actorId)

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
                const data = await getMovies()
                
                if (data.length > 0) {
                    // find the exact obj of movies
                    let actorMoviesArray = actorObj.movies?.map(actorMovie => {
                        return data.find(movie => movie.id == actorMovie.movieId);
                    })
                    setActorMovies(actorMoviesArray)
                }
                
                setActorMovieIsPending(null)
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

    useEffect(() => {
        // when "actorMovieIsPending" is null it means we fetched actorMovies and after that we can remove loader 
        if(actorObj && actorMovieIsPending == null && loading){
            setLoading(false)
        }
    } , [actorObj , actorMovieIsPending])

    return (
        <>
            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm mt-10">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm mt-10">{error.message} </h2>
            )}

            {(!isPending && actorObj) && (
                <>
                    <Helmet>
                        <title>{actorObj.fullName || actorObj.originalName} | MovieFlix</title>
                        <meta name="description" content={actorObj.biography || ''} />
                        <meta name="keywords" content={`${actorObj.movies.map(movie => movie.title).join(', ')} , ${actorObj.fullName || actorObj.originalName} , دنلود فيلم هاي ${actorObj.fullName || actorObj.originalName}`} />
                        <meta property="og:title" content={(actorObj.fullName || actorObj.originalName) + ' | Movie Flix'} />
                        <meta property="og:description" content={actorObj.biography || ''} />
                        <meta property="og:image" content={actorObj.src ? window.location.origin + actorObj.src.replace(/^\//, '/') : ''} />
                        <meta property="og:type" content="profile" />
                        <meta property="og:url" content={window.location.href} />
                    </Helmet>
                    <div className="flex flex-col gap-5 min-h-screen">
                        <div className="container mx-auto h-fit py-12 px-5 sm:px-10 lg:px-0 flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-5 border-b border-gray-200 dark:border-secondary">
                            <div className="flex items-center justify-center rounded-full overflow-hidden min-h-32 max-h-32 min-w-32 max-w-32">
                                <img src={actorObj.src} alt="actor image" className="w-full h-full object-cover object-center" />
                            </div>
                            <div className="h-full flex flex-col items-center md:items-start justify-between gap-2">
                                <h2 className="text-gray-700 dark:text-white font-bold">{actorObj.originalName || actorObj.fulLName}</h2>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5">
                                    <div className="flex items-center justify-center gap-1 font-vazir">
                                        <span className="text-gray-700 dark:text-gray-200">تولد :</span>
                                        <span className="text-gray-700 dark:text-gray-200">{actorObj.birthDate ? getDate(actorObj.birthDate) : 'نامشخص'}</span>
                                    </div>

                                    {actorObj.originalName && (
                                        <div className="flex items-center justify-center gap-1 font-vazir">
                                            <span className="text-gray-700 dark:text-gray-200">نام کامل :</span>
                                            <span className="text-gray-700 dark:text-gray-200">{actorObj.fullName}</span>
                                        </div>
                                    )}

                                    {actorObj.birthDate && (
                                        <div className="flex items-center justify-center gap-1 font-vazir">
                                            <span className="text-gray-700 dark:text-gray-200">سن :</span>
                                            <span className="text-gray-700 dark:text-gray-200">{calculateAge(actorObj.birthDate)} سال</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-center gap-1 font-vazir">
                                        <span className="text-gray-700 dark:text-gray-200">ملیت :</span>
                                        <span className="text-gray-700 dark:text-gray-200">{actorObj.nationality}</span>
                                    </div>
                                </div>
                                <p className="text-light-gray dark:text-gray-500 font-vazir-light text-center md:text-justify">{actorObj.biography}</p>
                            </div>
                        </div>
                        <div className="container mx-auto py-5 space-y-9 px-2.5 sm:px-4 md:px-5">
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
                                            <ActorMovieCard key={movie.id} {...movie} />
                                        )) : (
                                            <h2 className="text-center md:col-start-1 md:col-end-3 xl:col-end-4 font-vazir text-red-500 text-sm">اثری برای {actorObj.fullName} ثبت نشده</h2>

                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </>
            )}

            {loading && (
                <Loader words={['Actors', 'Movies', 'ActorDetails']} />
            )}
        </>
    )
}
