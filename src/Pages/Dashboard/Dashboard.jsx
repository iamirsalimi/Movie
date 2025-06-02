import React, { useEffect, useState, useContext } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import UserActivityInfo from '../../Components/UserActivityInfo/UserActivityInfo'
import DashboardTable from '../../Components/DashboardTable/DashboardTable'
import AnnouncementElem from '../../Components/AnnouncementElem/AnnouncementElem';
import UserContext from '../../Contexts/UserContext';

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { PiUserFocusFill } from "react-icons/pi";
import { AiFillInfoCircle } from "react-icons/ai";

dayjs.extend(jalali)

let apiData = {
  getAnnouncementsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Announcements?select=*',
  getRequestsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/requests?userId=eq.',
  getTicketsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?userId=eq.',
  getCommentsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Comments?userId=eq.',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState(null)
  const [announcementsIsPending, setAnnouncementsIsPending] = useState(false)
  const [announcementError, setAnnouncementError] = useState(false)
  const [tickets, setTickets] = useState(null)
  const [ticketsIsPending, setTicketsIsPending] = useState(false)
  const [ticketsError, setTicketsError] = useState(false)
  const [requests, setRequests] = useState(null)
  const [requestsIsPending, setRequestsIsPending] = useState(false)
  const [requestsError, setRequestsError] = useState(false)
  const [comments, setComments] = useState(null)

  const [ipObj, setIpObj] = useState(null)

  const { userObj } = useContext(UserContext)

  // getting all announcements
  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const res = await fetch(apiData.getAnnouncementsApi, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json()

        if (data.length > 0) {
          setAnnouncements(data)
          setAnnouncementsIsPending(null)
        }

        setAnnouncementError(false)
      } catch (err) {
        console.log('fetch error')
        setAnnouncementError(err)
        setAnnouncementsIsPending(false)
        setAnnouncements(null)
      }
    }
    if (userObj?.subscriptionStatus == 'active') {
      setAnnouncementsIsPending(false)
      setAnnouncementsIsPending(true)
      getAnnouncements()
    } else {
      setAnnouncementsIsPending(null)
    }
  }, [userObj])

  // getting all tickets
  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await fetch(`${apiData.getTicketsApi}${userObj?.id}`, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json()
        console.log(data)
        if (data.length > 0) {
          setTickets(data)
        }

        setTicketsIsPending(null)
        setTicketsError(false)
      } catch (err) {
        console.log('fetch error')
        setTicketsError(err)
        setTicketsIsPending(false)
        setTickets(null)
      }
    }

    // when the announcementsIsPending is null it means announcements has fetched 
    if (announcementsIsPending == null && userObj) {
      setTicketsIsPending(true)
      getTickets()
    }
  }, [announcementsIsPending, userObj])

  // getting all requests
  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await fetch(`${apiData.getRequestsApi}${userObj?.id}`, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json()

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
        setRequests(null)
      }
    }

    // when the ticketsIsPending is null it means tickets has fetched 
    if (ticketsIsPending == null && userObj) {
      setRequestsIsPending(true)
      getRequests()
    }
  }, [ticketsIsPending, userObj])

  // getting all comments
  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await fetch(`${apiData.getCommentsApi}${userObj?.id}`, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json()

        if (data.length > 0) {
          setComments(data)
        }
      } catch (err) {
        console.log('fetch error', err)
      }
    }

    // when the requestsIsPending is null it means requests has fetched 
    if (requestsIsPending == null && userObj) {
      getAllComments()
    }
  }, [requestsIsPending, userObj])

  useEffect(() => {
    if (comments != null) {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          setIpObj(data)
        })
        .catch(err => console.error(err));

    }
  }, [comments])

  const getDate = date => {
    let registerDate = new Date(date)
    let persianDate = dayjs(registerDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
    // console.log(persianDate, registerDate)
    return persianDate
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserActivityInfo color='from-orange-400 to-orange-600' title="مطالب درخواستی" value={requests?.length || 0}>
          <IoIosAddCircleOutline className="text-white text-xl xl:text-2xl" />
        </UserActivityInfo>

        <UserActivityInfo color='from-purple-600 to-purple-800' title="لیست تماشا" value={userObj?.watchList.length || 0}>
          <FaBookmark className="text-white text-xl xl:text-2xl" />
        </UserActivityInfo>

        <UserActivityInfo color='from-sky-400 to-sky-700' title="عضویت" value={getDate(userObj?.created_At)}>
          <PiUserFocusFill className="text-white text-xl xl:text-2xl" />
        </UserActivityInfo>

        <UserActivityInfo color='from-green-400 to-green-600' title="دیدگاه ها" value={comments?.length || 0}>
          <FaRegCommentDots className="text-white text-xl xl:text-2xl" />
        </UserActivityInfo>
      </div>

      <div className="flex flex-col justify-center gap-2 panel-box py-5 px-4">
        <h2 className="font-vazir text-gray-800 dark:text-white">اطلاعیه ها</h2>
        <div className="w-full flex flex-col items-center gap-2">
          {!announcementsIsPending && (
            <>
              {userObj?.subscriptionStatus == 'active' ? (
                <>
                  {announcements?.length > 0 ? announcements?.map(announcement => (
                    <AnnouncementElem key={announcement.id} {...announcement} getDate={getDate} announcementObj={announcement} />
                  )) : (
                    // it means we just wanna show base announcement elem which only says there is no announcements 
                    <AnnouncementElem base />
                  )}
                </>
              ) : (
                <div className="w-full flex items-center justify-between p-1 pr-3 rounded-l-lg border border-gray-100 dark:border-primary border-r-4 !border-r-yellow-400">
                  <span className="w-full rounded-sm inline-flex items-center gap-2">
                    <AiFillInfoCircle className="text-yellow-400 text-lg" />
                    <span className="text-light-gray dark:text-gray-300 font-vazir text-sm">شما اشتراک فعالی ندارید</span>
                  </span>
                  <a
                    href="/my-account/userPanel/vip-plan"
                    className="text-sm font-vazir bg-yellow-400 hover:bg-yellow-500 text-white dark:text-primary transition-colors rounded-md px-2 py-1 cursor-pointer text-nowrap"
                  >خرید اشتراک ویژه</a>
                </div>
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
                  <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5">
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">پیام جدید</th>
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">عنوان تیکت</th>
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">دپارتمان</th>
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="min-w-full">
                  {!ticketsIsPending && tickets?.map(ticket => (
                    <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                      <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400 text-nowrap">
                        {!ticket.is_read_by_user && (
                          <div className="mx-auto w-2 h-2 rounded-full bg-green-500"></div>
                        )}
                      </td>
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket.subject}</td>
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket?.category == 'account' ? 'حساب' : ticket?.category == 'payment' ? 'پرداخت و اشتراک' : ticket?.category == 'bug' ? 'خطا در سایت یا فیلم' : ticket?.category == 'requests' ? 'درخواست فیلم/سریال' : ticket?.category == 'links' ? 'خرابی یا مشکل لینک فیلم/سریال' : ticketObj?.category == 'content' ? 'محتوای سایت' : 'سایر موارد'}</td>
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{ticket.status == 'pending' ? 'در حال بررسی ' : ticket.status == 'answered' ? 'جواب داده شده' : 'بسته شده'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {ticketsIsPending == null && tickets == null && (
                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا كنون تیکتی توسط شما ثبت نشده</h2>
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
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">عنوان</th>
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">نوع فیلم</th>
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">تاریخ ثبت</th>
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="min-w-full">
                  {!requestsIsPending && requests?.map(request => (
                    <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.title}</td>
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.movieType == 'series' ? 'سریال' : 'فیلم'}</td>
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{getDate(request.created_at)}</td>
                      <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.status == 'pending' ? 'در حال بررسی ' : request.status == 'approved' ? 'قبول شده' : 'رد شده'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {requestsIsPending == null && requests == null && (
                <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا كنون درخواستي توسط شما ثبت نشده</h2>
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
            </ul>

          </div>

        </div>
      </div>
    </>
  )
}
