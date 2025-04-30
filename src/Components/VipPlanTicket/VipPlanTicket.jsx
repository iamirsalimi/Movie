import React from 'react'

export default function VipPlanTicket({id , month , price , days , vipPlan , setVipPlan , formatPrice}) {
    const checkIfChecked = e => {
        setVipPlan({id , month , price , days})
    }

    return (
        <li className="w-full">
            <input type="radio" name="vipPlan" id={id} onChange={checkIfChecked} className="hidden" checked={vipPlan.id == id ? true : false} />
            <label htmlFor={id} className="select-none cursor-pointer flex items-center justify-between px-5 h-16 w-full rounded-lg bg-gray-100 dark:bg-secondary relative after:absolute after:-right-2.5 after:bottom-1/2 after:translate-y-1/2 after:inline-block after:w-5 after:h-5 after:rounded-full after:bg-white dark:after:bg-primary before:absolute before:-left-2.5 before:bottom-1/2 before:translate-y-1/2 before:inline-block before:w-5 before:h-5 before:rounded-full before:bg-white dark:before:bg-primary transition-all">
                <span className="h-full text-light-gray dark:text-gray-400 text-center leading-16 text-sm font-vazir pl-7 border-l-8 border-dotted">{month}</span>
                <span className="text-light-gray dark:text-gray-400 text-sm font-vazir-light">{formatPrice(price)} تومان</span>
                <span className="text-light-gray dark:text-gray-400 text-sm font-vazir-light">{days} روز</span>
            </label>
        </li>
    )
}
