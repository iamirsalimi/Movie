import React from 'react'

import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="container mx-auto h-screen p-5 flex flex-col-reverse lg:flex-row items-center justify-center">
            <div className="flex flex-col items-center gap-2 lg:gap-5 -mt-12 lg:-ml-12">
                <h1 className="font-bold text-9xl text-sky-500">404</h1>
                <h2 className="text-center text-xl md:text-3xl lg:text-5xl font-bols font-vazir text-light-gray dark:text-white">صفحه پیدا نشد!</h2>
                <h2 className="text-center text-sm lg:text-2xl font-vazir text-gray-400 dark:text-gray-500">یک مشکلی وجود دارد ، این صفحه ای که شما به دنبالش میگردید وجود ندارد ، اگر فکر میکنید مشکلی وحود دارد ، مشکل را گزارش دهید</h2>
                <div className="flex items-center justify-center gap-2">
                    <button
                        className="px-4 py-1 w-fit rounded-lg cursor-pointer text-lg bg-green-500 transition-colors hover:bg-green-600 text-white dark:text-primary font-vazir"
                        onClick={() => navigate('/', { replace: true })}
                    >برگشت به صفحه اصلی</button>
                    <a href="movieWebsite.support@gmail.com:EMAIL?subject=گزارش مشکل و خرابی&body= درود وقت بخیر" target="_blank">
                        <button className="px-4 py-1 w-fit rounded-lg cursor-pointer text-lg bg-red-500 transition-colors hover:bg-red-600 text-white dark:text-primary font-vazir"
                        >گزارش خرابی</button>
                    </a>
                </div>
            </div>
            <div className="w-fit lg:min-w-1/2 h-full rounded-md">
                <img src="/src/assets/404 Page.png" alt="" className="w-full h-full object-contain object-center" />
            </div>
        </div>
    )
}
