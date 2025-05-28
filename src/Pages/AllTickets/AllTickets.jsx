import React, { useState, useEffect, useContext } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';

import UserContext from '../../Contexts/UserContext';

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
  'ID': { hasValue: false, property: 'id' },
  'subject': { hasValue: false, property: 'subject' },
  'movieTitle': { hasValue: false, property: 'movieTitle' },
  'account': { hasValue: true, property: 'category', value: 'account' },
  'payment': { hasValue: true, property: 'category', value: 'payment' },
  'bug': { hasValue: true, property: 'category', value: 'bug' },
  'requests': { hasValue: true, property: 'category', value: 'requests' },
  'links': { hasValue: true, property: 'category', value: 'links' },
  'content': { hasValue: true, property: 'category', value: 'content' },
  'other': { hasValue: true, property: 'category', value: 'other' },
  'pending': { hasValue: true, property: 'status', value: 'pending' },
  'answered': { hasValue: true, property: 'status', value: 'answered' },
  'closed': { hasValue: true, property: 'status', value: 'closed' },
}

let apiData = {
  getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets?select=*',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function AllTickets() {
  const [showMovieReleaseDetails, setShowMovieReleaseDetails] = useState(false)

  const [searchType, setSearchType] = useState('ID')
  const [searchValue, setSearchValue] = useState('')

  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  const userObj = useContext(UserContext)

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const res = await fetch(apiData.getAllApi, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json();

        if (data) {
          let sortedMoviesArray = data.filter(ticket => ticket.userId == userObj.id).sort((a, b) => {
            let aDate = new Date(a.created_at).getTime()
            let bDate = new Date(b.created_at).getTime()
            return aDate - bDate
          })
          setTickets(sortedMoviesArray)
          setFilteredTickets(sortedMoviesArray)
          setIsPending(null)
          setError(false)
        }

      } catch (err) {
        console.log('fetch error', err)
        isPending(false)
        setError(err)
      }
    }

    if (userObj) {
      getAllTickets()
    }
  }, [userObj])

  useEffect(() => {
    let filterObj = filterSearchObj[searchType]
    let filteredTicketsArray = []

    // when we search something or we change the searchType we should filter the tickets Array again  
    if (filterObj) {
      // for searchTypes that they have value (their value is not boolean and might be a variable)
      if (filterObj.hasValue) {
        filteredTicketsArray = tickets.filter(ticket => ticket[filterObj.property] == filterObj.value)
      } else {
        if (searchValue) {
          if (filterObj.property == 'id') {
            filteredTicketsArray = tickets.filter(ticket => ticket[filterObj.property] == searchValue)
          } else if (typeof filterObj.property == 'string') {
            filteredTicketsArray = tickets.filter(ticket => ticket[filterObj.property].toLowerCase().startsWith(searchValue))
          }
        } else {
          filteredTicketsArray = [...tickets]
        }
      }
    }

    setFilteredTickets(filteredTicketsArray)
  }, [searchValue, searchType])

  // return the easy readable time and date with Iran timezone
  const getDate = date => {
    let newDate = new Date(date)
    let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
    return persianDate
  }

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-gray-700 dark:text-white font-vazir text-xl">Messages</h2>
        <a href="/my-account/userPanel/messages/add-new-ticket" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors">تیکت جدید</a>
      </div>
      <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">

        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
          <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
            <select
              name=""
              id=""
              className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
            >
              <option value="ID">ID</option>
              <option value="subject">عنوان</option>
              <option value="account">دپارتمان : اکانت</option>
              <option value="payment">دپارتمان : پرداخت و اشتراک</option>
              <option value="bug">دپارتمان : خطا در سایت یا فیلم</option>
              <option value="requests">دپارتمان : درخواست فیلم/سریال</option>
              <option value="links">دپارتمان :  خرابی یا مشکل لینک فیلم/سریال</option>
              <option value="content">دپارتمان : محتوای سایت</option>
              <option value="other">دپارتمان : سایر موارد</option>
              <option value="pending">در حال بررسی</option>
              <option value="answered">پاسخ داده شده</option>
              <option value="closed">بسته شده</option>
            </select>
            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
          </div>

          {(searchType !== 'account' && searchType !== 'payment' && searchType !== 'bug' && searchType !== 'requests' && searchType !== 'links' && searchType !== 'content' && searchType !== 'other' && searchType !== 'pending' && searchType !== 'answered' && searchType !== 'closed') && (
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

        <div className="w-full p-3 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
          <table className="w-full">
            <thead className="min-w-full">
              <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان تیکت</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">دپارتمان</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ ثبت</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isPending && !error &&
                filteredTickets.length > 0 && (
                  filteredTickets.map(ticket => (
                    <tr className="relative py-1 px-2 border-b border-gray-200 dark:border-white/5 odd:bg-gray-200 dark:odd:bg-primary" >
                      <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400 text-nowrap">{ticket?.subject}</td>
                      <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{ticket?.category == 'account' ? 'حساب' : ticket?.category == 'payment' ? 'پرداخت و اشتراک' : ticket?.category == 'bug' ? 'خطا در سایت یا فیلم' : ticket?.category == 'requests' ? 'درخواست فیلم/سریال' : ticket?.category == 'links' ? 'خرابی یا مشکل لینک فیلم/سریال' : ticket?.category == 'content' ? 'محتوای سایت' : 'سایر موارد'}</td>
                      <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{getDate(ticket.created_at)}</td>
                      <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{ticket?.status == 'pending' ? 'در حال بررسی' : ticket?.status == 'answered' ? 'جواب داده شده' : 'بسته شده'}</td>
                      <td className="py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">
                        <a
                          href={`/my-account/userPanel/messages/ticket-details/${ticket.id}`}
                          className="inline-block p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                        >
                          <FaEye className="text-green-500 group-hover:text-white transition-all" />
                        </a>
                      </td>
                      {ticket.is_read_by_user && (
                        <div className="absolute top-1/2 -right-2.5 md:right-5 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
                      )}
                    </tr>
                  ))
                )
              }

            </tbody>
          </table>


          {isPending == null && tickets.length == 0 && (
            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا کنون تیکتی توسط شما ثبت نشده</h2>
          )}

          {!isPending && tickets.length > 0 && filteredTickets.length == 0 && (
            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">مقداری با همچین مشخصاتی پیدا نشد</h2>
          )}

          {isPending && (
            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
          )}

          {error && (
            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
          )}
        </div>

      </div>
    </>
  )
}
