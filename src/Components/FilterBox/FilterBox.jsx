import React from 'react'

import { IoFilter } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export default function FilterBox({setShowFilterModal}) {

    const showFilterModal = () => {
        setShowFilterModal(true)
    }

    return (
        <div className="py-4 px-4 rounded-xl bg-white dark:bg-secondary shadow shadow-black/5">
            <div className="hidden xl:flex col-start-1 col-end-4 flex-col items-cent justify-center h-fit gap-5">
                <div className="flex items-center justify-center gap-5">
                    <div className="filter-type bg-sky-100 dark:bg-primary rounded-3xl p-2 flex items-center justify-center">
                        <input type="radio" className="hidden" name="genre" id="film" checked />
                        <label htmlFor="film" className="font-vazir py-2 px-4 cursor-pointer rounded-2xl text-light-gray dark:text-white hover:text-sky-500 transition-colors select-none">فیلم</label>

                        <input type="radio" className="hidden" name="genre" id="serial" />
                        <label htmlFor="serial" className="font-vazir text-light-gray dark:text-white py-2 px-4 cursor-pointer rounded-2xl hover:text-sky-500 transition-colors select-none">سریال</label>
                    </div>
                    <div className="filter-selectBox ">
                        <label htmlFor="genre" className="text-light-gray dark:text-white font-vazir select-none">ژانر</label>
                        <select name="" id="genre" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                            <option value="">ترسناک</option>
                            <option value="">عاشقانه</option>
                            <option value="">جنایی</option>
                            <option value="">انیمیشن</option>
                            <option value="">علمی تخیلی</option>
                            <option value="">مستند</option>
                            <option value="">درام</option>
                            <option value="">موزیکال</option>
                            <option value="">تاریخی</option>
                        </select>
                    </div>
                    <div className="filter-selectBox ">
                        <label htmlFor="imdb-rate" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (IMDb)</label>
                        <select name="" id="imdb-rate" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                            <option value="">امتياز</option>
                            <option value="">بالاي 9</option>
                            <option value="">بالاي 8</option>
                            <option value="">بالاي 7</option>
                            <option value="">بالاي 6</option>
                            <option value="">بالاي 5</option>
                        </select>
                    </div>
                    <div className="filter-selectBox ">
                        <label htmlFor="rotten-rate" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (rotten tomatoes)</label>
                        <select name="" id="rotten-rate" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                            <option value="">امتياز</option>
                            <option value="">بالاي 90</option>
                            <option value="">بالاي 80</option>
                            <option value="">بالاي 70</option>
                            <option value="">بالاي 60</option>
                            <option value="">بالاي 50</option>
                        </select>
                    </div>
                    <div className="filter-selectBox ">
                        <label htmlFor="meta-rate" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (metacritic)</label>
                        <select name="" id="meta-rate" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                            <option value="">امتياز</option>
                            <option value="">بالاي 90</option>
                            <option value="">بالاي 80</option>
                            <option value="">بالاي 70</option>
                            <option value="">بالاي 60</option>
                            <option value="">بالاي 50</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <div className="filter-lang flex items-center">
                        <input type="checkbox" className="hidden" id="subtitle" />
                        <label htmlFor="subtitle" className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                            <span>زيرنويس</span>
                            <div className="flex items-center w-12 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 cursor-pointer transition-colors">
                                <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-white"></span>
                            </div>
                        </label>
                    </div>
                    <div className="filter-lang flex items-center">
                        <input type="checkbox" className="hidden" id="dubed" />
                        <label htmlFor="dubed" className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                            <span>دوبله</span>
                            <div className="flex items-center w-12 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 cursor-pointer transition-colors">
                                <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-white"></span>
                            </div>
                        </label>
                    </div>
                    <div className="filter-selectBox">
                        <label htmlFor="country" className="text-light-gray dark:text-white font-shabnam select-none">كشور</label>
                        <select name="" id="country" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                            <option value="">كشور</option>
                            <option value="">آمريكا</option>
                            <option value="">انگلبس</option>
                            <option value="">كره جنوبي</option>
                            <option value="">ژاپن</option>
                            <option value="">ایران</option>
                            <option value="">آلمان</option>
                            <option value="">فرانسه</option>
                            <option value="">ایتالیا</option>
                            <option value="">برزیل</option>
                            <option value="">اسپانیا</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <label htmlFor="from-year" className="text-white font-vazir select-none">از سال</label>
                        <input type="number" className="bg-sky-100 dark:bg-primary rounded-lg p-3 text-light-gray dark:placeholder:text-white placeholder:text-light-gray dark:text-white outline-none focus:border focus:border-sky-500" name="" id="from-year" min={1950} max={2025} placeholder={1950} />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <label htmlFor="to-year" className="text-white font-vazir select-none">تا سال</label>
                        <input type="number" className="bg-sky-100 dark:bg-primary rounded-lg p-3 text-light-gray dark:placeholder:text-white placeholder:text-light-gray dark:text-white outline-none focus:border focus:border-sky-500" name="" id="to-year" min={1951} max={2025} placeholder={1951} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-full bg-sky-600 hover:bg-sky-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">جستجو</button>
                    <button className="w-full bg-red-600 hover:bg-red-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">ريست</button>
                </div>
            </div>
            <div
                className="flex xl:hidden items-center justify-between cursor-pointer"
                onClick={showFilterModal}
            >
                <div className="p-1 rounded-full bg-gray-100 dark:bg-primary">
                    <FaAngleDown className="text-gray-500 dark:text-white" />
                </div>
                
                <h2 className="text-light-gray dark:text-white font-vazir">جستجوی پیشرفته</h2>

                <div className="p-1 rounded-full bg-sky-500">
                    <IoFilter className="text-white dark:text-primary" />
                </div>
            </div>
        </div>
    )
}
