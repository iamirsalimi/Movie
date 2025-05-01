import React, { useEffect, useState } from 'react'

import UserActivityInfo from '../../Components/UserActivityInfo/UserActivityInfo'
import DashboardTable from '../../Components/DashboardTable/DashboardTable'

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { PiUserFocusFill } from "react-icons/pi";
import { AiFillInfoCircle } from "react-icons/ai";

let userActivity = [
  { title: "مطالب درخواستی", value: "20", children: <IoIosAddCircleOutline className="text-white text-2xl" />, color: 'from-orange-400 to-orange-600' },
  { title: "لیست تماشا", value: "0", children: <FaBookmark className="text-white text-2xl" />, color: 'from-purple-600 to-purple-800' },
  { title: "عضویت", value: "20/12/2023", children: <PiUserFocusFill className="text-white text-2xl" />, color: 'from-sky-400 to-sky-700' },
  { title: "دیدگاه ها", value: "12", children: <FaRegCommentDots className="text-white text-2xl" />, color: 'from-green-400 to-green-600' },

]

export default function Dashboard() {
  const [ipObj, setIpObj] = useState(null)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setIpObj(data)
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-4 gap-6">
        {userActivity.map(user => (
          <UserActivityInfo color={user.color} title={user.title} value={user.value}>
            {user.children}
          </UserActivityInfo>
        ))}
      </div>

      <div className="flex flex-col justify-center gap-2 panel-box py-5 px-4">
        <h2 className="font-vazir text-gray-800 dark:text-white">اطلاعیه ها</h2>
        <span className="w-full rounded-sm inline-flex items-center gap-2 py-3 pr-3 border border-gray-100 dark:border-secondary border-r-4 !border-r-yellow-400">
          <AiFillInfoCircle className="text-yellow-400 text-lg" />
          <span className="text-light-gray dark:text-gray-400 font-vazir-light text-sm">برای دسترسی به محتوای سایت باید اشتراک ویژه را تهیه نمایید</span>
        </span>
      </div>

      <div className="w-full flex gap-5 mb-12">
        {/* tables */}
        <div className="w-3/4 flex flex-col items-center gap-5">
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

        <div className="w-1/4 flex flex-col gap-5">

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
                <span className="text-light-gray dark:text-white font-vazir-light">Alex</span>
              </li>

              <li className="flex items-center justify-between">
                <span className="text-gray-500 text-sm font-shabnam-light">نام خانوادگي :</span>
                <span className="text-light-gray dark:text-white font-vazir-light">Green</span>
              </li>

              <li className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm font-shabnam-light">ايميل :</span>
                <span className="text-light-gray text-sm text-left dark:text-white font-vazir-light">AlexGreen@gmail.com</span>
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
