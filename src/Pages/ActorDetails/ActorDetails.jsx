import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { useParams } from 'react-router-dom'

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";


let apiData = {
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function ActorDetails() {
    const [actorObj, setActorObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)

    let { actorId } = useParams()

    useEffect(() => {
        const getActorInfo = async (actorId) => {
            try {
                const res = await fetch(`${apiData.getApi}${actorId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setActorObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/users'
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
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-200 dark:border-primary divide-y divide-gray-200 dark:divide-primary rounded-md">
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ID :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.userName}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام کامل هنرپیشه :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.firstName}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">نام هنری :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.nickName || 'ندارد'}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">تاریخ تولد :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.role}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">ملیت :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.email}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">بیوگرافی :</h3>
                                <span className="text-vazir-light text-primary dark:text-white">{actorObj.accountStatus}</span>
                            </li>
                        </ul>
                        <div className="w-full flex flex-col items-start justify-center gap-2 my-5">
                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg">مجموعه آثار هنرپیشه</h2>
                            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 gap-y-7 font-vazir text-light-gray dark:text-white p-2 border border-gray-200 dark:border-primary rounded-xl">
                                {actorObj.movies.length > 0 ? actorObj.movies.map(plan => (
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
                    </>
                )}
            </div>
        </div>
    )
}