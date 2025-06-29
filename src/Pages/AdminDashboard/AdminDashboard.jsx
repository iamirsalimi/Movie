import React, { useEffect, useState, useContext } from 'react'

import toast from 'react-hot-toast'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { getAnnouncements as getAllAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from './../../Services/Axios/Requests/Announcements';
import { getUsers } from './../../Services/Axios/Requests/Users'
import { getRequests as getAllRequests } from './../../Services/Axios/Requests/Requests';
import { getTickets as getAllTickets } from './../../Services/Axios/Requests/Tickets';

import UserActivityInfo from './../../Components/UserActivityInfo/UserActivityInfo'
import AnnouncementElem from './../../Components/AnnouncementElem/AnnouncementElem';
import AnnounceMentModal from './../../Components/AnnounceMentModal/AnnounceMentModal'
import DeleteModal from './../../Components/DeleteModal/DeleteModal';
import UserContext from './../../Contexts/UserContext';
import LoadingContext from './../../Contexts/LoadingContext';
dayjs.extend(jalali)

import { IoIosAddCircleOutline } from "react-icons/io";
import { PiUserFocusFill } from "react-icons/pi";
import { TbTicket } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import Tooltip from '../../Components/Tooltip/Tooltip';


export default function AdminDashboard() {
    const [announcements, setAnnouncements] = useState(null)
    const [announcementsIsPending, setAnnouncementsIsPending] = useState(false)
    const [announcementError, setAnnouncementError] = useState(false)
    const [announcementFlag, setAnnouncementFlag] = useState(false)
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
    const [updateFlag, setUpdateFlag] = useState(false)
    const [getAnnouncements, setGetAnnouncements] = useState(false)
    const [announcementObj, setAnnouncementObj] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [tickets, setTickets] = useState(null)
    const [ticketsIsPending, setTicketsIsPending] = useState(false)
    const [ticketsError, setTicketsError] = useState(false)
    const [ticketsFlag, setTicketsFlag] = useState(false)
    const [requests, setRequests] = useState(null)
    const [requestsIsPending, setRequestsIsPending] = useState(false)
    const [requestsError, setRequestsError] = useState(false)
    const [requestsFlag, setRequestsFlag] = useState(false)
    const [users, setUsers] = useState(null)

    const [ipObj, setIpObj] = useState(null)

    const { userObj } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const deleteAnnouncementHandler = async () => {
        try {
            const res = await deleteAnnouncement(announcementObj.id)

            toast.success('اطلاعیه با موفقیت حذف شد')
            setShowDeleteModal(false)
            setGetAnnouncements(prev => !prev)

        } catch (err) {
            toast.error('مشکلی در حذف اطلاعیه به وجود آمده')
            console.log(err)
        }
    }

    const addAnnouncementHandler = async announcementObj => {
        await addAnnouncement(announcementObj)
            .then(res => {
                setIsAdding(false)
                toast.success('اطلاعیه شما با موفقیت اضافه شد')
                setShowAnnouncementModal(false)
                setGetAnnouncements(prev => !prev)
            })
            .catch(err => {
                setIsAdding(false)
                toast.error('مشکلی در افزودن اطلاعیه پیش آمده')
            })
        setShowAnnouncementModal(false)
    }

    const updateAnnouncementHandler = async (id, newAnnouncementObj) => {
        await updateAnnouncement(id, newAnnouncementObj).then(res => {
            setShowAnnouncementModal(false)
            setIsAdding(false)
            setUpdateFlag(false)
            setGetAnnouncements(prev => !prev)
            toast.success('اشتراک جدید با موفقیت خریداری شد')
        })
            .catch(err => {
                toast.error('مشکلی در خرید اشتراک پیش آمده')
                setIsAdding(false)
                setShowAnnouncementModal(false)
                setUpdateFlag(false)
            })
    }

    // getting all announcements
    useEffect(() => {
        const getAnnouncements = async () => {
            try {
                const data = await getAllAnnouncements()

                if (data.length > 0) {
                    setAnnouncements(data)
                }

                setAnnouncementsIsPending(null)
                setAnnouncementError(false)
            } catch (err) {
                console.log('fetch error')
                setAnnouncementError(err)
                setAnnouncementsIsPending(false)
                setAnnouncements(null)
                setAnnouncementFlag(false)
            }
        }
        if (userObj) {
            setAnnouncementsIsPending(true)
            setAnnouncementFlag(true)
            getAnnouncements()
        }
    }, [getAnnouncements, userObj])

    // getting all tickets
    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await getAllTickets()

                if (data.length > 0) {
                    setTickets(data)
                }

                setTicketsIsPending(null)
                setTicketsError(false)
            } catch (err) {
                console.log('fetch error')
                setTicketsError(err)
                setTicketsIsPending(false)
                setTicketsFlag(false)
                setTickets(null)
            }
        }

        // when the announcementsIsPending is null it means announcements has fetched 
        if (announcementsIsPending == null && !ticketsFlag) {
            setTicketsIsPending(true)
            setTicketsFlag(true)
            getTickets()
        }
    }, [announcementsIsPending])

    // getting all requests
    useEffect(() => {
        const getRequests = async () => {
            try {
                const data = await getAllRequests()

                if (data.length > 0) {
                    setRequests(data.sort((a, b) => {
                        let aDate = new Date(a.updated_at).getTime()
                        let bDate = new Date(b.updated_at).getTime()
                        return bDate - aDate
                    }).slice(0, 5))
                }

                setRequestsIsPending(null)
                setRequestsError(false)
            } catch (err) {
                console.log('fetch error')
                setRequestsError(err)
                console.log(err)
                setRequestsIsPending(false)
                setRequestsFlag(false)
                setRequests(null)
            }
        }

        // when the ticketsIsPending is null it means tickets has fetched 
        if (ticketsIsPending == null && !requestsFlag) {
            setRequestsIsPending(true)
            setRequestsFlag(true)
            getRequests()
        }
    }, [ticketsIsPending])

    // getting all Users
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const data = await getUsers()

                if (data.length > 0) {
                    setUsers(data)
                }
            } catch (err) {
                console.log('fetch error', err)
            }
        }

        // when the requestsIsPending is null it means requests has fetched 
        if (requestsIsPending == null) {
            getAllUsers()
        }
    }, [requestsIsPending])

    useEffect(() => {
        if (requestsIsPending == null) {
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setIpObj(data)
                })
                .catch(err => console.error(err));

        }
    }, [requestsIsPending])

    useEffect(() => {
        if (announcementsIsPending == null && ticketsIsPending == null && requestsIsPending == null && loading) {
            setLoading(false)
        }
    }, [announcementsIsPending, ticketsIsPending, requestsIsPending])

    const getDate = date => {
        let registerDate = new Date(date)
        let persianDate = dayjs(registerDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        // console.log(persianDate, registerDate)
        return persianDate
    }

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <UserActivityInfo color='from-orange-400 to-orange-600' title="تیکت ها" value={tickets?.length || 0}>
                    <TbTicket className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>

                <UserActivityInfo color='from-purple-600 to-purple-800' title="مطالب درخواستی" value={requests?.length || 0}>
                    <IoIosAddCircleOutline className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>

                <UserActivityInfo color='from-sky-400 to-sky-700' title="عضویت" value={getDate(userObj?.created_At)}>
                    <PiUserFocusFill className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>

                <UserActivityInfo color='from-green-400 to-green-600' title="كاربر ها" value={users?.length || 0}>
                    <FaUsers className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>
            </div>

            <div className="flex flex-col justify-center gap-2 panel-box py-5 px-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-vazir text-gray-800 dark:text-white">اطلاعیه ها</h2>
                    <button
                        className="font-sm font-vazir bg-yellow-400 hover:bg-yellow-500 text-white dark:text-primary transition-colors rounded-md px-2 py-1 cursor-pointer"
                        onClick={e => {
                            setUpdateFlag(false)
                            setShowAnnouncementModal(true)
                        }}
                    >افزودن اطلاعیه جدید</button>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                    {!announcementsIsPending && (
                        <>
                            {announcements?.length > 0 ? announcements?.map(announcement => (
                                <AnnouncementElem key={announcement.id} {...announcement} getDate={getDate} announcementObj={announcement} setShowAnnouncementModal={setShowAnnouncementModal} setUpdateFlag={setUpdateFlag} setAnnouncementObj={setAnnouncementObj} setShowDeleteModal={setShowDeleteModal} adminFlag />
                            )) : (
                                // it means we just wanna show base announcement elem which only says there is no announcements 
                                <AnnouncementElem base />
                            )}
                        </>
                    )}

                    {announcementsIsPending && (
                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعیه ها ... </h2>
                    )}

                    {announcementError && (
                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                    )}
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-5 mb-20 lg:mb-12">
                {/* tables */}
                <div className="w-full lg:w-3/4 flex flex-col items-center gap-5">
                    <div className="py-3 px-4 flex flex-col gap-4 panel-box">
                        <div className="inline-flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <span className="inline-block w-3 h-3 bg-sky-500 rounded-full"></span>
                                <span className="inline-block w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                            </div>
                            <h2 className="font-vazir text-gray-800 dark:text-white text-lg">تیکت ها</h2>
                        </div>

                        <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-x-scroll lg:overflow-x-hidden">
                            <table className="w-full">
                                <thead className="min-w-full">
                                    <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">#</th>
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">عنوان تیکت</th>
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">دپارتمان</th>
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">بروزرسانی</th>
                                    </tr>
                                </thead>
                                <tbody className="min-w-full">
                                    {!ticketsIsPending && tickets?.sort((a, b) => {
                                        let aDate = new Date(a.created_at)
                                        let bDate = new Date(b.created_at)
                                        return bDate - aDate
                                    }).slice(0 , 5).map(ticket => (
                                        <tr key={ticket.id} className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket.id}</td>
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket.userName}</td>
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket.subject}</td>
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket.status == 'pending' ? 'در حال بررسی ' : ticket.status == 'answered' ? 'جواب داده شده' : 'بسته شده'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {ticketsIsPending == null && tickets == null && (
                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا كنون تیکتی توسط کاربران ثبت نشده</h2>
                            )}

                            {ticketsIsPending && (
                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت تیکت ها ... </h2>
                            )}

                            {ticketsError && (
                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                            )}
                        </div>
                    </div>

                    <div className="py-3 px-4 flex flex-col gap-4 panel-box">
                        <div className="inline-flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <span className="inline-block w-3 h-3 bg-sky-500 rounded-full"></span>
                                <span className="inline-block w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                            </div>
                            <h2 className="font-vazir text-gray-800 dark:text-white text-lg">درخواست ها</h2>
                        </div>

                        <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-x-scroll lg:overflow-x-hidden">
                            <table className="w-full">
                                <thead className="min-w-full">
                                    <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">#</th>
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">عنوان</th>
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">تاریخ ثبت</th>
                                        <th className="text-nowrap py-1 pb-3 px-2 text-light-gray dark:text-gray-400">وضعیت</th>
                                    </tr>
                                </thead>
                                <tbody className="min-w-full">
                                    {!requestsIsPending && requests?.sort((a, b) => {
                                        let aDate = new Date(a.created_at)
                                        let bDate = new Date(b.created_at)
                                        return bDate - aDate
                                    }).slice(0 , 5).map(request => (
                                        <tr key={request.id} className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.id}</td>
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.title}</td>
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{getDate(request.created_at)}</td>
                                            <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.status == 'pending' ? 'در حال بررسی ' : request.status == 'approved' ? 'قبول شده' : 'رد شده'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {requestsIsPending == null && requests == null && (
                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا كنون درخواستي توسط کاربران ثبت نشده</h2>
                            )}

                            {requestsIsPending && (
                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت تیکت ها ... </h2>
                            )}

                            {requestsError && (
                                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/4 flex flex-col gap-5">

                    <div className="p-4 flex flex-col gap-4 panel-box">
                        <div className="inline-flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <span className="inline-block w-3 h-3 bg-sky-500 rounded-full"></span>
                                <span className="inline-block w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                            </div>
                            <h2 className="font-vazir text-gray-800 dark:text-white text-lg">جزييات حساب</h2>
                        </div>

                        <ul className="w-full flex flex-col gap-2">
                            <li className="flex items-center justify-between">
                                <span className="text-gray-500 text-sm font-shabnam-light">نام :</span>
                                <span className="text-light-gray dark:text-white font-vazir-light">{userObj?.firstName}</span>
                            </li>

                            <li className="flex items-center justify-between">
                                <span className="text-gray-500 text-sm font-shabnam-light">نام خانوادگي :</span>
                                <span className="text-light-gray dark:text-white font-vazir-light">{userObj?.lastName}</span>
                            </li>

                            <li className="flex flex-col gap-1">
                                <span className="text-gray-500 text-sm font-shabnam-light">ايميل :</span>
                                <span className="text-light-gray text-sm text-left dark:text-white font-vazir-light">{userObj?.email}</span>
                            </li>
                            {ipObj && (
                                <>
                                    <li className="flex flex-col gap-1">
                                        <span className="text-gray-500 text-sm font-shabnam-light">آدرس IP :</span>
                                        <span className="text-light-gray dark:text-white text-left text-sm font-vazir-light">{ipObj?.ip}</span>
                                    </li>

                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm font-shabnam-light">کشور :</span>
                                        <span className="text-light-gray dark:text-white font-vazir-light">{ipObj?.country_name}</span>
                                    </li>

                                    <li className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm font-shabnam-light">شهر :</span>
                                        <span className="text-light-gray dark:text-white font-vazir-light">{ipObj?.city}</span>
                                    </li>
                                </>
                            )}
                        </ul>

                    </div>

                </div>
            </div>

            <DeleteModal deleteHandler={deleteAnnouncementHandler} showModal={showDeleteModal} setShowModal={setShowDeleteModal} name={announcementObj?.id} tableName="اطلاعیه" />

            <AnnounceMentModal showModal={showAnnouncementModal} setShowModal={setShowAnnouncementModal} isAdding={isAdding} setIsAdding={setIsAdding} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} addAnnouncementHandler={addAnnouncementHandler} updateAnnouncementHandler={updateAnnouncementHandler} announcementObj={announcementObj} />
        </>
    )
}