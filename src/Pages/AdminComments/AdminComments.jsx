import React, { useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';
import toast from 'react-hot-toast'

import { FaEye } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

dayjs.extend(jalali)

let apiData = {
    updateCommentApi: "https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?id=eq.",
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?select=*',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'movieId': { hasValue: false, property: 'movieId' },
    'userName': { hasValue: false, property: 'user_name' },
    'approved': { hasValue: true, property: 'status', value: 'approved' },
    'pending': { hasValue: true, property: 'status', value: 'pending' },
    'rejected': { hasValue: true, property: 'status', value: 'rejected' },
    'hasSpoil': { hasValue: true, property: 'has_spoiler', value: true },
    'has_not_spoil': { hasValue: true, property: 'has_spoiler', value: false },
}

export default function AdminComments() {
    const [showCommentDetails, setShowCommentDetails] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchType, setSearchType] = useState('ID')
    const [commentObj, setCommentObj] = useState(null)
    const [comments, setComments] = useState([])
    const [filteredComments, setFilteredComments] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [commentsIsPending, setCommentsIsPending] = useState(false)
    const [commentError, setCommentError] = useState(true)
    const [getComments, setGetComments] = useState(true)
    const [commentHasSpoil, setCommentHasSpoil] = useState(true)
    const [commentStatus, setCommentStatus] = useState('pending')
    const commentDetailsRef = useRef(null)

    const updateCommentHandler = async (id, newCommentObj) => {
        await fetch(`${apiData.updateCommentApi}${id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newCommentObj)
        }).then(res => {
            if (res.ok) {
                toast.success('کامنت با موفقیت آپدیت شد')
                setCommentsIsPending(false)
                setCommentObj(null)
                setShowCommentDetails(false)
                setGetComments(prev => !prev)
            }
        })
            .catch(err => {
                setCommentsIsPending(false)
                setCommentError(err)
                toast.error('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const updateComment = () => {
        if (commentObj.has_spoiler != commentHasSpoil || commentObj.status != commentStatus) {
            setCommentsIsPending(true)
            let newCommentObj = { ...commentObj }
            newCommentObj.has_spoiler = Boolean(commentHasSpoil)
            newCommentObj.status = commentStatus
            updateCommentHandler(commentObj.id, newCommentObj)
        }
    }

    const approveComment = id => {
        let newCommentObj = { ...commentObj }
        newCommentObj.status = 'approved'
        updateCommentHandler(id, newCommentObj)
    }

    const rejectComment = id => {
        let newCommentObj = { ...commentObj }
        newCommentObj.status = 'rejected'
        updateCommentHandler(id, newCommentObj)
    }

    // return the easy readable time and date with Iran timezone
    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    useEffect(() => {
        const getCommentsInfo = async () => {
            try {
                const res = await fetch(apiData.getAllApi, {
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

                        return aDate - bDate
                    })
                    setComments(sortedComments)
                    setFilteredComments(sortedComments)
                }

                setIsPending(false)
                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setComments(null)
            }
        }

        getCommentsInfo()
    }, [getComments])

    useEffect(() => {
        if (commentObj) {
            setCommentHasSpoil(commentObj.has_spoiler)
            setCommentStatus(commentObj.status)
        }
    }, [commentObj])

    useEffect(() => {
        let filterObj = filterSearchObj[searchType]
        let filteredCommentsArray = []

        // when we search something or we change the searchType we should filter the comments Array again  
        if (filterObj) {
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredCommentsArray = comments.filter(user => user[filterObj.property] == filterObj.value)
            } else {
                if (searchValue) {
                    if (filterObj.property == 'id' || filterObj.property == 'movieId') {
                        filteredCommentsArray = comments.filter(user => user[filterObj.property] == searchValue)
                    } else if (typeof filterObj.property == 'string') {
                        filteredCommentsArray = comments.filter(user => user[filterObj.property].toLowerCase().startsWith(searchValue))
                    }
                } else {
                    filteredCommentsArray = [...comments]
                }
            }
        }

        setFilteredComments(filteredCommentsArray)
    }, [searchValue, searchType])

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-12">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">دیدگاه ها</h2>
            </div>
            <div ref={commentDetailsRef} className="w-full flex flex-col items-center gap-12">
                {showCommentDetails && (
                    <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary p-2">
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID</h3>
                            <p className="text-primary dark:text-gray-300">#{commentObj.id}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID کاربر</h3>
                            <p className="text-primary dark:text-gray-300">{commentObj.userId}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نام نمایشی کاربر</h3>
                            <p className="text-primary dark:text-gray-300">{commentObj.user_name}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ریپلی شده</h3>
                            <p className="text-primary dark:text-gray-300">{commentObj.parentId ? 'بله' : 'خیر'}</p>
                        </li>
                        {commentObj.parentId && (
                            <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                <h3 className="text-light-gray dark:text-gray-500">Id کامنت پدر</h3>
                                <p className="text-primary dark:text-gray-300">#{commentObj.parentId}</p>
                            </li>
                        )}
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">زمان ثبت کامنت</h3>
                            <p className="text-primary dark:text-gray-300">{getDate(commentObj.created_at)}</p>
                        </li>
                        <li className="flex flex-col items-center md:items-start gap-2 w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">متن کامنت</h3>
                            <p className="text-primary dark:text-gray-300 font-vazir text-center md:text-justify">{commentObj.text}</p>
                        </li>
                        <li className="flex items-center justify-between gap-2 w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">تعداد like ها</h3>
                            <p className="text-primary dark:text-gray-300 font-vazir text-center md:text-justify">{commentObj.likes.length}</p>
                        </li>
                        <li className="flex items-center justify-between gap-2 w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">تعداد  dislike ها</h3>
                            <p className="text-primary dark:text-gray-300 font-vazir text-center md:text-justify">{commentObj.disLikes.length}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">دارای اسپویل هست؟</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                <div className="filter-lang flex items-center">
                                    <input type="checkbox" className="hidden" id="dubed" checked={commentHasSpoil} onChange={e => setCommentHasSpoil(e.target.checked)} />
                                    <label htmlFor="dubed" className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                                        <div className="flex items-center w-12 rounded-full bg-gray-300 dark:bg-gray-700 p-0.5 cursor-pointer transition-colors">
                                            <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-white"></span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">وضعیت کامنت</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center">
                                <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-primary dark:border-gray-600 dark:bg-primary bg-gray-100 text-primary dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={commentStatus}
                                        onChange={e => setCommentStatus(e.target.value)}
                                    >
                                        <option value="pending">در حال بررسی</option>
                                        <option value="approved">قبول شده</option>
                                        <option value="rejected">رد شده</option>
                                    </select>
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-primary dark:text-gray-600 bg-gray-100 dark:bg-primary">وضعیت کامنت</span>
                                </div>
                            </div>
                        </li>
                        <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <button
                                className={`${commentObj.status !== 'approved' ? 'md:col-start-1 md:col-end-3' : ''} w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-colors text-white py-2 font-vazir text-xl cursor-pointer rounded-lg`}
                                onClick={updateComment}
                                disabled={commentsIsPending}
                            >
                                {commentsIsPending ? 'در حال آپدیت کامنت' : 'آپدیت'}

                            </button>
                            {commentObj.status == 'approved' && (
                                <a
                                    href={`/${commentObj.movieType}/${commentObj.movieId}#comment-${commentObj.id}`}
                                    className="inline-block w-full text-center bg-green-500 hover:bg-green-600 transition-colors text-white py-2 font-vazir text-xl cursor-pointer rounded-lg"
                                >مشاهده کامنت</a>
                            )}
                        </div>
                    </ul>
                )}
                <div className="w-full flex flex-col items-center gap-5">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                                <option value="ID">ID</option>
                                <option value="movieId">ID فیلم</option>
                                <option value="userName">نام کاربری</option>
                                <option value="approved">تایید شده</option>
                                <option value="pending">در حال بررسی</option>
                                <option value="rejected">رد شده</option>
                                <option value="hasSpoil">دارای اسپویل</option>
                                <option value="has_not_spoil">بدون اسپویل</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                        </div>
                        {searchType == 'approved' && searchType == 'pending' && searchType == 'rejected' && searchType == 'hasSpoil' && searchType == 'has_not_spoil' && (
                            <div className="w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
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
                                    filteredComments.length > 0 && (
                                        filteredComments.map(comment => (
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
                                                    <span className={`px-2 py-1 rounded-md font-vazir text-white dark:text-secondary text-sm text-nowrap ${comment.status == 'pending' ? 'bg-light-gray dark:bg-gray-400' : comment.status == 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>{comment.status == 'pending' ? 'در حال بررسی' : comment.status == 'approved' ? 'قبول شده' : 'رد شده'}</span>
                                                </td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center flex flex-col items-center justify-center gap-2">
                                                    <button
                                                        className="p-1.5 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group flex items-center justify-center gap-0.5"
                                                        onClick={e => {
                                                            setCommentObj(comment)
                                                            setShowCommentDetails(true)
                                                            commentDetailsRef.current.scrollIntoView({ behavior: 'smooth' })
                                                        }}
                                                    >
                                                        <FaEye className="text-sky-500 group-hover:text-white transition-all" />
                                                        <span className="text-sky-500 font-vazir group-hover:text-white transition-all">مشاهده</span>
                                                    </button>
                                                    {comment.status == 'pending' && (
                                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                                            <button
                                                                className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group flex items-center justify-center gap-0.5"
                                                                onClick={e => approveComment(comment.id)}
                                                            >
                                                                <FiCheck className="text-green-500 group-hover:text-white transition-all text-sm" />
                                                                <span className="text-green-500 font-vazir group-hover:text-white transition-all text-nowrap text-xs">قبول کردن</span>
                                                            </button>

                                                            <button
                                                                className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group flex items-center justify-center gap-0.5"
                                                                onClick={e => rejectComment(comment.id)}
                                                            >
                                                                <RxCross1 className="text-red-500 group-hover:text-white transition-all text-sm" />
                                                                <span className="text-red-500 font-vazir group-hover:text-white transition-all text-nowrap text-xs">رد کردن</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>

                        {!isPending && filteredComments.length == 0 && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">کامنتی با همچین مشخصاتی پیدا نشد</h2>
                        )}

                        {isPending && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                        )}

                        {(!isPending && error) && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}