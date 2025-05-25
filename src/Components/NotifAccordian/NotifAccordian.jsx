import { useState } from "react";

import { IoNotificationsOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";

export default function NotifAccordian({ title, text , type , link, created_at }) {
    const [isOpen, setIsOpen] = useState(false)

    const getTimeDifferencePureJS = targetDate => {
        const now = new Date()
        const dateToCompare = new Date(targetDate)
       
        const diffMilliseconds = now.getTime() - dateToCompare.getTime();

        const minutes = Math.floor(diffMilliseconds / (1000 * 60))
        const hours = Math.floor(diffMilliseconds / (1000 * 60 * 60))
        const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24))
        const weeks = Math.floor(days / 7)

        const years = Math.floor(days / 365)
        const months = Math.floor(days / 30)

        if (years > 0) {
            return `${years} سال پیش`
        }
        if (months > 0) {
            return `${months} ماه پیش`
        }
        if (weeks > 0) {
            return `${weeks} هفته پیش`
        }
        if (days > 0) {
            return `${days} روز پیش`
        }
        if (hours > 0) {
            return `${hours} ساعت پیش`
        }
        if (minutes > 0) {
            return `${minutes} دقیقه پیش`
        }

        return "همین الان"
    }

    return (
        <div className={`border-r-4 h-fit ${type =='warning' ? 'border-orange-500' :type =='warning' ? 'border-orange-500' : type =='info' ? 'border-yellow-500' : type =='success' ? 'border-green-500' : type =='danger' ? 'border-red-500' : 'border-gray-500'} px-4 panel-box ${!isOpen ? 'pb-4' : 'pb-0'}`}>
            <div
                className="w-full flex items-center justify-between py-3"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className="inline-flex items-center justify-center gap-2">
                    <div className="p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-500 dark:bg-gray-300">
                        <IoNotificationsOutline className="text-white dark:text-primary text-2xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-light-gray dark:text-gray-200 font-vazir text-sm md:text-base">{title}</h2>
                        <span className="text-gray-400 dark:text-gray-400 font-shabnam-light text-xs md:text-sm">{getTimeDifferencePureJS(created_at)} </span>
                    </div>
                </div>

                <IoChevronDown className={`text-gray-500 dark:text-gray-400 text-xl transition-all ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
            </div>

            <span className={`overflow-hidden flex-col gap-5 px-4 py-2 rounded-md bg-gray-100 dark:bg-primary text-light-gray dark:text-white text-sm md:text-base ${isOpen ? 'hidden' : 'flex'}`}>
                {link && (
                    <a href={link} className="w-fit px-2 py-1 rounded-md bg-yellow-500 font-shabnam text-white dark:text-primary cursor-pointer">{link}</a>
                )}
                <p className="font-vazir-light">{text}</p>
            </span>
        </div>
    )
}