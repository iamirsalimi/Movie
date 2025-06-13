import React, { useState, useEffect, useContext } from 'react'

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import UserContext from '../../Contexts/UserContext';
import LoadingContext from '../../Contexts/LoadingContext';

dayjs.extend(jalali)

import { getUserById, updateUser as updateUserDetails } from '../../Services/Axios/Requests/Users';

import { MdKeyboardArrowRight } from "react-icons/md";

let userNameRegex = /^[0-9A-Za-z_.]+$/
let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@_.])(?!.* ).{8,16}$/

export default function EditUser() {
    const [vipTab, setVipTab] = useState('increase-vipPlan')

    const [userObj, setUserObj] = useState(null)
    const [vipPlanExpiresDate, setVipPlanExpiresDate] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)
    const [decreaseMax, setDecreaseMax] = useState(1)

    const { userId } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    // admin infos
    const { userObj: mainUserObj } = useContext(UserContext)

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
        customIncreaseVipPlan: yup.number().typeError('مقدار کاهش اشتراک باید عدد باشد').min(0, 'مقدار اشتراک باید بزرگتر از 0 باشد').max(365, "مقدار افزایش اشتراک نمی تواند از 365 بیشتر باشد").notRequired(),
        customDecreaseVipPlan: yup.number().typeError('مقدار کاهش اشتراک باید عدد باشد').min(0, 'مقدار اشتراک باید بزرگتر از 0 باشد').max(decreaseMax, `مقدار کاهش اشتراک نمی تواند از ${decreaseMax} بیشتر باشد `).notRequired()

    })

    let {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            vipPlan: 0,
            customIncreaseVipPlan: 0,
            customDecreaseVipPlan: 0,
        },
        resolver: yupResolver(schema)
    })

    let accountStatus = watch('accountStatus')

    const changeVipTab = e => {
        e.preventDefault()
        setVipTab(e.target.dataset.viptab)
        setVipPlanExpiresDate(null)
        setValue('vipPlan', 0)
        setValue('customIncreaseVipPlan', 0)
        setValue('customDecreaseVipPlan', 0)
    }

    // this method first accord what we send to it realizes what should add new vipPlan or not (newUserObj is the newObject of user , data is all inputs values , day is the amount of days we should add , increase or decrease , minus flag is to understand when we should decrease days) , and after that it'll give us a newUserObject that vipPLan has changed in it  
    const getVipPlanChanging = (newUserObj, data, day, minusFlag) => {
        newUserObj.subscriptionStatus = 'active'

        let newExpirationDate = getExpirationDate(day, minusFlag)

        newUserObj.subscriptionExpiresAt = newExpirationDate

        // it means user has already had a vipPlan so either we can increase it or decrease it  
        if (Object.keys(newUserObj.subscriptionPlan).length > 0) {
            newUserObj.subscriptionPlan.expiration = newExpirationDate

            newUserObj.all_subscription_plans[newUserObj.all_subscription_plans.length - 1].expiration = newExpirationDate

            // adding admin details to check who changed user vip plan details 
            newUserObj.all_subscription_plans[newUserObj.all_subscription_plans.length - 1].changedBy.push({ userName: mainUserObj.userName, date: new Date() })
        } else {
            let newPlanObj = { id: Math.floor(Math.random() * 99999), duration: data.vipPlan, activateDate: new Date(), expiration: newExpirationDate, isBought: { value: false, price: 0 }, changedBy: [{ userName: mainUserObj.userName, date: new Date() }] }
            newUserObj.subscriptionPlan = newPlanObj
            newUserObj.all_subscription_plans = [...newUserObj?.all_subscription_plans, newPlanObj]
        }

        return newUserObj
    }

    const updateUserHandler = async newUserObj => {
        await updateUserDetails(userObj.id, newUserObj)
            .then(res => {
                location.reload()
            })
            .catch(err => {
                console.log('مشکلی در ثبت نام پیش آمده')
                setIsUpdating(false)
            })
    }

    const updateUser = async data => {
        console.log(data)
        setIsUpdating(true)

        let newUserObj = { ...userObj }

        newUserObj.firstName = data.firstName
        newUserObj.lastName = data.lastName
        newUserObj.nickName = data.nickName
        newUserObj.email = data.email
        newUserObj.userName = data.userName
        newUserObj.role = data.role
        newUserObj.accountStatus = data.accountStatus

        let planChangedUserObj = { ...newUserObj }

        if (data.vipPlan != 0 && Object.keys(userObj.subscriptionPlan).length == 0) {
            planChangedUserObj = getVipPlanChanging(newUserObj, data, data.vipPlan, false)
        }

        if (data.customIncreaseVipPlan != 0) {
            planChangedUserObj = getVipPlanChanging(newUserObj, data, data.customIncreaseVipPlan, false)
        }

        if (data.customDecreaseVipPlan != 0) {
            planChangedUserObj = getVipPlanChanging(newUserObj, data, data.customDecreaseVipPlan, true)
        }

        newUserObj = { ...planChangedUserObj }

        if (data.accountStatus.includes('banned')) {
            newUserObj.accountStatus = data.accountStatus
            newUserObj.isBanned = true
            newUserObj.banReason = data.banReason

            if (data.accountStatus == 'temporary-banned') {
                newUserObj.banDuration = data.banDuration
                newUserObj.ban_expiration_date = getExpirationDate(data.banDuration)
            } else {
                newUserObj.banDuration = -1 // means ban in permanent
            }
        } else {
            newUserObj.accountStatus = 'active'
            newUserObj.isBanned = false
            newUserObj.banReason = ''
            newUserObj.banDuration = null
            newUserObj.ban_expiration_date = null
        }

        // console.log(newUserObj)
        await updateUserHandler(newUserObj)
    }

    // for some users we need to decrease their vip plan so we should know when we have to do plus and when we have to do minus
    const getExpirationDate = (daysToAdd, minusFlag = false) => {
        // maybe user has an vip plan already and we want to add couple of days to they vip Plan so we should make sure user doesn't have an vip Plan 
        let date = minusFlag ? new Date(userObj.subscriptionPlan?.expiration) : Object.keys(userObj?.subscriptionPlan).length > 0 ? new Date(userObj?.subscriptionPlan.expiration) : new Date()

        if (+daysToAdd > 0) {
            // when minus flag is true it means we should decrease days
            if (minusFlag) {
                // console.log('minus')
                date.setTime(date.getTime() - (+daysToAdd * 24 * 60 * 60 * 1000))
            } else {
                // console.log('plus')
                date.setTime(date.getTime() + (+daysToAdd * 24 * 60 * 60 * 1000))
            }
        }

        // console.log(date)
        return date
    }

    const calcExpiresDate = (days, minusFlag = false) => {
        let expiresDate = getExpirationDate(days, minusFlag).toLocaleDateString('fa-IR')

        setVipPlanExpiresDate(expiresDate)
    }

    const resetVipPlan = () => {
        setValue('vipPlan', 0)
        setVipPlanExpiresDate(null)
    }

    const getJalaliDate = date => {
        let newDate = new Date(date)

        return dayjs(newDate).calendar("jalali").locale("fa").format("YYYY/MM/DD")
    }

    const getMaxDecreaseVipPlanLimit = () => {
        let expireDate = new Date(userObj.subscriptionPlan?.expiration)
        let now = new Date()

        const diffInMs = expireDate.getTime() - now.getTime() // difference days between now and expiration Date in ms
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) // difference days between now and expiration Date in days

        return diffInDays > 1 ? diffInDays - 1 : diffInDays
    }

    useEffect(() => {
        const getUserInfo = async userId => {
            try {
                const data = await getUserById(userId)

                if (data.length > 0) {
                    setUserObj(data[0])
                    setIsPending(false)
                    setError(false)
                } else {
                    window.location.href = '/my-account/adminPanel/users'
                }

            } catch (err) {
                setIsPending(false)
                setUserObj(null)
                setError(err)
            }
        }

        // if it equals to the main admin Id we can't change his details
        if (userId == 2) {
            location.href = '/'
        }

        getUserInfo(userId)
    }, [])

    useEffect(() => {
        if (userObj && userObj?.subscriptionStatus) {
            setDecreaseMax(getMaxDecreaseVipPlanLimit())
        }
    }, [userObj])

    useEffect(() => {
        if (userObj) {
            setValue('firstName', userObj.firstName)
            setValue('lastName', userObj.lastName)
            setValue('nickName', userObj.nickName)
            setValue('email', userObj.email)
            setValue('userName', userObj.userName)
            setValue('role', userObj.role)
            setValue('accountStatus', userObj.accountStatus)
            if (loading) {
                setLoading(false)
            }
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
            {isPending && (
                <h2 className="text-red-500 text-center font-vazir">در حال دریافت اطلاعات کاربر ...</h2>
            )}

            {error && (
                <h2 className="text-red-500 text-center font-vazir">{error.message}</h2>
            )}

            {(!isPending && userObj) && (
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
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-300 dark:border-secondary divide-y divide-gray-300 dark:divide-secondary rounded-md">
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">وضعیت حساب کاربر :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj?.accountStatus == 'active' ? 'فعال' : userObj?.accountStatus == 'temporary-banned' ? 'بن موقت' : 'بن دایمی'}</span>
                            </li>
                            {userObj?.accountStatus != 'active' && (
                                <>
                                    {userObj?.accountStatus == 'temporary-banned' && (
                                        <li className="w-full py-1 flex items-center justify-between">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">مدت زمان بن :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.banDuration}</span>
                                        </li>
                                    )}

                                    <li className="w-full py-1 flex items-center justify-between">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ منقضي شدن بن :</h3>
                                        <p className="text-vazir-light text-primary dark:text-white font-vazir text-sm md:text-base">{userObj?.accountStatus === 'temporary-banned'
                                            ? getJalaliDate(userObj?.ban_expiration_date) : 'هیچوقت'}</p>
                                    </li>
                                    <li className="w-full py-1 flex flex-col justify-center gap-1">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">علت بن :</h3>
                                        <p className="text-vazir-light text-primary dark:text-white font-vazir text-justify text-sm md:text-base">{userObj?.banReason}</p>
                                    </li>
                                </>
                            )}
                        </ul>
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
                                    {errors.banReason && (
                                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.banReason?.message}</span>
                                    )}
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
                                {userObj?.subscriptionStatus == 'active' && (
                                    <>
                                        <li className="w-full py-1 flex items-center justify-between">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">نوع اشتراك فعال :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.subscriptionPlan.duration}</span>
                                        </li>
                                        <li className="w-full py-1 flex items-center justify-between">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ فعال شدن اشتراك :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{getJalaliDate(userObj.subscriptionPlan.activateDate)}</span>
                                        </li>
                                        <li className="w-full py-1 flex items-center justify-between">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ منقضي شدن اشتراك :</h3>
                                            <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{getJalaliDate(userObj.subscriptionPlan.expiration)}</span>
                                        </li>
                                        <li className="w-full py-1 flex items-center justify-between">
                                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">اشتراک خریداری شده؟</h3>
                                            <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.subscriptionPlan.isBought.value ? 'بله' : 'خیر'}</span>
                                        </li>
                                        {userObj.subscriptionPlan.isBought.value && (
                                            <li className="w-full py-1 flex items-center justify-between">
                                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">هزینه پرداخت شده :</h3>
                                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.subscriptionPlan.isBought.price} تومان</span>
                                            </li>
                                        )}
                                    </>
                                )}
                            </ul>

                            <div className="w-full flex flex-col items-center">
                                <div className="flex items-center justify-center gap-1 md:gap-2">
                                    {!userObj?.subscriptionStatus && (
                                        <button
                                            className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'activate-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                            onClick={changeVipTab}
                                            data-viptab='activate-vipPlan'
                                        >فعالسازی اشتراک</button>
                                    )}
                                    <button
                                        className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'increase-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                        onClick={changeVipTab}
                                        data-viptab='increase-vipPlan'
                                    >افزایش اشتراک(کاستوم)</button>
                                    {userObj?.subscriptionStatus && (
                                        <button
                                            className={`cursor-pointer font-shabnam px-2 py-1 rounded-t-md text-xs sm:text-sm ${vipTab == 'decrease-vipPlan' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-gray-400 hover:bg-black/20 dark:bg-secondary text-white'} transition-colors`}
                                            onClick={changeVipTab}
                                            data-viptab='decrease-vipPlan'
                                        >کاهش اشتراک(کاستوم)</button>
                                    )}
                                </div>
                                <div className="w-full border border-gray-400 dark:border-secondary rounded-lg py-5 px-7 flex flex-col gap-5">
                                    {vipTab !== 'activate-vipPlan' ? vipTab == 'increase-vipPlan' ? (
                                        <>
                                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg text-center md:text-justify">افزایش اشتراک</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                <div className="md:col-start-1 md:col-end-3 relative select-none">
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                        {...register('customIncreaseVipPlan')}
                                                    />
                                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">تعداد روز</span>
                                                    {errors?.customIncreaseVipPlan && (
                                                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.customIncreaseVipPlan?.message}</span>
                                                    )}
                                                </div>
                                                <button
                                                    className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors text-white cursor-pointer font-vazir"
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        calcExpiresDate(watch('customIncreaseVipPlan'))
                                                    }}
                                                >محاسبه روز انقضا</button>
                                            </div>
                                            {vipPlanExpiresDate && (
                                                <span className="text-sky-500 font-vazir"> تاریخ انقضای اشتراک : {vipPlanExpiresDate}</span>
                                            )}
                                            <button
                                                className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors text-white font-vazir cursor-pointer"
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setValue('customIncreaseVipPlan', 0, { shouldValidate: true })
                                                }}
                                            >ري ست كردن</button>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-gray-700 dark:text-white font-vazir text-lg text-center md:text-justify">کاهش اشتراک</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                <div className="md:col-start-1 md:col-end-3 relative select-none">
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                        {...register('customDecreaseVipPlan')}
                                                    />
                                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">تعداد روز</span>
                                                    {errors?.customDecreaseVipPlan && (
                                                        <span className="text-red-500 text-sm mt-2 font-vazir">{errors.customDecreaseVipPlan?.message}</span>
                                                    )}
                                                </div>
                                                <button
                                                    className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-colors text-white cursor-pointer font-vazir"
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        calcExpiresDate(watch('customDecreaseVipPlan'), true)
                                                    }}
                                                >محاسبه روز انقضا</button>
                                            </div>
                                            {vipPlanExpiresDate && (
                                                <span className="text-sky-500 font-vazir"> تاریخ انقضای اشتراک : {vipPlanExpiresDate}</span>
                                            )}
                                            <button
                                                className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors text-white font-vazir cursor-pointer"
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setValue('customDecreaseVipPlan', 0, { shouldValidate: true })
                                                }}
                                            >ري ست كردن</button>
                                        </>
                                    )
                                        : (
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
                                                        onClick={e => {
                                                            e.preventDefault()
                                                            calcExpiresDate(watch('vipPlan'))
                                                        }}
                                                    >محاسبه روز انقضا</button>
                                                    {vipPlanExpiresDate && (
                                                        <span className="text-sky-500 font-vazir"> تاریخ انقضای اشتراک : {vipPlanExpiresDate}</span>
                                                    )}
                                                </div>
                                                <button
                                                    className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors text-white font-vazir cursor-pointer"
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        resetVipPlan()
                                                    }}
                                                >ري ست كردن</button>
                                            </>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="md:col-start-1 md:col-end-3 w-full bg-green-600 hover:bg-green-500 disabled:bg-green-400 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'در حال آپدیت اطلاعات کاربر ...' : 'آپدیت کاربر'}
                    </button>
                </form>
            )}
        </div >
    )
}