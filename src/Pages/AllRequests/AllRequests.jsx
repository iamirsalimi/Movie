import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../../Contexts/UserContext'

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
  'title': { hasValue: false, property: 'title' },
  'pending': { hasValue: true, property: 'status', value: 'pending' },
  'approved': { hasValue: true, property: 'status', value: 'approved' },
  'rejected': { hasValue: true, property: 'status', value: 'rejected' }
}

let apiData = {
  getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/requests?userId=eq.',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function AllRequests() {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(false)
  const [searchType, setSearchType] = useState('title')
  const [searchValue, setSearchValue] = useState('')

  let { userObj } = useContext(UserContext)

  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const res = await fetch(`${apiData.getApi}${userObj?.id}`, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json()

        if (data.length > 0) {
          let sortedRequestsArray = data.sort((a, b) => {
            let aDate = new Date(a.created_at).getTime()
            let bDate = new Date(b.created_at).getTime()
            return bDate - aDate
          })
          setRequests(sortedRequestsArray)
          setFilteredRequests(sortedRequestsArray)
        }

        setIsPending(null)
        setError(false)
      } catch (err) {
        console.log('fetch error', err)
        setIsPending(false)
        setError(err)
      }
    }

    if (userObj) {
      setIsPending(true)
      getAllRequests()
    }
  }, [userObj])

  useEffect(() => {
    let filterObj = filterSearchObj[searchType]
    let filteredRequestsArray = []

    // when we search something or we change the searchType we should filter the requests Array again  
    if (filterObj) {
      // for searchTypes that they have value (their value is not boolean and might be a variable)
      if (filterObj.hasValue) {
        filteredRequestsArray = requests.filter(request => request[filterObj.property] == filterObj.value)
      } else {
        if (searchValue.trim()) {
          filteredRequestsArray = requests.filter(request => request[filterObj.property].toLowerCase().startsWith(searchValue))
        } else {
          filteredRequestsArray = [...requests]
        }
      }
    }

    console.log(requests, filteredRequests, filteredRequestsArray)
    setFilteredRequests(filteredRequestsArray)
  }, [searchValue, searchType])

  return (
    <>
      <div className="w-full flex items-center justify-between mb-12">
        <h2 className="text-gray-700 dark:text-white font-vazir text-sm md:text-base lg:text-xl">لیست درخواست ها</h2>
        <a href="/my-account/userPanel/requests/add-request" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600  transition-colors text-sm md:text-base">درخواست جدید</a>
      </div>
      <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
          <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
              <option value="title">عنوان</option>
              <option value="pending">در حال بررسی</option>
              <option value="approved">تایید شده</option>
              <option value="rejected">رد شده</option>
            </select>
            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
          </div>

          {searchType !== 'pending' && searchType !== 'approved' && searchType !== 'rejected' && (
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
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نوع فیلم</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">توضیحات</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت درخواست</th>
              </tr>
            </thead>
            <tbody className="min-w-full">
              {!isPending && filteredRequests.map(request => (
                <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                  <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.title}</td>
                  <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.status == 'series' ? 'سریال' : 'فیلم'}</td>
                  <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.description}</td>
                  <td className="py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.status == 'pending' ? 'در حال بررسی ' : request.status == 'approved' ? 'قبول شده ' : 'رد شده'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {isPending == null && requests.length > 0 && filteredRequests.length == 0 && (
            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">درخواستی با همچین مشخصاتی پیدا نشد</h2>
          )}

          {isPending == null && requests.length == 0 && (
            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">تا كنون درخواستي توسط شما ثبت نشده</h2>
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
