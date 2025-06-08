import React, { useEffect, useState, useContext, useRef } from 'react'

import { useParams } from 'react-router-dom'

import dayjs from 'dayjs';
import jalali from 'jalaliday';
import toast from 'react-hot-toast';

import TicketMessage from '../../Components/TicketMessage/TicketMessage';
import UserContext from '../../Contexts/UserContext';
import LoadingContext from '../../Contexts/LoadingContext';

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";

let apiData = {
    postNotifApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications',
    updateTicketApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?id=eq.',
    getMessageApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/ticketMessages?ticket_id=eq.',
    postMessageApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/ticketMessages',
    getTicketApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?id=eq.',
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?select=*',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function AdminTicketDetails() {
    const [ticketObj, setTicketObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [messageText, setMessageText] = useState('')
    const [messageIsPending, setMessageIsPending] = useState(false)
    const [messageError, setMessageError] = useState(false)
    const [messages, setMessages] = useState([])
    const [isSending, setIsSending] = useState(false)
    const [getMessages, setGetMessages] = useState(false)
    const [priority, setPriority] = useState('middle')
    const [status, setStatus] = useState('pending')
    const [isUpdating, setIsUpdating] = useState(false)

    const chatEndingRef = useRef(null)

    let { ticketId } = useParams()
    let { userObj } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    // add new notification
    const addNotificationHandler = async newNotificationObj => {
        await fetch(apiData.postNotifApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newNotificationObj)
        }).then(res => {
            console.log(res)
        })
            .catch(err => {
                console.log('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const addNotification = async () => {
        let newNotificationObj = {
            title: `پیام جدید در تیکت "${ticketObj.subject}"`,
            text: `شما در تیکت "${ticketObj.subject}" یک پیام جدید دارید برای بررسی آن میتوانید روی لینک کلیک کنید `,
            userId: ticketObj.userId,
            link: `/my-account/userPanel/messages/ticket-details/${ticketObj.id}`,
            type: 'info',
            created_at: new Date(),
            updated_at: new Date()
        }

        // console.log(newNotificationObj)
        await addNotificationHandler(newNotificationObj)
    }

    // update ticket
    const updateTicketHandler = async (newTicketObj, reloadFlag) => {
        await fetch(`${apiData.updateTicketApi}${ticketId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newTicketObj)
        }).then(res => {
            if (res.ok) {
                // console.log(res)
                if (reloadFlag) {
                    setIsUpdating(false)
                    location.reload()
                }
            }
        })
            .catch(err => {
                setIsUpdating(false)
                console.log('مشکلی در آپدیت تیکت پیش آمده')
            })
    }

    // updating ticket obj when user checks the ticket details so we can understand user has red that ot not , and also when user sends a new message we should update the seen by admin flag to show admin has new message
    const updateTicket = adminFlag => {
        let newTicketObj = { ...ticketObj }

        if (adminFlag) {
            console.log('sdgsadga')
            newTicketObj.is_read_by_user = false
            newTicketObj.is_read_by_admin = true
            newTicketObj.status = 'answered'
            newTicketObj.last_message_by = 'admin'

            updateTicketHandler(newTicketObj)
        } else if (!newTicketObj.is_read_by_admin) {
            // user already saw the messages and ticket details so we don't have to update that 
            newTicketObj.is_read_by_admin = true

            updateTicketHandler(newTicketObj)
        }

    }

    // updating details after changing details and clicking on update button
    const updateTicketDetails = () => {
        let newTicketObj = { ...ticketObj }

        if (newTicketObj.status != status || newTicketObj.priority != priority) {
            setIsUpdating(true)
            newTicketObj.status = status
            newTicketObj.priority = priority
            updateTicketHandler(newTicketObj, true)
        } else {
            toast.error('اطلاعات تیکت مشابه قبل هست')
        }
    }

    // add new message
    const addMessageHandler = async newMessageObj => {
        await fetch(apiData.postMessageApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newMessageObj)
        }).then(res => {
            // console.log(res)
            if (res.ok) {
                setGetMessages(prev => !prev)
                setMessageText('')
                addNotification()
                updateTicket(true)
                setIsSending(false)
                toast.success('پیام شما ارسال شد')
            }
        })
            .catch(err => {
                setIsSending(false)
                toast.error('مشکلی در افزودن پیام پیش آمده')
            })
    }

    const addMessage = () => {
        if (messageText) {
            setIsSending(true)
            let newMessageObj = {
                ticket_id: ticketObj.id,
                sender_id: userObj.id,
                sender_role: userObj.role,
                text: messageText,
                created_at: new Date()
            }

            // console.log(newMessageObj, Object.keys(newMessageObj))
            addMessageHandler(newMessageObj)
        }
    }

    useEffect(() => {
        const getUserInfo = async ticketId => {
            try {
                const res = await fetch(`${apiData.getTicketApi}${ticketId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setTicketObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/messages'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setTicketObj(null)
            }
        }
        getUserInfo(ticketId)
    }, [])

    useEffect(() => {
        const getMessagesInfo = async ticketId => {
            try {
                const res = await fetch(`${apiData.getMessageApi}${ticketId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setMessages(data)
                    chatEndingRef.current.scrollIntoView({ behavior: "smooth" })
                }

                setMessageIsPending(null)
                setMessageError(null)
            } catch (err) {
                console.log('fetch error')
                setMessageError(err)
                setMessageIsPending(false)
                setMessages([])
            }
        }
        if (ticketObj) {
            // console.log('ticket Obj ->', ticketObj)
            setMessageIsPending(true)
            getMessagesInfo(ticketId)
        }
    }, [getMessages, ticketObj])

    useEffect(() => {
        if (ticketObj) {
            setPriority(ticketObj?.priority)
            setStatus(ticketObj?.status)
            updateTicket(false)
        }
    }, [ticketObj])

    useEffect(() => {
        // when "messageIsPending" is null it means we fetched messages
        if(ticketObj && messageIsPending == null && loading){
            setLoading(false)
        }
    } , [ticketObj , messageIsPending])

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    return (
        <div className="panel-box py-4 px-5 flex flex-col items-center gap-5 mb-20 md:mb-10">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-sm sm:text-base md:text-xl">اطلاعات تیکت</h2>
                    <span className="text-gray-400 dark:text-gray-500 font-vazir hidden sm:inline text-sm">#{ticketId}</span>
                </div>
                <a href="/my-account/adminPanel/tickets" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-xs xs:text-sm md:text-base">بازگشت به لیست تیکت ها</span>
                </a>
            </div>

            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
            )}

            {!isPending && (
                <>
                    <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary pb-5 px-2 md:pb-2">
                        <li className="flex flex-col md:flex-row items-center justify-center gap-5 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.id}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-5 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID کاربر</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.userId}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-5 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نام کاربر</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.fullName}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-5 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نام کاربری</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.userName}</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">موضوع</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.subject}</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">وضعیت تیکت</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.status == 'pending' ? 'در حال بررسی' : ticketObj?.status == 'answered' ? 'جواب داده شده' : 'بسته شده'}</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">دپارتمان تيكت</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.category == 'account' ? 'حساب' : ticketObj?.category == 'payment' ? 'پرداخت و اشتراک' : ticketObj?.category == 'bug' ? 'خطا در سایت یا فیلم' : ticketObj?.category == 'requests' ? 'درخواست فیلم/سریال' : ticketObj?.category == 'links' ? 'خرابی یا مشکل لینک فیلم/سریال' : ticketObj?.category == 'content' ? 'محتوای سایت' : 'سایر موارد'}</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">تاریخ ایجاد</h3>
                            <p className="text-primary dark:text-gray-300">{getDate(ticketObj?.created_at)}</p>
                        </li>
                        <li className="flex flex-col gap-2 justify-center w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">توضیحات تیکت</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.description}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-5 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">اولویت</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                <select
                                    name=""
                                    id=""
                                    className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={priority}
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value="high">بالا</option>
                                    <option value="middle">متوسط</option>
                                    <option value="low">کم</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">اولویت</span>
                            </div>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-5 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">وضعیت تیکت</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                <select
                                    name=""
                                    id=""
                                    className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    <option value="answered">پاسخ داده شده</option>
                                    <option value="pending">در حال بررسی</option>
                                    <option value="closed">بسته شده</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">وضعیت تیکت</span>
                            </div>
                        </li>
                        <button
                            className="py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-all inline-flex items-center justify-center gap-1 text-white font-shabnam text-lg"
                            disabled={isUpdating}
                            onClick={updateTicketDetails}
                        >
                            {isUpdating ? 'در حال آپدیت اطلاعات تیکت ...' : 'آپدیت'}

                        </button>
                    </ul>

                    <div className="w-full flex flex-col items-center md:items-start justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg px-2 py-4">
                        <h2 className="text-gray-700 dark:text-white font-vazir text-xl">پیام های تیکت</h2>
                        <div className="w-full py-5 px-2 border border-gray-300 dark:border-secondary rounded-lg flex flex-col items-center gap-7 sm:gap-5 lg:gap-2">
                            {messageIsPending && (
                                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت پیام ها ... </h2>
                            )}

                            {messageError && (
                                <h2 className="text-center font-vazir text-red-500 text-sm">{messageError.message} </h2>
                            )}

                            {messageIsPending == null && (
                                <>
                                    {messages.length > 0 ? (
                                        <div className="w-full flex flex-col items-start gap-7 sm:gap-5">
                                            {messages?.map(message => (
                                                // if receive flag is false it means we sent the message 
                                                <TicketMessage key={message.id} receiveFlag={userObj?.id != message.sender_id} adminFlag={message.sender_role == 'admin'} {...message} />
                                            ))}
                                        </div>
                                    ) : (
                                        <h2 className="text-center font-vazir text-light-gray dark:text-gray-600 md:text-lg lg:text-xl my-12">پیامی تا کنون ارسال نشده</h2>
                                    )}

                                    {ticketObj?.status !== 'closed' ? (
                                        <div className="w-full flex flex-col items-center justify-between mt-2 gap-2">
                                            <div className="col-start-1 col-end-3 w-full relative select-none">
                                                <textarea
                                                    className="w-full resize-none rounded-md p-3 h-36 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                    value={messageText}
                                                    onChange={e => setMessageText(e.target.value)}
                                                ></textarea>
                                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">متن پیام</span>
                                            </div>
                                            <button
                                                className="py-1 w-full rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-sky-300 transition-all inline-flex items-center justify-center gap-1"
                                                disabled={isSending}
                                                onClick={addMessage}
                                            >
                                                <TbSend2 className="text-white text-lg" />
                                                <h2 className="text-white font-shabnam text-lg">
                                                    {isSending ? 'در حال ارسال ...' : 'ارسال'}
                                                </h2>
                                            </button>
                                        </div>
                                    ) : (
                                        <h2 className="w-full bg-red-500 text-white py-2 text-center font-vazir rounded-lg">
                                            تیکت به صورت یک طرفه توسط ادمین بسته شده
                                        </h2>
                                    )}
                                </>
                            )}

                            {/* just to show latest messages first */}
                            <span className="" ref={chatEndingRef}></span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
