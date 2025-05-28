import React, { useEffect, useState, useContext, useRef } from 'react'

import { useParams } from 'react-router-dom'

import dayjs from 'dayjs';
import jalali from 'jalaliday';
import toast from 'react-hot-toast';

import TicketMessage from '../../Components/TicketMessage/TicketMessage';
import UserContext from '../../Contexts/UserContext';

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";

let apiData = {
    getMessageApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/ticketMessages?ticket_id=eq.',
    postMessageApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/ticketMessages',
    getTicketApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function TicketDetails() {
    const [ticketObj, setTicketObj] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(true)
    const [messageText, setMessageText] = useState('')
    const [messageIsPending, setMessageIsPending] = useState(false)
    const [messageError, setMessageError] = useState(false)
    const [messages, setMessages] = useState([])
    const [isSending, setIsSending] = useState(false)
    const [getMessages, setGetMessages] = useState(false)

    const chatEndingRef = useRef('')

    let { ticketId } = useParams()
    const userObj = useContext(UserContext)

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
            console.log(res)
            if (res.ok) {
                setGetMessages(prev => !prev)
                setMessageText('')
                toast.success('پیام شما ارسال شد')
            }
        })
            .catch(err => {
                setIsAdding(false)
                toast.error('مشکلی در افزودن پیام پیش آمده')
            })
    }

    const addMessage = () => {
        if (messageText) {
            console.log(userObj)
            let newMessageObj = {
                ticket_id: ticketObj.id,
                sender_id: userObj.id,
                sender_role: userObj.role,
                text: messageText,
                created_at: new Date()
            }

            console.log(newMessageObj, Object.keys(newMessageObj))
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
                    setMessageIsPending(false)
                    chatEndingRef.current.scrollIntoView({ behavior: "smooth" })
                }

                setMessageError(null)
            } catch (err) {
                console.log('fetch error')
                setMessageError(err)
                setMessageIsPending(false)
                setMessages([])
            }
        }
        if (ticketObj) {
            setMessageIsPending(true)
            getMessagesInfo(ticketId)
        }
    }, [getMessages, ticketObj])

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-sm sm:text-base md:text-xl">اطلاعات تیکت</h2>
                <a href="/my-account/userPanel/messages" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-xs xs:text-sm md:text-base">بازگشت به لیست تيكت ها</span>
                </a>
            </div>

            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
            )}

            {!isPending && ticketObj && (
                <>
                    <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary">
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">موضوع</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.subject}</p>
                        </li>
                        <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">وضعیت تیکت</h3>
                            <p className="text-primary dark:text-gray-300">{ticketObj?.status == 'pending' ? 'در حال بررسی' : ticket?.status == 'answered' ? 'جواب داده شده' : 'بسته شده'}</p>
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
                    </ul>

                    <div className="w-full flex flex-col justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg px-2 py-4">
                        <h2 className="text-gray-700 dark:text-white font-vazir text-xl">پیام های تیکت</h2>



                        <div className="py-5 px-2 border border-gray-300 dark:border-secondary rounded-lg flex flex-col items-center gap-7 sm:gap-5 lg:gap-2">
                            {messageIsPending && (
                                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت پیام ها ... </h2>
                            )}

                            {messageError && (
                                <h2 className="text-center font-vazir text-red-500 text-sm">{messageError.message} </h2>
                            )}


                            {!messageIsPending && (
                                <>
                                    <div className="w-full flex flex-col items-start gap-7 sm:gap-5">
                                        {messages?.map(message => (
                                            // if receive flag is false it means we sent the message 
                                            <TicketMessage key={message.id} receiveFlag={userObj?.id != message.sender_id} adminFlag={message.sender_role == 'admin'} {...message} />
                                        ))}
                                        {/* <TicketMessage userRole="admin" receiveFlag adminReceiver /> */}
                                    </div>

                                    <div className="w-full flex flex-col items-center justify-between mt-2 gap-2">
                                        <div className="col-start-1 col-end-3 w-full relative select-none">
                                            <textarea
                                                className="w-full resize-none rounded-md p-3 h-36 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                                value={messageText}
                                                onChange={e => setMessageText(e.target.value)}
                                            ></textarea>
                                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">توضیحات</span>
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
                                </>
                            )}
                        </div>
                        
                        {/* just to show latest messages first */}
                        <span className="" ref={chatEndingRef}></span>
                    </div>

                </>
            )}
        </>
    )
}
