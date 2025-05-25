import React, { useState, useEffect } from 'react'

import { MdEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

import DeleteModal from '../../Components/DeleteModal/DeleteModal';

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'userId': { hasValue: false, property: 'userId' },
    'title': { hasValue: false, property: 'title' },
    'success': { hasValue: true, property: 'type', value: 'success' },
    'danger': { hasValue: true, property: 'type', value: 'danger' },
    'warning': { hasValue: true, property: 'type', value: 'warning' },
    'info': { hasValue: true, property: 'type', value: 'info' },
    'system': { hasValue: true, property: 'type', value: 'system' }
}

let apiData = {
    deleteApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications?id=eq.',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications?select=*',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function AdminAllNotifs() {
    const [notifications, setNotifications] = useState([])
    const [filteredNotifications, setFilteredNotifications] = useState([])
    const [getNotifications, setGetNotifications] = useState(false)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(false)
    const [notifObj, setNotifObj] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')

    const DeleteNotifHandler = async () => {
        try {
            const res = await fetch(`${apiData.deleteApi}${notifObj.id}`, {
                method: 'DELETE',
                headers: {
                    'apikey': apiData.apikey,
                    'Authorization': apiData.authorization
                }
            })

            if (res.ok) {
                setShowDeleteModal(false)
                setGetNotifications(prev => !prev)
            }

        } catch (err) {
            console.log('fetch error')
        }
    }

    useEffect(() => {
        const getAllNotifications = async () => {
            try {
                const res = await fetch(apiData.getApi, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json();

                if (data) {
                    let sortedNotificationsArray = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return aDate - bDate
                    })
                    setNotifications(sortedNotificationsArray)
                    setFilteredNotifications(sortedNotificationsArray)
                    console.log(sortedNotificationsArray)
                    setIsPending(false)
                    setError(false)
                }

            } catch (err) {
                console.log('fetch error', err)
                isPending(false)
                setError(err)
            }
        }

        setIsPending(true)
        getAllNotifications()
    }, [getNotifications])

    useEffect(() => {
        let filterObj = filterSearchObj[searchType]
        let filteredNotificationsArray = []

        // when we search something or we change the searchType we should filter the notifications Array again  
        if (filterObj) {
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredNotificationsArray = notifications.filter(notif => notif[filterObj.property] == filterObj.value)
            } else {
                if (searchValue) {
                    if (filterObj.property == 'id' || filterObj.property == 'userId') {
                        filteredNotificationsArray = notifications.filter(notif => notif[filterObj.property] == searchValue)
                    } else if (typeof filterObj.property == 'string') {
                        console.log('name')
                        filteredNotificationsArray = notifications.filter(notif => notif[filterObj.property].toLowerCase().startsWith(searchValue))
                    }
                } else {
                    filteredNotificationsArray = [...notifications]
                }
            }
        }

        setFilteredNotifications(filteredNotificationsArray)
    }, [searchValue, searchType])


    return (
        <>
            <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-12">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">اعلان ها</h2>
                    <a href="/my-account/adminPanel/notifications/add-notification" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors">افزودن اعلان جدید</a>
                </div>
                <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                                <option value="ID">ID</option>
                                <option value="userId">ID کاربر</option>
                                <option value="title">عنوان</option>
                                <option value="success">success</option>
                                <option value="danger">danger</option>
                                <option value="warning">warning</option>
                                <option value="info">info</option>
                                <option value="system">system</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                        </div>

                        {searchType !== 'success' && searchType !== 'warning' && searchType !== 'warning' && searchType !== 'info' && searchType !== 'system' && (
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
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ID کاربر</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">type</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">متن</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isPending && filteredNotifications.map(notification => (
                                    <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{notification.id}</td>
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{notification.userId || 'تعیین نشده'}</td>
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 font-vazir">{notification.title}</td>
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{notification.type}</td>
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 font-vazir min-w-36 max-w-36">{notification.text}</td>
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                            <a
                                                href={`/my-account/adminPanel/notifications/edit-notification/${notification.id}`}
                                                className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                            >
                                                <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                            </a>

                                            <button
                                                className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group"
                                                onClick={e => {
                                                    setNotifObj(notification)
                                                    setShowDeleteModal(true)
                                                }}
                                            >
                                                <LuTrash2 className="text-red-500 group-hover:text-white transition-all" />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!isPending && filteredNotifications.length == 0 && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">اعلانی با همچین مشخصاتی پیدا نشد</h2>
                        )}

                        {isPending && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                        )}

                        {error && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                        )}

                    </div>
                </div>
            </div>

            <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} deleteHandler={DeleteNotifHandler} name={notifObj?.title} tableName="اعلان" />
        </>
    )
}
