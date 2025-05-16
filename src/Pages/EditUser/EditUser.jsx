import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { MdKeyboardArrowRight } from "react-icons/md";

let userNameRegex = /^[0-9A-Za-z_.]+$/
let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@_.])(?!.* ).{8,16}$/

let apiData = {
    updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function EditUser() {
    const [vipTab, setVipTab] = useState('increase-vipPlan')

    const [userObj, setUserObj] = useState(null)
    const [vipPlanExpiresDate, setVipPlanExpiresDate] = useState(null)

    const { userId } = useParams()

    const schema = yup.object().shape({
        firstName: yup.string().required('وارد كردن نام اجباري است'),
        lastName: yup.string().required('وارد كردن نام خانوادگي اجباري است'),
        nickName: yup.string(),
        email: yup.string().email('ایمیل نامعتبر است').required('وارد كردن ايميل اجباري است'),
        userName: yup
            .string()
            .required('وارد كردن نام کاربری اجباری است')
            .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد')
            .matches(userNameRegex, 'نام کاربری نامعتبر است'),
        role: yup
            .string()
            .required('انتخاب نقش کاربر اجباری است')
            .oneOf(['admin', 'user'], 'نقش نامعتبر است'),
        accountStatus: yup
            .string()
            .required('انتخاب وضعیت حساب اجباری است')
            .oneOf(['active', 'temporary-banned', 'permanent-banned'], 'وضعیت حساب نامعتبر است'),
        banDuration: yup.string().when('accountStatus', {
            is: 'temporary-banned',
            then: () => yup.string().required('مدت زمان بن اجباری است').oneOf(['30', '90', '180', '365'], 'مدت زمان بن نامعتبر است'),
            otherwise: () => yup.string().notRequired(), // یا yup.string().nullable() بسته به نیاز
        }),
        banReason: yup.string().when('accountStatus', {
            is: (status) => status === 'temporary-banned' || status === 'permanent-banned',
            then: () => yup.string().required('علت بن اجباری است'),
            otherwise: () => yup.string().notRequired(), // یا yup.string().nullable()
        }),
        vipPlan: yup.string().notRequired().oneOf(['0', '30', '90', '180', '365'], 'مدت زمان اشتراک نامعتبر است'),
    })

    let {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        resolver: yupResolver(schema)
    })

    let accountStatus = watch('accountStatus')

    const changeVipTab = e => {
        e.preventDefault()
        setVipTab(e.target.dataset.viptab)
    }

    const updateUser = async data => {
        let newUserObj = { ...userObj }

        newUserObj.firstName = data.firstName
        newUserObj.lastName = data.lastName
        newUserObj.nickName = data.nickName
        newUserObj.email = data.email
        newUserObj.userName = data.userName
        newUserObj.role = data.role
        newUserObj.accountStatus = data.accountStatus
        if (data.vipPlan) {
            newUserObj.subscriptionStatus = 'active'
            newUserObj.subscriptionExpiresAt = getExpirationDate(data.vipPlan)
            newUserObj.subscriptionPlan = [...newUserObj.subscriptionPlan, { id: Math.floor(Math.random() * 999), duration: data.vipPlan, activateDate: new Date, expiration: getExpirationDate(data.vipPlan), isBought: false }]
        }

        if(data.accountStatus.includes('banned')){
            newUserObj.accountStatus = data.accountStatus
            newUserObj.isBanned = true
            newUserObj.banReason = data.banReason
            
            if(data.accountStatus == 'temporary-banned'){
                newUserObj.banDuration = data.banDuration
                newUserObj.ban_expiration_date = getExpirationDate(data.banDuration)
            }
        } else {
            
            newUserObj.accountStatus = 'active'
            newUserObj.isBanned = false
            newUserObj.banReason = ''
            newUserObj.banDuration = null
            newUserObj.ban_expiration_date = null
        }

        await fetch(`${apiData.updateApi}${newUserObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newUserObj)
        }).then(res => {
            location.reload()
        })
            .catch(err => errorNotify('مشکلی در ثبت نام پیش آمده'))
    }


    const getExpirationDate = daysToAdd => {
        let now = new Date()
        if (daysToAdd > 0) {
            now.setTime(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))

        }

        return now
    }

    const calcExpiresDate = () => {
        let expiresDate = getExpirationDate(watch('vipPlan')).toLocaleDateString('fa-IR')

        setVipPlanExpiresDate(expiresDate)
    }

    const resetVipPlan = () => {
        setValue('vipPlan', 0)
        setVipPlanExpiresDate(null)
    }

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
                } else {
                    window.location.href = '/my-account/adminPanel/users'
                }

            } catch (err) {
                console.log('fetch error')
                setUserObj(null)
            }
        }
        getUserInfo(userId)
    }, [])

    useEffect(() => {
        if (userObj) {
            setValue('firstName', userObj.firstName)
            setValue('lastName', userObj.lastName)
            setValue('nickName', userObj.nickName)
            setValue('email', userObj.email)
            setValue('userName', userObj.userName)
            setValue('role', userObj.role)
            setValue('accountStatus', userObj.accountStatus)
        }
    }, [userObj])

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 overflow-hidden mb-20 md:mb-10">
            <div className="flex items-center justify-center">
                <div className=" w-full flex items-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">آپدیت کاربر</h2>
                    <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{userId}</span>
                </div>
                <a href="/my-account/adminPanel/users" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست کاربرها</span>
                </a>
            </div>
            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit(updateUser)}>
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        {...register('firstName')}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام</span>
                    {errors?.firstName && (
                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.firstName?.message}</span>
                    )}
                </div>
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        {...register('lastName')}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام خانوادگی</span>
                    {errors?.lastName && (
                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.lastName?.message}</span>
                    )}
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        {...register('userName')}

                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام کاربری</span>
                    {errors?.userName && (
                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.userName?.message}</span>
                    )}
                </div>

                <div className="w-full relative flex items-center justify-center gap-1">
                    <select
                        name=""
                        id=""
                        className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        {...register('role')}
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نقش کاربر</span>
                </div>

                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        {...register('email')}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ایمیل</span>
                    {errors?.email && (
                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.email?.message}</span>
                    )}
                </div>

                <div className="md:col-start-1 md:col-end-3 bg-gray-100 dark:bg-primary rounded-lg py-4 px-5 flex flex-col gap-7">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">حساب کاربر</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={`${accountStatus == 'temporary-banned' ? '' : 'md:col-start-1 md:col-end-3'} relative flex items-center justify-center gap-1`}>
                            <select
                                name=""
                                id=""
                                className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('accountStatus')}
                            >
                                <option value="active">فعال</option>
                                <option value="temporary-banned">بن موقت</option>
                                <option value="permanent-banned">بن دایمی</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">وضعیت حساب کاربر</span>
                        </div>

                        {accountStatus == 'temporary-banned' && (
                            <div className="w-full relative flex items-center justify-center gap-1">
                                <select
                                    name=""
                                    id=""
                                    className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    {...register('banDuration')}
                                >
                                    <option value="30">1 ماه</option>
                                    <option value="90">3 ماه</option>
                                    <option value="180">6 ماه</option>
                                    <option value="365">12 ماه</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">مدت زمان بن</span>
                            </div>
                        )}

                        {(accountStatus == 'temporary-banned' || accountStatus == 'permanent-banned') && (
                            <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                <textarea
                                    className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    {...register('banReason')}
                                ></textarea>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">علت بن</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-start-1 md:col-end-3 bg-gray-100 dark:bg-primary rounded-lg py-4 px-5 flex flex-col gap-7">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">اشتراک</h2>
                    <div className="w-full flex flex-col items-center gap-5">
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-300 dark:border-secondary divide-y divide-gray-300 dark:divide-secondary rounded-md">
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj?.subscriptionStatus ? 'دارد' : 'ندارد'}</span>
                            </li>
                            {userObj?.subscriptionStatus && (
                                <>
                                    <li className="w-full py-1 flex items-center justify-between">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">نوع اشتراك فعال :</h3>
                                        <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">3 ماهه</span>
                                    </li>
                                    <li className="w-full py-1 flex items-center justify-between">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ فعال شدن اشتراك :</h3>
                                        <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">20/2/1404</span>
                                    </li>
                                    <li className="w-full py-1 flex items-center justify-between">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ منقضي شدن اشتراك :</h3>
                                        <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">20/5/1404</span>
                                    </li>
                                    <li className="w-full py-1 flex items-center justify-between">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">هزینه پرداخت شده :</h3>
                                        <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">200000 تومان</span>
                                    </li>
                                </>
                            )}
                        </ul>

                        <div className="w-full flex flex-col items-center">
                            <div className="flex items-center justify-center gap-1 md:gap-2">
                                {!userObj?.subscriptionStatus && (
                                    <button
                                        className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'activate-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                        onClick={changeVipTab}
                                        data-vipTab='activate-vipPlan'
                                    >فعالسازی اشتراک</button>
                                )}
                                <button
                                    className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'increase-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                    onClick={changeVipTab}
                                    data-vipTab='increase-vipPlan'
                                >افزایش اشتراک(کاستوم)</button>
                                <button
                                    className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'decrease-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                    onClick={changeVipTab}
                                    data-vipTab='decrease-vipPlan'
                                >کاهش اشتراک(کاستوم)</button>
                            </div>
                            <div className="w-full border border-gray-400 dark:border-secondary rounded-lg py-5 px-7 flex flex-col gap-5">
                                {vipTab !== 'activate-vipPlan' ? (
                                    <>
                                        {vipTab == 'increase-vipPlan' ? (
                                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg text-center md:text-justify">افزایش اشتراک</h2>
                                        ) : (
                                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg text-center md:text-justify">کاهش اشتراک</h2>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="md:col-start-1 md:col-end-3 relative select-none">
                                                <input
                                                    type="number"
                                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                    min={1}
                                                />
                                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">تعداد روز</span>
                                            </div>
                                            <button className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors text-white cursor-pointer font-vazir">محاسبه روز انقضا</button>
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-gray-700 dark:text-white font-vazir text-lg">فعال سازی اشتراک</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="md:col-start-1 md:col-end-3 relative select-none">
                                                <select
                                                    name=""
                                                    id=""
                                                    className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                    {...register('vipPlan')}
                                                >
                                                    <option value="0">اضافه كردن اشتراك</option>
                                                    <option value="30">1 ماه</option>
                                                    <option value="90">3 ماه</option>
                                                    <option value="180">6 ماه</option>
                                                    <option value="365">12 ماه</option>
                                                </select>
                                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">نوع اشتراک</span>
                                            </div>
                                            <button
                                                className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors text-white cursor-pointer font-vazir"
                                                onClick={e => calcExpiresDate()}
                                            >محاسبه روز انقضا</button>
                                            {vipPlanExpiresDate && (
                                                <span className="text-sky-500 font-vazir"> تاریخ انقضای اشتراک : {vipPlanExpiresDate}</span>
                                            )}
                                        </div>
                                    </>
                                )}

                                <button
                                    className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors text-white font-vazir cursor-pointer"
                                    onClick={() => resetVipPlan()}
                                >ري ست كردن</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="md:col-start-1 md:col-end-3 w-full bg-green-600 hover:bg-green-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">آپدیت کاربر</button>
            </form>
        </div >
    )
}