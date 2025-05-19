import React, { useEffect, useState, useContext } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import UserInfoModal from '../../Components/UserInfoModal/UserModalInfo'
import UserContext from '../../Contexts/UserContext';

dayjs.extend(jalali)

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { TbTicket } from "react-icons/tb";

let apiData = {
    getAllUsersApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?select=*',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userToken=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'name': { hasValue: false, property: ['firstName', 'lastName'] },
    'username': { hasValue: false, property: 'userName' },
    'email': { hasValue: false, property: 'email' },
    'with-vip-plan': { hasValue: true, property: 'subscriptionStatus', value: true },
    'without-vip-plan': { hasValue: true, property: 'subscriptionStatus', value: false },
    'temporary-banned-users': { hasValue: true, property: 'accountStatus', value: 'temporary-banned' },
    'permanent-banned-users': { hasValue: true, property: 'accountStatus', value: 'permanent-banned' },
    'unbanned-users': { hasValue: true, property: 'accountStatus', value: 'active' },
}


export default function AllUsers() {
    const [showModal, setShowModal] = useState(false)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    let userObj = useContext(UserContext)

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await fetch(`${apiData.getAllUsersApi}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json();

                if (data) {
                    setUsers(data)
                    setFilteredUsers(data)
                    setIsPending(false)
                    setError(false)
                }

            } catch (err) {
                console.log('fetch error', err)
                isPending(false)
                setError(err)
                return null
            }
        }

        getAllUsers()
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    
    useEffect(() => {
        let filterObj = filterSearchObj[searchType]
        let filteredUsersArray = []

        if (filterObj) {
            console.log(filterObj.hasValue)
            if (filterObj.hasValue) {
                filteredUsersArray = users.filter(user => user[filterObj.property] == filterObj.value)
            } else {
                if (searchValue) {
                    if (filterObj.property == 'id') {
                        filteredUsersArray = users.filter(user => user[filterObj.property] == searchValue)
                    } else if (typeof filterObj.property == 'string') {
                        filteredUsersArray = users.filter(user => user[filterObj.property].toLowerCase().startsWith(searchValue))
                    } else {
                        filteredUsersArray = users.filter(user => `${user[filterObj.property[0]]} ${user[filterObj.property[1]]}`.toLowerCase().includes(searchValue))
                    }
                } else {
                    filteredUsersArray = [...users]
                }
            }
        }

        setFilteredUsers(filteredUsersArray)
    }, [searchValue, searchType])

    const getDate = date => {
        let registerDate = new Date(date)
        let persianDate = dayjs(registerDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    return (
        <>
            <div className=" w-full panel-box py-4 px-5 flex flex-col gap-7">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">کاربر ها</h2>
                </div>
                <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">

                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={searchType} onChange={e => setSearchType(e.target.value)} >
                                <option value="ID">ID</option>
                                <option value="name">نام</option>
                                <option value="username">نام کاربری</option>
                                <option value="email">ایمیل</option>
                                <option value="with-vip-plan">کاربر های دارای اشتراک</option>
                                <option value="without-vip-plan">کاربر های بدون اشتراک</option>
                                <option value="temporary-banned-users">کاربر های بن شده (موقت)</option>
                                <option value="permanent-banned-users">کاربر های بن شده (دایمی)</option>
                                <option value="unbanned-users">کاربر های بن نشده</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                        </div>
                        {(searchType != 'with-vip-plan' && searchType != 'without-vip-plan' && searchType != 'banned-users' && searchType != 'unbanned-users') && (
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
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام کاربری</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ایمیل</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ عضویت</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">اشتراک</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت حساب</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center pt-4">
                                {!isPending && !error &&
                                    filteredUsers.length > 0 && (
                                        filteredUsers.map(user => user.id !== userObj?.id && (
                                            <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{user.id}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{user.firstName} {user.lastName}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{user.userName}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{user.email}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">{getDate(user.created_At)}</td>
                                                <td className={`py-1 pb-3 px-2 text-sm ${user.subscriptionStatus == 'active' ? 'text-green-500' : 'text-red-500'}`}>{user?.subscriptionStatus == 'active' ? 'فعال' : user.subscriptionStatus == 'expired' ? 'منقضی شده' : 'ندارد'}</td>
                                                <td className={`py-1 pb-3 px-2 text-sm ${user.accountStatus == 'active' ? 'text-green-500' : 'text-red-500'}`}>{user.accountStatus == 'active' ? 'فعال' : 'بن'}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                                    <a
                                                        href={`/my-account/adminPanel/users/edit-user/${user.id}`}
                                                        className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                                    >
                                                        <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                                    </a>

                                                    <a
                                                        href={`/my-account/adminPanel/users/user-details/${user.id}`}
                                                        className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                                                    >
                                                        <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                                    </a>

                                                    <button className="p-1 rounded-md cursor-pointer bg-orange-200 hover:bg-orange-500 transition-colors group">
                                                        <TbTicket className="text-orange-500 group-hover:text-white transition-all" />
                                                    </button>

                                                    <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group">
                                                        <FaBan className="text-red-500 group-hover:text-white transition-all" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                                {/* <tr className="py-1 px-2 odd:bg-gray-100 dark:odd:bg-primary text-center" >
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">123</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex123</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Alex29@gmail.com</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">20/5/1403</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ندارد</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">فعال</td>
                                    <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                        <a
                                            href="/my-account/adminPanel/users/edit-user/1234"
                                            className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                        >
                                            <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                        </a>

                                        <a
                                            href="/my-account/adminPanel/users/user-details/1234"
                                            className="p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                                        >
                                            <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                        </a>

                                        <button className="p-1 rounded-md cursor-pointer bg-orange-200 hover:bg-orange-500 transition-colors group">
                                            <TbTicket className="text-orange-500 group-hover:text-white transition-all" />
                                        </button>

                                        <button className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group">
                                            <FaBan className="text-red-500 group-hover:text-white transition-all" />
                                        </button>
                                    </td>
                                </tr> */}

                            </tbody>
                        </table>

                        {!isPending && filteredUsers.length == 0 && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">کاربری با همچین مشخصاتی پیدا نشد</h2>
                        )}

                        {isPending && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                        )}

                        {error && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صقحه را رفرش کنید</h2>
                        )}

                    </div>
                </div>
            </div>

            <UserInfoModal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}
