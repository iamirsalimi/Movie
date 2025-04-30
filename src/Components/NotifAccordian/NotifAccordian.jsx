import { useState } from "react";

import { IoNotificationsOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";

export default function NotifAccordian({ title, content }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`border-r-4 h-fit border-yellow-500 px-4 panel-box ${!isOpen ? 'pb-4' : 'pb-0' }`}>
            <div
                className="w-full flex items-center justify-between py-3"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className="inline-flex items-center justify-center gap-2">
                    <div className="p-1 rounded-full w-10 h-10 flex items-center justify-center bg-gray-500 dark:bg-gray-300">
                        <IoNotificationsOutline className="text-white dark:text-primary text-2xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-light-gray dark:text-gray-200 font-vazir">{title}</h2>
                        <span className="text-gray-400 dark:text-gray-400 text-sm font-shabnam-light">10 ماه قبل</span>
                    </div>
                </div>

                <IoChevronDown className={`text-gray-500 dark:text-gray-400 text-xl transition-all ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
            </div>

            <p className={`overflow-hidden px-4 py-2 rounded-md bg-gray-100 dark:bg-primary text-light-gray dark:text-white font-vazir-light ${isOpen ? 'hidden' : 'block'}`}>{content}</p>
        </div>
    );
}