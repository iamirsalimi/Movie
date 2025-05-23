import React, { useEffect, useState, useContext } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import WithPageContent from './../../HOCs/WithPageContent'
import MovieInfos from '../../Components/MovieInfos/MovieInfos'
import NewMovieCard from './../../Components/NewMovieCard/NewMovieCard'
import ActorsCard from './../../Components/ActorsCard/ActorsCard'
import Comment from './../../Components/Comment/Comment'
import CommentForm from '../../Components/CommentForm/CommentForm'
import UserContext from '../../Contexts/UserContext'

import { findArrayByIds } from './../../utils'
import { movies, casts } from '../../moviesData'

// icons
import { FaTheaterMasks } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { SiMetacritic } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
import { BiLike } from "react-icons/bi";
import { BsFillCcSquareFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
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
import { CiBookmark } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { RiMedalFill } from "react-icons/ri";

let apiData = {
    updateCommentApi: "https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?id=eq.",
    postCommentApi: "https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments",
    getCommentsApi: "https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?select=*",
    getActorsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts?select=*',
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?select=*',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

function Movie() {
    const [mainMovie, setMainMovie] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(false)
    const [movieTab, setMovieTab] = useState("download")
    const [showAddCommentForm, setShowAddCommentForm] = useState(true)
    // const [showReply, setShowReply] = useState(false)
    const [replyId, setReplyId] = useState(null)
    const [comments, setComments] = useState([])
    const [commentsIsPending, setCommentsIsPending] = useState(false)
    const [commentsError, setCommentsError] = useState(null)
    const [getComments, setGetComments] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    const userObj = useContext(UserContext)
    // console.log('User ->', userObj)

    // we have only 2 route for this page "Movie" and "Series" So whenever user enter a wrong route we can either show "404 page" or redirect him/her to the main page   
    let { movieType, movieId = -1 } = useParams()
    let regex = /^((Movie)|(Series))$/gi
    let hasRoute = regex.test(movieType)

    let navigate = useNavigate()
    hasRoute == false && navigate('/', { replace: true })

    useEffect(() => {
        const getMovieInfo = async (movieId) => {
            try {
                const res = await fetch(`${apiData.getApi}${movieId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                console.log(data)
                if (data.length > 0) {
                    setMainMovie(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setMainMovie(null)
            }
        }
        getMovieInfo(movieId)
    }, [])

    // console.log(mainMovie)    
    const calcRates = rating => {
        if (rating.length > 0) {
            let likedRates = rating.filter(rate => rate.liked).length
            let totalRate = Math.round(likedRates / rates.length * 100)

            return totalRate
        }
    }

    // to change the tabs we should update the state
    const changeTab = e => {
        let target = e.target.tagName == "LI" ? event.target :
            e.target.parentElement.tagName == "LI" ? event.target.parentElement :
                event.target.parentElement.parentElement == 'LI' ? event.target.parentElement.parentElement : null

        setMovieTab(target.dataset.tab)
    }

    // this function will calculate the amount of the real array length , because in this array we can have nested array and for getting the real length of my array we should constantly call function by itself when we have another array in any index of our objects  
    const calcLength = mainArray => {
        const calcArrayLength = array => {
            let sum = 0

            for (let i = 0; i < array.length; i++) {
                sum++;
                // if the nested Comment Object has another array of replies and comments we should calculate them to so we call our function again for it
                if (array[i].replies.length) {
                    sum += calcArrayLength(array[i].replies);
                }
            }
            return sum
        }

        let arrayLength = calcArrayLength(mainArray)
        return arrayLength
    }

    // useEffect(() => {
    //     console.log(mainMovie)
    // }, [mainMovie])

    const addCommentHandler = async newComment => {
        await fetch(apiData.postCommentApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newComment)
        }).then(res => {
            if (res.ok) {
                setIsAdding(false)
                setGetComments(prev => !prev)
            }
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const getCommentsInfo = async () => {
        try {
            const res = await fetch(apiData.getCommentsApi, {
                headers: {
                    'apikey': apiData.apikey,
                    'Authorization': apiData.authorization
                }
            })

            const data = await res.json()

            if (data.length > 0) {
                const sortedComments = data.sort((a , b) => {
                    let aDate = new Date(a.created_at).getTime()
                    let bDate = new Date(b.created_at).getTime()

                    return aDate - bDate
                })
                setComments(sortedComments)
                setIsAdding(false)
            }

            setCommentsIsPending(false)
            setCommentsError(false)
        } catch (err) {
            console.log('fetch error')
            setCommentsError(err)
            setCommentsIsPending(false)
            setComments(null)
        }
    }

    const updateCommentHandler = async (commentId, commentObj) => {
        await fetch(`${apiData.updateCommentApi}${commentId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(commentObj)
        }).then(res => {
            if (res.ok) {
                setCommentsIsPending(false)
                console.log('comment Updated')
            }
        })
        .catch(err => {
                setCommentsIsPending(false)
                setIsAdding(false)
                console.log('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const updateCommentsLikesHandler = (commentId, likesKey , likes , updateOtherLikeKey , otherLikes) => {
        let mainComment = comments.find(comment => comment.id == commentId)

        mainComment[likesKey] = [...likes]
        if(updateOtherLikeKey){
            if(likesKey == 'likes'){
                mainComment.disLikes = [...otherLikes]
            } else {
                mainComment.likes = [...otherLikes]
            }
        }

        // console.log(mainComment.likes , mainComment.disLikes)
        setCommentsIsPending(true)
        updateCommentHandler(commentId , mainComment)

    }

    useEffect(() => {
        // when we've already fetched datas and our comments we set errors false so that we can understand we have fetched that once  
        if (mainMovie && comments?.length == 0 && commentsError != false) {
            console.log('get Comments 0')
            setCommentsIsPending(true)
            getCommentsInfo()
        }
    }, [mainMovie])

    useEffect(() => {
        if (movieTab == 'comments' && comments?.length > 0) {
            console.log('get Comments')
            setCommentsIsPending(true)
            getCommentsInfo()
        }
    }, [getComments])

    return (
        <>
            {mainMovie == null ? (
                // loader until the object of mainPage found
                <></>
            ) : (
                <div className="container mx-auto relative flex flex-col gap-7">
                    <div className="relative flex flex-col rounded-xl shadow shadow-black/5 bg-white dark:bg-secondary h-fit">
                        <div className="relative p-4 pb-3 h-max">
                            <div className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl overflow-hidden">
                                <img src={mainMovie?.banner} alt="" className="w-full h-full object-cover object-center opacity-0.7" />
                                <span className="absolute top-0 left-0 inline-block w-full h-full bg-gradient-to-t lg:bg-gradient-to-l from-black from-25% lg:from-35% to-black/30"></span>
                            </div>

                            <div className="relative flex flex-col gap-4 h-fit">
                                <div className="w-full flex flex-col lg:flex-row gap-5 h-max lg:h-[315px]">
                                    <div className="w-full lg:w-1/4 overflow-hidden rounded-lg h-[400px] lg:h-[315px]">
                                        <img src={mainMovie?.cover} alt="" className="w-full h-[400px] lg:h-full object-cover object-center" />
                                    </div>
                                    <div className="w-full lg:w-3/4 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4">
                                        <div className="w-full flex flex-col md:flex-row gap-5 items-center justify-between pl-2">
                                            <h1 className="text-white font-bold text-xl text-center md:text-justify md:line-clamp-1">{mainMovie.mainTitle}</h1>
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="inline-block relative cursor-pointer group">
                                                    <CiBookmark className="text-white text-2xl" />
                                                    <span className="inline-block opacity-0 h-5 absolute left-2 -top-7 -translate-x-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-sm dark:text-white font-vazir text-nowrap z-20 after:!z-10 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:rotate-45 group-hover:opacity-100 transition-all">افزودن به لیست تماشا</span>
                                                </span>
                                                <IoNotificationsOutline className="text-white text-2xl cursor-pointer" />
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center justify-center lg:justify-start gap-10">
                                            <div className="flex items-center justify-center gap-1">
                                                <FaImdb className="text-2xl sm:text-3xl fill-yellow-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-yellow-500">{mainMovie.imdb_score}</span><span className="text-white">/10</span></span>
                                            </div>

                                            <div className="flex items-center justify-center gap-1">
                                                <SiRottentomatoes className="text-2xl sm:text-3xl fill-red-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-white">{mainMovie.rotten_score}</span><span className="text-red-500">%</span></span>
                                            </div>

                                            <div className="flex items-center justify-center gap-1">
                                                <SiMetacritic className="text-2xl sm:text-3xl fill-blue-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-white">{mainMovie.metacritic_score}</span><span className="text-blue-500">%</span></span>
                                            </div>

                                            <div className="hidden sm:flex items-center justify-center gap-1">
                                                <BiLike className="text-2xl sm:text-3xl fill-green-500" />
                                                <span className="font-bold"><span className="text-lg sm:text-xl text-white">{calcRates(mainMovie?.site_scores)}</span><span className="text-green-500">%</span> <span className="text-sm text-white dark:text-gray-100 font-vazir hidden md:inline lg:hidden xl:inline">({mainMovie?.site_scores.length} رای)</span> </span>
                                            </div>
                                        </div>

                                        <ul className="flex flex-col items-center lg:items-start justify-center gap-2">
                                            <li className="flex items-center justify-start gap-2">
                                                <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                    <FaTheaterMasks className="text-xl" />
                                                    <span>ژانر</span>
                                                </span>
                                                <span className="text-nowrap text-white font-vazir-light text-sm">{mainMovie.genres.map(genreItem => (
                                                    <span className="group px-0.5 md:px-1"><span>{genreItem}</span><span className="group-last:hidden text-slate-500"> .</span></span>
                                                ))}</span>
                                            </li>

                                            <li className="flex items-center justify-start gap-2">
                                                <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                    <MdOutlineDateRange className="text-xl" />
                                                    <span>سال انتشار</span>
                                                </span>
                                                <span className="text-white dark:text-white font-vazir-light text-nowrap font-semibold text-sm">{mainMovie.year}</span>
                                            </li>

                                            <li className="flex items-center justify-start gap-2">
                                                <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                    <FiFlag className="text-xl" />
                                                    <span>محصول</span>
                                                </span>
                                                <span className="text-nowrap text-white font-vazir-light text-sm">{mainMovie.countries.map(country => (
                                                    <span className="group px-0.5 md:px-1"><span>{country}</span><span className="group-last:hidden text-slate-500"> .</span></span>
                                                ))}</span>
                                            </li>
                                        </ul>

                                        <div className="flex flex-col items-center lg:items-start justify-center gap-2">
                                            <div className="flex items-center gap-2">
                                                {mainMovie.has_subtitle && (
                                                    <div className="w-fit h-fit flex items-center justify-center gap-1">
                                                        <BsFillCcSquareFill className="text-sm fill-sky-500" />
                                                        <span className="text-sm text-sky-500 font-vazir">زیرنویس فارسی</span>
                                                    </div>
                                                )}

                                                {mainMovie.is_dubbed && (
                                                    <div className="w-fit h-fit flex items-center justify-center gap-1">
                                                        <FaMicrophoneAlt className="text-sm md:text-xl fill-red-500" />
                                                        <span className="text-sm text-red-500  font-vazir">دوبله فارسی</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {mainMovie.notifications.length != 0 && (
                                                    <div className="w-fit h-fit flex items-center justify-center gap-2 bg-black/70 px-2 py-1 rounded-lg">
                                                        <div className="p-1 rounded-full w-7 h-7 bg-red-500 flex items-center justify-center">
                                                            <GrUpdate className="text-md text-primary" />
                                                        </div>
                                                        <span className="text-sm font-light text-gray-200 font-vazir">{mainMovie.notifications.episodes[mainMovie.notifications.length - 1]}</span>
                                                    </div>
                                                )}

                                                {mainMovie.is_suggested && (
                                                    <div className="w-fit h-fit flex items-center justify-center gap-1 bg-yellow-500 px-2 py-1 rounded-lg">
                                                        <div className="p-1 rounded-full w-7 h-7 bg-primary flex items-center justify-center">
                                                            <RiMedalFill className="text-xl text-yellow-500" />
                                                        </div>
                                                        <span className="text-sm text-primary font-vazir">پیشنهادی</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start gap-2">
                                            <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-sky-500 bg-sky-500 transition-all text-white hover:bg-transparent hover:border-white font-vazir cursor-pointer">
                                                <TbPlayerPlayFilled className="text-white font-2xl" />
                                                <span>پخش آنلاین</span>
                                            </button>

                                            <button className="group inline-flex items-center justify-center gap-1 p-2 bg-secondary hover:border-green-500 transition-all duration-200 rounded-sm cursor-pointer ">
                                                <span className="text-white group-hover:text-green-500 transition-all duration-200 text-lg">{mainMovie.site_scores.filter(rate => rate.liked).length}</span>
                                                <AiFillLike className="text-white group-hover:text-green-500 transition-all duration-200 text-xl" />
                                            </button>
                                            <button className="group inline-flex items-center justify-center gap-1 p-2 bg-secondary hover:border-orange-500 transition-all duration-200 rounded-sm cursor-pointer ">
                                                <span className="text-white group-hover:text-orange-500 transition-all duration-200 text-lg">{mainMovie.site_scores.filter(rate => !rate.liked).length}</span>
                                                <AiFillDislike className="text-white group-hover:text-orange-500 transition-all duration-200 text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-shabnam-light text-gray-200 text-sm text-center lg:text-justify space-x-1">{mainMovie.description}</p>
                            </div>
                        </div>

                        <div className="py-4 grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2 px-4 pb-20 content-start min-h-52">
                            <MovieInfos infoTitle="کیفیت" infoValue={mainMovie.quality}>
                                <BsCameraVideo className="text-gray-400 text-xs md:text-base" />
                            </MovieInfos>

                            {mainMovie.type == 'series' && (
                                <MovieInfos infoTitle="وضعیت پخش" infoValue={mainMovie.broadcastStatus}>
                                    <FiEye className="text-gray-400 text-xs md:text-base" />
                                </MovieInfos>
                            )}

                            {mainMovie.company && (
                                <MovieInfos infoTitle="شبکه" infoValue={mainMovie.company}>
                                    <BsTv className="text-gray-400 text-xs md:text-base" />
                                </MovieInfos>
                            )}

                            <MovieInfos infoTitle="سال های پخش" infoValue={mainMovie.year}>
                                <MdOutlineDateRange className="text-gray-400 text-xs md:text-base" />
                            </MovieInfos>

                            <MovieInfos infoTitle="زبان" infoValue={mainMovie.languages}>
                                <IoLanguageSharp className="text-gray-400 text-xs md:text-base" />
                            </MovieInfos>

                            <MovieInfos infoTitle="مدت زمان" infoValue={mainMovie.duration}>
                                <RiTimer2Line className="text-gray-400 text-xs md:text-base" />
                            </MovieInfos>

                            <MovieInfos infoTitle="رده سنی" infoValue={mainMovie.age}>
                                <FiPlus className="text-gray-400 text-xs md:text-base" />
                            </MovieInfos>

                            <div className="absolute bottom-3 left-2 flex items-center gap-2">
                                <button className="px-3 py-2 text-xs rounded-full bg-red-100 text-red-500 dark:bg-primary dark:text-gray-400 transition-all duration-200 hover:bg-red-500 hover:text-white font-vazir cursor-pointer ">گزارش خرابی</button>
                                <button className="px-3 py-2 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-primary dark:text-gray-400 transition-all duration-200 hover:text-primary dark:hover:text-white font-vazir cursor-pointer">اشتراک گزاری</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-fit flex-col p-4 gap-2 rounded-xl shadow shadow-black/5 bg-white dark:bg-secondary ">
                        <ul className="movieTabs no-scrollbar flex items-center justify-start gap-5 border-b border-gray-100 dark:border-primary overflow-x-scroll lg:overflow-x-auto overflow-y-hidden px-2 md:px-0">
                            <li
                                data-tab="download"
                                className={`flex items-center justify-center text-nowrap gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "download" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <LuDownload className="text-base" />
                                <span className="font-shabnam">باکس دانلود</span>
                            </li>
                            <li
                                data-tab="similar"
                                className={`flex items-center justify-center text-nowrap gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "similar" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <ImFilm className="text-base" />
                                <span className="font-shabnam">{mainMovie.type == 'series' ? 'سریال' : 'فیلم '} های مشابه</span>
                            </li>
                            <li
                                data-tab="casts"
                                className={`flex items-center justify-center text-nowrap gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "casts" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <HiMiniUsers className="text-base" />
                                <span className="font-shabnam">عوامل و بازیگران</span>
                            </li>
                            <li
                                data-tab="comments"
                                className={`flex items-center justify-center text-nowrap gap-1 text-light-gray dark:text-gray-300 font-shabnam text-sm pb-3 cursor-pointer select-none relative after:absolute after:-bottom-2.5 after:left-1/2 after:inline-block after:-translate-x-1/2  after:w-1 after:h-1 after:border-[5px] after:border-transparent ${movieTab == "comments" && 'activeMovieTab'}`}
                                onClick={changeTab}
                            >
                                <FaRegCommentDots className="text-base" />
                                <span className="font-shabnam">دیدگاه ها</span>
                                <span className="px-2 py-0.5 text-xs rounded-full bg-sky-500 text-white font-semibold font-shabnam">{comments.filter(comment => comment.status == 'approved').length}</span>
                            </li>
                        </ul>
                        <div className="pt-5">
                            <div className="w-full h-fit rounded-lg">
                                {movieTab == 'download' && (
                                    <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                        <h2 className="text-red-500 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir-light">برای مشاهده لینک های دانلود باید وارد حساب کاربری خود شوید!</h2>
                                        <button className="w-fit px-3 py-2 rounded-xl text-sm cursor-pointer bg-red-500 text-white transition-all hover:bg-red-600 font-vazir">ورود به حساب</button>
                                    </div>
                                )}

                                {movieTab == 'similar' && (
                                    <>
                                        {
                                            mainMovie.similarMovies.length > 0 ? (
                                                <ul className="py-2 pb-5 px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-9">
                                                    {mainMovie.similarMovies.map(movie => (
                                                        <NewMovieCard {...movie} showTitle />
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                                    <h2 className="text-red-500 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir">فیلم مشابهی وجود ندارد</h2>
                                                </div>
                                            )
                                        }
                                    </>
                                )}

                                {movieTab == 'casts' && (
                                    <>
                                        {
                                            mainMovie?.casts.length != 0 ? (
                                                <div className="py-2 pb-5 px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                                                    {mainMovie?.casts.map(actor => (
                                                        <ActorsCard {...actor} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                                    <h2 className="text-red-500 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir">هنرپیشه ای وجود ندارد</h2>
                                                </div>
                                            )
                                        }
                                    </>
                                )}

                                {movieTab == 'comments' && (
                                    <>
                                        {commentsIsPending && (
                                            <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت کامنت ها ... </h2>
                                        )}

                                        {commentsError && (
                                            <h2 className="text-center font-vazir text-red-500 text-sm">{commentsError.message} </h2>
                                        )}

                                        {(!commentsIsPending) && (
                                            <div className="py-2 px-1 sm:px-5 flex flex-col items-center justify-center gap-7">
                                                <div className="flex flex-col gap-4">
                                                    <div className="bg-gray-100 dark:border-none dark:bg-primary w-full rounded-lg py-4 px-2 text-center space-y-4">
                                                        <h1 className="text-light-gray dark:text-white font-vazir">دوست عزیز لطفا برای سالم و درست نگه داشتن دیدگاه ها قوانین زیر را رعایت کنید</h1>
                                                        <ul className="flex flex-col gap-1 text-sm md:text-base">
                                                            <li className="text-red-500 font-vazir">ادب را رعایت کنید</li>
                                                            <li className="text-red-500 font-vazir">پرهیز از دیدگاه های بی ربط</li>
                                                            <li className="text-red-500 font-vazir">در صورتي كه دیدگاه شما داراي اسپویل می باشد ، حتما مطمین شوید که مقدار "دیدگاه دارای اسپویل است" را فعال می کنید</li>
                                                            <li className="text-red-500 font-vazir">دیدگاه شما ابتدا توسط ادمین تایید سپس نمایش داده می شود ، در نتیجه مطمین شوید قوانین را رعایت می کنید</li>
                                                        </ul>
                                                    </div>
                                                    {/* leaving Comment */}
                                                    {showAddCommentForm && (
                                                        <CommentForm userId={userObj?.id} userName={userObj?.nickName || userObj?.userName} userRole={userObj?.role} movieId={+movieId} movieType={mainMovie?.movieType} setReplyId={setReplyId} setShowAddCommentForm={setShowAddCommentForm} isAdding={isAdding} setIsAdding={setIsAdding} addCommentHandler={addCommentHandler} />
                                                    )}
                                                </div>

                                                {/* Movie's Comments */}
                                                <div className="w-full py-5 border-t border-gray-100 dark:border-primary">
                                                    {comments?.length ? (
                                                        <div className="flex flex-col items-center justify-center gap-7">
                                                            {comments?.filter(comment => !comment.parentId && comment.status == 'approved').map(comment => (
                                                                <Comment comments={comments} mainUserId={userObj?.id} mainUserName={userObj?.nickName || userObj?.userName} mainUserRole={userObj?.role} movieId={+movieId} movieType={mainMovie.movieType} replyId={replyId} key={comment.id} {...comment} isAdding={isAdding} setIsAdding={setIsAdding} setReplyId={setReplyId} setShowAddCommentForm={setShowAddCommentForm} updateCommentsLikesHandler={updateCommentsLikesHandler} addCommentHandler={addCommentHandler} />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="bg-red-100 dark:bg-primary text-center py-4 w-full rounded-md">
                                                            <h2 className="text-red-500 font-semibold font-vazir text-sm">هیچ ديدگاهي ثبت نشده :(</h2>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    </>
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