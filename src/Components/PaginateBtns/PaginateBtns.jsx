import React from 'react'

import { useLocation } from 'react-router-dom'

export default function PaginateBtns({currentPage , buttonsArray , midBtns , route = ""}) {
    let search = useLocation().search || ''
    
    return (
        <>
            {currentPage !== 1 && (
                <a href={`${route}/${currentPage - 1 == 1 ? '' : `page/${currentPage - 1}`}${search}`}>
                    <button className="py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold text-shabnam">صفحه قبل</button>
                </a>
            )}

            {currentPage > 3 && (
                <>
                    <a href={`${route}/${search}`}>
                        <button className={`py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == 1 && 'active-paginate'}`}>1</button>
                    </a>

                    <button className="py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold">...</button>
                </>
            )}

            {midBtns().map((button , index) => (
                <a key={index} href={`${route}/page/${button + 1}${search}`}>
                    <button
                        key={button}
                        className={`py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == (button + 1) && 'active-paginate'}`}
                    >{button + 1}</button>
                </a>
            ))}

            {currentPage < (buttonsArray.length - 2) && (
                <>
                    <button className="py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold">...</button>

                    <a href={`${route}/page/${buttonsArray.length}${search}`}>
                        <button className={`py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == buttonsArray.length && 'active-paginate'}`}>{buttonsArray.length}</button>
                    </a>
                </>
            )}

            {currentPage !== buttonsArray.length && (
                <a href={`${route}/page/${currentPage + 1}${search}`}>
                    <button className="py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold text-shabnam">صفحه بعد</button>
                </a>
            )}
        </>
    )
}
