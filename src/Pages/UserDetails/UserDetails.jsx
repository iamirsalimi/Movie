import React, { useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { useParams } from 'react-router-dom'

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";


let apiData = {
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function UserDetails() {
    const [ticketSearchType, setTicketSearchType] = useState('ID')
    const [ticketSearchValue, setTicketSearchValue] = useState('')
    const [commentSearchType, setCommentSearchType] = useState('ID')
    const [commentSearchValue, setCommentSearchValue] = useState('')
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


    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
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
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">سوابق خريد :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.last_purchases}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.subscriptionStatus == 'active' ? 'فعال' : userObj.subscriptionStatus == 'expired' ? 'منقضی شده' : 'ندارد'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نوع اشتراك فعال :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.subscriptionPlan.duration} روز</span>
                            </li>
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
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تعداد لیست علاقه مندی ها :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{userObj.watchList.length}</span>
                            </li>
                            {userObj.watchList.length !== 0 && (
                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500">لیست علاقه مندی ها :</h3>
                                    <button className="bg-sky-500 hover:bg-sky-600 transition-colors text-white dark:text-primary cursor-pointer font-vazir py-1 px-2 rounded-md">مشاهده</button>
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
                                                    <span className="text-vazir-light text-primary dark:text-white">{getDate(plan.activateDate)} روزه</span>
                                                </li>

                                                <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                    <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">تاريخ منقضي شدن اشتراك :</h3>
                                                    <span className="text-vazir-light text-primary dark:text-white">{getDate(plan.expiration)}</span>
                                                </li>

                                                <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                    <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">آیا اشتراک خریداری شده؟</h3>
                                                    <span className="text-vazir-light text-primary dark:text-white">{plan.isBought.value ? 'بله' : 'خیر'}</span>
                                                </li>
                                                {plan.isBought.value && (
                                                    <li className="w-full py-1 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-between gap-1">
                                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm sm:text-base">قیمت خریداری شده : </h3>
                                                        <span className="text-vazir-light text-primary dark:text-white font-vazir">{getDate(plan.isBought.price)} تومان</span>
                                                    </li>
                                                )}
                                                {console.log(plan)}
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

                        <div ref={userTicketsRef} className="w-full flex flex-col gap-7 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">تيكت هاي كاربر</h2>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={ticketSearchType} onChange={e => setTicketSearchType(e.target.value)} >
                                            <option value="ID">ID</option>
                                            <option value="title">عنوان تیکت</option>
                                            <option value="type">دپارتمان</option>
                                            <option value="open">باز</option>
                                            <option value="pending">در حال بررسی</option>
                                            <option value="answered">پاسخ داده شده</option>
                                            <option value="closed">بسته شده</option>
                                        </select>
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو بر اساس</span>
                                    </div>

                                    <div className="w-full relative select-none">
                                        <input
                                            type="text"
                                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                            value={ticketSearchValue}
                                            onChange={e => setTicketSearchValue(e.target.value)}
                                        />
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو</span>
                                    </div>
                                </div>

                                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                                    <table className="w-full">
                                        <thead className="min-w-full">
                                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان تيكت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">دپارتمان</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ ثبت تیکت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت تیکت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="py-1 px-2 odd:bg-gray-200 dark:odd:bg-secondary text-center" >
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex123</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">20/5/1403</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">در حال بررسی</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                                    <button className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group">
                                                        <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                                    </button>

                                                    <button className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group">
                                                        <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div ref={userCommentRef} className="w-full flex flex-col gap-7 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">کامنت هاي كاربر</h2>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={commentSearchType} onChange={e => setCommentSearchType(e.target.value)} >
                                            <option value="ID">ID</option>
                                            <option value="movieId">movieId</option>
                                            <option value="pending">دارای اسپویل</option>
                                            <option value="rejected">قبول نشده</option>
                                            <option value="accepted">قبول شده</option>
                                            <option value="replied">ریپلی شده</option>
                                        </select>
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو بر اساس</span>
                                    </div>

                                    <div className="w-full relative select-none">
                                        <input
                                            type="text"
                                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                            value={commentSearchValue}
                                            onChange={e => setCommentSearchValue(e.target.value)}
                                        />
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">جستجو</span>
                                    </div>
                                </div>

                                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                                    <table className="w-full">
                                        <thead className="min-w-full">
                                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ID فیلم</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">متن کامنت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ ثبت کامنت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت کامنت</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ریپلی شده</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">دارای اسپویل</th>
                                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="py-1 px-2 odd:bg-gray-200 dark:odd:bg-secondary text-center" >
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">821365</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 min-w-36 max-w-56 max-h-32">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است </td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">20/5/1403</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">در حال بررسی</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">خیر</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">بله</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                                    <button className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group">
                                                        <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                                    </button>

                                                    <button className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group">
                                                        <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
