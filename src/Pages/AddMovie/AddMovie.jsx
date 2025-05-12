import React, { useState, useEffect } from 'react'

import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';


import { casts, movies } from './../../moviesData'

import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";

dayjs.extend(jalali)

const genres = {
    'movie': ['اکشن', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'انیمه', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی'],
    'series': ['اکشن', 'Talk-Show', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'انیمه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی', 'موسیقی']
}

const days = ['sunday', 'monday', 'tuesday', 'wednsday', 'thursday', 'friday', 'saturday']

export default function AddMovie() {
    const [subtitleCheckbox, setSubtitleCheckbox] = useState(false)
    const [dubbedCheckbox, setDubbedCheckbox] = useState(false)
    const [isInHeaderSliderCheckbox, setIsInHeaderSliderCheckbox] = useState(false)
    const [isInNewMoviesCheckbox, setIsInNewMoviesCheckbox] = useState(false)
    const [suggestedCheckbox, setSuggestedCheckbox] = useState(false)
    const [allEpisodesReleasedInADayCheckBox, setAllEpisodesReleasedInADayCheckBox] = useState(false)

    const [movieType, setMovieType] = useState('movie') // movie or series
    const [movieStatus, setMovieStatus] = useState('released') // released or premiere

    const [releaseStatus, setReleaseStatus] = useState('broadcasting') // released or broadcasting or canceled
    const [broadcastDay, setBroadcastDay] = useState('saturday') // days of the week
    const [newSeasonNumber, setNewSeasonNumber] = useState()
    const [newSeasonEpisodesCount, setNewSeasonEpisodesCount] = useState()
    const [broadCastGap, setBroadCastGap] = useState(7)
    const [broadCastEpisodePerPart, setBroadCastEpisodePerPart] = useState(1)
    const [newSeasonEpisodesTable, setNewSeasonEpisodesTable] = useState([])

    const [linkTitle, setLinkTitle] = useState()
    const [linkType, setLinkType] = useState('dubbed')
    const [links, setLinks] = useState([])

    const [tagTitle, setTagTitle] = useState('')
    const [tags, setTags] = useState([])

    const [genre, setGenre] = useState('')
    const [showGenres, setShowGenres] = useState(false)
    const [movieGenres, setMovieGenres] = useState([])

    const [similarMovieId, setSimilarMovieId] = useState('')
    const [showSimilarMovies, setShowSimilarMovies] = useState(false)
    const [similarMovies, setSimilarMovies] = useState([])


    const [castId, setCastId] = useState()
    const [castName, setCastName] = useState('')
    const [castRule, setCastRule] = useState('actor')
    const [showCasts, setShowCasts] = useState(false)
    const [movieCasts, setMovieCasts] = useState([])

    const [notifTitle, setNotifTitle] = useState('')
    const [notifs, setNotifs] = useState([])

    const [releaseDate, setReleaseDate] = useState(new Date())

    const formattedJalaliDate = dayjs(releaseDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')

    // add Link
    const addLink = e => {
        e.preventDefault()
        if (linkTitle && linkType) {
            let newLinkObj = { id: Math.floor(Math.random() * 999), title: linkTitle, type: linkType, links: [] }
            setLinks(prev => [...prev, newLinkObj])
            setLinkTitle('')
        }
    }

    const deleteLink = id => {
        let newLinks = links.filter(link => link.id !== id)
        setLinks(newLinks)
    }

    // add Tag
    const addTag = e => {
        if (tagTitle) {
            let newTags = new Set(tags)
            newTags.add(tagTitle)
            setTags([...newTags])
            setTagTitle('')
        }
    }

    const deleteTag = tagTitle => {
        let newTags = new Set(tags)
        newTags.delete(tagTitle)
        setTags([...newTags])
    }

    // add Notif
    const addNotif = e => {
        if (notifTitle) {
            let newNotifs = new Set(notifs)
            newNotifs.add(notifTitle)
            setNotifs([...newNotifs])
            setNotifTitle('')
        }
    }

    const deleteNotif = notifTitle => {
        let newNotifs = new Set(notifs)
        newNotifs.delete(notifTitle)
        setNotifs([...newNotifs])
    }

    // add similar Movies
    const addSimilarMovie = e => {
        if (similarMovieId) {
            let movieObj = movies.find(movie => movie.id == similarMovieId)
            let newSimilarMovieObj = { id: Math.floor(Math.random() * 999), movieId: similarMovieId, title: movieObj.title, src: movieObj.src }
            setSimilarMovies(prev => [...prev, newSimilarMovieObj])
            setSimilarMovieId('')
        }
    }

    const deleteSimilarMovie = movieId => {
        let newSimilarMovies = similarMovies.filter(movie => movie.id !== movieId)
        setSimilarMovies(newSimilarMovies)
    }

    // add genres
    const addGenre = genre => {
        let newGenres = new Set(movieGenres)
        newGenres.add(genre)
        setMovieGenres([...newGenres])
        setGenre('')
    }

    const deleteGenre = genre => {
        let newGenres = new Set(movieGenres)
        newGenres.delete(genre)
        setMovieGenres([...newGenres])
    }

    // add genres
    const addCast = e => {
        if (castId && castName && castRule) {
            let newCast = { id: castId, name: castName, rule: castRule }
            setMovieCasts(prev => [...prev, newCast])
            console.log(newCast)
            setCastName('')
            setCastRule('actor')
            setCastId('')
        }
    }

    const deleteCast = castId => {
        let newCasts = movieCasts.filter(cast => cast.id !== castId)
        setMovieCasts(newCasts)
    }

    // to suggest genres
    useEffect(() => {
        setShowGenres(genre.trim().length != 0 ? true : false)
    }, [genre])

    // to suggest casts
    useEffect(() => {
        setShowCasts(castName.trim().length != 0 ? true : false)
    }, [castName])

    // to suggest similar movies
    useEffect(() => {
        setShowSimilarMovies(+similarMovieId != 0 ? true : false)
    }, [similarMovieId])

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 overflow-hidden mb-20 md:mb-10">
            <div className="flex items-center justify-center">
                <h2 className="w-full font-vazir text-gray-800 dark:text-white text-xl">افزودن فیلم جدید</h2>
                <a href="/my-account/adminPanel/movies" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست فیلم ها</span>
                </a>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام فیلم</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان اصلی فیلم</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">cover</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">banner</span>
                </div>

                <div className="md:col-start-1 md:col-end-3 w-full relative flex items-center justify-center gap-1">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={movieStatus} onChange={e => setMovieStatus(e.target.value)}>
                        <option value="released">منتشر شده</option>
                        <option value="premiere">پیش نمایش</option>
                    </select>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">وضعیت انتشار</span>
                </div>

                {movieType == 'series' && (
                    <div className="w-full relative select-none">
                        <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={releaseStatus} onChange={e => setReleaseStatus(e.target.value)} >
                            <option value="broadcasting">در حال پخش</option>
                            <option value="released">اتمام</option>
                            <option value="canceled">کنسل شده</option>
                        </select>

                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">وضعیت پخش</span>
                    </div>

                )}

                <div className="w-full relative flex items-center justify-center gap-1">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={movieType} onChange={e => setMovieType(e.target.value)}>
                        <option value="movie">فیلم</option>
                        <option value="series">سریال</option>
                    </select>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع فیلم</span>
                </div>

                <div className="w-full relative flex items-center justify-center gap-1">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value="">
                        <option value="">G</option>
                        <option value="">PG</option>
                        <option value="">PG-13</option>
                        <option value="">R</option>
                        <option value="">NC-17</option>
                    </select>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">رده سنی</span>
                </div>

                {/* genre */}
                <div className="md:col-start-1 md:col-end-3 w-full relative select-none flex flex-col items-center gap-2">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ژانر</span>

                    <ul className={`absolute top-15 z-30 ${showGenres ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-4 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                        {genres[movieType].filter(movieGenre => movieGenre.toLowerCase().startsWith(genre.toLowerCase())).length !== 0 ? genres[movieType].filter(movieGenre => movieGenre.toLowerCase().startsWith(genre.toLowerCase())).map(genre => (
                            <li
                                className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center"
                                onClick={e => addGenre(genre)}
                            >
                                <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{genre}</span>
                            </li>
                        )) :
                            <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">ژانر "{genre}" وجود ندارد</div>
                        }
                    </ul>

                    {movieGenres.length !== 0 && (
                        <div className="w-full bg-gray-100 dark:bg-primary rounded-lg py-2 px-4 flex items-center gap-2">
                            {movieGenres.map(genre => (
                                <li
                                    className="rounded-md border border-white dark:border-secondary transition-all py-2 px-1 text-center inline-flex items-center justify-center gap-4"
                                >
                                    <span className="text-sm font-vazir text-light-gray dark:text-white">{genre}</span>
                                    <button
                                        className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                        onClick={e => deleteGenre(genre)}
                                    >
                                        <RxCross2 className="text-white !cursor-pointer" />
                                    </button>
                                </li>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="number"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        min={1900}
                        max={2050}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">سال انتشار</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شبکه</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="number"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">IMDb</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="number"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        min={0}
                        max={100}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Rotten Tomatoes</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="number"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        min={0}
                        max={100}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Metacritic</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">محصول</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">زبان</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">کیفیت</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="number"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        min={1}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">مدت زمان (دقیقه)</span>
                </div>

                <div className='w-full relative select-none'>
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">سال {movieType == 'series' ? 'های' : ''} پخش</span>
                </div>

                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                    <textarea className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    ></textarea>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
                </div>

                {/* checkboxes */}
                <div className="md:col-start-1 md:col-end-3 w-full relative grid grid-cols-2 gap-y-5">
                    <div className="w-full flex items-center justify-center gap-2">
                        <input id="subtitle-checkbox" type="checkbox" value="" className="peer" hidden checked={subtitleCheckbox} onChange={e => setSubtitleCheckbox(e.target.checked)} />
                        <label htmlFor="subtitle-checkbox" className="flex items-center gap-2">
                            <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">زیرنویس</span>
                            <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${subtitleCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center gap-2">
                        <input id="dubbed-checkbox" type="checkbox" value="" className="peer" hidden checked={dubbedCheckbox} onChange={e => setDubbedCheckbox(e.target.checked)} />
                        <label htmlFor="dubbed-checkbox" className="flex items-center gap-2">
                            <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">دوبله</span>
                            <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${dubbedCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center gap-2">
                        <input id="isInHeaderSlider-checkbox" type="checkbox" value="" className="peer" hidden checked={isInHeaderSliderCheckbox} onChange={e => setIsInHeaderSliderCheckbox(e.target.checked)} />
                        <label htmlFor="isInHeaderSlider-checkbox" className="flex items-center gap-2">
                            <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">درون اسلایدر هدر باشد؟</span>
                            <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${isInHeaderSliderCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center gap-2">
                        <input id="isInNewMovies-checkbox" type="checkbox" value="" className="peer" hidden checked={isInNewMoviesCheckbox} onChange={e => setIsInNewMoviesCheckbox(e.target.checked)} />
                        <label htmlFor="isInNewMovies-checkbox" className="flex items-center gap-2">
                            <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">درون جدیدترین فیلم ها باشد؟</span>
                            <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${isInNewMoviesCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center gap-2">
                        <input id="suggested-checkbox" type="checkbox" value="" className="peer" hidden checked={suggestedCheckbox} onChange={e => setSuggestedCheckbox(e.target.checked)} />
                        <label htmlFor="suggested-checkbox" className="flex items-center gap-2">
                            <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">پیشنهادی</span>
                            <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${suggestedCheckbox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                        </label>
                    </div>
                </div>

                {/* links */}
                <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">ساخت لینک جدید</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={linkTitle}
                                    onChange={e => setLinkTitle(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">عنوان باکس دانلود</span>
                            </div>

                            <div className="w-full relative flex items-center justify-center gap-1">
                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={linkType} onChange={e => setLinkType(e.target.value)} >
                                    <option value="dubbed">دوبله</option>
                                    <option value="subtitle">زیرنویس</option>
                                    <option value="mainLanguage">زبان اصلی</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">نوع باکس دانلود</span>
                            </div>

                            <button
                                className="md:col-start-1 md:col-end-3 py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addLink}
                            >افزودن</button>
                        </div>

                        {links.length !== 0 && (
                            <div className="w-full flex flex-col items-center gap-2">
                                <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">لینک های فیلم</h3>
                                <div className="w-full flex flex-col items-center gap-2">
                                    {links.map(link => (
                                        <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                            <div className="flex items-end justify-center gap-1">
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{link.title}</h3>
                                                <span className="text-gray-400 text-sm dark:text-gray-500 font-shabnam-light">{link.type}</span>
                                            </div>
                                            <button
                                                className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteLink(link.id)}
                                            >
                                                <RxCross2 className="text-white dark:text-primary" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 bg-gray-100 dark:bg-primary rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">ساخت تگ جدید</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-secondary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={tagTitle}
                                    onChange={e => setTagTitle(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-primary">عنوان تگ</span>
                            </div>

                            <button
                                className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addTag}
                            >افزودن</button>
                        </div>

                        {tags.length !== 0 && (
                            <div className="w-full flex flex-col items-center gap-2">
                                <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">تگ های فیلم</h3>
                                <div className="w-full flex flex-col items-center gap-2">
                                    {tags.map(tag => (
                                        <div className="w-full bg-gray-200 dark:bg-secondary flex items-center justify-between px-2 py-1 rounded-lg">
                                            <h3 className="text-light-gray dark:text-white font-shabnam">{tag}</h3>
                                            <button
                                                className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteTag(tag)}
                                            >
                                                <RxCross2 className="text-white dark:text-primary" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* similar Movies */}
                <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن فيلم هاي مشابه</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={similarMovieId}
                                    onChange={e => setSimilarMovieId(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Id فيلم مورد نظر</span>

                                {/* to suggest movies by their Id */}
                                <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showSimilarMovies ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                    {movies.filter(movie => movie.id == similarMovieId).length !== 0 ? movies.filter(movie => movie.id == similarMovieId).map(movie => (
                                        <li
                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                            onClick={e => {
                                                setShowSimilarMovies(false)
                                                setSimilarMovieId(movie.id)
                                            }}
                                        >
                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                <img src={movie.src} alt="" className="w-full h-full object-center object-cover" />
                                            </div>

                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{movie.title}</span>
                                        </li>
                                    )) :
                                        <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">فیلم "{similarMovieId}" وجود ندارد</div>
                                    }
                                </ul>
                            </div>

                            <button
                                className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addSimilarMovie}
                            >افزودن</button>
                        </div>

                        {similarMovies.length !== 0 && (
                            <div className="w-full flex flex-col items-center gap-2">
                                <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">فیلم مشابه</h3>
                                <div className="w-full flex flex-col items-center gap-2">
                                    {similarMovies.map(movie => (
                                        <div className="w-full bg-gray-200 dark:bg-primary flex items-center justify-between px-2 py-1 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="w-15 h-15 overflow-hidden rounded-md">
                                                    <img src={movie.src} alt="" className="w-full h-full object-center object-cover" />
                                                </div>
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{movie.title}</h3>
                                            </div>

                                            <button
                                                className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteSimilarMovie(movie.id)}
                                            >
                                                <RxCross2 className="text-white dark:text-secondary" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cast */}
                <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن عوامل و بازیگر</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={castName}
                                    onChange={e => setCastName(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام بازیگر</span>

                                {/* to suggest casts by their name */}
                                <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showCasts ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                    {casts.filter(cast => cast.name.toLowerCase().startsWith(castName.toLowerCase())).length !== 0 ? casts.filter(cast => cast.name.toLowerCase().startsWith(castName.toLowerCase())).map(cast => (
                                        <li
                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                            onClick={e => {
                                                setShowCasts(false)
                                                setCastName(cast.name)
                                                setCastId(cast.id)
                                            }}
                                        >
                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                <img src={cast.src} alt="" className="w-full h-full object-center object-cover" />
                                            </div>

                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{cast.name}</span>
                                        </li>
                                    )) :
                                        <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">بازیگر/عوامل  "{castName}" وجود ندارد ابتدا آن را به لیست عوامل و بازیگران در تب آن اضافه کنید</div>
                                    }
                                </ul>
                            </div>

                            <div className="w-full relative select-none">
                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={castRule} onChange={e => setCastRule(e.target.value)} >
                                    <option value="actor">بازیگر</option>
                                    <option value="writer">نویسنده</option>
                                    <option value="director">کارگردان</option>
                                    <option value="musicoun">موسیقی دان</option>
                                    <option value="voiceActor">صداپیشه</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نقش</span>
                            </div>

                            <button
                                className="py-2 md:col-start-1 md:col-end-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addCast}
                            >افزودن</button>
                        </div>

                        {movieCasts.length !== 0 && (
                            <div className="w-full bg-gray-100 dark:bg-primary rounded-lg py-2 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                {movieCasts.map(cast => (
                                    <li
                                        className="rounded-md border border-white dark:border-secondary transition-all py-2 px-1 text-center inline-flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-sm font-vazir text-light-gray dark:text-white">{cast.name}</span>
                                            <span className="text-xs font-vazir text-gray-400 dark:text-gray-500">{cast.rule}</span>
                                        </div>
                                        <button
                                            className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                            onClick={e => deleteCast(cast.id)}
                                        >
                                            <RxCross2 className="text-white !cursor-pointer" />
                                        </button>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Notifs */}
                <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                    <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن اعلان ها</h3>
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={notifTitle}
                                    onChange={e => setNotifTitle(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان اعلان</span>
                            </div>

                            <button
                                className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                onClick={addNotif}
                            >افزودن</button>
                        </div>

                        {notifs.length !== 0 && (
                            <div className="w-full flex flex-col items-center gap-2">
                                <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">اعلان های فیلم</h3>
                                <div className="w-full flex flex-col items-center gap-2">
                                    {notifs.map(notif => (
                                        <div className="w-full bg-gray-200 dark:bg-primary flex items-center justify-between px-2 py-1 rounded-lg">
                                            <h3 className="text-light-gray dark:text-white font-shabnam">{notif}</h3>
                                            <button
                                                className="p-1 bg-red-500 hover:bg-blackred-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteNotif(notif)}
                                            >
                                                <RxCross2 className="text-white dark:text-primary" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-start-1 md:col-end-3 w-full flex items-center gap-2">
                    <button className="w-full bg-green-600 hover:bg-green-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">افزودن</button>
                    <button className="w-full bg-red-600 hover:bg-red-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">ريست</button>
                </div>
            </div>
        </div >
    )
}
