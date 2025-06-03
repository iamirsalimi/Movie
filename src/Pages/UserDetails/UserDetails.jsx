import React, { useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { useParams } from 'react-router-dom'

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

let apiData = {
    getAllCommentsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?select=*',
    getCommentsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?userId=eq.',
    getTicketsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?userId=eq.',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// accord this object we ca understand which property and which value should compare to eachother
const ticketFilterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'subject': { hasValue: false, property: 'subject' },
    'account': { hasValue: true, property: 'category', value: 'account' },
    'payment': { hasValue: true, property: 'category', value: 'payment' },
    'bug': { hasValue: true, property: 'category', value: 'bug' },
    'requests': { hasValue: true, property: 'category', value: 'requests' },
    'links': { hasValue: true, property: 'category', value: 'links' },
    'content': { hasValue: true, property: 'category', value: 'content' },
    'other': { hasValue: true, property: 'category', value: 'other' },
    'pending': { hasValue: true, property: 'status', value: 'pending' },
    'answered': { hasValue: true, property: 'status', value: 'answered' },
    'closed': { hasValue: true, property: 'status', value: 'closed' },
    'high-priority': { hasValue: true, property: 'priority', value: 'high' },
    'middle-priority': { hasValue: true, property: 'priority', value: 'middle' },
    'low-priority': { hasValue: true, property: 'priority', value: 'low' },
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

export default function UserDetails() {
    const [ticketSearchType, setTicketSearchType] = useState('ID')
    const [ticketSearchValue, setTicketSearchValue] = useState('')
    const [commentSearchType, setCommentSearchType] = useState('ID')
    const [commentSearchValue, setCommentSearchValue] = useState('')
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState(null)
    const [ticketIsPending, setTicketIsPending] = useState(false)
    const [ticketError, setTicketError] = useState(null)
    const [comments, setComments] = useState([])
    const [filteredComments, setFilteredComments] = useState(null)
    const [commentIsPending, setCommentIsPending] = useState(false)
    const [commentError, setCommentError] = useState(null)
    const [userObj, setUserObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const userTicketsRef = useRef(null)
    const userCommentRef = useRef(null)

    let { userId } = useParams()

    useEffect(() => {
        const getUserInfo = async (userId) => {
            try {
                const res = await fetch(`${apiData.getApi}${userId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setUserObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/users'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setUserObj(null)
            }
        }
        getUserInfo(userId)
    }, [])

    useEffect(() => {
        const getTicketsInfo = async () => {
            try {
                const res = await fetch(`${apiData.getTicketsApi}${userId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    const sortedTickets = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    })

                    setTickets(sortedTickets)
                    setFilteredTickets(sortedTickets)
                }

                setTicketIsPending(null)
                setTicketError(false)
            } catch (err) {
                console.log('fetch error')
                setTicketError(err)
                setTicketIsPending(false)
                setTickets(null)
            }
        }

        if (userObj) {
            getTicketsInfo()
        }
    }, [userObj])

    useEffect(() => {
        const getCommentsInfo = async () => {
            try {
                const res = await fetch(`${apiData.getCommentsApi}${userId}`, {
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

        if (userObj) {
            getCommentsInfo()
        }
    }, [userObj])

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
        let filterObj = ticketFilterSearchObj[ticketSearchType]
        let filteredTicketsArray = []

        // when we search something or we change the searchType we should filter the comments Array again  
        if (filterObj && tickets.length > 0) {
            console.log('filtered')
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredTicketsArray = tickets?.filter(ticket => ticket[filterObj.property] == filterObj.value)
            } else {
                if (ticketSearchValue) {
                    if (filterObj.property == 'id') {
                        filteredTicketsArray = tickets?.filter(ticket => ticket[filterObj.property] == ticketSearchValue)
                    } else if (typeof filterObj.property == 'string') {
                        filteredTicketsArray = tickets?.filter(ticket => ticket[filterObj.property].toLowerCase().startsWith(ticketSearchValue))
                    }
                } else {
                    filteredTicketsArray = [...tickets]
                }
            }
        }

        setFilteredTickets(filteredTicketsArray)
    }, [ticketSearchValue, ticketSearchType])

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    //adding "," after each 3 numbers
    const formatPrice = price => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20 md:mb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">مشخصات كاربر</h2>
                    <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{userId}</span>
                </div>
                <a href="/my-account/adminPanel/users" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست کاربرها</span>
                </a>
            </div>
            <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                {isPending && (
                    <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
                )}

                {error && (
                    <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
                )}

                {(!isPending && userObj) && (
                    <>
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-200 dark:border-primary divide-y divide-gray-200 dark:divide-primary rounded-md">
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.firstName} {userObj.lastName}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام نمایشی :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.nickName || 'ندارد'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام کاربري :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.userName}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نقش کاربر :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.role}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ايميل :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.email}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تاريخ عضويت :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{getDate(userObj.created_At)}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تاریخ آخرین ورود به حساب :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{getDate(userObj.last_login_at)}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">وضعيت حساب :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.accountStatus}</span>
                            </li>
                            {userObj.isBanned && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">علت بن :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{userObj.banReason}</span>
                                </li>
                            )}
                            {userObj.isBanned && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">مدت زمان بن :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{userObj.banDuration} روز</span>
                                </li>
                            )}
                            {userObj.isBanned && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">تاریخ انقضا بن :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{getDate(userObj.ban_expiration_date)}</span>
                                </li>
                            )}
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">وضعيت حساب :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.accountStatus}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.subscriptionStatus == 'active' ? 'فعال' : userObj.subscriptionStatus == 'expired' ? 'منقضی شده' : 'ندارد'}</span>
                            </li>
                            {userObj.subscriptionStatus == 'active' && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">نوع اشتراك فعال :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{userObj.subscriptionPlan.duration} روز</span>
                                </li>
                            )}
                            {userObj.subscriptionStatus == 'active' && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">تاريخ فعال شدن اشتراك :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{getDate(userObj.subscriptionPlan.activateDate)}</span>
                                </li>
                            )}
                            {userObj.subscriptionStatus == 'active' && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">تاريخ منقضي شدن اشتراك :</h3>
                                    <span className="text-vazir-light text-primary dark:text-white">{getDate(userObj.subscriptionExpiresAt)}</span>
                                </li>
                            )}
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تعداد تیکت ها :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">2</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تیکت ها :</h3>
                                <button
                                    className="bg-sky-500 hover:bg-sky-600 transition-colors text-white dark:text-primary cursor-pointer font-vazir py-1 px-2 rounded-md"
                                    onClick={e => userTicketsRef.current.scrollIntoView({ behavior: 'smooth' })}
                                >مشاهده</button>

                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تعداد كامنت ها :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">3</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">كامنت ها :</h3>
                                <button
                                    className="bg-sky-500 hover:bg-sky-600 transition-colors text-white dark:text-primary cursor-pointer font-vazir py-1 px-2 rounded-md"
                                    onClick={e => userCommentRef.current.scrollIntoView({ behavior: 'smooth' })}
                                >مشاهده</button>

                            </li>
                        </ul>

                        <div className="w-full flex flex-col items-start justify-center gap-2 my-5">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">تمام اشتراک های کاربر</h2>
                            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 gap-y-7 font-vazir text-light-gray dark:text-white p-2 border border-gray-200 dark:border-primary rounded-xl">
                                {userObj.all_subscription_plans.length > 0 ? userObj.all_subscription_plans.map(plan => (
                                    <div className="flex flex-col items-center justify-center gap-2 py-1 px-2 rounded-md bg-gray-200 dark:bg-primary divide-y divide-white dark:divide-secondary">
                                        <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">ID :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white">{plan.id}</span>
                                        </li>

                                        <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">نوع اشتراك فعال  :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white">{plan.duration}</span>
                                        </li>

                                        <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">تاريخ فعال شدن اشتراك :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white">{getDate(plan.activateDate)}</span>
                                        </li>

                                        <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">تاريخ منقضي شدن اشتراك :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white">{getDate(plan.expiration)}</span>
                                        </li>

                                        <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">آیا اشتراک خریداری شده؟</h3>
                                            <span className="text-vazir-light text-primary dark:text-white">{typeof plan.isBought === 'object' && plan?.isBought?.value ? 'بله' : 'خیر'}</span>
                                        </li>
                                        {typeof plan.isBought === 'object' && plan.isBought?.value && (
                                            <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">قیمت خریداری شده : </h3>
                                                <span className="text-vazir-light text-primary dark:text-white font-vazir">{plan?.isBought?.price && formatPrice(plan?.isBought?.price)} تومان</span>
                                            </li>
                                        )}
                                        <li className="w-full py-1 flex flex-col justify-center gap-1">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">تغییر داده شده توسط  :</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {plan.changedBy.map(user => (
                                                    <div className="flex flex-col items-center justify-between gap-1 text-sm bg-white dark:bg-secondary p-1 rounded-md">
                                                        <span className="text-vazir-light text-primary dark:text-white rounded-lg">{user.userName}</span>
                                                        <span className="text-vazir-light text-primary dark:text-white rounded-lg">{getDate(user.date)}</span>
                                                    </div>
                                                ))}

                                            </div>
                                        </li>

                                    </div>
                                )) : (
                                    <h2 className="lg:col-start-1 lg:col-end-3 text-center text-red-500 font-vazir">کاربر تا کنون اشتراکی نداشته </h2>
                                )}
                            </ul>
                        </div>

                        <div className="w-full flex flex-col items-start justify-center gap-2 my-5">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">لیست تماشای کاربر</h2>
                            <ul className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-7 font-vazir text-light-gray dark:text-white p-2 border border-gray-200 dark:border-primary rounded-xl pt-5">
                                {userObj.watchList.length > 0 ? userObj.watchList.map(movie => (
                                    <div className="relative pb-2 group">
                                        <li key={movie.id} className={`group overflow-hidden relative rounded-lg h-64 cursor-pointer`}>
                                            <img src={movie.cover} className="w-full h-full object-cover object-center" alt="" />
                                            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-white/0 flex items-center justify-center duration-200"></span>
                                            <span className="text-nowrap line-clamp-1 absolute text-sm opacity-0 bottom-1 left-1/2 -translate-1/2 scale-50 text-white transition-all group-hover:scale-100 group-hover:opacity-100 duration-200">{movie.title}</span>
                                        </li>
                                        <span className={`border-2 border-white dark:border-primary font-vazir text-xs absolute top-0 left-1/2 -translate-1/2 inline-block px-3 py-0.5 rounded-full text-white dark:text-primary ${movie.movieType == 'series' ? 'bg-red-500' : 'bg-sky-500'}`}>{movie.movieType == 'series' ? 'سریال' : 'فیلم'}</span>
                                    </div>
                                )) : (
                                    <h2 className="lg:col-start-1 lg:col-end-3 text-center text-red-500 font-vazir">کاربر تا کنون فیلمی به لیست تماشای خود اضافه نکرده </h2>
                                )}
                            </ul>
                        </div>

                        <div ref={userTicketsRef} className="w-full flex flex-col gap-7 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">تيكت هاي كاربر</h2>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                        <select
                                            name=""
                                            id=""
                                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                            value={ticketSearchType}
                                            onChange={e => setTicketSearchType(e.target.value)}
                                        >
                                            <option value="ID">ID</option>
                                            <option value="subject">عنوان تیکت</option>
                                            <option value="answered">پاسخ داده شده</option>
                                            <option value="pending">در حال بررسی</option>
                                            <option value="closed">بسته شده</option>
                                            <option value="account">دپارتمان : اکانت</option>
                                            <option value="payment">دپارتمان : پرداخت و اشتراک</option>
                                            <option value="bug">دپارتمان : خطا در سایت یا فیلم</option>
                                            <option value="requests">دپارتمان : درخواست فیلم/سریال</option>
                                            <option value="links">دپارتمان :  خرابی یا مشکل لینک فیلم/سریال</option>
                                            <option value="content">دپارتمان : محتوای سایت</option>
                                            <option value="other">دپارتمان : سایر موارد</option>
                                            <option value="high-priority">اولویت بالا</option>
                                            <option value="middle-priority">اولویت متوسط</option>
                                            <option value="low-priority">اولویت کم</option>
                                        </select>
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو بر اساس</span>
                                    </div>
                                    {(ticketSearchType !== 'account' && ticketSearchType !== 'payment' && ticketSearchType !== 'bug' && ticketSearchType !== 'requests' && ticketSearchType !== 'links' && ticketSearchType !== 'content' && ticketSearchType !== 'other' && ticketSearchType !== 'pending' && ticketSearchType !== 'answered' && ticketSearchType !== 'closed' && ticketSearchType !== 'high-priority' && ticketSearchType !== 'middle-priority' && ticketSearchType !== 'low-priority') && (
                                        <div className="w-full relative select-none">
                                            <input
                                                type="text"
                                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                value={ticketSearchValue}
                                                onChange={e => setTicketSearchValue(e.target.value)}
                                            />
                                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو</span>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                                    <table className="w-full">
                                        <thead className="min-w-full">
                                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">پیام جدید</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان تيكت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">دپارتمان</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ ثبت تیکت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت تیکت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">اولویت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!isPending && !error &&
                                                filteredTickets.length > 0 && (
                                                    filteredTickets.map(ticket => (
                                                        <tr className="relative py-1 px-2 border-b border-gray-200 dark:border-white/5 odd:bg-gray-200 dark:odd:bg-primary" >
                                                            <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">
                                                                {!ticket.is_read_by_admin && (
                                                                    <div className="mx-auto w-2 h-2 rounded-full bg-green-500"></div>
                                                                )}
                                                            </td>
                                                            <td className="py-1 pb-3 px-2 font-vazir-light text-sm text-center text-light-gray dark:text-gray-400 text-nowrap">{ticket?.id}</td>
                                                            <td className="py-1 pb-3 px-2 font-vazir-light text-sm text-center text-light-gray dark:text-gray-400 text-nowrap">{ticket?.subject}</td>
                                                            <td className="py-1 pb-3 px-2 font-vazir-light text-sm text-center text-light-gray dark:text-gray-400">{ticket?.category == 'account' ? 'حساب' : ticket?.category == 'payment' ? 'پرداخت و اشتراک' : ticket?.category == 'bug' ? 'خطا در سایت یا فیلم' : ticket?.category == 'requests' ? 'درخواست فیلم/سریال' : ticket?.category == 'links' ? 'خرابی یا مشکل لینک فیلم/سریال' : ticket?.category == 'content' ? 'محتوای سایت' : 'سایر موارد'}</td>
                                                            <td className="py-1 pb-3 px-2 font-vazir-light text-sm text-center text-light-gray dark:text-gray-400">{getDate(ticket.created_at)}</td>
                                                            <td className="py-1 pb-3 px-2 font-vazir-light text-sm text-center text-light-gray dark:text-gray-400">{ticket?.status == 'pending' ? 'در حال بررسی' : ticket?.status == 'answered' ? 'جواب داده شده' : 'بسته شده'}</td>
                                                            <td className={`py-1 pb-3 px-2 font-vazir-light text-sm text-center ${ticket?.priority == 'middle' ? 'text-light-gray dark:text-gray-400' : ticket?.priority == 'high' ? 'text-red-500' : 'text-sky-500'}`}>{ticket?.priority == 'middle' ? 'متوسط' : ticket?.priority == 'high' ? 'بالا' : 'کم'}</td>
                                                            <td className="py-1 pb-3 px-2 font-vazir-light text-sm text-center text-light-gray dark:text-gray-400">
                                                                <a
                                                                    href={`/my-account/adminPanel/tickets/ticket-details/${ticket.id}`}
                                                                    className="p-1.5 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group flex items-center justify-center gap-0.5"
                                                                >
                                                                    <FaEye className="text-sky-500 group-hover:text-white transition-all" />
                                                                    <span className="text-sky-500 text-sm font-vazir group-hover:text-white transition-all">مشاهده</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>

                                    {ticketIsPending == null && tickets.length == 0 && (
                                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا کنون تیکتی توسط این کاربر ثبت نشده</h2>
                                    )}

                                    {!ticketIsPending && tickets.length > 0 && filteredTickets.length == 0 && (
                                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">مقداری با همچین مشخصاتی پیدا نشد</h2>
                                    )}

                                    {ticketIsPending && (
                                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                                    )}

                                    {ticketError && (
                                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div ref={userCommentRef} className="w-full flex flex-col gap-7 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
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
                                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">کاربر تا کنون کامنتی نذاشته است</h2>
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
