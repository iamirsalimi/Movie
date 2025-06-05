import React, { useState } from 'react'

import { GrUpdate } from "react-icons/gr";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { RiMovie2AiFill } from "react-icons/ri";

export default function UpdatedSeries({ series }) {
    const calcUpdate = date => {
        let newDate = new Date()
        let updatedDate = new Date(date)
        let whenUpdated = null

        if (newDate.getDate() == updatedDate.getDate() && newDate.getFullYear() == updatedDate.getFullYear() && newDate.getMonth() == updatedDate.getMonth()) {
            if (newDate.getHours() == updatedDate.getHours()) {
                whenUpdated = (newDate.getMinutes() - updatedDate.getMinutes()) + ' دقیقه'
            } else {
                if (newDate.getHours() - 1 == updatedDate.getHours() && newDate.getMinutes() < updatedDate.getMinutes()) {
                    whenUpdated = 60 - (updatedDate.getMinutes() - newDate.getMinutes()) + ' دقیقه'
                } else {
                    whenUpdated = (newDate.getHours() - updatedDate.getHours()) + ' ساعت'
                }
            }
        } else {
            const diffInMs = Math.abs(newDate.getTime() - updatedDate.getTime())
            const diffInHours = diffInMs / (1000 * 60 * 60)

            if(diffInHours > 24){
                if(diffInHours > 720){
                    whenUpdated = Math.floor(Math.floor(diffInHours) / 720) + ' ماه'   
                } else {
                    whenUpdated = Math.floor(Math.floor(diffInHours) / 24) + ' روز'   
                }
            } else{
                whenUpdated = Math.floor(diffInHours) + ' ساعت'
            }
        }
        return `${whenUpdated} قبل`
    }

    return (
        <div className="rounded-xl bg-white shadow shadow-black/5 dark:bg-secondary flex flex-col p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mr-1">
                    <span className="title-icon">
                        <RiMovie2AiFill className="fill-white text-3xl" />
                    </span>
                    <div className="flex flex-col gap-1">
                        <span className="text-secondary dark:text-white font-vazir font-semibold text-sm sm:text-base">سریال های به روز شده</span>
                        <span className="text-light-gray dark:text-gray-200 text-xs sm:text-sm font-shabnam-light">دانلود سریال ها</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="font-vazir text-light-gray dark:text-white hidden xs:inline xs:text-xs sm:text-sm">مشاهده بیشتر</span>
                    <button className="bg-sky-500 cursor-pointer p-1 h-fit rounded-md">
                        <PiArrowCircleLeftDuotone className="text-white text-2xl" />
                    </button>
                </div>
            </div>
            <ul className="mt-5 flex flex-col gap-2">
                {series.length ? series.filter(seriesItem => seriesItem.broadcastStatus != 'premiere').slice(0 , 9).map(seriesItem => (
                    <a href={`/series/${seriesItem.id}`}>
                        <li key={seriesItem.id} className="w-full bg-light dark:bg-primary hover:bg-black/5 dark:hover:bg-black/35 transition-colors duration-300 flex items-center gap-2 group overflow-hidden relative rounded-lg p-1.5 cursor-pointer">
                            <div className="min-w-20 max-w-20 h-20 rounded-md overflow-hidden">
                                <img src={seriesItem.cover} className="w-full h-full object-cover object-center" alt="" />
                            </div>

                            <div className="flex flex-col gap-3 px-2">
                                <h2 className="text-secondary dark:text-white font-vazir line-clamp-1">{seriesItem.mainTitle}</h2>
                                <div className="flex items-start xs:items-center gap-2">
                                    {seriesItem?.notifications.length > 0 && (
                                        <p className="text-white dark:text-primary font-vazir text-xs text-nowrap bg-yellow-400 w-fit py-0.5 px-2 rounded-sm">{seriesItem?.notifications[seriesItem?.notifications.length - 1]}</p>
                                    )}
                                    <p className="text-gray-500 items-center justify-center gap-1 text-xs hidden xs:flex lg:hidden xl:flex">
                                        <GrUpdate className="fill-gray-500" />
                                        <span>{calcUpdate(seriesItem.updated_at)}</span>
                                    </p>
                                </div>
                            </div>

                            {/* <span className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center duration-200"></span>
                            <FaPlay className="text-white text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 transition-all group-hover:opacity-100 group-hover:scale-100 duration-200" /> */}
                        </li>
                    </a>
                )) : (
                    <>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                        <div className="bg-white dark:bg-primary rounded-lg h-20"></div>
                    </>
                )}
            </ul>
        </div>
    )
}
