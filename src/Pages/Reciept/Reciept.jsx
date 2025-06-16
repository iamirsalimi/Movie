import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import { getCookie } from './../../utils'
import { getUserByToken } from './../../Services/Axios/Requests/Users';

import Loader from './../../Components/Loader/Loader'

dayjs.extend(jalali)

export default function Reciept() {
    const [userObj, setUserObj] = useState(null)
    const [mainSubscriptionObj, setMainSubscriptionObj] = useState(null)
    const [loading, setLoading] = useState(false)

    const { subscriptionId } = useParams()

    useEffect(() => {
        const token = getCookie('userToken');

        if (!token) {
            return;
        }

        const fetchUser = async () => {
            const user = await getUserByToken(token)
            if (user) {
                setUserObj(user)

                let mainSubscription = user.last_purchases.find(purchase => purchase.id == +subscriptionId)

                if (mainSubscription) {
                    setMainSubscriptionObj(mainSubscription)
                } else {
                    window.location = '/my-account/userPanel/vip-plan'
                }

                if (user?.isBanned && window.location.pathname !== '/banned') {
                    window.location = '/banned'
                }

            } else {
                setUserObj(null)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        if (userObj && mainSubscriptionObj) {
            setLoading(false)
        }
    }, [userObj, mainSubscriptionObj])

    //adding "," after each 3 numbers
    const formatPrice = price => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getJalaliDate = date => {
        let newDate = new Date(date)

        return dayjs(newDate).calendar("jalali").locale("fa").format("YYYY/MM/DD - HH:MM")
    }

    return (
        <>
            <div className="relative h-screen bg-white">
                <div className="border border-gray-200 w-4/5 md:w-1/2 absolute top-1/2 left-1/2 -translate-1/2 p-2 rounded-lg">
                    <h1 className="text-light-gray font-vazir text-center text-xl">فاکتور خرید</h1 >
                    <ul className="w-full flex flex-col items-center gap-2 divide-y divide-gray-100">
                        <li className="w-full flex items-center justify-between">
                            <h3 className="text-gray-500 font-shabnam">رسید برای : </h3>
                            <span className="text-light-gray font-shabnam-light">{userObj?.firstName} {userObj?.lastName}</span>
                        </li>
                        <li className="w-full flex items-center justify-between">
                            <h3 className="text-gray-500 font-shabnam">ایمیل : </h3>
                            <span className="text-light-gray font-shabnam-light">{userObj?.email}</span>
                        </li>
                    </ul>
                    <h3 className="bg-gray-700 text-white py-1 my-2 w-full font-vazir text-center">
                        توضیحات
                    </h3>
                    <ul className="w-full flex flex-col items-center gap-2 divide-y divide-gray-100">
                        <li className="w-full flex items-center justify-between">
                            <h3 className="text-gray-500 font-shabnam">نوع اشتراک : </h3>
                            <span className="text-light-gray font-shabnam-light">{mainSubscriptionObj?.duration} روز</span>
                        </li>
                        <li className="w-full flex items-center justify-between">
                            <h3 className="text-gray-500 font-shabnam">هزینه پرداخت شده : </h3>
                            <span className="text-light-gray font-shabnam-light">{formatPrice(mainSubscriptionObj?.isBought?.price || 0)} تومان</span>
                        </li>
                        <li className="w-full flex items-center justify-between">
                            <h3 className="text-gray-500 font-shabnam">تاریخ شمسی :</h3>
                            <span className="text-light-gray font-shabnam-light">{getJalaliDate(mainSubscriptionObj?.activateDate)}</span>
                        </li>
                    </ul>
                </div >
            </div >
            {loading && (
                <Loader words={["Your Informations", "Your Purchases", "Subscription Status", "Reciept Details"]} />
            )}
        </>
    )
}
