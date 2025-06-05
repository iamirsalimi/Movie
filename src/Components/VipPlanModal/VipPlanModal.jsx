import React, { useEffect, useState } from 'react'

import VipPlanTicket from '../VipPlanTicket/VipPlanTicket';

import { RxCross2 } from "react-icons/rx";

let vipPlans = [
    { id: 'Month1', month: "1 ماهه", price: "70000", days: 30 },
    { id: 'Month3', month: "3 ماهه", price: "190000", days: 90 },
    { id: 'Month6', month: "6 ماهه", price: "350000", days: 180 },
    { id: 'Month12', month: "1 ساله", price: "650000", days: 365 },
]

export default function VipPlanModal({ userObj, showModal, setShowModal, isUpdating, setIsUpdating, updateUserHandler }) {
    const [selectedVipPlan, setSelectedVipPlan] = useState({ id: 'Month1', month: "1 ماهه", price: "70000", days: 30 })
    const [renewalDate, setRenewalDate] = useState(null)
    const [agreeWebsitePolicy, setAgreeWebsitePolicy] = useState(false)

    const hideMenu = () => {
        setShowModal(false)
    }

    // check when user need to renewal vip plan
    const getExpirationDate = daysToAdd => {
        let now = new Date()
        now.setDate(now.getDate() + daysToAdd)

        return now
    }

    useEffect(() => {
        setRenewalDate(getExpirationDate(selectedVipPlan.days))
    }, [selectedVipPlan])

    //adding "," after each 3 numbers
    const formatPrice = price => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getVipPlanChanging = () => {
        let newUserObj = { ...userObj }
        newUserObj.subscriptionStatus = 'active'

        let newExpirationDate = getExpirationDate(selectedVipPlan.days)

        newUserObj.subscriptionExpiresAt = newExpirationDate

        let newPlanObj = { id: new Date().getTime(), duration: selectedVipPlan.days, activateDate: new Date(), expiration: newExpirationDate, isBought: { value: true, price: selectedVipPlan.price }, changedBy: [] }
        newUserObj.subscriptionPlan = newPlanObj
        newUserObj.all_subscription_plans = [...newUserObj?.all_subscription_plans, newPlanObj]
        newUserObj.last_purchases = newUserObj.all_subscription_plans.filter(plan => plan.isBought?.value)

        return newUserObj
    }

    const updateUser = () => {
        if (userObj) {
            let newUserObj = getVipPlanChanging()
            setIsUpdating(true)
            updateUserHandler(newUserObj)
        }
    }

    return (
        <div className={`absolute w-full top-0 left-0 h-full max-h-screen overflow-y-scroll z-50 pb-10 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'} overflow-y-auto`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>

            <div className={`w-[90%] sm:w-4/5 lg:w-1/3 absolute top-5 h-fit bg-white py-4 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-4 transition-all duration-300 ${showModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 dark:border-secondary">
                    <h2 className="font-vazir text-gray-700 dark:text-gray-300 font-bold text-base text-center">پلن های اشتراک Movie Website</h2>
                    <RxCross2 className="text-light-gray dark:text-gray-300 text-2xl cursor-pointer p-1 bg-gray-100 dark:bg-secondary rounded-full" onClick={hideMenu} />
                </div>

                <div className="w-full flex flex-col items-center gap-4">
                    <h2 className="text-light-gray dark:text-white font-shabnam">پلن اشتراک خود را انتخاب کنید</h2>
                    <ul className="vipPlanSelection w-full flex flex-col items-center gap-2">
                        {vipPlans.map(vipPlan => (
                            <VipPlanTicket key={vipPlan.id} vipPlan={selectedVipPlan} setVipPlan={setSelectedVipPlan} formatPrice={formatPrice} {...vipPlan} />
                        ))}
                    </ul>
                    <div className="text-light-gray dark:text-white font-vazir inline-flex items-center gap-4">
                        <span>تاریخ تمدید : </span>
                        <span>{renewalDate?.toLocaleDateString('fa-IR')}</span>
                    </div>
                </div>

                <table className="w-full text-right text-sm">
                    <tbody>
                        <tr className="border-b border-white dark:border-primary">
                            <th className="bg-yellow-300 px-4 py-2 whitespace-nowrap text-primary font-shabnam rounded-tr-lg">اشتراک</th>
                            <td className="px-4 py-2 bg-gray-100 dark:bg-secondary text-gray-700 dark:text-white font-vazir-light rounded-tl-lg">{selectedVipPlan.month}</td>
                        </tr>
                        <tr>
                            <th className="bg-yellow-300 px-4 py-2 whitespace-nowrap text-primary font-shabnam rounded-br-lg">جمع کل</th>
                            <td className="px-4 py-2 bg-gray-100 dark:bg-secondary text-gray-700 dark:text-white font-vazir-light rounded-bl-lg">{formatPrice(selectedVipPlan.price)} تومان</td>
                        </tr>
                    </tbody>
                </table>

                <div className="w-full flex items-center gap-5">
                    <input id="policy-checkbox" type="checkbox" value="" className="peer" hidden checked={agreeWebsitePolicy} onChange={e => setAgreeWebsitePolicy(e.target.checked)} />
                    <label htmlFor="policy-checkbox" className="flex items-center w-fit">
                        <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${agreeWebsitePolicy ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'} `}></span>
                        <a href="/faq" className="ms-2 text-sm font-vazir underline text-light-gray dark:text-sky-300 cursor-pointer select-none">قوانین و ظوابط سایت را مطالعه کردم</a>
                    </label>
                </div>


                <button
                    className="w-full py-2 rounded-md cursor-pointer font-vazir disabled:bg-green-200 bg-green-500 hover:bg-green-600 transition-all text-white dark:text-primary" disabled={!agreeWebsitePolicy || isUpdating}
                    onClick={updateUser}
                >
                    {isUpdating ? 'در حال افزودن اشتراک ...' : 'پرداخت'}
                </button>
            </div>
        </div>
    )
}
