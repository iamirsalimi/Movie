import { useState } from "react";


import { IoChevronDown } from "react-icons/io5";

export default function DownloadBoxAccordion({title , type , links}) {
    const [isOpen, setIsOpen] = useState(false)

    console.log(type , isOpen)
    return (
        <div className={`h-fit ${type == 'dubbed' ? '!bg-red-500' : type == 'subtitle' ? '!bg-green-500' : '!bg-sky-500'} px-4 panel-box ${isOpen ? '!pb-4' : '!pb-0'}`}>
            <div
                className="w-full flex items-center justify-between py-3 select-none"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className="inline-flex items-center justify-center gap-2">
                    <h2 className="text-white font-vazir text-sm md:text-base">دانلود  {type == 'dubbed' ? 'دوبله فارسی' : type == 'subtitle' ? 'زیرنویس فارسی' : 'زبان اصلی'} با كيفيت {title}</h2>
                </div>

                <IoChevronDown className={`text-white text-xl transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            <span className={`overflow-hidden flex-col gap-5 px-4 py-2 rounded-md bg-gray-100 dark:bg-primary text-light-gray dark:text-white text-sm md:text-base ${!isOpen ? 'hidden' : 'flex'}`}>
                {/* <p className="font-vazir-light">{links}</p> */}
            </span>
        </div>
    )
}