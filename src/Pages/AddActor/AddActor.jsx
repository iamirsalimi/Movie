import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';

import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

dayjs.extend(jalali)

import { MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

let apiData = {
    getMoviesApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?select=*',
    updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts?id=eq.',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts?id=eq.',
    postApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Casts',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function AddActor() {
    let { actorId } = useParams()

    const [actorMovieId, setActorMovieId] = useState('')
    const [showMovies, setShowMovies] = useState(false)
    const [userRole, setUserRole] = useState('actor')
    const [actorMovies, setActorMovies] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [actorBirthDate, setActorBirthDate] = useState(null)

    // this onl uses when we want to update a actor
    const [actorObj, setActorObj] = useState(null)
    const [isPending, setIsPending] = useState(actorId ? true : false)
    const [error, setError] = useState(true)

    // for adding movies to cast
    const [moviesArray, setMoviesArray] = useState([])
    const [movieIsPending, setMovieIsPending] = useState(false)
    const [movieError, setMovieError] = useState(false)


    const schema = yup.object().shape({
        fullName: yup.string().required('وارد كردن نام اجباري است'),
        originalName: yup.string(),
        birthDate: yup
            .string(),
        nationality: yup
            .string(),
        biography: yup
            .string()
            .required('وارد کردن بيوگرافي اجباری است'),
        src: yup
            .string()
            .required('وارد كردن URL تصوير اجباری است')
    })

    let {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            dateBirth: null
        },
        resolver: yupResolver(schema)
    })

    // console.log(actorId)

    // add actor
    const addActorHandler = async newActorObj => {
        await fetch(apiData.postApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newActorObj)
        }).then(res => {
            console.log(res)
            location.href = "/my-account/adminPanel/actors/add-actor"
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در افزودن هنرپیشه پیش آمده')
            })

    }

    const addActor = async data => {
        setIsAdding(true)
        let newActorObj = { fullName: data.fullName, originalName: data.originalName, birthDate: actorBirthDate, nationality: data.nationality, biography: data.biography, src: data.src, movies: [...actorMovies] }

        await addActorHandler(newActorObj)
    }

    // update actor
    const updateActorHandler = async newActorObj => {
        await fetch(`${apiData.updateApi}${actorId}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newActorObj)
        }).then(res => {
            location.href = "/my-account/adminPanel/actors/add-actor"
        })
            .catch(err => {
                setIsAdding(false)
                console.log('مشکلی در آپدیت هنرپیشه پیش آمده')
            })

    }

    const updateActor = async data => {
        setIsAdding(true)
        // if (actorObj.fullName != data.fullName || actorObj.originalName != data.originalName || actorObj.birthDate != actorBirthDate || actorObj.nationality != data.nationality || actorObj.biography != data.biography || actorObj.src != data.src) {
        let newActorObj = { fullName: data.fullName, originalName: data.originalName, birthDate: actorBirthDate, nationality: data.nationality, biography: data.biography, src: data.src, movies: [...actorMovies] }
        console.log(newActorObj)
        await updateActorHandler(newActorObj)
        // }
    }

    // add actor Movies
    const addActorMovie = e => {
        e.preventDefault()
        if (actorMovieId) {
            let isMovieAlreadyExist = actorMovies.some(movie => movie.movieId == +actorMovieId)

            if (isMovieAlreadyExist) {
                toast.error('این فیلم از قبل اضافه شده است')
                setActorMovieId('')
                return false;
            }

            let movieObj = moviesArray.find(movie => movie.id == actorMovieId)
            let newSimilarMovieObj = { id: Math.floor(Math.random() * 99999), movieId: actorMovieId, cover: movieObj.cover, title: movieObj.title, role: userRole }
            setActorMovies(prev => [...prev, newSimilarMovieObj])
            setActorMovieId('')
        }
    }

    const deleteActorMovie = (e, movieId) => {
        e.preventDefault()
        let newActorMovies = actorMovies.filter(movie => movie.id !== movieId)
        setActorMovies(newActorMovies)
    }

    useEffect(() => {
        const getActorInfo = async (actorId) => {
            try {
                const res = await fetch(`${apiData.getApi}${actorId}`, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setActorObj(data[0])
                    setIsPending(false)
                } else {
                    window.location.href = '/my-account/adminPanel/actors'
                }

                setError(false)
            } catch (err) {
                console.log('fetch error')
                setError(err)
                setIsPending(false)
                setActorObj(null)
            }
        }
        if (actorId) {
            getActorInfo(actorId)
        }
    }, [])

    // to suggest movies
    useEffect(() => {
        setShowMovies(+actorMovieId != 0 ? true : false)
    }, [actorMovieId])

    useEffect(() => {
        if (actorObj) {
            setValue('fullName', actorObj.fullName)
            setValue('nickName', actorObj.nickName)
            setValue('dateBirth', actorObj.dateBirth)
            setValue('src', actorObj.src)
            setValue('nationality', actorObj.nationality)
            setValue('biography', actorObj.biography)
            setActorMovies(actorObj.movies)
            setActorBirthDate(actorObj.birthDate)
        }
    }, [actorObj])

    useEffect(() => {
        if (moviesArray.length == 0 && actorMovieId) {
            const getAllMovies = async () => {
                try {
                    const res = await fetch(apiData.getMoviesApi, {
                        headers: {
                            'apikey': apiData.apikey,
                            'Authorization': apiData.authorization
                        }
                    })

                    const data = await res.json()

                    if (data) {
                        setMoviesArray(data)
                        setMovieIsPending(false)
                    }

                    setMovieError(false)
                } catch (err) {
                    console.log('fetch error')
                    setMovieError(err)
                    setMovieIsPending(false)
                    setMoviesArray([])
                }
            }

            setMovieIsPending(true)
            getAllMovies()
        }
    }, [actorMovieId])

    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-gray-700 dark:text-white font-vazir text-xl">{actorId ? 'آپدیت' : 'ایجاد'} هنرپیشه</h2>
                    {actorId && (
                        <span className="text-sm text-gray-300 dark:text-gray-500 hidden md:inline">#{actorId}</span>
                    )}
                </div>
                <a href="/my-account/adminPanel/actors" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست هنرپیشه ها</span>
                </a>
            </div>

            {isPending && (
                <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
                <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
            )}

            {!isPending && (
                <>
                    <ul className="w-full border border-gray-200 dark:border-primary rounded-lg flex flex-col items-center gap-2 py-5 px-4">
                        <li className="text-center font-vazir text-red-500 text-sm md:text-base">در صورت ارسال نکردن مقدار نام هنری کاربر نام اصلی هنرپیشه نمایش داده می شود</li>
                        <li className="text-center font-vazir text-red-500 text-sm md:text-base">وارد کردن ملیت اختیاری است</li>
                    </ul>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={!actorObj ? handleSubmit(addActor) : handleSubmit(updateActor)}>
                        <div className="w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('fullName')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام کامل</span>
                            {errors?.fullName && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.fullName?.message}</span>
                            )}
                        </div>
                        <div className="w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('originalName')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام هنری</span>
                        </div>

                        <div className="w-full relative select-none">
                            <DatePicker value={actorBirthDate} onChange={date => {
                                setActorBirthDate(date.toISOString().slice(0, 10))
                                setValue('dateBirth', date)
                            }} showYearDropdown showMonthDropdown dateFormat="yyyy-MM-dd" readonly wrapperClassName="w-full" className="block w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />

                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تاریخ تولد</span>
                            {errors?.birthDate && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.birthDate?.message}</span>
                            )}
                        </div>

                        <div className="w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('nationality')}
                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">ملیت</span>
                        </div>
                        <div className="md:col-start-1 md:col-end-3 flex flex-col gap-2 md:gap-5 rounded-lg py-2 px-3">
                            <h3 className="w-full font-vazir text-gray-800 dark:text-white text-base md:text-lg">افزودن فيلم هاي هنرپیشه</h3>
                            <div className="w-full flex flex-col items-center gap-4">
                                <div className="w-full py-5 px-4 border border-gray-200 dark:border-primary rounded-md grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                        <input
                                            type="text"
                                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                            value={actorMovieId}
                                            onChange={e => setActorMovieId(e.target.value)}
                                        />
                                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">Id فيلم مورد نظر</span>

                                        {/* to suggest movies by their Id */}
                                        <ul className={`absolute top-15 z-30 max-h-36 overflow-y-auto ${showMovies ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'} transition-all w-full rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 py-4 px-5 bg-gray-200  dark:bg-primary`}>
                                            {movieIsPending && (
                                                <h2 className="md:col-start-1 md:col-end-4 text-center font-vazir text-red-500 text-sm md:text-base mt-2">در حال دریافت اطلاعات فیلم ها ... </h2>
                                            )}

                                            {movieError && (
                                                <h2 className="md:col-start-1 md:col-end-4 text-center font-vazir text-red-500 text-sm md:text-base mt-2">{movieError?.message} </h2>
                                            )}

                                            {!movieIsPending && (
                                                <>
                                                    {moviesArray.filter(movie => movie.id == actorMovieId).length !== 0 ? moviesArray.filter(movie => movie.id == actorMovieId).map(movie => (
                                                        <li
                                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                                            onClick={e => {
                                                                setShowMovies(false)
                                                                setActorMovieId(movie.id)
                                                            }}
                                                        >
                                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                                <img src={movie.cover} alt="" className="w-full h-full object-center object-cover" />
                                                            </div>

                                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{movie.title}</span>
                                                        </li>
                                                    )) :
                                                        <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">فیلم "{actorMovieId}" وجود ندارد</div>
                                                    }

                                                </>
                                            )}
                                        </ul>
                                    </div>

                                    <button
                                        className="py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
                                        onClick={addActorMovie}
                                    >افزودن</button>
                                </div>

                                {actorMovies.length !== 0 && (
                                    <div className="w-full flex flex-col items-center gap-2">
                                        <h3 className="w-full text-center font-vazir text-gray-800 dark:text-white text-lg">فیلم ها</h3>
                                        <div className="w-full flex flex-col items-center gap-2">
                                            {actorMovies.map(movie => (
                                                <div className="w-full bg-gray-200 dark:bg-primary flex items-center justify-between px-1 py-1 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-15 h-15 overflow-hidden rounded-md">
                                                            <img src={movie.cover} alt="" className="w-full h-full object-center object-cover" />
                                                        </div>
                                                        <h3 className="text-light-gray dark:text-white font-shabnam">{movie.title}</h3>
                                                    </div>

                                                    <button
                                                        className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                                        onClick={e => deleteActorMovie(e, movie.id)}
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
                        <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                            <input
                                type="text"
                                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('src')}

                            />
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">URL تصویر</span>
                            {errors?.src && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.src?.message}</span>
                            )}
                        </div>
                        <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                            <textarea
                                className="w-full rounded-md p-3 min-h-36 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                {...register('biography')}
                            ></textarea>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">بیوگرافی</span>
                            {errors?.biography && (
                                <span className="text-red-500 text-sm mt-2 font-vazir">{errors.biography?.message}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="md:col-start-1 md:col-end-3 py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-all inline-flex items-center justify-center gap-1 text-white font-shabnam text-lg"
                            disabled={isAdding}
                        >
                            {isAdding ? `در حال ${actorId ? 'آپدیت' : 'افزودن'} هنرپیشه ...` : actorId ? 'آپدیت هنرپیشه' : 'ایجاد هنرپیشه'}

                        </button>
                    </form>
                </>
            )}

        </div>
    )
}