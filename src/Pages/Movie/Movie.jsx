import React, { useEffect, useState, useRef, useContext } from 'react'

import { useParams, useNavigate, useLocation } from 'react-router-dom'
import toast from "react-hot-toast"

import { updateUser } from './../../Services/Axios/Requests/Users'
import { updateMovie, getMovieById } from './../../Services/Axios/Requests/Movies'
import { getCommentsByMovieId, addComment, updateComment } from './../../Services/Axios/Requests/Comments'

import WithPageContent from './../../HOCs/WithPageContent'
import MovieInfos from './../../Components/MovieInfos/MovieInfos'
import DownloadBoxAccordion from './../../Components/DownloadBoxAccordion/DownloadBoxAccordion'
import NewMovieCard from './../../Components/NewMovieCard/NewMovieCard'
import ActorsCard from './../../Components/ActorsCard/ActorsCard'
import Comment from './../../Components/Comment/Comment'
import CommentForm from './../../Components/CommentForm/CommentForm'
import ShareBox from './../../Components/ShareBox/ShareBox'
import ReportBox from './../../Components/ReportBox/ReportBox'
import UserContext from './../../Contexts/UserContext'
import MoviesContext from './../../Contexts/MoviesContext'
import LoadingContext from './../../Contexts/LoadingContext'

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

function Movie() {
    const [mainMovie, setMainMovie] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [showAddCommentForm, setShowAddCommentForm] = useState(true)
    // const [showReply, setShowReply] = useState(false)
    const [replyId, setReplyId] = useState(null)
    const [comments, setComments] = useState([])
    const [commentsIsPending, setCommentsIsPending] = useState(false)
    const [commentsError, setCommentsError] = useState(null)
    const [getComments, setGetComments] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    let watchListToastId = null
    let likeToastId = null
    let commentToastId = null

    const location = useLocation();

    const [movieTab, setMovieTab] = useState(location.hash ? "comments" : "download")
    const commentRefs = useRef({})

    const { userObj, setUserObj } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const { movies, setMovies } = useContext(MoviesContext)

    // console.log('User ->', userObj)

    // we have only 2 route for this page "Movie" and "Series" So whenever user enter a wrong route we can either show "404 page" or redirect him/her to the main page   
    let { movieType, movieId = -1 } = useParams()
    let regex = /^((Movie)|(Series))$/gi
    let hasRoute = regex.test(movieType)

    let navigate = useNavigate()
    hasRoute == false && navigate('/', { replace: true })

    // to change the tabs we should update the state
    const changeTab = e => {
        let target = e.target.tagName == "LI" ? event.target :
            e.target.parentElement.tagName == "LI" ? event.target.parentElement :
                event.target.parentElement.parentElement == 'LI' ? event.target.parentElement.parentElement : null

        setMovieTab(target.dataset.tab)
    }

    const addCommentHandler = async newComment => {
        commentToastId = toast.loading('در حال افزودن کامنت')
        await addComment(newComment)
            .then(res => {
                setIsAdding(false)
                setGetComments(prev => !prev)
                toast.dismiss(commentToastId)
                toast.success('دیدگاه شما با موفقیت اضافه شد و پس از تایید ادمین نمایش داده می شود')
            })
            .catch(err => {
                setIsAdding(false)
                toast.dismiss(commentToastId)
                toast.error('مشکلی در افزودن دیدگاه پیش آمده')
            })
    }

    const getCommentsInfo = async () => {
        try {
            const data = await getCommentsByMovieId(movieId)

            if (data.length > 0) {
                const sortedComments = data.sort((a, b) => {
                    let aDate = new Date(a.created_at).getTime()
                    let bDate = new Date(b.created_at).getTime()

                    return bDate - aDate
                })
                setComments(sortedComments)
                setIsAdding(false)
            }

            setCommentsIsPending(false)
            setCommentsError(false)
        } catch (err) {
            console.log('fetch error', err)
            setCommentsError(err)
            setCommentsIsPending(false)
            setComments(null)
        }
    }

    // update comments 
    const updateCommentHandler = async (commentId, commentObj) => {
        await updateComment(commentId, commentObj)
            .then(res => {
                setCommentsIsPending(false)
                console.log('comment Updated')
            })
            .catch(err => {
                setCommentsIsPending(false)
                setIsAdding(false)
                toast.error('مشکلی در افزودن دیدگاه پیش آمده')
            })
    }

    const updateCommentsLikesHandler = (commentId, likesKey, likes, updateOtherLikeKey, otherLikes) => {
        let mainComment = comments.find(comment => comment.id == commentId)

        mainComment[likesKey] = [...likes]
        if (updateOtherLikeKey) {
            if (likesKey == 'likes') {
                mainComment.disLikes = [...otherLikes]
            } else {
                mainComment.likes = [...otherLikes]
            }
        }

        // console.log(mainComment.likes , mainComment.disLikes)
        setCommentsIsPending(true)
        updateCommentHandler(commentId, mainComment)

    }

    // update user handler
    const updateUserHandler = async (newUserObj, addFlag) => {
        await updateUser(userObj.id, newUserObj)
            .then(res => {
                if (addFlag) {
                    toast.success('فیلم به لیست تماشا اضافه شد')
                } else {
                    toast.success('فیلم از لیست تماشا حذف شد')
                }
                setUserObj(newUserObj)
            })
            .catch(err => {
                console.log(err)
                toast.error('مشکلی در افزودن فیلم به لیست تماشا پیش آمده')
            }).finally(res => {
                toast.dismiss(watchListToastId)
                watchListToastId = null
            })
    }

    const isMovieInUserWatchList = (watchList, movieId) => {
        let isInWatchList = watchList?.some(movie => movie.movieId == movieId)
        return isInWatchList
    }

    const addMovieToUserWatchList = () => {
        // console.log(userObj)

        if (!userObj) {
            toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
            return;
        } else if (userObj.role == 'admin') {
            toast.error('فقط کاربر های عادی میتوانند فیلم ها را به لیست تماشا اضافه کنن')
            return false;
        }

        let { id, movieType, title, cover } = mainMovie
        let newWatchListObj = {
            id: `${new Date().getTime()}`,
            movieId: id,
            movieType,
            title,
            cover
        }

        const newUserObj = { ...userObj }
        newUserObj.watchList.push(newWatchListObj)


        if (!watchListToastId) {
            watchListToastId = toast.loading('در حال افزودن فیلم به لیست تماشا')
            updateUserHandler(newUserObj, true)
        }
    }

    const removeMovieFomUserWatchList = () => {
        const newUserObj = { ...userObj }
        let newWatchList = newUserObj?.watchList.filter(movie => mainMovie.id != movie.movieId)
        newUserObj.watchList = [...newWatchList]

        if (!watchListToastId) {
            watchListToastId = toast.loading('در حال حذف فیلم از لیست تماشا')
            updateUserHandler(newUserObj)
        }
    }

    const updateMovieLikesHandler = async (newMovieObj, likeFlag, removeFlag) => {
        await updateMovie(movieId, newMovieObj)
            .then(res => {
                console.log(res)
                setMainMovie(newMovieObj)
                if (!removeFlag) {
                    toast.dismiss(likeToastId)
                    if (likeFlag) {
                        toast.success('فیلم با موفقیت لایک شد')
                    } else {
                        toast.success('فیلم با موفقیت دیسلایک شد')
                    }
                } else {
                    if (likeFlag) {
                        toast.success('لایک با موفقیت برداشته شد')
                    } else {
                        toast.success('دیسلایک با موفقیت برداشته شد')
                    }
                }
            })
            .catch(err => {
                setIsAdding(false)
                toast.dismiss(likeToastId)
                toast.error('مشکلی در آپدیت لایک های فیلم پیش آمده')
            })
    }

    const hasUserLiked = () => {
        if (mainMovie && userObj) {
            let scoreObj = mainMovie.site_scores?.find(score => score.userId == userObj.id)
            return scoreObj?.likeStatus
        }

        return false
    }

    const likeMovie = () => {
        if (!userObj) {
            toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
            return false;
        }

        let scores = [...mainMovie.site_scores]

        let removeFlag = false

        // if user already liked comment after clicking again we should remove his like
        let userLikedMovieObj = scores.find(score => score.userId == userObj.id)
        if (!userLikedMovieObj) {
            removeFlag = false

            scores.push({
                id: new Date().getTime(),
                userId: userObj.id,
                likeStatus: 'liked'
            })

            // console.log('added')
        } else {
            // if user already liked the movie we should remove his like
            if (userLikedMovieObj.likeStatus == 'liked') {
                removeFlag = true
                scores = scores.filter(score => score.userId != userObj.id)
            } else {
                // if user already disliked the movie and clicked on like button we should change his dislike to like
                removeFlag = false

                scores.forEach(score => {
                    if (score.userId == userObj.id) {
                        score.likeStatus = 'liked'
                    }
                })
            }

            // console.log('removed')
        }
        likeToastId = toast.loading('در حال آپدیت لایک های فیلم')
        let newMainMovie = { ...mainMovie }
        newMainMovie.site_scores = [...scores]
        updateMovieLikesHandler(newMainMovie, true, removeFlag)
    }

    const dislikeMovie = () => {
        if (!userObj) {
            toast.error('لطفا ابتدا وارد حساب کاربری خود شوید')
            return false;
        }

        let scores = [...mainMovie.site_scores]

        let removeFlag = false

        // if user already liked comment after clicking again we should remove his like
        let userLikedMovieObj = scores.find(score => score.userId == userObj.id)

        if (!userLikedMovieObj) {
            removeFlag = false
            scores.push({
                id: new Date().getTime(),
                userId: userObj.id,
                likeStatus: 'disliked'
            })

            // console.log('added')
        } else {
            // if user already disliked the movie we should remove his dislike
            if (userLikedMovieObj.likeStatus == 'disliked') {
                scores = scores.filter(score => score.userId != userObj.id)
                removeFlag = true
            } else {
                // if user already liked the movie and clicked on dislike button we should change his like to dislike
                removeFlag = false
                scores.forEach(score => {
                    if (score.userId == userObj.id) {
                        score.likeStatus = 'disliked'
                    }
                })
            }
            // console.log('removed')
        }
        // console.log(scores)

        likeToastId = toast.loading('در حال آپدیت لایک های فیلم')
        let newMainMovie = { ...mainMovie }
        newMainMovie.site_scores = [...scores]
        updateMovieLikesHandler(newMainMovie, false, removeFlag)
    }

    const sortMediaArray = (arr) => {
        const typeOrder = {
            "dubbed": 1,
            "subtitle": 2,
            "mainLanguage": 3,
        };

        const qualityOrder = {
            "4K": 1,
            "1080P": 2,
            "720P": 3,
            "480P": 4,
        }

        return [...arr].sort((itemA, itemB) => {
            const typeAPriority = typeOrder[itemA.type]
            const typeBPriority = typeOrder[itemB.type]

            if (typeAPriority < typeBPriority) {
                return -1
            }
            if (typeAPriority > typeBPriority) {
                return 1
            }


            const qualityAPriority = qualityOrder[itemA.title] || 99 // means quality is wrong
            const qualityBPriority = qualityOrder[itemB.title] || 99

            if (qualityAPriority < qualityBPriority) {
                return -1
            }
            if (qualityAPriority > qualityBPriority) {
                return 1
            }

            return 0
        })
    }

    useEffect(() => {
        const getMovieInfo = async movieId => {
            try {
                const data = await getMovieById(movieId)

                // console.log(data)
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

    useEffect(() => {
        // when we've already fetched datas and our comments we set errors false so that we can understand we have fetched that once  
        if (mainMovie && comments?.length == 0 && commentsError != false) {
            // console.log('get Comments 0')
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

    useEffect(() => {
        const hash = location.hash;
        const commentId = hash?.replace('#comment-', '');

        if (comments?.length > 0 && commentId && commentRefs.current[commentId]) {
            commentRefs.current[commentId].scrollIntoView({ behavior: 'smooth', block: 'start' });
            commentRefs.current[commentId].classList.add('!bg-sky-100')
            commentRefs.current[commentId].classList.add('dark:!bg-sky-900')
            commentRefs.current[commentId].firstElementChild.lastElementChild.lastElementChild.classList.add('dark:!text-white')
            setTimeout(() => {
                commentRefs.current[commentId].classList.remove('!bg-sky-100')
                commentRefs.current[commentId].classList.remove('dark:!bg-sky-900')
                commentRefs.current[commentId].firstElementChild.lastElementChild.lastElementChild.classList.remove('dark:!text-white')
            }, 3000)
        }
    }, [comments])

    // removing loading
    useEffect(() => {
        if (mainMovie && movies.length > 0 && loading) {
            setLoading(false)
        }
    }, [mainMovie, movies])

    return (
        <>
            {mainMovie == null ? (
                // loader until the object of mainPage found
                <></>
            ) : (
                <>
                    <div className="container mx-auto relative flex flex-col gap-7">
                        <div className="relative flex flex-col rounded-xl shadow shadow-black/5 bg-white dark:bg-secondary h-fit">
                            <div className="relative p-2.5 md:p-4 pb-3 h-max">
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
                                                <button
                                                    className="flex items-center justify-center gap-2"
                                                    onClick={isMovieInUserWatchList(userObj?.watchList, mainMovie.id) ? removeMovieFomUserWatchList : addMovieToUserWatchList}
                                                >
                                                    <span className="inline-block relative cursor-pointer group">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 stroke-white ${isMovieInUserWatchList(userObj?.watchList, mainMovie.id) ? 'fill-white' : ''} text-2xl`}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                        </svg>
                                                        <span className="inline-block opacity-0 h-5 absolute left-2 -top-7 -translate-x-1/2 bg-gray-100 text-light-gray dark:bg-gray-900 px-2 py-0.5 rounded-md text-sm dark:text-white font-vazir text-nowrap z-20 after:!z-10 after:absolute after:w-2 after:h-2 dark:after:bg-gray-900 after:bg-gray-100 after:left-1/2 after:-bottom-1 after:rotate-45 group-hover:opacity-100 transition-all">افزودن به لیست تماشا</span>
                                                    </span>
                                                    <IoNotificationsOutline className="text-white text-2xl cursor-pointer" />
                                                </button>
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

                                                {/* <div className="hidden sm:flex items-center justify-center gap-1">
                                                    <BiLike className="text-2xl sm:text-3xl fill-green-500" />
                                                    <span className="font-bold"><span className="text-lg sm:text-xl text-white">{calcRates(mainMovie?.site_scores)}</span><span className="text-green-500">%</span> <span className="text-sm text-white dark:text-gray-100 font-vazir hidden md:inline lg:hidden xl:inline">({mainMovie?.site_scores.length} رای)</span> </span>
                                                </div> */}
                                            </div>

                                            <ul className="flex flex-col items-center lg:items-start justify-center gap-2">
                                                <li className="flex items-center justify-start gap-2">
                                                    <span className="flex items-center justify-center gap-1 font-vazir text-gray-400">
                                                        <FaTheaterMasks className="text-xl" />
                                                        <span>ژانر</span>
                                                    </span>
                                                    <span className="text-nowrap text-white font-vazir-light text-sm">{mainMovie.genres.map((genreItem, index) => (
                                                        <span key={index} className="group px-0.5 md:px-1"><span>{genreItem}</span><span className="group-last:hidden text-slate-500"> .</span></span>
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
                                                    <span className="text-nowrap text-white font-vazir-light text-sm">{mainMovie.countries.map((country, index) => (
                                                        <span key={index} className="group px-0.5 md:px-1"><span>{country}</span><span className="group-last:hidden text-slate-500"> .</span></span>
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
                                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                                    {mainMovie.notifications.length != 0 && (
                                                        <div className="w-fit h-fit flex items-center justify-center gap-2 bg-black/70 px-2 py-1 rounded-lg">
                                                            <div className="p-1 rounded-full w-7 h-7 bg-red-500 flex items-center justify-center">
                                                                <GrUpdate className="text-md text-primary" />
                                                            </div>
                                                            <span className="text-sm font-light text-gray-200 font-vazir">{mainMovie.notifications[mainMovie.notifications.length - 1]}</span>
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

                                                <button
                                                    className="group inline-flex items-center justify-center gap-1 p-2 bg-secondary hover:border-green-500 transition-all duration-200 rounded-sm cursor-pointer "
                                                    onClick={likeMovie}
                                                >
                                                    <span className={`group-hover:text-green-500 ${hasUserLiked() == 'liked' ? 'text-green-500' : 'text-white'} transition-all duration-200 text-lg`}>{mainMovie.site_scores.filter(score => score.likeStatus == 'liked').length}</span>
                                                    <AiFillLike className={`group-hover:text-green-500 ${hasUserLiked() == 'liked' ? 'text-green-500' : 'text-white'} transition-all duration-200 text-xl`} />
                                                </button>
                                                <button
                                                    className="group inline-flex items-center justify-center gap-1 p-2 bg-secondary hover:border-orange-500 transition-all duration-200 rounded-sm cursor-pointer "
                                                    onClick={dislikeMovie}
                                                >
                                                    <span className={`group-hover:text-orange-500 ${hasUserLiked() == 'disliked' ? 'text-orange-500' : 'text-white'} transition-all duration-200 text-lg`}>{mainMovie.site_scores.filter(score => score.likeStatus == 'disliked').length}</span>
                                                    <AiFillDislike className={`group-hover:text-orange-500 ${hasUserLiked() == 'disliked' ? 'text-orange-500' : 'text-white'} transition-all duration-200 text-xl`} />
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

                                <MovieInfos infoTitle={`سال ${mainMovie.movieType == 'series' ? 'های' : ''} پخش`} infoValue={`${mainMovie.year} ${mainMovie.movieType == 'series' ? '-' : ''}`}>
                                    <MdOutlineDateRange className="text-gray-400 text-xs md:text-base" />
                                </MovieInfos>

                                <MovieInfos infoTitle="زبان" infoValue={mainMovie.languages}>
                                    <IoLanguageSharp className="text-gray-400 text-xs md:text-base" />
                                </MovieInfos>

                                <MovieInfos infoTitle="مدت زمان" infoValue={`${mainMovie.duration} دقیقه`}>
                                    <RiTimer2Line className="text-gray-400 text-xs md:text-base" />
                                </MovieInfos>

                                <MovieInfos infoTitle="رده سنی" infoValue={mainMovie.age}>
                                    <FiPlus className="text-gray-400 text-xs md:text-base" />
                                </MovieInfos>

                                <div className="absolute bottom-3 left-2 flex items-center gap-2">
                                    <button
                                        className="px-3 py-2 text-xs rounded-full bg-red-100 text-red-500 dark:bg-primary dark:text-gray-400 transition-all duration-200 hover:bg-red-500 hover:text-white font-vazir cursor-pointer"
                                        onClick={e => {
                                            if (userObj) {
                                                if (userObj?.role == 'user') {
                                                    setShowReportModal(true)
                                                } else {
                                                    toast.error("فقط کاربر های عادی میتوانند مشکلات را گزارش دهند")
                                                }
                                            } else {
                                                toast.error("برای اینکار ابتدا باید وارد حساب کاربری خود بشوید")
                                            }
                                        }}
                                    >گزارش خرابی</button>
                                    <button
                                        className="px-3 py-2 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-primary dark:text-gray-400 transition-all duration-200 hover:text-primary dark:hover:text-white font-vazir cursor-pointer"
                                        onClick={e => setShowShareModal(true)}
                                    >اشتراک گزاری</button>
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
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-sky-500 text-white font-semibold font-shabnam">{comments?.filter(comment => comment.status == 'approved').length || 0}</span>
                                </li>
                            </ul>
                            <div className="pt-5">
                                <div className="w-full h-fit rounded-lg">
                                    {movieTab == 'download' && (
                                        <>
                                            {userObj ? (
                                                <>
                                                    {mainMovie.broadcastStatus == 'premiere' ? (
                                                        <h2 className="mx-auto bg-sky-100 text-sky-500 w-full py-3 px-2 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir">لینک های دانلود به محض انتشار قرار می گیرند</h2>
                                                    ) : (
                                                        <div className={`bg-gray-100 dark:bg-primary rounded-xl py-3 px-2 flex flex-col items-center justify-center ${userObj.role == 'admin' || userObj.subscriptionStatus == 'active' ? 'gap-5' : ''}`}>
                                                            {(userObj.role == 'admin' || userObj.subscriptionStatus == 'active') ? (
                                                                <>
                                                                    {mainMovie?.links.length > 0 ? sortMediaArray(mainMovie?.links).map(link =>
                                                                        <DownloadBoxAccordion key={link.id} {...link} />
                                                                    ) : (
                                                                        <h2 className="mx-auto bg-sky-100 text-sky-500 w-full py-3 px-2 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir">لينكي براي دانلود تا كنون قرار نگرفته است</h2>

                                                                    )}

                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h2 className="mx-auto text-red-500 py-5 px-2 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir">براي دسترسي به محتواي فيلم ها بايد اشتراك ويژه تهیه نمایید</h2>
                                                                    <a
                                                                        href='/my-account/userPanel/vip-plan'
                                                                        className="w-fit px-3 py-2 rounded-xl text-sm cursor-pointer bg-red-500 text-white transition-all hover:bg-red-600 font-vazir"
                                                                    >خرید اشتراک</a>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="bg-red-100 dark:bg-primary rounded-md py-7 px-2 flex flex-col items-center justify-center gap-5">
                                                    <h2 className="text-red-500 dark:bg-primary text-center md:text-justify text-sm md:text-base font-semibold font-vazir-light">برای مشاهده لینک های دانلود باید وارد حساب کاربری خود شوید!</h2>
                                                    <a
                                                        href='/account/login'
                                                        className="w-fit px-3 py-2 rounded-xl text-sm cursor-pointer bg-red-500 text-white transition-all hover:bg-red-600 font-vazir"
                                                    >ورود به حساب</a>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {movieTab == 'similar' && (
                                        <>
                                            {
                                                mainMovie.similarMovies.length > 0 ? (
                                                    <ul className="py-2 pb-5 px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-9">
                                                        {mainMovie.similarMovies.map(movie => (
                                                            <NewMovieCard key={movie.id} {...movie} showTitle />
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
                                                            <ActorsCard key={actor.id} {...actor} />
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
                                                <div className="pb-0 py-2 px-0 xs:px-1 sm:px-5 flex flex-col items-center justify-center gap-7">
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
                                                            <CommentForm userObj={userObj} userId={userObj?.id} userName={userObj?.nickName || userObj?.userName} userRole={userObj?.role} movieId={+movieId} movieType={mainMovie?.movieType} movieTitle={mainMovie?.mainTitle} movieSrc={mainMovie.cover} setReplyId={setReplyId} setShowAddCommentForm={setShowAddCommentForm} isAdding={isAdding} setIsAdding={setIsAdding} addCommentHandler={addCommentHandler} />
                                                        )}
                                                    </div>

                                                    {/* Movie's Comments */}
                                                    <div className="w-full py-2 md:py-5 border-t border-gray-100 dark:border-primary">
                                                        {comments?.filter(comment => comment.status == 'approved').length ? (
                                                            <div className="flex flex-col items-center justify-center gap-2 lg:gap-5 xl:gap-7">
                                                                {comments?.filter(comment => !comment.parentId && comment.status == 'approved').map(comment => (
                                                                    <Comment key={comment.id} {...comment} userObj={userObj} comments={comments.filter(comment => comment.status == 'approved')} mainUserId={userObj?.id} mainUserName={userObj?.nickName || userObj?.userName} mainUserRole={userObj?.role} movieId={+movieId} movieType={mainMovie.movieType} movieTitle={mainMovie?.mainTitle} movieSrc={mainMovie.cover} replyId={replyId} isAdding={isAdding} setIsAdding={setIsAdding} setReplyId={setReplyId} setShowAddCommentForm={setShowAddCommentForm} updateCommentsLikesHandler={updateCommentsLikesHandler} addCommentHandler={addCommentHandler} ref={(el) => commentRefs.current[comment.id] = el} />
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
                    <ReportBox showModal={showReportModal} setShowModal={setShowReportModal} userObj={userObj} movieObj={mainMovie} />
                    <ShareBox showModal={showShareModal} setShowModal={setShowShareModal} {...mainMovie} />
                </>
            )
            }
        </>
    )
}

// we pass the second part to realize when we are in movie Page , also in movie page we need to give a bit margin from top , second argument is just for styling!  
export default WithPageContent(Movie, true)