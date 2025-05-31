import React, { useEffect, useState, useContext } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import UserActivityInfo from '../../Components/UserActivityInfo/UserActivityInfo'
import DashboardTable from '../../Components/DashboardTable/DashboardTable'
import UserContext from '../../Contexts/UserContext';

dayjs.extend(jalali)

import { IoIosAddCircleOutline } from "react-icons/io";
import { PiUserFocusFill } from "react-icons/pi";
import { AiFillInfoCircle } from "react-icons/ai";
import { TbTicket } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
    const [ipObj, setIpObj] = useState(null)

    const {userObj} = useContext(UserContext)

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIpObj(data)
            })
            .catch(err => console.error(err));
    }, [])

    const getDate = date => {
        let registerDate = new Date(date)
        let persianDate = dayjs(registerDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        console.log(persianDate, registerDate)
        return persianDate
    }

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <UserActivityInfo color='from-orange-400 to-orange-600' title="درخواست ها" value={20}>
                    <TbTicket className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>

                <UserActivityInfo color='from-purple-600 to-purple-800' title="مطالب درخواستی" value={23}>
                    <IoIosAddCircleOutline className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>

                <UserActivityInfo color='from-sky-400 to-sky-700' title="عضویت" value={getDate(userObj?.created_At)}>
                    <PiUserFocusFill className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>

                <UserActivityInfo color='from-green-400 to-green-600' title="كاربر ها" value={25}>
                    <FaUsers className="text-white text-xl xl:text-2xl" />
                </UserActivityInfo>
            </div>

            <div className="flex flex-col justify-center gap-2 panel-box py-5 px-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-vazir text-gray-800 dark:text-white">اطلاعیه ها</h2>
                    <button className="font-sm font-vazir bg-yellow-400 hover:bg-yellow-500 text-white dark:text-primary transition-colors rounded-md px-2 py-1 cursor-pointer">افزودن اطلاعیه جدید</button>
                </div>
                <span className="w-full rounded-sm inline-flex items-center gap-2 py-3 pr-3 border border-gray-100 dark:border-secondary border-r-4 !border-r-yellow-400">
                    <AiFillInfoCircle className="text-yellow-400 text-lg" />
                    <span className="text-light-gray dark:text-gray-400 font-vazir-light text-sm">اطلاعيه اي ثبت نشده</span>
                </span>
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

                        <DashboardTable tableHeaders={['#', 'عنوان تیکت', 'دپارتمان', 'بروزرسانی']} />
                    </div>

                    <div className="py-3 px-4 flex flex-col gap-4 panel-box">
                        <div className="inline-flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <span className="inline-block w-3 h-3 bg-sky-500 rounded-full"></span>
                                <span className="inline-block w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
                            </div>
                            <h2 className="font-vazir text-gray-800 dark:text-white text-lg">درخواست ها</h2>
                        </div>

                        <DashboardTable tableHeaders={['#', 'عنوان', 'تاریخ ثبت', 'وضعیت']} />
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