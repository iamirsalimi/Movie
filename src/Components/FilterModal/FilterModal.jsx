import React from 'react'

import { RxCross2 } from "react-icons/rx";

export default function FilterModal({ showModal, setShowModal }) {

    const hideMenu = () => {
        setShowModal()
    }

    return (
        <div className={`fixed overflow-y-auto z-50 top-0 left-0 w-full h-full py-10 px-10 bg-white dark:bg-secondary flex xl:hidden flex-col items-center justify-center gap-5 transition-all mb-7 ${showModal ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`}>

            <button className="w-fit absolute top-1 right-1 p-1 rounded-sm bg-gray-100 text-gray-800 cursor-pointer" onClick={hideMenu}>
                <RxCross2 className="text-xl" />
            </button>

            <div className="mt-52 flex flex-col items-center justify-center gap-5">
                <div className="filter-type bg-sky-100 dark:bg-primary rounded-3xl p-2 flex items-center justify-center">
                    <input type="radio" className="hidden" name="genre" id="film-modal" checked />
                    <label htmlFor="film-modal" className="font-vazir py-2 px-4 cursor-pointer rounded-2xl text-light-gray dark:text-white hover:text-sky-500 transition-colors select-none">فیلم</label>

                    <input type="radio" className="hidden" name="genre" id="serial-modal" />
                    <label htmlFor="serial-modal" className="font-vazir text-light-gray dark:text-white py-2 px-4 cursor-pointer rounded-2xl hover:text-sky-500 transition-colors select-none">سریال</label>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="genre-modal" className="text-light-gray dark:text-white font-vazir select-none">ژانر</label>
                    <select name="" id="genre-modal" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
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
                    <label htmlFor="imdb-rate-modal" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (IMDb)</label>
                    <select name="" id="imdb-rate-modal" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                        <option value="">امتياز</option>
                        <option value="">بالاي 9</option>
                        <option value="">بالاي 8</option>
                        <option value="">بالاي 7</option>
                        <option value="">بالاي 6</option>
                        <option value="">بالاي 5</option>
                    </select>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="rotten-rate-modal" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (rotten tomatoes)</label>
                    <select name="" id="rotten-rate-modal" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                        <option value="">امتياز</option>
                        <option value="">بالاي 90</option>
                        <option value="">بالاي 80</option>
                        <option value="">بالاي 70</option>
                        <option value="">بالاي 60</option>
                        <option value="">بالاي 50</option>
                    </select>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="meta-rate-modal" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (metacritic)</label>
                    <select name="" id="meta-rate-modal" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
                        <option value="">امتياز</option>
                        <option value="">بالاي 90</option>
                        <option value="">بالاي 80</option>
                        <option value="">بالاي 70</option>
                        <option value="">بالاي 60</option>
                        <option value="">بالاي 50</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="filter-lang flex items-center">
                    <input type="checkbox" className="hidden" id="subtitle-modal" />
                    <label htmlFor="subtitle-modal" className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                        <span>زيرنويس</span>
                        <div className="flex items-center w-12 rounded-full bg-sky-100 dark:bg-white p-0.5 cursor-pointer transition-colors">
                            <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-sky-500"></span>
                        </div>
                    </label>
                </div>
                <div className="filter-lang flex items-center">
                    <input type="checkbox" className="hidden" id="dubed-modal" />
                    <label htmlFor="dubed-modal" className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                        <span>دوبله</span>
                        <div className="flex items-center w-12 rounded-full bg-sky-100 dark:bg-white p-0.5 cursor-pointer transition-colors">
                            <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-sky-500"></span>
                        </div>
                    </label>
                </div>
                <div className="filter-selectBox">
                    <label htmlFor="country-modal" className="text-light-gray dark:text-white font-shabnam select-none">كشور</label>
                    <select name="" id="country-modal" className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer">
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
                    <label htmlFor="from-year-modal" className="text-white font-vazir select-none">از سال</label>
                    <input type="number" className="bg-sky-100 dark:bg-primary rounded-lg p-3 text-light-gray dark:placeholder:text-light placeholder:text-light-gray dark:text-white outline-none focus:border focus:border-sky-500" name="" id="from-year-modal" min={1950} max={2025} placeholder={1950} />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="to-year-modal" className="text-white font-vazir select-none">تا سال</label>
                    <input type="number" className="bg-sky-100 dark:bg-primary rounded-lg p-3 text-light-gray dark:placeholder:text-light placeholder:text-light-gray dark:text-white outline-none focus:border focus:border-sky-500" name="" id="to-year-modal" min={1951} max={2025} placeholder={1951} />
                </div>
            </div>
            <div className="w-full flex items-center gap-2">
                <button className="w-full bg-sky-600 hover:bg-sky-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">جستجو</button>
                <button className="w-full bg-red-600 hover:bg-red-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">ريست</button>
            </div>
        </div>
    )
}
