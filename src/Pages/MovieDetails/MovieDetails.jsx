import React, { useEffect, useRef, useState , useContext } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { useParams } from 'react-router-dom'
import LoadingContext from '../../Contexts/LoadingContext';

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

let apiData = {
    getCommentsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?movieId=eq.',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// accord this object we ca understand which property and which value should compare to eachother
const commentFilterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'movieId': { hasValue: false, property: 'movieId' },
    'approved': { hasValue: true, property: 'status', value: 'approved' },
    'pending': { hasValue: true, property: 'status', value: 'pending' },
    'rejected': { hasValue: true, property: 'status', value: 'rejected' },
    'hasSpoil': { hasValue: true, property: 'has_spoiler', value: true },
    'has_not_spoil': { hasValue: true, property: 'has_spoiler', value: false },
}

export default function MovieDetails() {
    const [commentSearchType, setCommentSearchType] = useState('ID')
    const [commentSearchValue, setCommentSearchValue] = useState('')
    const [movieObj, setMovieObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [comments, setComments] = useState([])
    const [filteredComments, setFilteredComments] = useState(null)
    const [commentIsPending, setCommentIsPending] = useState(false)
    const [commentError, setCommentError] = useState(null)

    const commentsRef = useRef(null)

    let { movieId } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    useEffect(() => {
        const getMovie = async (movieId) => {
            try {
                const res = await fetch(`${apiData.getApi}${movieId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()
                if (data.length > 0) {
                    setMovieObj(data[0])
                    setIsPending(false)
                } else {
                    // window.location.href = '/my-account/adminPanel/movies'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setMovieObj(null)
            }
        }
        getMovie(movieId)
    }, [])

    useEffect(() => {
        const getCommentsInfo = async () => {
            try {
                const res = await fetch(`${apiData.getCommentsApi}${movieId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    const sortedComments = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    })

                    setComments(sortedComments)
                    setFilteredComments(sortedComments)
                }

                setCommentIsPending(null)
                setCommentError(false)
            } catch (err) {
                console.log('fetch error')
                setCommentError(err)
                setCommentIsPending(false)
                setComments(null)
            }
        }

        if (movieObj) {
            getCommentsInfo()
        }
    }, [movieObj])

    useEffect(() => {
        let filterObj = commentFilterSearchObj[commentSearchType]
        let filteredCommentsArray = []

        // when we search something or we change the searchType we should filter the comments Array again  
        if (filterObj && comments.length > 0) {
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredCommentsArray = comments?.filter(comment => comment[filterObj.property] == filterObj.value)
            } else {
                if (commentSearchValue) {
                    if (filterObj.property == 'id' || filterObj.property == 'movieId') {
                        filteredCommentsArray = comments?.filter(comment => comment[filterObj.property] == commentSearchValue)
                    } else if (typeof filterObj.property == 'string') {
                        filteredCommentsArray = comments?.filter(comment => comment[filterObj.property].toLowerCase().startsWith(commentSearchValue))
                    }
                } else {
                    filteredCommentsArray = [...comments]
                }
            }
        }

        setFilteredComments(filteredCommentsArray)
    }, [commentSearchValue, commentSearchType])

    useEffect(() => {
        if(movieObj && commentIsPending == null && loading){
            setLoading(false)
        }
    } , [movieObj , commentIsPending])

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20 md:mb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">مشخصات فیلم</h2>
                    <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{movieId}</span>
                </div>
                <a href="/my-account/adminPanel/movies" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست فیلم ها</span>
                </a>
            </div>
            <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                {isPending && (
                    <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
                )}

                {error && (
                    <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
                )}

                {(!isPending && movieObj) && (
                    <>
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-200 dark:border-primary divide-y divide-gray-200 dark:divide-primary rounded-md">
                            <li className="w-full py-1 max-h-80 flex items-center justify-between rounded-xl overflow-hidden">
                                <img src={movieObj.cover} alt="" className="w-full h-full object-cover object-center" />
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ID :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.id}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">عنوان فیلم :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.title}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">عنوان اصلی فیلم :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.mainTitle}</span>
                            </li>
                            <li className="w-full py-1 flex flex-col gap-2">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">banner :</h3>
                                <div className="w-full max-h-80 overflow-hidden rounded-xl">
                                    <img src={movieObj.banner} alt="" className="w-full h-full object-cover object-center" />
                                </div>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نوع فیلم :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.movieType == 'series' ? "سریال" : "فیلم"}</span>
                            </li>
                            {movieObj.movieType == 'series' && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">تعداد کل فصل ها :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{movieObj.totalSeasons} فصل</span>
                                </li>
                            )}
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">وضعيت پخش :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.broadcastStatus == 'released' ? 'منتشر شده' : movieObj.broadcastStatus == 'premiere' ? 'پیش نمایش' : movieObj.broadcastStatus == 'broadcasting' ? 'در حال پخش' : 'کنسل شده'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تاريخ ثبت فیلم :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{getDate(movieObj.created_at)}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تاریخ آخرین بروزرسانی :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{getDate(movieObj.updated_at)}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">سال پخش :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.year}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">رده سنی :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.age}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ژانر :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.genres.join(', ')}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">شرکت :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.company || 'ندارد'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نمره IMDb :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.imdb_score}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نمره Rotten Tomatoes :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.rotten_score}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نمره Metacritic :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.metacritic_score}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نمرات Site :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.site_score}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">کشورها :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.countries.join(', ')}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">زبان :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.languages.join(', ')}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">کیفیت :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.quality}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">مدت زمان :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.duration} دقیقه</span>
                            </li>
                            <li className="w-full py-1 flex flex-col gap-2">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">توضیحات :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.description}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">زیرنویس دارد؟</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.has_subtitle ? 'بله' : 'خیر'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">دوبله دارد؟</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.is_dubbed ? 'بله' : 'خیر'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">پیشنهادی؟</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.is_suggested ? 'بله' : 'خیر'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">داخل اسلایدر های هدر هست؟</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.is_in_header_slider ? 'بله' : 'خیر'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">داخل جديد ترين فيلم ها باشد؟</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{movieObj.is_in_new_movies ? 'بله' : 'خیر'}</span>
                            </li>
                            {/* <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تعداد كامنت ها :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">3</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">كامنت ها :</h3>
                                <button
                                    className="bg-sky-500 hover:bg-sky-600 transition-colors text-white dark:text-primary cursor-pointer font-vazir py-1 px-2 rounded-md"
                                    onClick={e => commentsRef.current.scrollIntoView({ behavior: 'smooth' })}
                                >مشاهده</button>

                            </li> */}
                        </ul>
                        <div className="w-full flex flex-col items-start justify-center gap-2 my-5">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">لیست هنر پیشه ها</h2>
                            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 gap-y-7 font-vazir text-light-gray dark:text-white p-2 border border-gray-200 dark:border-primary rounded-xl">
                                {movieObj.casts.length > 0 ? movieObj.casts.map(cast => (
                                    <div className="grid grid-cols-5 gap-3 p-1 pl-2 max-h-52 rounded-xl bg-gray-200 dark:bg-primary divide-y divide-white dark:divide-secondary">
                                        <div className="col-start-1 col-end-3 w-full h-full rounded-lg overflow-hidden">
                                            <img src={cast.src} alt="" className="w-full h-full object-center object-cover" />
                                        </div>
                                        <ul className="col-start-3 col-end-6 flex flex-col items-center justify-start gap-2 divide divide-white dark:divide-primary">
                                            <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">ID :</h3>
                                                <span className="text-vazir-light text-primary dark:text-white text-sm">{cast.id}</span>
                                            </li>

                                            <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">ID هنرپیشه :</h3>
                                                <span className="text-vazir-light text-primary dark:text-white text-sm">{cast.castId}</span>
                                            </li>

                                            <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">نام هنرپیشه :</h3>
                                                <span className="text-vazir-light text-primary dark:text-white text-sm">{cast.fullName}</span>
                                            </li>

                                            <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">نقش هنرپیشه :</h3>
                                                <span className="text-vazir-light text-primary dark:text-white text-sm">{cast.role == 'actor' ? 'بازیگر' : cast.role == 'voiceActor' ? 'صداپیشه' : cast.role == 'director' ? 'کارگردان' : 'نویسنده'}</span>
                                            </li>

                                            <a
                                                href={`/my-account/adminPanel/actors/actor-details/${cast.castId}`}
                                                className="w-full bg-sky-500 hover:bg-sky-600 transition-colors text-white text-center font-vazir cursor-pointer rounded-md py-1 px-2 mt-auto mb-0.5"
                                            >مشاهده اطلاعات هنرپیشه</a>
                                        </ul>
                                    </div>
                                )) : (
                                    <h2 className="lg:col-start-1 lg:col-end-3 text-center text-red-500 font-vazir">هنرپیشه ای تا الان ثبت نشده</h2>
                                )}
                            </ul>
                        </div>

                        <div ref={commentsRef} className="w-full flex flex-col gap-7 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">کامنت هاي كاربر</h2>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                        <select
                                            name=""
                                            id=""
                                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                            value={commentSearchType}
                                            onChange={e => setCommentSearchType(e.target.value)}
                                        >
                                            <option value="ID">ID</option>
                                            <option value="movieId">ID فیلم</option>
                                            <option value="approved">تایید شده</option>
                                            <option value="pending">در حال بررسی</option>
                                            <option value="rejected">رد شده</option>
                                            <option value="hasSpoil">دارای اسپویل</option>
                                            <option value="has_not_spoil">بدون اسپویل</option>
                                        </select>
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو بر اساس</span>
                                    </div>

                                    {commentSearchType != 'approved' && commentSearchType != 'pending' && commentSearchType != 'rejected' && commentSearchType != 'hasSpoil' && commentSearchType != 'has_not_spoil' && (
                                        <div className="w-full relative select-none">
                                            <input
                                                type="text"
                                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                value={commentSearchValue}
                                                onChange={e => setCommentSearchValue(e.target.value)}
                                            />
                                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو</span>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                                    <table className="w-full">
                                        <thead className="min-w-full">
                                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام کاربر</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">متن کامنت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">اسپویل</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">زمان ثبت کامنت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!isPending && !error &&
                                                filteredComments?.length > 0 && (
                                                    filteredComments?.map(comment => (
                                                        <tr className="py-1 px-2 odd:bg-gray-200 dark:odd:bg-primary text-center" >
                                                            <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{comment.id}</td>
                                                            <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{comment.user_name}</td>
                                                            <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 font-vazir-light min-w-52 md:max-w-32">{comment.text}</td>
                                                            <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center max-w-20">
                                                                {comment.has_spoiler ? (
                                                                    <span className="bg-green-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                                                        <FiCheck className="text-green-500 stroke-2 " />
                                                                        <span className="text-green-500 font-vazir">دارد</span>
                                                                    </span>

                                                                ) : (
                                                                    <span className="bg-red-100 flex items-center justify-center gap-2 px-2 py-1 rounded-sm">
                                                                        <RxCross1 className="text-red-500 stroke-2 " />
                                                                        <span className="text-red-500 font-vazir">ندارد</span>
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{getDate(comment.created_at)}</td>
                                                            <td className="py-1 pb-3 px-2 text-sm text-center max-w-20">
                                                                <span className={`px-2 py-1 rounded-md font-vazir text-white dark:text-secondary text-nowrap ${comment.status == 'pending' ? 'bg-light-gray dark:bg-gray-400' : comment.status == 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>{comment.status == 'pending' ? 'در حال بررسی' : comment.status == 'approved' ? 'قبول شده' : 'رد شده'}</span>
                                                            </td>
                                                            <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center flex flex-col items-center justify-center gap-2">
                                                                <a
                                                                    href={`/my-account/adminpanel/comments?id=${comment.id}`}
                                                                    className="p-1.5 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group flex items-center justify-center gap-0.5"
                                                                >
                                                                    <FaEye className="text-sky-500 group-hover:text-white transition-all" />
                                                                    <span className="text-sky-500 font-vazir group-hover:text-white transition-all">مشاهده</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>

                                    {/* when comments array is empty and commentIsPending is false it means we fetched but there is no data with that information */}
                                    {!commentIsPending && filteredComments.length == 0 && (
                                        <>
                                            {comments.length > 0 ? (
                                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">کامنتی با همچین مشخصاتی پیدا نشد</h2>
                                            ) : (
                                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">برای فیلم تا کنون کامنتی نذاشته شده</h2>
                                            )}

                                        </>
                                    )}

                                    {commentIsPending && (
                                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                                    )}


                                    {(!commentIsPending && commentError) && (
                                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
