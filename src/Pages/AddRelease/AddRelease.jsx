import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';

import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";

dayjs.extend(jalali)

let apiData = {
    getMovieApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?id=eq.',
    updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Releases?id=eq.',
    postApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Releases',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Releases?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

const genres = {
    'movie': ['اکشن', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'انیمه', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی'],
    'series': ['اکشن', 'Talk-Show', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'انیمه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی', 'موسیقی']
}

const days = ['sunday', 'monday', 'tuesday', 'wednsday', 'thursday', 'friday', 'saturday']

export default function AddRelease() {
    const [allEpisodesReleasedInADayCheckBox, setAllEpisodesReleasedInADayCheckBox] = useState(false)
    const [movieObj, setMovieObj] = useState(null)
    const [releaseObj, setReleaseObj] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const [movieIsPending, setMovieIsPending] = useState(false)
    const [movieError, setMovieError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [newSeasonEpisodesTable, setNewSeasonEpisodesTable] = useState([])
    const [releaseDate, setReleaseDate] = useState(new Date())

    const { releaseId } = useParams()

    const formattedJalaliDate = dayjs(releaseDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')

    const schema = yup.object().shape({
        movieId: yup.string().required('آیدی فیلم الزامی است.'),
        movieType: yup.string().oneOf(['movie', 'series'], 'نوع فیلم نامعتبر است.').required('نوع فیلم الزامی است.'),
        releaseDate: yup
            .date()
            .nullable()
            .required('تاریخ پخش الزامی است.')
            .min(
                new Date(new Date().setHours(0, 0, 0, 0)), // حداقل از ابتدای امروز
                'تاریخ پخش نمی‌تواند گذشته باشد.'
            ),
        newSeasonNumber: yup
            .number()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : value))
            .nullable()
            .when('movieType', {
                is: 'series',
                then: (schema) =>
                    schema
                        .required('شماره فصل جدید برای سریال الزامی است.')
                        .min(1, 'شماره فصل باید حداقل 1 باشد.'),
                otherwise: (schema) => schema.notRequired(),
            }),
        newSeasonStartEpisode: yup
            .number()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : value))
            .nullable()
            .when('movieType', {
                is: 'series',
                then: (schema) =>
                    schema
                        .required('شروع قسمت فصل جدید برای سریال الزامی است.')
                        .min(1, 'شروع قسمت باید حداقل 1 باشد.'),
                otherwise: (schema) => schema.notRequired(),
            }),
        newSeasonEpisodesCount: yup
            .number()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : value))
            .nullable()
            .when('movieType', {
                is: 'series',
                then: (schema) =>
                    schema
                        .required('تعداد قسمت فصل جدید برای سریال الزامی است.')
                        .min(1, 'تعداد قسمت‌ها باید حداقل 1 باشد.'),
                otherwise: (schema) => schema.notRequired(),
            }),
        broadCastGap: yup
            .number()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : value))
            .nullable()
            .when('allEpisodesReleasedInADayCheckBox', { // if it was true wit should be 0
                is: true,
                then: (schema) => schema.default(0).required(),
                otherwise: (schema) =>
                    schema
                        .required('فاصله پخش برای سریال الزامی است.')
                        .min(1, 'فاصله پخش نمی‌تواند کمتر از 1 باشد.')
                        .max(10, 'فاصله پخش نمی‌تواند بیشتر از 10 باشد.'),
            })
            .when('movieType', {
                is: 'movie',
                then: (schema) => schema.notRequired(),
            }),
        broadCastEpisodePerPart: yup
            .number()
            .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : value))
            .nullable()
            .when('allEpisodesReleasedInADayCheckBox', { // if it was true wit should be equals to episodes
                is: true,
                then: (schema) =>
                    schema
                        .required()
                        .test(
                            'equals-episodes-count',
                            'تعداد قسمت در هر پارت باید برابر با کل قسمت‌ها باشد.',
                            function (value) {
                                const { newSeasonEpisodesCount } = this.parent;
                                return value <= newSeasonEpisodesCount;
                            }
                        ),
                otherwise: (schema) =>
                    schema
                        .when('movieType', {
                            is: 'series',
                            then: (schema) =>
                                schema
                                    .required('تعداد قسمت در هر پارت برای سریال الزامی است.')
                                    .min(1, 'تعداد قسمت در هر پارت باید حداقل 1 باشد.')
                                    .test(
                                        'max-episodes-per-part',
                                        'تعداد قسمت در هر پارت نمی‌تواند از کل قسمت‌ها بیشتر باشد.',
                                        function (value) {
                                            const { newSeasonEpisodesCount } = this.parent;
                                            return !value || !newSeasonEpisodesCount || value <= newSeasonEpisodesCount;
                                        }
                                    ),
                            otherwise: (schema) => schema.notRequired(),
                        }),
            }),
        allEpisodesReleasedInADayCheckBox: yup.boolean().default(false),
        broadcastDay: yup.string(),
    })

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            movieId: '',
            movieType: 'movie',
            releaseDate: new Date(),
            newSeasonNumber: undefined,
            newSeasonStartEpisode: 1,
            newSeasonEpisodesCount: undefined,
            broadCastGap: 7,
            broadCastEpisodePerPart: 1,
            allEpisodesReleasedInADayCheckBox: false,
            broadcastDay: days[new Date().getDay()],
        },
    })

    let movieType = watch('movieType')
    let newSeasonEpisodesCount = watch('newSeasonEpisodesCount')
    let broadcastDay = watch('broadcastDay')
    let broadCastGap = watch('broadCastGap')
    let broadCastEpisodePerPart = watch('broadCastEpisodePerPart')
    let newSeasonNumber = watch('newSeasonNumber')
    let newSeasonStartEpisode = watch('newSeasonStartEpisode')

    const getMovieInfo = async movieId => {
        try {
            const res = await fetch(`${apiData.getMovieApi}${movieId}`, {
                headers: {
                    'apikey': apiData.apikey,
                    'Authorization': apiData.authorization
                }
            })

            const data = await res.json()

            if (data.length > 0) {
                setMovieObj(data[0])
            } else {
                setMovieObj(null)
            }

            setMovieIsPending(null)
            setMovieError(false)
        } catch (err) {
            console.log('fetch error')
            setMovieError(err)
            setMovieIsPending(false)
            setMovieObj(null)
        }
    }

    // return the easy readable time and date with Iran timezone
    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    // update release
    const updateReleaseHandler = async newReleaseObj => {
        await fetch(`${apiData.updateApi}${releaseObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newReleaseObj)
        }).then(res => {
            if (res.ok) {
                console.log(res)
                location.href = "/my-account/adminPanel/movies/add-movie"
            }
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در آپدیت هنرپیشه پیش آمده')
            })
    }

    const updateRelease = async data => {
        let newReleaseObj = { ...releaseObj }

        setIsAdding(true)
        newReleaseObj.movieType = data.movieType
        newReleaseObj.movieId = data.movieId
        newReleaseObj.movie_cover = data.cover
        newReleaseObj.is_released = false
        newReleaseObj.season_number = data.movieType == 'series' ? data.newSeasonNumber : null
        newReleaseObj.release_schedules = data.movieType == 'series' ? [...newSeasonEpisodesTable] : [{
            episode: null,
            date: data.releaseDate,
            persianDate: getDate(data?.releaseDate)
        }]

        // console.log(newReleaseObj)
        await updateReleaseHandler(newReleaseObj)
    }

    // add release
    const addReleaseHandler = async newrelease => {
        await fetch(apiData.postApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newrelease)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                location.href = "/my-account/adminPanel/weekly-release"
            }
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در افزودن فیلم پیش آمده')
            })
    }

    const AddRelease = data => {
        // setIsAdding(true)
        console.log(data)
        if (releaseObj) {
            let newReleaseObj = {
                movieType: data.movieType,
                movieId: movieObj.id,
                movieTitle: movieObj.title,
                movie_cover: movieObj.cover,
                is_released: false,
                season_number: data.movieType == 'series' ? data.newSeasonNumber : null,
                release_schedules: data.movieType == 'series' ? [...newSeasonEpisodesTable] : [{
                    episode: null,
                    date: data.releaseDate,
                    persianDate: getDate(data?.releaseDate),
                }],
                created_at: new Date()
            }

            console.log(newReleaseObj, Object.keys(newReleaseObj))
            addReleaseHandler(newReleaseObj)
        } else {
            toast.error('ID فیلم درست نمی باشد')
            setIsAdding(false)
        }
    }

    // this method will calculate when each episode of the series will be released 
    const findBroadcastDateOrder = () => {
        const releaseDates = []
        if (broadCastEpisodePerPart >= 0) {
            for (let i = newSeasonStartEpisode - 1; i < newSeasonEpisodesCount; i += +broadCastEpisodePerPart) {
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

                    // getting the exact episode of each release day , so "{ length: totalEpisodesInPart }" give us an array that is filled by undefined we don't need the value on map method so we use "_" for that (i + 1 give us the episode index)
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
        }
        console.log(releaseDates)

        return releaseDates
    }

    useEffect(() => {
        if (releaseDate) {
            setValue('broadcastDay', days[releaseDate.getDay()])
        }
    }, [releaseDate])

    useEffect(() => {
        if (allEpisodesReleasedInADayCheckBox) {
            setValue('broadCastEpisodePerPart', newSeasonEpisodesCount)
            setValue('BroadCastGap', 0)
        }
    }, [allEpisodesReleasedInADayCheckBox])

    useEffect(() => {
        if (movieType == 'series' && (newSeasonEpisodesCount && broadcastDay && newSeasonNumber && broadCastGap && broadCastEpisodePerPart)) {
            setNewSeasonEpisodesTable(findBroadcastDateOrder())
        }
    }, [newSeasonEpisodesCount, broadcastDay, broadCastGap, broadCastEpisodePerPart, newSeasonNumber, newSeasonStartEpisode])

    useEffect(() => {
        if (movieObj) {
            setValue('movieType', movieObj?.movieType)
        }
    }, [movieObj])

    // filling inputs with release we want to edit details
    useEffect(() => {
        if (releaseObj) {
            setValue('movieId', releaseObj.movieId)
            getMovieInfo(releaseObj.movieId)
            setValue('movieType', releaseObj.movieType)
            setValue('movieTitle', releaseObj.movieTitle)
            setValue('cover', releaseObj.movie_cover)
            setValue('newSeasonNumber', releaseObj.season_numeber)
            setValue('releaseDate', new Date(releaseObj.release_schedules[0]?.date))
            setReleaseDate(new Date(releaseObj.release_schedules[0]?.date))
            setNewSeasonEpisodesTable(releaseObj.release_schedules)
        }
    }, [releaseObj])

    // for editing release
    useEffect(() => {
        const getReleaseInfo = async releaseId => {
            try {
                const res = await fetch(`${apiData.getApi}${releaseId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setReleaseObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/weekly-release'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setReleaseObj(null)
            }
        }
        if (releaseId) {
            setIsPending(true)
            getReleaseInfo(releaseId)
        }
    }, [])

    return (
        <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 mb-20">
            <div className="flex items-center justify-center">
                <h2 className="w-full font-vazir text-gray-800 dark:text-white text-xl">افزودن پخش جدید</h2>
                <a href="/my-account/adminPanel/weekly-release" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست پخش ها</span>
                </a>
            </div>

            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
            )}

            {!isPending && (
                <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={releaseId ? handleSubmit(updateRelease) : handleSubmit(AddRelease)}>
                    <div className="w-full relative select-none">
                        <input
                            type="text"
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('movieId')}
                            onBlur={e => {
                                if (e.target.value.trim()) {
                                    setMovieIsPending(true)
                                    getMovieInfo(e.target.value)
                                } else {
                                    setMovieObj(null)
                                    setMovieIsPending(false)
                                }
                            }}
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ID فیلم</span>
                        {errors?.movieId && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.movieId?.message}</span>
                        )}

                        {movieIsPending == null && (
                            <>
                                {movieObj ? (
                                    <span className="text-light-gray dark:text-white text-xs mt-2 font-vazir">{movieObj?.title}</span>
                                ) : (
                                    <span className="text-red-500 text-xs mt-2 font-vazir">فیلم با همجین ID ای وجود ندارد</span>
                                )}
                            </>
                        )}

                        {movieIsPending && (
                            <span className="mt-2 font-vazir flex items-center gap-2">
                                <h2 className="text-gray-500 text-xs font-vazir">در حال بررسی id فیلم</h2>
                                <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-500 border-t-sky-500 animate-spin"></span>
                            </span>
                        )}
                    </div>

                    <div className="w-full relative flex items-center justify-center gap-1">
                        <select
                            name=""
                            id=""
                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('movieType')}
                            disabled={movieObj ? true : false}
                        >
                            <option value="movie">فیلم</option>
                            <option value="series">سریال</option>
                        </select>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع فیلم</span>
                        {errors?.movieType && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.movieType?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <select
                            name=""
                            id=""
                            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            {...register('broadcastDay')}
                            disabled={true}
                        >
                            <option value="saturday">شنبه</option>
                            <option value="sunday">یکشنبه</option>
                            <option value="monday">دوشنبه</option>
                            <option value="tuesday">سه شنبه</option>
                            <option value="wednsday">چهارشنبه</option>
                            <option value="thursday">پنجشنبه</option>
                            <option value="friday">جمعه</option>
                        </select>

                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">روز پخش</span>
                        {errors?.broadcastDay && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.broadcastDay?.message}</span>
                        )}
                    </div>

                    <div className="w-full relative select-none">
                        <DatePicker
                            selected={releaseDate}
                            showYearDropdown
                            showMonthDropdown
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                            onChange={(date) => {
                                setValue('releaseDate', date)
                                setReleaseDate(date)
                            }}
                            wrapperClassName="w-full"
                            className="block w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">{movieType == 'movie' ? 'تاریخ' : 'شروع'} پخش</span>
                        <p className="mt-2 font-vazir text-light-gray dark:text-white">تاریخ شمسی: {formattedJalaliDate}</p>
                        {errors?.releaseDate && (
                            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.releaseDate?.message}</span>
                        )}
                    </div>

                    {movieType == 'series' && (
                        <div className="w-full relative select-none">
                            <input
                                type="number"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                min={1}
                                {...register('newSeasonNumber')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شماره فصل جدید</span>
                            {errors?.newSeasonNumber && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.newSeasonNumber?.message}</span>
                            )}
                        </div>
                    )}

                    {movieType == 'series' && (
                        <div className="w-full relative select-none">
                            <input
                                type="number"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('newSeasonStartEpisode')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">شروع قسمت فصل جدید</span>
                            {errors?.newSeasonStartEpisode && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.newSeasonStartEpisode?.message}</span>
                            )}
                        </div>
                    )}

                    {movieType == 'series' && (
                        <div className="w-full relative select-none">
                            <input
                                type="number"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                // min={1}
                                // value={newSeasonEpisodesCount}
                                // onChange={e => {
                                //     setNewSeasonEpisodesCount(e.target.value)
                                //     if (e.target.value == 0) {
                                //         setAllEpisodesReleasedInADayCheckBox(true)
                                //     }
                                // }}
                                {...register('newSeasonEpisodesCount')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تعداد قسمت  فصل جدید</span>
                            {errors?.newSeasonEpisodesCount && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.newSeasonEpisodesCount?.message}</span>
                            )}
                        </div>
                    )}

                    {movieType == 'series' && (
                        <div className="flex flex-col gap-5 md:gap-2 items-center">
                            <div className="w-full relative select-none">
                                <input
                                    type="number"
                                    className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    {...register('broadCastGap')}
                                    readOnly={allEpisodesReleasedInADayCheckBox}

                                />
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">فاصله پخش هر قسمت (روز)</span>
                                {errors?.broadCastGap && (
                                    <span className="text-red-500 text-sm mt-2 font-vazir">{errors.broadCastGap?.message}</span>
                                )}
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
                        <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                            <input
                                type="number"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                min={1}
                                {...register('broadCastEpisodePerPart')}
                                readOnly={allEpisodesReleasedInADayCheckBox}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تعداد قسمت ها در هر پارت</span>
                            {errors?.broadCastEpisodePerPart && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.broadCastEpisodePerPart?.message}</span>
                            )}
                        </div>
                    )}

                    {(movieType == 'series' && newSeasonEpisodesTable.length != 0) && (
                        <ul className="md:col-start-1 md:col-end-3 py-3 px-2 bg-gray-100 dark:bg-primary rounded-lg grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2">
                            {/* means all op the episodes will be released in a day */}
                            {newSeasonEpisodesTable.length == 1 ? (
                                <li className="flex flex-col items-center xs:items-start justify-center border border-gray-200 dark:border-secondary rounded-md py-1 px-2">
                                    <h3 className="text-light-gray dark:text-white font-vazir text-sm">تمام قسمت هاي فصل {newSeasonNumber}</h3>
                                    <div className="flex items-center justify-center gap-2 font-shabnam text-gray-400 text-sm">
                                        <span>پخش در :</span>
                                        <span>{newSeasonEpisodesTable[0].persianDate}</span>
                                    </div>
                                </li>
                            ) : newSeasonEpisodesTable.map((newEpisode, index) => (

                                <li key={index} className="flex flex-col items-center xs:items-start justify-center border border-gray-200 dark:border-secondary rounded-md py-1 px-2">
                                    <h3 className="text-light-gray dark:text-white font-vazir text-sm">
                                        فصل {newSeasonNumber} قسمت {newEpisode.episode?.episodes?.length != 1 ? newEpisode?.episode?.episodes.join(' و ') : newEpisode.episode?.startEpisode}</h3>
                                    <div className="flex items-center justify-center gap-2 font-shabnam text-gray-400 text-sm">
                                        <span>پخش در :</span>
                                        <span>{newEpisode.persianDate}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button
                        className="md:col-start-1 md:col-end-3 w-full bg-green-600 hover:bg-green-500 disabled:bg-green-300 transition-colors text-white font-vazir font-semibold rounded-md p-2 cursor-pointer"
                        disabled={isAdding}
                    >
                        {isAdding ? `در حال ${releaseId ? 'آپدیت' : 'اضافه'} کردن ...` : releaseId ? 'آپدیت' : 'اضافه کردن'}
                    </button>
                </form>
            )}
        </div >
    )
}