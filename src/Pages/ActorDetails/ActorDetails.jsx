import React, { useEffect, useState, useContext } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { useParams } from 'react-router-dom'

import { calculateAge } from '../../utils';

import LoadingContext from '../../Contexts/LoadingContext';

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { getCastById } from '../../Services/Axios/Requests/Actors';

export default function ActorDetails() {
    const [actorObj, setActorObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)

    let { actorId } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    useEffect(() => {
        const getActorInfo = async actorId => {
            try {
                const data = await getCastById(actorId)

                if (data.length > 0) {
                    setActorObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/actors'
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
        if (actorObj && loading) {
            setLoading(false)
        }
    }, [actorObj])

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20 md:mb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">مشخصات هنرپیشه</h2>
                    <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{actorId}</span>
                </div>
                <a href="/my-account/adminPanel/actors" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست هنرپیشه ها</span>
                </a>
            </div>
            <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                {isPending && (
                    <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
                )}

                {error && (
                    <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
                )}

                {(!isPending && actorObj) && (
                    <>
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white p-2 border border-gray-200 dark:border-primary divide-y divide-gray-200 dark:divide-primary rounded-md">
                            <li className="w-full h-80 rounded-md overflow-hidden">
                                <img src={actorObj.src} alt="" className="w-full h-full object-center object-cover" />
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ID :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.id}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام کامل هنرپیشه :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.fullName}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام هنری :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.originalName || 'ندارد'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تاریخ تولد :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.birthDate || 'نامضخص'}</span>
                            </li>
                            {actorObj.birthDate && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">سن :</h3>
                                    <span className="text-vazir-light font-vazir text-primary dark:text-white">{calculateAge(actorObj.birthDate)} سال</span>
                                </li>
                            )}
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ملیت :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.nationality}</span>
                            </li>
                            <li className="w-full py-1 flex flex-col justify-center gap-1">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">بیوگرافی :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.biography}</span>
                            </li>
                        </ul>
                        <div className="w-full flex flex-col items-start justify-center gap-2 my-5">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">مجموعه آثار هنرپیشه</h2>
                            <ul className="w-full grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-y-7 font-vazir text-light-gray dark:text-white p-2 border border-gray-200 dark:border-primary rounded-xl">
                                {actorObj.movies.length > 0 ? actorObj.movies.map(movie => (
                                    <a href={`/my-account/adminPanel/movies/movie-details/${movie.movieId}`} className="pb-2">
                                        <li className={`group overflow-hidden relative rounded-lg h-64 cursor-pointer mb-2`}>
                                            <img src={movie.cover} className="w-full h-full object-cover object-center" alt="" />
                                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-white/0 flex items-center justify-center duration-200"></span>
                                            <span className="absolute text-center text-xs opacity-0 bottom-1 left-1/2 -translate-1/2 scale-50 text-white transition-all group-hover:scale-100 group-hover:opacity-100 duration-200">{movie.title}</span>
                                        </li>
                                    </a>
                                )) : (
                                    <h2 className="lg:col-start-1 lg:col-end-3 text-center text-red-500 font-vazir">اثری برای هنرپیشه ثبت نشده</h2>
                                )}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}