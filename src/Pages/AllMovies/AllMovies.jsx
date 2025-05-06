import React from 'react'

export default function AllMovies() {
    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">فیلم ها</h2>
                <a href="/my-account/adminPanel/movies/add-movie" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors">افزودن فیلم جدید</a>
            </div>
            <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">

                <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                    <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value="">
                            <option value="">ID</option>
                            <option value="">نام فیلم</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
                    </div>
                </div>

                <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                    <table className="w-full">
                        <thead className="min-w-full">
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">سال انتشار</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نمرات سایت</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تعداد دیدگاه ها</th>
                                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>

            </div>
        </div>
    )
}
