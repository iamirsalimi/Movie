import React, { useState, useEffect, useRef, useContext } from 'react'

import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import jalali from 'jalaliday';

import LoadingContext from './../../Contexts/LoadingContext';
import UserContext from './../../Contexts/UserContext';
import Tooltip from './../../Components/Tooltip/Tooltip';

dayjs.extend(jalali)

import { FaEye } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

import { getRequests as getAllReqs, updateRequest as updateReq } from './../../Services/Axios/Requests/Requests'

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'userId': { hasValue: false, property: 'userId' },
    'title': { hasValue: false, property: 'title' },
    'pending': { hasValue: true, property: 'status', value: 'pending' },
    'approved': { hasValue: true, property: 'status', value: 'approved' },
    'rejected': { hasValue: true, property: 'status', value: 'rejected' }
}

export default function AdminRequests() {
    const [requests, setRequests] = useState([])
    const [filteredRequests, setFilteredRequests] = useState([])
    const [getRequests, setGetRequests] = useState(false)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(false)
    const [requestObj, setRequestObj] = useState(null)
    const [showRequestDetails, setShowRequestDetails] = useState(false)
    const [requestStatus, setRequestStatus] = useState(false)
    const [requestIsPending, setRequestIsPending] = useState(false)
    const [requestError, setRequestError] = useState(false)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')

    const requestDetailsRef = useRef(null)
    const { loading, setLoading } = useContext(LoadingContext)

    const updateRequestHandler = async (id, newRequestObj) => {
        await updateReq(id, newRequestObj)
            .then(res => {
                toast.success('درخواست با موفقیت آپدیت شد')
                setRequestIsPending(false)
                setRequestObj(null)
                setShowRequestDetails(false)
                setGetRequests(prev => !prev)
            })
            .catch(err => {
                setRequestIsPending(false)
                setRequestError(err)
                toast.error('مشکلی در افزودن درخواست پیش آمده')
            })
    }

    const updateRequest = async () => {
        if (requestObj.status != requestStatus) {
            setRequestIsPending(true)
            let newRequestObj = { ...requestObj }
            newRequestObj.status = requestStatus
            await updateRequestHandler(requestObj.id, newRequestObj)
        }
    }

    const approveRequest = id => {
        let newRequestObj = { ...requestObj }
        newRequestObj.status = 'approved'
        updateRequestHandler(id, newRequestObj)
    }

    const rejectRequest = id => {
        let newRequestObj = { ...requestObj }
        newRequestObj.status = 'rejected'
        updateRequestHandler(id, newRequestObj)
    }

    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const data = await getAllReqs()

                if (data.length > 0) {
                    // sorting Requests to make pending Requests above of others
                    const sortedRequestsArray = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()

                        return bDate - aDate
                    }).sort((a, b) => {
                        if (a.status == 'pending' && b.status != 'pending') {
                            return -1
                        }

                        if (a.status != 'pending' && b.status == 'pending') {
                            return 1
                        }

                        if (a.status == 'approved' && b.status != 'approved') {
                            return -1
                        }

                        if (a.status != 'approved' && b.status == 'approved') {
                            return 1
                        }

                        return 0;
                    })
                    setRequests(sortedRequestsArray)
                    setFilteredRequests(sortedRequestsArray)
                    setIsPending(false)
                    setError(false)
                }

            } catch (err) {
                console.log('fetch error', err)
                setIsPending(false)
                setError(err)
            }
        }

        setIsPending(true)
        getAllRequests()
    }, [getRequests])

    useEffect(() => {
        let filterObj = filterSearchObj[searchType]
        let filteredRequestsArray = []

        // when we search something or we change the searchType we should filter the requests Array again  
        if (filterObj) {
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredRequestsArray = requests.filter(request => request[filterObj.property] == filterObj.value)
            } else {
                if (searchValue) {
                    if (filterObj.property == 'id' || filterObj.property == 'userId') {
                        filteredRequestsArray = requests.filter(request => request[filterObj.property] == searchValue)
                    } else if (typeof filterObj.property == 'string') {
                        filteredRequestsArray = requests.filter(request => request[filterObj.property].toLowerCase().startsWith(searchValue))
                    }
                } else {
                    filteredRequestsArray = [...requests]
                }
            }
        }

        setFilteredRequests(filteredRequestsArray)
    }, [searchValue, searchType])

    useEffect(() => {
        if (requestObj) {
            setRequestStatus(requestObj.status)
        }
    }, [requestObj])

    useEffect(() => {
        if (requests?.length > 0 && loading) {
            setLoading(false)
        }
    }, [requests])

    // return the easy readable time and date with Iran timezone
    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20">
            <div className="">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">درخواست ها</h2>
            </div>
            <div ref={requestDetailsRef} className="w-full flex flex-col items-center gap-12">
                {showRequestDetails && (
                    <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary p-2">
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID</h3>
                            <p className="text-primary dark:text-gray-300">#{requestObj.id}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">ID کاربر</h3>
                            <p className="text-primary dark:text-gray-300">{requestObj.userId}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">عنوان</h3>
                            <p className="text-primary dark:text-gray-300">{requestObj.title}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">نوع فيلم</h3>
                            <p className="text-primary dark:text-gray-300">{requestObj.movieType == 'series' ? 'سریال' : 'فیلم'}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">زمان ثبت درخواست</h3>
                            <p className="text-primary dark:text-gray-300">{getDate(requestObj.created_at)}</p>
                        </li>
                        <li className="flex flex-col items-center md:items-start gap-2 w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">متن کامنت</h3>
                            <p className="text-primary dark:text-gray-300 font-vazir text-center md:text-justify">{requestObj.description}</p>
                        </li>
                        <li className="flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between w-full font-vazir p-2 text-sm sm:text-base">
                            <h3 className="text-light-gray dark:text-gray-500">وضعیت کامنت</h3>
                            <div className="w-full md:w-fit relative flex items-center justify-center">
                                <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-primary dark:border-gray-600 dark:bg-primary bg-gray-100 text-primary dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                        value={requestStatus}
                                        onChange={e => setRequestStatus(e.target.value)}
                                    >
                                        <option value="pending">در حال بررسی</option>
                                        <option value="approved">قبول شده</option>
                                        <option value="rejected">رد شده</option>
                                    </select>
                                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-primary dark:text-gray-600 bg-gray-100 dark:bg-primary">وضعیت کامنت</span>
                                </div>
                            </div>
                        </li>
                        <button
                            className='md:col-start-1 md:col-end-3 w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-colors text-white py-2 font-vazir text-xl cursor-pointer rounded-lg'
                            onClick={updateRequest}
                            disabled={requestIsPending}
                        >
                            {requestIsPending ? 'در حال آپدیت کامنت' : 'آپدیت'}

                        </button>
                    </ul>
                )}
                <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                                <option value="ID">ID</option>
                                <option value="userId">ID کاربر</option>
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
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">userId</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نوع فیلم</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">متن درخواست</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isPending && filteredRequests.map(request => (
                                    <tr key={request.id} className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                        <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.id}</td>
                                        <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.userId}</td>
                                        <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.title}</td>
                                        <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.status == 'series' ? 'سریال' : 'فیلم'}</td>
                                        <td className="!text-wrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.description}</td>
                                        <td className="text-nowrap py-1 pb-3 px-2 font-vazir text-sm text-light-gray dark:text-gray-400">{request.status == 'pending' ? 'در حال بررسی ' : request.status == 'approved' ? 'قبول شده ' : 'رد شده'}</td>
                                        <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                            <Tooltip text="مشاهده جزئیات">
                                                <button
                                                    onClick={e => {
                                                        setRequestObj(request)
                                                        setShowRequestDetails(true)
                                                    }}
                                                    className="inline-block p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                                >
                                                    <FaEye className="text-sky-500 group-hover:text-white transition-all" />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!isPending && filteredRequests.length == 0 && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">درخواستی با همچین مشخصاتی پیدا نشد</h2>
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

        </div>
    )
}
