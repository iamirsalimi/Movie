import React, { useState, useEffect } from 'react'

import { IoFilter } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

export default function FilterBox({activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry,activeTypeArray, setActiveTypeArray,thisYear,filterMovies, resetFilters , setShowFilterModal}) {
    // const [activeType, setActiveType] = useState('movie')
    // const [genre, setGenre] = useState('genre')
    // const [imdb, setImdb] = useState('score')
    // const [rotten, setRotten] = useState('score')
    // const [metacritic, setMetacritic] = useState('score')
    // const [hasSubtitle, setHasSubtitle] = useState(false)
    // const [isDubbed, setIsDubbed] = useState(false)
    // const [country, setCountry] = useState('country')
    // const [fromYear, setFromYear] = useState(1950)
    // const [toYear, setToYear] = useState(thisYear)

    // const {activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry, resetFilters} = useFilter('movie' , thisYear)
    
    // const [activeTypeArray, setActiveTypeArray] = useState(genres[activeType])
    
    const showFilterModal = () => {
        setShowFilterModal(true)
    }

    const changeMovieType = e => {
        let genreType = e.target.dataset.type
        setActiveType(genreType)
    }

    // const resetFilters = () => {
    //     setActiveType('movie')
    //     setGenre('genre')
    //     setImdb('score')
    //     setRotten('score')
    //     setMetacritic('score')
    //     setHasSubtitle(false)
    //     setIsDubbed(false)
    //     setCountry('country')
    //     setFromYear(1950)
    //     setToYear(thisYear)
    // }

    // const filterMovies = () => {
    //     console.log('clicked', country)
    //     const query = new URLSearchParams()

    //     if (activeType) query.set('movieType', activeType)
    //     if (genre != 'genre') query.set('genre', genre)
    //     if (imdb != 'score') query.set('imdb', imdb)
    //     if (rotten != 'score') query.set('rotten', rotten)
    //     if (metacritic != 'score') query.set('metacritic', metacritic)
    //     if (country != 'country') query.set('country', country)
    //     if (hasSubtitle) query.set('hasSubtitle', hasSubtitle)
    //     if (isDubbed) query.set('isDubbed', isDubbed)
    //     if (parseInt(fromYear) && +fromYear != 1950) query.set('fromYear', fromYear)
    //     if (parseInt(toYear) && +toYear != 2025) query.set('toYear', toYear)

    //     const queryString = query.toString()

    //     console.log(queryString)
    //     if (queryString) {
    //         window.location = `?${queryString}`
    //     }
    // }

    // useEffect(() => {
    //     setActiveTypeArray(genres[activeType])
    // }, [activeType])

    return (
        <div className="py-4 px-4 rounded-xl bg-white dark:bg-secondary shadow shadow-black/5">
            <div className="hidden xl:flex col-start-1 col-end-4 flex-col items-cent justify-center h-fit gap-5">
                <div className="flex items-center justify-center gap-5">
                    <div className="genreType flex items-center justify-center gap-1 p-1 bg-sky-100 dark:bg-primary rounded-full">
                        <input type="radio" name="box-genreTypes" id="box-film" className="hidden" onChange={changeMovieType} data-type="movie" checked={activeType == 'movie'} />
                        <label htmlFor="box-film" className="font-vazir text-light-gray dark:text-white transition-colors p-2 rounded-full cursor-pointer select-none" >فیلم</label>

                        <input type="radio" name="box-genreTypes" id="box-serial" className="hidden" onChange={changeMovieType} data-type="series" checked={activeType == 'series'} />
                        <label htmlFor="box-serial" className="font-vazir text-light-gray dark:text-white transition-colors p-2 rounded-full cursor-pointer select-none">سریال</label>
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
                            {activeTypeArray.map(genre => (
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
                <div className="flex items-center justify-center gap-5">
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
                <div className="flex items-center gap-2">
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
