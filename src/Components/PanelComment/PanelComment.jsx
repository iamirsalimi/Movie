import React, { useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

dayjs.extend(jalali)

export default function PanelComment({ id, comments, movieId, movieType, movieTitle, movieSrc, status, created_at, text, has_spoiler }) {
    const [replies, setReplies] = useState(() => {
        let repliesArray = comments?.filter(comment => comment.parentId == id)
        return repliesArray
    })

    // return the easy readable time and date with Iran timezone
    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    return (
        <div className="w-full flex flex-col items-center gap-5 bg-gray-100 dark:bg-primary rounded-lg border-r-4 px-3 py-2 border-sky-500">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="overflow-hidden rounded-md w-full h-36 lg:min-w-28 lg:h-28">
                        <img src={movieSrc} alt="" className="h-full w-full object-center object-cover" />
                    </div>
                    <div className="flex flex-col xs:flex-row lg:flex-col items-center gap-2">
                        {has_spoiler && (
                            <span className="border border-white dark:border-secondary text-nowrap text-red-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1">دیدگاه دارای اسپویل می باشد</span>
                        )}
                        <span className={`border border-white dark:border-secondary text-nowrap ${status == 'approved' ? 'text-green-500' : status == 'rejected' ? 'text-red-500' : 'text-gray-500'} font-vazir text-center rounded-sm w-full text-xs px-2 py-1`}>{status == 'approved' ? 'تایید شده' : status == 'rejected' ? 'رد شده' : 'در حال بررسي'}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                    <a href={`/${movieType}/${movieId}${status == 'approved' ? `#comment-${id}` : ''}`} className="font-vazir cursor-pointer text-sky-500">{movieTitle}</a>
                    <span className="text-gray-400 dark:text-gray-600 font-vazir-light text-sm">{getDate(created_at)}</span>
                    <p className="text-light-gray dark:text-gray-400 font-vazir-light text-sm text-center lg:text-justify line-clamp-3">{text}</p>
                </div>
            </div>


            {/* replies */}

            {replies.length > 0 && (
                <div className="flex flex-col lg:flex-row lg:items-start gap-2 pt-5 border-t border-gray-200 dark:border-gray-700 w-full">
                    <h2 className="text-light-gray dark:text-gray-300 font-vazir text-nowrap">پاسخ ها</h2>

                    {replies.map(reply => (
                        <div className="w-full flex flex-col gap-2 bg-white dark:bg-secondary rounded-lg py-4 px-5">
                            <div className="w-full flex flex-col lg:flex-row gap-4 border border-gray-200 dark:border-primary px-3 py-2 rounded-md">
                                <div className="flex flex-col xs:flex-row lg:flex-col items-center gap-2">
                                    {reply.has_spoiler && (
                                        <span className="border border-gray-200 dark:border-primary text-nowrap text-red-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1">دیدگاه دارای اسپویل می باشد</span>
                                    )}
                                    <span className={`border border-white dark:border-secondary text-nowrap ${reply.status == 'approved' ? 'text-green-500' : reply.status == 'rejected' ? 'text-red-500' : 'text-gray-500'} text-green-500 font-vazir text-center rounded-sm w-full text-xs px-2 py-1`}>{reply.status == 'approved' ? 'تایید شده' : reply.status == 'rejected' ? 'رد شده' : 'در حال بررسي'}</span>
                                </div>

                                <div className="flex flex-col items-center lg:items-start gap-1 w-full">
                                    <a href={`/${reply.movieType}/${reply.movieId}${reply.status == 'approved' ? `#comment-${reply.id}` : ''}`} className="font-vazir cursor-pointer text-sky-500">{reply.movieTitle}</a>
                                    <span className="text-gray-400 dark:text-gray-600 font-vazir-light text-sm">{getDate(reply.created_at)}</span>
                                    <p className="text-light-gray dark:text-gray-400 font-vazir-light text-sm text-center lg:text-justify line-clamp-3">{reply.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
