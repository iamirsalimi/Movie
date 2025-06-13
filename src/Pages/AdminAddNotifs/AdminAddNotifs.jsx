import React, { useEffect, useState, useContext } from 'react'

import { useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { MdKeyboardArrowRight } from "react-icons/md"

import LoadingContext from '../../Contexts/LoadingContext'

import { addNotification as addNewNotification, updateNotification as updateNotif , getNotificationById } from '../../Services/Axios/Requests/Notifications'

export default function AdminAddNotifs() {
    const [notifObj, setNotifObj] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isAdding, setIsAdding] = useState(false)

    const schema = yup.object().shape({
        title: yup.string().required('وارد كردن عنوان اعلان است'),
        text: yup.string().required('وارد كردن متن اعلان است'),
        userId: yup.string().notRequired(),
        link: yup.string().notRequired(),
        type: yup
            .string().oneOf(['success', 'danger', 'warning', 'info', 'system'])
    })

    let {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            userId: '',
            link: '',
            type: 'info',
        },
        resolver: yupResolver(schema)
    })

    let { notifId } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    // update movie
    const updateNotificationHandler = async newNotificationObj => {
        await updateNotif(notifObj.id, newNotificationObj)
            .then(res => {
                console.log(res)
                setIsAdding(false)
                location.href = "/my-account/adminPanel/notifications/"
            })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در آپدیت هنرپیشه پیش آمده')
            })
    }

    const updateNotification = async data => {
        let newNotificationObj = { ...data }

        if (data.title != notifObj?.title || data.link != notifObj?.link || data.text != notifObj?.text || data.type != notifObj?.type || data.userId != notifObj?.userId) {
            setIsAdding(true)
            newNotificationObj.title = data.title
            newNotificationObj.text = data.text
            newNotificationObj.link = data.link
            newNotificationObj.text = data.text
            newNotificationObj.type = data.type
            newNotificationObj.updated_at = new Date()

            await updateNotificationHandler(newNotificationObj)
        }

    }

    // add new notification
    const addNotificationHandler = async newNotificationObj => {
        await addNewNotification(newNotificationObj)
            .then(res => {
                console.log(res)
                setIsAdding(false)
                location.href = "/my-account/adminPanel/notifications"
            })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const addNotification = async data => {
        setIsAdding(true)

        let newNotificationObj = { ...data }

        newNotificationObj.created_at = new Date()
        newNotificationObj.updated_at = new Date()

        // console.log(newNotificationObj)
        await addNotificationHandler(newNotificationObj)
    }

    useEffect(() => {
        const getMovieInfo = async notifId => {
            try {
                const data = await getNotificationById(notifId)

                if (data.length > 0) {
                    setNotifObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/notifications'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setNotifObj(null)
            }
        }

        if (notifId) {
            setIsPending(true)
            getMovieInfo(notifId)
        }
    }, [])

    useEffect(() => {
        if (notifObj) {
            setValue('title', notifObj.title)
            setValue('text', notifObj.text)
            setValue('userId', notifObj.userId)
            setValue('link', notifObj.link)
            setValue('type', notifObj.type)
            if (loading) {
                setLoading(false)
            }
        }
    }, [notifObj])

    useEffect(() => {
        if (!notifId) {
            setLoading(false)
        }
    }, [])

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20">
            <div className="flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">{notifId ? 'آپدیت' : 'ایجاد'} اعلان</h2>
                <a href="/my-account/adminPanel/notifications" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست اعلان ها</span>
                </a>
            </div>

            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات اعلان ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
            )}

            {!isPending && (
                <>
                    <ul className="w-full border border-gray-200 dark:border-primary rounded-lg flex flex-col items-center gap-2 py-5 px-4">
                        <li className="text-center font-vazir text-red-500 text-sm md:text-base">مقدار ID کاربر تنها در صورتی ضروری است که بخواهیم اعلان به کاربر خاصی ارسال شود</li>
                        <li className="text-center font-vazir text-red-500 text-sm md:text-base">در صورت ارسال نکردن مقدار ID کاربر اعلان برای تمامی کاربر ها ارسال می شود</li>
                        <li className="text-center font-vazir text-red-500 text-sm md:text-base">وارد کردن لینک اختیاری است</li>
                    </ul>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={notifId ? handleSubmit(updateNotification) : handleSubmit(addNotification)}>
                        <div className="w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('title')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان</span>
                            {errors?.title && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.title?.message}</span>
                            )}
                        </div>
                        <div className="w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('userId')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ID کاربر</span>
                            {errors?.userId && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.userId?.message}</span>
                            )}
                        </div>
                        <div className="w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('link')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">لینک</span>
                            {errors?.link && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.link?.message}</span>
                            )}
                        </div>
                        <div className="w-full relative select-none">
                            <select
                                name=""
                                id=""
                                className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('type')}
                            >
                                <option value="success">success</option>
                                <option value="danger">danger</option>
                                <option value="warning">warning</option>
                                <option value="info">info</option>
                                <option value="system">system</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع اعلان</span>
                            {errors?.type && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.type?.message}</span>
                            )}
                        </div>
                        <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                            <textarea
                                className="w-full rounded-md p-3 min-h-36 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('text')}
                            ></textarea>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
                            {errors?.text && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.text?.message}</span>
                            )}
                        </div>

                        <button
                            className="md:col-start-1 md:col-end-3 py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-all inline-flex items-center justify-center gap-1 text-white font-shabnam text-lg"
                            disabled={isAdding}
                        >
                            {isAdding ? `در حال ${notifId ? 'آپدیت' : 'ایجاد'} اعلان ...` : `${notifId ? 'آپدیت' : 'ایجاد'} اعلان`}

                        </button>
                    </form>
                </>
            )}

        </div>
    )
}
