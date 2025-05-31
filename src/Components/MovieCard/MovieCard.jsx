import React, { useEffect, useState, useRef, useContext } from 'react'

import toast from "react-hot-toast"

import UserContext from '../../Contexts/UserContext'

import { FaTheaterMasks } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa6";
import { RiTimer2Line } from "react-icons/ri";
import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
import { BiLike } from "react-icons/bi";
import { IoLanguageSharp } from "react-icons/io5";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { BsFillCcSquareFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

let apiData = {
    updateUserApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function MovieCard({ id, title, mainTitle, movieType, description, cover, languages, countries, genres, imdb_score, rotten_score, metacritic_score, site_scores, year, duration, is_dubbed, has_subtitle, quality }) {
    let { userObj, setUserObj } = useContext(UserContext)

    let toastId = null

    // update user handler
    const updateUserHandler = async (newUserObj, addFlag) => {
        await fetch(`${apiData.updateUserApi}${userObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newUserObj)
        }).then(res => {
            toast.dismiss(toastId)
            toastId = null
            if (addFlag) {
                toast.success('فیلم به لیست تماشا اضافه شد')
            } else {
                toast.success('فیلم از لیست تماشا حذف شد')
            }
            setUserObj(newUserObj)
        })
            .catch(err => {
                console.log(err)
                toast.dismiss(toastId)
                toastId = null
                toast.error('مشکلی در افزودن فیلم به لیست تماشا پیش آمده')
            })
    }

    const isMovieInUserWatchList = (watchList, movieId) => {
        let isInWatchList = watchList?.some(movie => movie.movieId == movieId)
        return isInWatchList
    }

    const addMovieToUserWatchList = () => {
        if (!userObj) {
            toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
            return;
        }


        if (userObj.role == 'user') {
            let newWatchListObj = {
                id: `${new Date().getTime()}`,
                movieId: id,
                movieType,
                title,
                cover
            }

            const newUserObj = { ...userObj }
            newUserObj.watchList.push(newWatchListObj)


            if (!toastId) {
                toastId = toast.loading('در حال افزودن فیلم به لیست تماشا')
                updateUserHandler(newUserObj, true)
            }
        } else {
            toast.error('فقط كاربر ها مي توانند فيلم هارا به ليست تماشا اضافه كنند')
        }
    }

    const removeMovieFomUserWatchList = () => {
        if (userObj.role == 'user') {
            const newUserObj = { ...userObj }
            let newWatchList = newUserObj?.watchList.filter(movie => id != movie.movieId)
            newUserObj.watchList = [...newWatchList]

            if (!toastId) {
                toastId = toast.loading('در حال حذف فیلم از لیست تماشا')
                updateUserHandler(newUserObj)
            }
        } else {
            toast.error('فقط كاربر ها مي توانند فيلم هارا به ليست تماشا اضافه كنند')
        }
    }


    return (
        <div className="bg-white shadow shadow-black/5 dark:bg-secondary rounded-xl p-4 flex flex-col md:flex-row gap-y-5 gap-x-5">
            <div className="relative w-full md:w-1/3 min-h-full">
                <div className="w-full max-h-[450px] md:h-full md:min-h-full relative rounded-lg overflow-hidden group">
                    <img src={cover} className="w-full md:max-h-full h-full object-cover object-center" alt="" />
                    <span className="absolute top-0 left-0 w-full h-full bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"></span>
                </div>
                <div className="absolute top-2 flex items-center justify-between w-full px-2">
                    <span className="inline-block bg-light dark:bg-primary rounded-full py-1 px-2 text-secondary dark:text-white text-sm">{quality}</span>
                    <button
                        className="inline-block bg-light dark:bg-primary rounded-full p-2 text-secondary dark:text-white cursor-pointer group"
                        onClick={isMovieInUserWatchList(userObj?.watchList, id) ? removeMovieFomUserWatchList : addMovieToUserWatchList}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 stroke-light-gray dark:stroke-white ${isMovieInUserWatchList(userObj?.watchList, id) ? 'fill-light-gray dark:fill-white' : ''} text-2xl`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <span className="inline-block opacity-0 h-5 absolute left-5 -top-7 -translate-x-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-xs dark:text-white font-vazir text-nowrap z-20 after:z-10 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:rotate-45 group-hover:opacity-100 transition-all">افزودن به لیست تماشا</span>
                    </button>
                </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-5">
                <a href={`/${movieType}/${id}`} className="group">
                    <h1 className="text-light-gray dark:text-white group-hover:text-sky-500 transition-colors text-xl md:text-2xl font-bold font-vazir line-clamp-1">{mainTitle}</h1>
                </a>

                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center justify-center gap-1">
                        <FaImdb className="text-2xl sm:text-3xl fill-yellow-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-yellow-500">{imdb_score}</span><span className="text-light-gray dark:text-white">/10</span></span>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <SiRottentomatoes className="text-2xl sm:text-3xl fill-red-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-light-gray dark:text-white">{rotten_score}</span><span className="text-red-500">%</span></span>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <SiMetacritic className="text-2xl sm:text-3xl fill-blue-500" />
                        <span className="font-bold"><span className="text-lg sm:text-xl text-light-gray dark:text-white">{metacritic_score}</span><span className="text-blue-500">%</span></span>
                    </div>
                </div>

                <ul className="flex flex-col gap-1">
                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <FaTheaterMasks className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-sky-100 dark:bg-primary"></i>
                        <span className="text-nowrap text-light-gray dark:text-white font-vazir-light text-xs sm:text-base">{genres.map(genreItem => (
                            <span className="group px-0.5 md:px-1"><span>{genreItem}</span><span className="group-last:hidden text-slate-400"> .</span></span>
                        ))}</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <MdOutlineDateRange className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-dark bg-sky-100 dark:bg-primary"></i>
                        <span className="text-light-gray dark:text-white font-vazir-light text-nowrap font-semibold text-xs sm:text-base">{year}</span>
                    </li>

                    {/* <li className="flex items-center justify-between">
                        <span className="bg-primary p-2 rounded-lg">
                            <FaRegFlag className="text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-primary"></i>
                        <span className="text-nowrap text-white font-vazir-light">{countries.map(country => (
                            <span className="group px-1"><span>{country}</span><span className="group-last:hidden text-slate-400"> .</span></span>
                        ))}</span>
                    </li> */}

                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <RiTimer2Line className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px bg-sky-100 mx-2 dark:bg-primary"></i>
                        <span className="text-light-gray dark:text-white font-vazir-light text-nowrap text-xs sm:text-base">{duration} دقیقه</span>
                    </li>

                    <li className="flex items-center justify-between">
                        <span className="bg-sky-100 dark:bg-primary p-2 rounded-lg">
                            <IoLanguageSharp className="text-light-gray dark:text-white text-2xl" />
                        </span>
                        <i className="inline-block w-full h-px mx-2 bg-sky-100 dark:bg-primary"></i>
                        <span className="text-nowrap text-light-gray dark:text-white font-vazir-light text-xs sm:text-base">{languages.join(' , ')}</span>
                        {/* <span className="text-nowrap text-light-gray dark:text-white font-vazir-light text-xs sm:text-base">{languages.map(language => (
                            <span className="group px-1"><span>{language}</span><span className="group-last:hidden text-slate-400"> .</span></span>
                        ))}</span> */}
                    </li>
                </ul>

                <div className="flex items-center gap-2">
                    {has_subtitle && (
                        <div className="w-fit h-fit flex items-center justify-center gap-1 rounded-md p-2 bg-sky-100 dark:bg-sky-300 glass-effect">
                            <BsFillCcSquareFill className="text-md md:text-xl fill-sky-500 dark:fill-sky-700" />
                            <span className="text-sm md:text-md text-sky-500 dark:text-sky-700 font-vazir">زیرنویس فارسی</span>
                        </div>
                    )}

                    {is_dubbed && (
                        <div className="w-fit h-fit flex items-center justify-center gap-1 rounded-md p-2 bg-red-100 dark:bg-red-300 glass-effect">
                            <FaMicrophoneAlt className="text-md md:text-xl fill-red-500 dark:fill-red-600" />
                            <span className="text-sm md:text-md text-red-400 dark:text-red-600 font-vazir">دوبله فارسی</span>
                        </div>
                    )}
                </div>

                <div className="border-2 border-light dark:border-primary rounded-lg p-2 flex flex-col gap-1">
                    <h1 className="text-gray-500 dark:text-white font-vazir font-bold text-sm md:text-md">خلاصه داستان</h1>
                    <span className="text-slate-400 dark:text-slate-300 text-sm space-x-1">
                        <span className="font-shabnam-light">{description}</span>
                        <a href={`/${movieType}/${id}`} className="group text-sky-600 dark:text-yellow-500 space-x-1 font-shabnam">
                            <span>دانلود/جزییات بیشتر</span>
                            <PiArrowCircleLeftDuotone className="inline fill-sky-600 dark:fill-yellow-500 text-2xl group-hover:-translate-x-2 transition-all duration-150" />
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}
