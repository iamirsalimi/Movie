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

export default function AddRelease() {
    const [allEpisodesReleasedInADayCheckBox, setAllEpisodesReleasedInADayCheckBox] = useState(false)

    const [movieType, setMovieType] = useState('movie') // movie or series

    const [releaseStatus, setReleaseStatus] = useState('broadcasting') // released or broadcasting or canceled
    const [broadcastDay, setBroadcastDay] = useState('saturday') // days of the week
    const [newSeasonNumber, setNewSeasonNumber] = useState()
    const [newSeasonStartEpisode, setNewSeasonStartEpisode] = useState(1)
    const [newSeasonEpisodesCount, setNewSeasonEpisodesCount] = useState()
    const [broadCastGap, setBroadCastGap] = useState(7)
    const [broadCastEpisodePerPart, setBroadCastEpisodePerPart] = useState(1)
    const [newSeasonEpisodesTable, setNewSeasonEpisodesTable] = useState([])

    const [releaseDate, setReleaseDate] = useState(new Date())

    const formattedJalaliDate = dayjs(releaseDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')

    // this method will calculate when each episode of the series will be released 
    const findBroadcastDateOrder = () => {
        const releaseDates = []
        for (let i = newSeasonStartEpisode - 1 ; i < newSeasonEpisodesCount ; i += +broadCastEpisodePerPart) {
            const currentDate = dayjs(releaseDate).add(i * broadCastGap, "day")

            let newDateObj = null

            // first we get start date of broadcasting and accord new episode's count and broadCastingPerEachPart (maybe instead of 1 episode per every week , they release 2 or ... episodes) and broadCastGap (the gap between releasing episodes) and after calculate that , to understand in each day how many and which episodes will be released , it'll give us an array like this [{episode : {startEpisode : 1 : episodes : [10,11]} , date : '12/7/2025' , persianDate : '17/9/1404'}]
            if (allEpisodesReleasedInADayCheckBox || broadCastGap == 0) {
                newDateObj = {
                    episode: "All",
                    date: currentDate.toDate(),
                    persianDate: currentDate.calendar("jalali").locale("fa").format("YYYY/MM/DD"),
                }
            } else {
                const totalEpisodesInPart =
                    i === (Math.floor(newSeasonEpisodesCount / +broadCastEpisodePerPart) * +broadCastEpisodePerPart)
                        ? (newSeasonEpisodesCount % +broadCastEpisodePerPart === 0
                            ? +broadCastEpisodePerPart
                            : newSeasonEpisodesCount % +broadCastEpisodePerPart)
                        : +broadCastEpisodePerPart

                // getting the exact episode od each release day so cause "{ length: totalEpisodesInPart }" give us an array that is filled by undefined we don't need the value on map method so we use "_" for that (i + 1 give us the episode index)
                const episodeNumbers = Array.from({ length: totalEpisodesInPart }, (_, index) => (i + 1) + index)

                newDateObj = {
                    episode: {
                        startEpisode: i + 1,
                        episodes: episodeNumbers,
                    },
                    date: currentDate.toDate(),
                    persianDate: currentDate.calendar("jalali").locale("fa").format("YYYY/MM/DD"),
                }
            }

            releaseDates.push(newDateObj);
        }
        console.log(releaseDates)

        return releaseDates
    }

    useEffect(() => {
        if (releaseDate) {
            setBroadcastDay(days[releaseDate.getDay()])
        }
    }, [releaseDate])

    useEffect(() => {
        if (allEpisodesReleasedInADayCheckBox) {
            setBroadCastEpisodePerPart(newSeasonEpisodesCount)
            setBroadCastGap(0)
        }
    }, [allEpisodesReleasedInADayCheckBox])

    useEffect(() => {
        if (movieType == 'series' && (newSeasonEpisodesCount && broadcastDay && newSeasonNumber)) {
            setNewSeasonEpisodesTable(findBroadcastDateOrder())
        }
    }, [newSeasonEpisodesCount, broadcastDay, broadCastGap, broadCastEpisodePerPart, newSeasonNumber, allEpisodesReleasedInADayCheckBox , newSeasonStartEpisode])

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7">
            <div className="flex items-center justify-center">
                <h2 className="w-full font-vazir text-gray-800 dark:text-white text-xl">افزودن پخش جدید</h2>
                <a href="/my-account/adminPanel/weekly-release" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست پخش ها</span>
                </a>
            </div>
            <div className="w-full grid grid-cols-2 gap-5">
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ID فیلم</span>
                </div>

                <div className="w-full relative flex items-center justify-center gap-1">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={movieType} onChange={e => setMovieType(e.target.value)}>
                        <option value="movie">فیلم</option>
                        <option value="series">سریال</option>
                    </select>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع فیلم</span>
                </div>

                {(movieType == 'series' && releaseStatus == 'released') && (
                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={1}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">اتمام کدام فصل</span>
                    </div>
                )}

                <div className="w-full relative select-none">
                    <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={broadcastDay} onChange={e => setBroadcastDay(e.target.value)} readonly={true} >
                        <option value="saturday">شنبه</option>
                        <option value="sunday">یکشنبه</option>
                        <option value="monday">دوشنبه</option>
                        <option value="tuesday">سه شنبه</option>
                        <option value="wednsday">چهارشنبه</option>
                        <option value="thursday">پنجشنبه</option>
                        <option value="friday">جمعه</option>
                    </select>

                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">روز پخش</span>
                </div>

                <div className="w-full relative select-none">
                    <DatePicker selected={releaseDate} onChange={(date) => setReleaseDate(date)} wrapperClassName="w-full" className="block w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />

                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">{movieType == 'movie' ? 'تاریخ' : 'شروع'} پخش</span>
                    <p className="mt-2 font-vazir text-light-gray dark:text-white">تاریخ شمسی: {formattedJalaliDate}</p>
                </div>

                {movieType == 'series' && (
                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={1}
                            value={newSeasonNumber}
                            onChange={e => setNewSeasonNumber(e.target.value)}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شماره فصل جدید</span>
                    </div>
                )}

                {movieType == 'series' && (
                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={1}
                            value={newSeasonStartEpisode}
                            onChange={e => setNewSeasonStartEpisode(e.target.value)}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شروع قسمت فصل جدید</span>
                    </div>
                )}

                {movieType == 'series' && (
                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={1}
                            value={newSeasonEpisodesCount}
                            onChange={e => {
                                setNewSeasonEpisodesCount(e.target.value)
                                if (e.target.value == 0) {
                                    setAllEpisodesReleasedInADayCheckBox(true)
                                }
                            }}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تعداد قسمت  فصل جدید</span>
                    </div>
                )}

                {movieType == 'series' && (
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-full relative select-none">
                            <input
                                type="number"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                min={1}
                                max={10}
                                value={broadCastGap}
                                onChange={e => setBroadCastGap(e.target.value)}
                                readonly={allEpisodesReleasedInADayCheckBox}

                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">فاصله پخش هر قسمت (روز)</span>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <input id="subtitle-checkbox" type="checkbox" value="" className="peer" hidden checked={allEpisodesReleasedInADayCheckBox} onChange={e => setAllEpisodesReleasedInADayCheckBox(e.target.checked)} />
                            <label htmlFor="subtitle-checkbox" className="flex items-center gap-2">
                                <span className="text-light-gray dark:text-white text-sm text-nowrap font-vazir">تمامي قسمت ها در يك روز مي آيند</span>
                                <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${allEpisodesReleasedInADayCheckBox ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'}`}></span>
                            </label>
                        </div>
                    </div>
                )}

                {movieType == 'series' && (
                    <div className="w-full relative select-none">
                        <input
                            type="number"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            min={1}
                            max={newSeasonEpisodesCount}
                            value={broadCastEpisodePerPart || 1000}
                            onChange={e => setBroadCastEpisodePerPart(e.target.value)}
                            readonly={allEpisodesReleasedInADayCheckBox}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تعداد قسمت ها در هر پارت</span>
                    </div>
                )}

                {(movieType == 'series' && newSeasonEpisodesTable.length != 0) && (
                    <ul className="col-start-1 col-end-3 py-3 px-2 bg-gray-100 dark:bg-primary rounded-lg grid grid-cols-4 gap-2">
                        {/* means all op the episodes will be released in a day */}
                        {newSeasonEpisodesTable.length == 1 ? (
                            <li className="flex flex-col justify-center border border-gray-200 dark:border-secondary rounded-md py-1 px-2">
                                <h3 className="text-light-gray dark:text-white font-vazir text-sm">تمام قسمت هاي فصل {newSeasonNumber}</h3>
                                <div className="flex items-center justify-center gap-2 font-shabnam text-gray-400 text-sm">
                                    <span>پخش در :</span>
                                    <span>{newSeasonEpisodesTable[0].persianDate}</span>
                                </div>
                            </li>
                        ) : newSeasonEpisodesTable.map(newEpisode => (
                            <li className="flex flex-col justify-center border border-gray-200 dark:border-secondary rounded-md py-1 px-2">
                                <h3 className="text-light-gray dark:text-white font-vazir text-sm">
                                    فصل {newSeasonNumber} قسمت {newEpisode.episode?.episodes?.length != 1 ? newEpisode.episode?.episodes?.join(' و ') : newEpisode.episode?.startEpisode}</h3>
                                <div className="flex items-center justify-center gap-2 font-shabnam text-gray-400 text-sm">
                                    <span>پخش در :</span>
                                    <span>{newEpisode.persianDate}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="col-start-1 col-end-3 w-full flex items-center gap-2">
                    <button className="w-full bg-green-600 hover:bg-green-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">افزودن</button>
                    <button className="w-full bg-red-600 hover:bg-red-500 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer">ريست</button>
                </div>
            </div>
        </div >
    )
}