import React, { useEffect, useState } from 'react'

import { useParams, Navigate, useNavigate } from 'react-router-dom'

import WithPageContent from './../../HOCs/WithPageContent'
import GenreMovie from './../../Components/GenreMovie/GenreMovie'
import NewMovieCard from './../../Components/NewMovieCard/NewMovieCard'
import { movies } from '../../moviesData'


// icons
import { FaTheaterMasks } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
import { BiLike } from "react-icons/bi";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { BsFillCcSquareFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FiFlag } from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BsCameraVideo } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { BsTv } from "react-icons/bs";
import { IoLanguageSharp } from "react-icons/io5";
import { RiTimer2Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { ImFilm } from "react-icons/im";
import { HiMiniUsers } from "react-icons/hi2";
import { FaRegCommentDots } from "react-icons/fa6";

function Movie() {
    const [mainMovie, setMainMovie] = useState(-1)
    const [movieTab, setMovieTab] = useState("download")

    // we have only 2 route for this page "Movie" and "Series" So whenever user enter a wrong route we can either show "404 page" or redirect him/her to the main page   
    let { movieType, movieId = -1 } = useParams()
    let regex = /^((Movie)|(Series))$/gi
    let hasRoute = regex.test(movieType)

    let navigate = useNavigate()
    hasRoute == false && navigate('/')


    useEffect(() => {
        let mainMovieObj = movies.filter(movie => movie.type == movieType).find(movie => movie.id == movieId)
        !mainMovieObj && navigate('/')
        setMainMovie(mainMovieObj)
    }, [])

    // console.log(mainMovie)    
    const calcRates = rating => {
        if (rating) {
            let rates = rating.rates
            let likedRates = rates.filter(rate => rate.liked).length
            let totalRate = Math.round(likedRates / rates.length * 100)

            return totalRate
        }
    }

    const findMoviesHandler = idsArray => {
        let similarMovies = idsArray.reduce((prev, current) => {
            return [...prev, movies.find(movieItem => movieItem.id == current)]
        }, [])

        return similarMovies
    }

    // to change the tabs we should update the state
    const changeTab = e => {
        let target = e.target.tagName == "LI" ? event.target :
            e.target.parentElement.tagName == "LI" ? event.target.parentElement :
                event.target.parentElement.parentElement == 'LI' ? event.target.parentElement.parentElement : null

        setMovieTab(target.dataset.tab)
    }

    // useEffect(() => {
    //     console.log(mainMovie)
    // }, [mainMovie])

    return (
        <>
            {mainMovie == -1 ? (
                // loader until the object of mainPage found
                <div className="fixed top-0 left-0 w-full h-full bg-pink-500">

                </div>
            ) : (
                <div className="container mx-auto relative flex flex-col gap-7">
                    <div className="relative flex flex-col rounded-xl shadow shadow-black/5 bg-white dark:bg-secondary h-fit overflow-hidden">
                        <div className="relative p-4 pb-3 h-fit">
                            <div className={`absolute top-0 left-0 w-full h-full object-cover`}>
                                <img src={mainMovie?.src} alt="" className="w-full h-full object-cover object-center opacity-0.7" />
                                <span className="absolute top-0 left-0 inline-block w-full h-full bg-gradient-to-l from-black from-35% to-black/30"></span>
                            </div>

                            <div className="relative flex flex-col gap-4 h-fit">
                                <div className="w-full flex gap-5 overflow-hidden h-[315px]">
                                    <div className="w-1/4 h-full overflow-hidden rounded-lg">
                                        <img src={mainMovie?.src} alt="" className="w-full h-full object-cover object-center" />
                                    </div>
                                    <div className="w-3/4 flex flex-col items-start gap-4">
                                        <h1 className="text-white font-bold text-xl line-clamp-1">{mainMovie.mainTitle}</h1>

                                        <div className="w-full flex items-center justify-start gap-10">
                                            <div className="flex items-center justify-center gap-1">
                                                <FaImdb className="text-2xl sm:text-3xl fill-yellow-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-yellow-500">{mainMovie.rating[0].rate}</span><span className="text-white">/10</span></span>
                                            </div>

                                            <div className="flex items-center justify-center gap-1">
                                                <SiRottentomatoes className="text-2xl sm:text-3xl fill-red-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-white">{mainMovie.rating[1].rate}</span><span className="text-red-500">%</span></span>
                                            </div>

                                            <div className="flex items-center justify-center gap-1">
                                                <SiMetacritic className="text-2xl sm:text-3xl fill-blue-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-white">{mainMovie.rating[2].rate}</span><span className="text-blue-500">%</span></span>
                                            </div>

                                            <div className="hidden sm:flex items-center justify-center gap-1">
                                                <BiLike className="text-2xl sm:text-3xl fill-green-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-white">{calcRates(mainMovie?.rating[3])}</span><span className="text-green-500">%</span> <span className="text-sm text-white dark:text-gray-100 font-vazir">({mainMovie?.rating[3].rates.length} رای)</span> </span>
                                            </div>
                                        </div>

                                        <ul className="flex flex-col gap-2">
                                            <li className="flex items-center justify-start gap-2">
                                                <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                    <FaTheaterMasks className="text-xl" />
                                                    <span>ژانر</span>
                                                </span>
                                                <span className="text-nowrap text-white font-vazir text-sm">{mainMovie.genre.map(genreItem => (
                                                    <span className="group px-0.5 md:px-1"><span>{genreItem}</span><span className="group-last:hidden text-slate-500"> .</span></span>
                                                ))}</span>
                                            </li>

                                            <li className="flex items-center justify-start gap-2">
                                                <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                    <MdOutlineDateRange className="text-xl" />
                                                    <span>سال انتشار</span>
                                                </span>
                                                <span className="text-white text-light dark:text-white font-vazir text-nowrap font-semibold text-sm">{mainMovie.year}</span>
                                            </li>

                                            <li className="flex items-center justify-start gap-2">
                                                <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                    <FiFlag className="text-xl" />
                                                    <span>محصول</span>
                                                </span>
                                                <span className="text-nowrap text-white font-vazir text-sm">{mainMovie.countries.map(country => (
                                                    <span className="group px-0.5 md:px-1"><span>{country}</span><span className="group-last:hidden text-slate-500"> .</span></span>
                                                ))}</span>
                                            </li>
                                        </ul>

                                        <div className="flex items-center gap-2">
                                            {mainMovie.subtitle && (
                                                <div className="w-fit h-fit flex items-center justify-center gap-1">
                                                    <BsFillCcSquareFill className="text-sm fill-sky-500" />
                                                    <span className="text-sm text-sky-500 font-vazir">زیرنویس فارسی</span>
                                                </div>
                                            )}

                                            {mainMovie.dubed && (
                                                <div className="w-fit h-fit flex items-center justify-center gap-1">
                                                    <FaMicrophoneAlt className="text-sm md:text-xl fill-red-500" />
                                                    <span className="text-sm text-red-500  font-vazir">دوبله فارسی</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-start gap-2">
                                            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-sky-500 bg-sky-500 transition-all text-white hover:bg-transparent hover:border-white font-vazir cursor-pointer">
                                                <TbPlayerPlayFilled className="text-white font-2xl" />
                                                <span>پخش آنلاین</span>
                                            </button>

                                            <button className="group inline-flex items-center justify-center gap-1 p-2 bg-secondary hover:border-green-500 transition-all duration-200 rounded-sm cursor-pointer ">
                                                <span className="text-white group-hover:text-green-500 transition-all duration-200 text-lg">{mainMovie.rating[3].rates.filter(rate => rate.liked).length}</span>
                                                <AiFillLike className="text-white group-hover:text-green-500 transition-all duration-200 text-xl" />
                                            </button>
                                            <button className="group inline-flex items-center justify-center gap-1 p-2 bg-secondary hover:border-orange-500 transition-all duration-200 rounded-sm cursor-pointer ">
                                                <span className="text-white group-hover:text-orange-500 transition-all duration-200 text-lg">{mainMovie.rating[3].rates.filter(rate => !rate.liked).length}</span>
                                                <AiFillDislike className="text-white group-hover:text-orange-500 transition-all duration-200 text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-vazir text-gray-200 text-sm space-x-1">{mainMovie.desc}</p>
                            </div>
                        </div>

                        <div className="py-4 grid grid-cols-4 gap-y-5 gap-x-2 px-4 content-start h-52">
                            <GenreMovie genreTitle="کیفیت" genreValue={mainMovie.quality}>
                                <BsCameraVideo className="text-gray-400" />
                            </GenreMovie>

                            {mainMovie.type == 'series' && (
                                <GenreMovie genreTitle="وضعیت پخش" genreValue={mainMovie.status}>
                                    <FiEye className="text-gray-400" />
                                </GenreMovie>
                            )}

                            <GenreMovie genreTitle="شبکه" genreValue="Netflix">
                                <BsTv className="text-gray-400" />
                            </GenreMovie>

                            <GenreMovie genreTitle="سال های پخش" genreValue={mainMovie.year}>
                                <MdOutlineDateRange className="text-gray-400" />
                            </GenreMovie>

                            <GenreMovie genreTitle="زبان" genreValue={mainMovie.languages}>
                                <IoLanguageSharp className="text-gray-400" />
                            </GenreMovie>

                            <GenreMovie genreTitle="مدت زمان" genreValue={mainMovie.time}>
                                <RiTimer2Line className="text-gray-400" />
                            </GenreMovie>

                            <GenreMovie genreTitle="رده سنی" genreValue={mainMovie.age}>
                                <FiPlus className="text-gray-400" />
                            </GenreMovie>

                            <div className="absolute bottom-3 left-2 flex items-center gap-2">
                                <button className="px-3 py-2 text-xs rounded-full bg-red-100 text-red-500 dark:bg-primary dark:text-gray-400 transition-all duration-200 hover:bg-red-500 hover:text-white font-vazir cursor-pointer ">گزارش خرابی</button>
                                <button className="px-3 py-2 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-primary dark:text-gray-400 transition-all duration-200 hover:text-primary dark:hover:text-white font-vazir cursor-pointer">اشتراک گزاری</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-fit flex-col p-4 gap-2 rounded-xl shadow shadow-black/5 bg-white dark:bg-secondary ">
                        <ul className="flex items-center justify-start gap-5 border-b border-gray-100 dark:border-primary">
                            <li
                                data-tab="download"
                                className={`flex items-center justify-center gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "download" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <LuDownload className="text-base" />
                                <span>باکس دانلود</span>
                            </li>
                            <li
                                data-tab="similar"
                                className={`flex items-center justify-center gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "similar" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <ImFilm className="text-base" />
                                <span>سریال های مشابه</span>
                            </li>
                            <li
                                data-tab="actors"
                                className={`flex items-center justify-center gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "actors" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <HiMiniUsers className="text-base" />
                                <span>عوامل و بازیگران</span>
                            </li>
                            <li
                                data-tab="comments"
                                className={`flex items-center justify-center gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "comments" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <FaRegCommentDots className="text-base" />
                                <span>دیدگاه ها</span>
                            </li>
                        </ul>
                        <div className="pt-5">
                            <div className="w-full h-fit rounded-lg">
                                {movieTab == 'download' && (
                                    <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                        <h2 className="text-red-500 dark:bg-primary font-semibold font-vazir">برای مشاهده لینک های دانلود باید وارد حساب کاربری خود شوید!</h2>
                                        <button className="w-fit px-3 py-2 rounded-xl text-sm cursor-pointer bg-red-500 text-white transition-all hover:bg-red-600 font-vazir">ورود به حساب</button>
                                    </div>
                                )}
                                {movieTab == 'similar' && (
                                    <ul className="py-2 pb-5 px-5 grid grid-cols-6 gap-x-5 gap-y-7">
                                        {findMoviesHandler(mainMovie.similar).map(movie => (
                                            <NewMovieCard {...movie} showTitle />
                                        ))}
                                    </ul>
                                )}

                                {movieTab == 'actors' && (
                                    <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                        actors
                                    </div>
                                )}

                                {movieTab == 'comments' && (
                                    <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                        comments
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

// we pass the second part to realize when we are in movie Page , also in movie page we need to give a bit margin from top , second argument is just for styling!  
export default WithPageContent(Movie, true)