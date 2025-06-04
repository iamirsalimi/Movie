import React, { useState, useEffect } from 'react'

import { RxCross2 } from "react-icons/rx";

export default function FilterModal({ showModal, setShowModal ,activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry,activeTypeArray, setActiveTypeArray,thisYear,filterMovies, resetFilters }) {

    const hideMenu = () => {
        setShowModal()
    }

    return (
        <div className={`fixed overflow-y-auto z-50 top-0 left-0 w-full h-full py-10 px-10 bg-white dark:bg-secondary flex xl:hidden flex-col items-center justify-center gap-5 transition-all mb-7 ${showModal ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`}>

            <button className="w-fit absolute top-1 right-1 p-1 rounded-sm bg-gray-100 text-gray-800 cursor-pointer" onClick={hideMenu}>
                <RxCross2 className="text-xl" />
            </button>

            <div className="mt-52 flex flex-col items-center justify-center gap-5">
                <div className="genreType flex items-center justify-center gap-1 p-1 bg-sky-100 dark:bg-primary rounded-full">
                    <input type="radio" name="modal-genreTypes" id="modal-film" className="hidden" value="movie" checked={activeType === 'movie'} onChange={() => setActiveType('movie')} />
                    <label htmlFor="modal-film" className="font-vazir text-light-gray dark:text-white transition-colors p-2 rounded-full cursor-pointer select-none" >فیلم</label>

                    <input type="radio" name="modal-genreTypes" id="modal-serial" className="hidden" value="series" checked={activeType === 'series'} onChange={() => setActiveType('series')} />
                    <label htmlFor="modal-serial" className="font-vazir text-light-gray dark:text-white transition-colors p-2 rounded-full cursor-pointer select-none">سریال</label>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="genre" className="text-light-gray dark:text-white font-vazir select-none">ژانر</label>
                    <select
                        name=""
                        id="genre"
                        className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    >
                        <option value="genre">ژانر</option>
                        {activeTypeArray?.map(genre => (
                            <option key={genre.value} value={genre.value}>{genre.label}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="imdb-rate" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (IMDb)</label>
                    <select
                        name=""
                        id="imdb-rate"
                        className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer"
                        value={imdb}
                        onChange={e => setImdb(e.target.value)}
                    >
                        <option value="score">امتياز</option>
                        <option value="9">بالاي 9</option>
                        <option value="8">بالاي 8</option>
                        <option value="7">بالاي 7</option>
                        <option value="6">بالاي 6</option>
                        <option value="5">بالاي 5</option>
                    </select>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="rotten-rate" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (Rotten Tomatoes)</label>
                    <select
                        name=""
                        id="rotten-rate"
                        className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer"
                        value={rotten}
                        onChange={e => setRotten(e.target.value)}
                    >
                        <option value="score">امتياز</option>
                        <option value="90">بالاي 90</option>
                        <option value="80">بالاي 80</option>
                        <option value="70">بالاي 70</option>
                        <option value="60">بالاي 60</option>
                        <option value="50">بالاي 50</option>
                    </select>
                </div>
                <div className="filter-selectBox ">
                    <label htmlFor="meta-rate" className="text-light-gray dark:text-white font-vazir select-none text-nowrap">امتياز (Metacritic)</label>
                    <select
                        name=""
                        id="meta-rate"
                        className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer"
                        value={metacritic}
                        onChange={e => setMetacritic(e.target.value)}

                    >
                        <option value="score">امتياز</option>
                        <option value="90">بالاي 90</option>
                        <option value="80">بالاي 80</option>
                        <option value="70">بالاي 70</option>
                        <option value="60">بالاي 60</option>
                        <option value="50">بالاي 50</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="filter-lang flex items-center">
                    <input type="checkbox" className="hidden" id="subtitle" value={hasSubtitle} onChange={e => setHasSubtitle(e.target.checked)} />
                    <label htmlFor="subtitle" className={`text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2 ${hasSubtitle ? 'checked-filter' : ''}`}>
                        <span>زيرنويس</span>
                        <div className="flex items-center w-12 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 cursor-pointer transition-colors">
                            <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-white"></span>
                        </div>
                    </label>
                </div>
                <div className="filter-lang flex items-center">
                    <input type="checkbox" className="hidden" id="dubbed" value={isDubbed} onChange={e => setIsDubbed(e.target.checked)} />
                    <label htmlFor="dubbed" className={`text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2 ${isDubbed ? 'checked-filter' : ''}`}>
                        <span>دوبله</span>
                        <div className="flex items-center w-12 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 cursor-pointer transition-colors">
                            <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-white"></span>
                        </div>
                    </label>
                </div>
                <div className="filter-selectBox">
                    <label htmlFor="country" className="text-light-gray dark:text-white font-shabnam select-none">كشور</label>
                    <select
                        name=""
                        id="country"
                        className="bg-sky-100 dark:bg-primary p-3 text-light-gray dark:text-white font-vazir rounded-2xl cursor-pointer"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    >
                        <option value="country">كشور</option>
                        <option value="USA">آمريكا</option>
                        <option value="britain">انگلبس</option>
                        <option value="south-korea">كره جنوبي</option>
                        <option value="japan">ژاپن</option>
                        <option value="iran">ایران</option>
                        <option value="germany">آلمان</option>
                        <option value="france">فرانسه</option>
                        <option value="italy">ایتالیا</option>
                        <option value="brazil">برزیل</option>
                        <option value="spain">اسپانیا</option>
                        <option value="indonesia">اندونزی</option>
                        <option value="denmark">دانمارک</option>
                        <option value="china">چین</option>
                        <option value="turkey">ترکیه</option>
                        <option value="india">هند</option>
                        <option value="albania">آلبانی</option>
                    </select>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="from-year" className="text-white font-vazir select-none">از سال</label>
                    <input type="number" className="bg-sky-100 dark:bg-primary rounded-lg p-3 text-light-gray dark:placeholder:text-white placeholder:text-light-gray dark:text-white outline-none focus:border focus:border-sky-500" name="" id="from-year" min={1950} max={toYear} placeholder={1950} value={fromYear} onChange={e => setFromYear(e.target.value)} />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="to-year" className="text-white font-vazir select-none">تا سال</label>
                    <input type="number" className="bg-sky-100 dark:bg-primary rounded-lg p-3 text-light-gray dark:placeholder:text-white placeholder:text-light-gray dark:text-white outline-none focus:border focus:border-sky-500" name="" id="to-year" min={1951} max={thisYear} placeholder={1951} value={toYear} onChange={e => setToYear(e.target.value)} />
                </div>
            </div>
            <div className="w-full flex items-center gap-2">
                <button
                    className="w-full bg-sky-600 hover:bg-sky-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer"
                    onClick={filterMovies}
                >جستجو</button>
                <button
                    className="w-full bg-red-600 hover:bg-red-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer"
                    onClick={resetFilters}
                >ريست</button>
            </div>
        </div>
    )
}
