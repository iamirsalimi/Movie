import React, { useRef, useState, useEffect, useContext } from 'react'

import DeleteModal from './../../Components/DeleteModal/DeleteModal';
import Tooltip from './../../Components/Tooltip/Tooltip';

import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

import LoadingContext from './../../Contexts/LoadingContext';

import { getReleases , deleteRelease } from './../../Services/Axios/Requests/Releases'

dayjs.extend(jalali)

let apiData = {
    deleteApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Releases?id=eq.',
    getAllApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Releases?select=*',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// accord this object we ca understand which property and which value should compare to eachother
const filterSearchObj = {
    'ID': { hasValue: false, property: 'id' },
    'movieId': { hasValue: false, property: 'movieId' },
    'movieTitle': { hasValue: false, property: 'movieTitle' },
    'series': { hasValue: true, property: 'movieType', value: 'series' },
    'movie': { hasValue: true, property: 'movieType', value: 'movie' },
}

export default function AllWeeklyReleases() {
    const [showMovieReleaseDetails, setShowMovieReleaseDetails] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchType, setSearchType] = useState('ID')
    const [searchValue, setSearchValue] = useState('')
    const [getReleasesFlag, setGetReleasesFlag] = useState(false)
    const [releases, setReleases] = useState([])
    const [filteredReleases, setFilteredReleases] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [releaseObj, setReleaseObj] = useState(null)

    const movieReleaseDetailsRef = useRef(null)

    const { loading, setLoading } = useContext(LoadingContext)

    const DeleteReleaseHandler = async () => {
        try {
            const res = await deleteRelease(releaseObj.id)

            console.log(res)

            setShowDeleteModal(false)
            setGetReleasesFlag(prev => !prev)
            setReleaseObj(null)
            setShowMovieReleaseDetails(false)
        } catch (err) {
            console.log('fetch error')
        }
    }

    useEffect(() => {
        const getAllReleases = async () => {
            try {
                const data = await getReleases()

                if (data.length > 0) {
                    let sortedMoviesArray = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    })
                    setReleases(sortedMoviesArray)
                    setFilteredReleases(sortedMoviesArray)
                    setIsPending(false)
                    setError(false)
                }

            } catch (err) {
                console.log('fetch error', err)
                setIsPending(false)
                setError(err)
            }
        }

        setIsPending(true)
        getAllReleases()
    }, [getReleasesFlag])

    useEffect(() => {
        let filterObj = filterSearchObj[searchType]
        let filteredReleasesArray = []

        // when we search something or we change the searchType we should filter the releases Array again  
        if (filterObj) {
            // for searchTypes that they have value (their value is not boolean and might be a variable)
            if (filterObj.hasValue) {
                filteredReleasesArray = releases.filter(release => release[filterObj.property] == filterObj.value)
            } else {
                if (searchValue) {
                    if (filterObj.property == 'id' || filterObj.property == 'movieId') {
                        filteredReleasesArray = releases.filter(release => release[filterObj.property] == searchValue)
                    } else if (typeof filterObj.property == 'string') {
                        filteredReleasesArray = releases.filter(release => release[filterObj.property].toLowerCase().startsWith(searchValue))
                    }
                } else {
                    filteredReleasesArray = [...releases]
                }
            }
        }

        setFilteredReleases(filteredReleasesArray)
    }, [searchValue, searchType])

    useEffect(() => {
        if (releases?.length > 0 && loading) {
            setLoading(false)
        }
    }, [releases])

    // return the easy readable time and date with Iran timezone
    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    return (
        <>
            <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 mb-20">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-base sm:text-lg md:text-xl">لیست هفتگی فیلم ها</h2>
                    <a href="/my-account/adminPanel/weekly-release/add-release" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors text-sm sm:text-base">افزودن پخش جدید</a>
                </div>
                <div ref={movieReleaseDetailsRef} className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">
                    {showMovieReleaseDetails && (
                        <ul className="w-full flex flex-col items-center justify-between gap-2 bg-gray-100 dark:bg-primary rounded-lg divide-y divide-gray-200 dark:divide-secondary p-2">
                            <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                <h3 className="text-light-gray dark:text-gray-500">ID</h3>
                                <p className="text-primary dark:text-gray-300">#{releaseObj?.id}</p>
                            </li>
                            <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                <h3 className="text-light-gray dark:text-gray-500">ID فیلم</h3>
                                <p className="text-primary dark:text-gray-300">{releaseObj?.movieId}</p>
                            </li>
                            <li className="w-full py-1 flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                <h3 className="text-vazir text-light-gray dark:text-gray-500">banner</h3>
                                <div className="w-full max-w-50 max-h-80 overflow-hidden rounded-xl self-end">
                                    <img src={releaseObj?.movie_cover} alt="" className="w-full h-full object-cover !object-center" />
                                </div>
                            </li>
                            <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                <h3 className="text-light-gray dark:text-gray-500">عنوان فیلم</h3>
                                <p className="text-primary dark:text-gray-300">{releaseObj?.movieTitle}</p>
                            </li>
                            <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                <h3 className="text-light-gray dark:text-gray-500">نوع فیلم</h3>
                                <p className="text-primary dark:text-gray-300">{releaseObj?.movieType == 'series' ? 'سریال' : 'فیلم'}</p>
                            </li>
                            <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                <h3 className="text-light-gray dark:text-gray-500">تاریخ انتشار</h3>
                                <p className="text-primary dark:text-gray-300">{getDate(releaseObj?.release_schedules[0]?.date)}</p>
                            </li>
                            {releaseObj?.movieType == 'series' && (
                                <li className="flex items-center justify-between w-full font-vazir p-2 text-sm sm:text-base">
                                    <h3 className="text-light-gray dark:text-gray-500">شماره فصل</h3>
                                    <p className="text-primary dark:text-gray-300">{releaseObj?.season_number}</p>
                                </li>
                            )}
                            {releaseObj?.movieType == 'series' && (
                                <li className="flex flex-col justify-center gap-1 w-full font-vazir p-2 text-sm sm:text-base">
                                    <h3 className="text-light-gray dark:text-gray-500">پخش قسمت ها</h3>
                                    <ul className="md:col-start-1 md:col-end-3 py-3 px-2 bg-gray-100 dark:bg-primary rounded-lg grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2">
                                        {/* means all op the episodes will be released in a day */}
                                        {releaseObj?.release_schedules?.length == 1 ? (
                                            <li className="flex flex-col items-center xs:items-start justify-center border border-gray-200 dark:border-secondary rounded-md py-1 px-2">
                                                <h3 className="text-light-gray dark:text-white font-vazir text-sm">تمام قسمت هاي فصل {releaseObj?.season_number}</h3>
                                                <div className="flex items-center justify-center gap-2 font-shabnam text-gray-400 text-sm">
                                                    <span>پخش در :</span>
                                                    <span>{releaseObj?.release_schedules[0]?.persianDate}</span>
                                                </div>
                                            </li>
                                        ) : releaseObj?.release_schedules?.map((newEpisode, index) => (
                                            <li key={index} className="flex flex-col items-center xs:items-start justify-center border border-gray-200 dark:border-secondary rounded-md py-1 px-2">
                                                <h3 className="text-light-gray dark:text-white font-vazir text-sm">
                                                    فصل {releaseObj?.season_number} قسمت {newEpisode.episode?.episodes?.length != 1 ? newEpisode?.episode?.episodes.join(' و ') : newEpisode.episode?.startEpisode}</h3>
                                                <div className="flex items-center justify-center gap-2 font-shabnam text-gray-400 text-sm">
                                                    <span>پخش در :</span>
                                                    <span>{getDate(newEpisode.date)}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    )}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
                        <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
                            <select
                                name=""
                                id=""
                                className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                value={searchType}
                                onChange={e => setSearchType(e.target.value)}
                            >
                                <option value="ID">ID</option>
                                <option value="movieId">ID فیلم</option>
                                <option value="movieTitle">عنوان فیلم</option>
                                <option value="series">سریال</option>
                                <option value="movie">فیلم</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
                        </div>

                        {(searchType !== 'series' && searchType != 'movie') && (
                            <div className="w-full relative select-none">
                                <input
                                    type="text"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
                            </div>
                        )}
                    </div>

                    <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
                        <table className="w-full">
                            <thead className="min-w-full">
                                <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">#</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">ID فیلم</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">عنوان فیلم</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">نوع فیلم</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">تاریخ انتشار</th>
                                    <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">شماره فصل</th>
                                    <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isPending && !error &&
                                    filteredReleases.length > 0 && (
                                        filteredReleases.map(release => (
                                            <tr key={release.id} className="py-1 px-2 border-b border-gray-200 dark:border-white/5 odd:bg-gray-200 dark:odd:bg-primary" >
                                                <td className="text-nowrap py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{release?.id}</td>
                                                <td className="text-nowrap py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{release?.movieId}</td>
                                                <td className="text-nowrap py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{release?.movieTitle}</td>
                                                <td className="text-nowrap py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{release?.movieType == 'series' ? 'سریال' : 'فیلم'}</td>
                                                <td className="text-nowrap py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{getDate(release.release_schedules[0]?.date)}</td>
                                                <td className="text-nowrap py-1 pb-3 px-2 text-sm text-center text-light-gray dark:text-gray-400">{release?.season_number || '-'}</td>
                                                <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 flex items-center justify-center gap-1">
                                                    <Tooltip text="ویرایش">
                                                        <a
                                                            href={`/my-account/adminPanel/weekly-release/edit-release/${release.id}`}
                                                            className="inline-block p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                                                        >
                                                            <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                                                        </a>
                                                    </Tooltip>

                                                    <Tooltip text="مشاهده جزئیات">
                                                        <a
                                                            href={`/my-account/adminPanel/weekly-release/release-details/${release.id}`}
                                                            className="inline-block p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                                                        >
                                                            <FaEye className="text-green-500 group-hover:text-white transition-all" />
                                                        </a>
                                                    </Tooltip>

                                                    <Tooltip text="حذف">
                                                        <button
                                                            className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group"
                                                            onClick={e => {
                                                                setReleaseObj(release)
                                                                setShowDeleteModal(true)
                                                            }}
                                                        >
                                                            <LuTrash2 className="text-red-500 group-hover:text-white transition-all" />
                                                        </button>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }

                            </tbody>
                        </table>

                        {!isPending && filteredReleases.length == 0 && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">مقداری با همچین مشخصاتی پیدا نشد</h2>
                        )}

                        {isPending && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
                        )}

                        {error && (
                            <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                        )}
                    </div>

                </div>
            </div>

            <DeleteModal deleteHandler={DeleteReleaseHandler} showModal={showDeleteModal} setShowModal={setShowDeleteModal} name={releaseObj?.movieTitle} tableName="پخش" />
        </>

    )
}
