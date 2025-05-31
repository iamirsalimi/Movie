import React, { useEffect, useState, useContext } from 'react'

import toast from 'react-hot-toast'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import UserContext from '../../Contexts/UserContext';

import VipPlanModal from '../../Components/VipPlanModal/VipPlanModal'

dayjs.extend(jalali)

let apiData = {
    updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    getAllUsersApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?select=*',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userToken=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function VipPlan() {
    const [showModal, setShowModal] = useState(false)

    const [mainUserObj, setMainUserObj] = useState(null)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)

    let { userObj, setUserObj } = useContext(UserContext)

    const updateUserHandler = async newUserObj => {
        await fetch(`${apiData.updateApi}${userObj?.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newUserObj)
        }).then(res => {
            setShowModal(false)
            setIsUpdating(false)
            toast.success('اشتراک جدید با موفقیت خریداری شد')
        })
            .catch(err => {
                toast.error('مشکلی در خرید اشتراک پیش آمده')
                setIsUpdating(false)
                setShowModal(false)
            })
    }

    //adding "," after each 3 numbers
    const formatPrice = price => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getJalaliDate = date => {
        let newDate = new Date(date)

        return dayjs(newDate).calendar("jalali").locale("fa").format("YYYY/MM/DD")
    }

    return (
        <>
            <div className="py-4 px-5 panel-box flex items-center justify-between">
                {userObj?.subscriptionStatus != 'active' ? (
                    <>
                        <h2 className="text-gray-700 dark:text-white font-vazir text-sm lg:text-base">اشتراک فعالی ندارید</h2>
                        <button
                            className="px-3 py-2 rounded-lg cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition-colors text-white dark:text-primary font-vazir text-sm lg:text-base"
                            onClick={e => setShowModal(prev => !prev)}
                        >خرید اشتراک</button>
                    </>
                ) : (
                    <div className="w-full flex flex-col items-start- justify-center gap-2">
                        <h2 className="text-gray-700 dark:text-white font-vazir text-sm lg:text-base">اشتراک فعالی ندارید</h2>
                        <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-white dark:border-primary divide-y divide-white dark:divide-primary rounded-md">
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">نوع اشتراك فعال :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.subscriptionPlan.duration} روزه</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ فعال شدن اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{getJalaliDate(userObj.subscriptionPlan.activateDate)}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ منقضي شدن اشتراك :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{getJalaliDate(userObj.subscriptionPlan.expiration)}</span>
                            </li>
                            <li className="w-full py-1 flex items-center justify-between">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">هزینه پرداخت شده :</h3>
                                <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.subscriptionPlan.isBought.price > 0 ? `${formatPrice(userObj.subscriptionPlan.isBought.price)} تومان` : 'رایگان'}</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5 py-5 px-4 panel-box">
                <h2 className="text-gray-700 dark:text-white font-vazir">لیست تراکنش ها</h2>
                <div className="py-2 px-3 w-full border border-gray-200 dark:border-white/5 rounded-xl overflow-scroll lg:overflow-hidden">
                    <table className="w-full">
                        <thead className="min-w-full">
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">نوع اشتراک</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">مبلغ</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">تاریخ فعالسازی</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">تاریخ انقضا</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">فاکتور</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(userObj && userObj.all_subscription_plans.length > 0) && userObj.all_subscription_plans.map(plan => (
                                <tr className="py-1 px-2 border-b last:border-b-0 border-gray-200 dark:border-white/5" >
                                    <td className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400 text-center">{plan.duration} روزه</td>
                                    <td className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400 text-center">{formatPrice(plan.isBought.price)}</td>
                                    <td className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400 text-center">{getJalaliDate(plan.activateDate)}</td>
                                    <td className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400 text-center">{getJalaliDate(plan.expiration)}</td>
                                    <td className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400 text-center">
                                        <button
                                            className="py-1 px-2 rounded-md bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-colors cursor-pointer text-white font-vazir"
                                            disabled={!plan.isBought.value}
                                        >فاکتور</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!userObj && (
                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                    )}

                    {userObj && userObj?.all_subscription_plans.length == 0 && (
                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">شما تا کنون اشتراکی نداشته اید</h2>
                    )}

                </div>
            </div>

            <VipPlanModal showModal={showModal} setShowModal={setShowModal} userObj={userObj} isUpdating={isUpdating} setIsUpdating={setIsUpdating} updateUserHandler={updateUserHandler} />
        </>
    )
}
