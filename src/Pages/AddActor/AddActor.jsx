import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { movies } from '../../moviesData'

import { MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function AddActor() {
    const [actorMovieId, setActorMovieId] = useState('')
    const [showMovies, setShowMovies] = useState(false)
    const [userRole, setUserRole] = useState('actor')
    const [actorMovies, setActorMovies] = useState([])

    let { actorId } = useParams()

    console.log(actorId)

    const addActor = () => {
        let newDate = new Date()
        let newActorOBj = { id: Math.floor(Math.random() * 999), title: notifTitle, message: notifMessage, createdAt: newDate }
        console.log(newActorOBj)
    }

    // add similar Movies
    const addActorMovie = e => {
        if (actorMovieId) {
            let movieObj = movies.find(movie => movie.id == actorMovieId)
            let newSimilarMovieObj = { id: Math.floor(Math.random() * 99999), movieId: actorMovieId, src: movieObj.src, title: movieObj.title, role: userRole }
            setActorMovies(prev => [...prev, newSimilarMovieObj])
            setActorMovieId('')
        }
    }

    const deleteActorMovie = movieId => {
        let newActorMovies = actorMovies.filter(movie => movie.id !== movieId)
        setActorMovies(newActorMovies)
    }

    // to suggest movies
    useEffect(() => {
        setShowMovies(+actorMovieId != 0 ? true : false)
    }, [actorMovieId])


    return (
        <div className="panel-box py-4 px-5 flex flex-col gap-7 mb-20">
            <div className="flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-xl">{actorId ? 'آپدیت' : 'ایجاد'} هنرپیشه</h2>
                <a href="/my-account/adminPanel/actors" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
                    <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-2xl" />
                    <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs xs:text-sm md:text-base">بازگشت به لیست هنرپیشه ها</span>
                </a>
            </div>
            <ul className="w-full border border-gray-200 dark:border-primary rounded-lg flex flex-col items-center gap-2 py-5 px-4">
                <li className="text-center font-vazir text-red-500 text-sm md:text-base">در صورت ارسال نکردن مقدار نام هنری کاربر نام اصلی هنرپیشه نمایش داده می شود</li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"

                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام کامل</span>
                </div>
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نام هنری</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"

                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">تاریخ تولد</span>
                </div>
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
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
                                    {movies.filter(movie => movie.id == actorMovieId).length !== 0 ? movies.filter(movie => movie.id == actorMovieId).map(movie => (
                                        <li
                                            className="group cursor-pointer rounded-md border border-white dark:border-secondary hover:bg-sky-500 transition-all py-2 px-1 text-center flex items-center justify-start gap-4"
                                            onClick={e => {
                                                setShowMovies(false)
                                                setActorMovieId(movie.id)
                                            }}
                                        >
                                            <div className="w-15 h-15 overflow-hidden rounded-md">
                                                <img src={movie.src} alt="" className="w-full h-full object-center object-cover" />
                                            </div>

                                            <span className="text-sm font-vazir text-light-gray dark:text-white group-hover:text-white transition-colors">{movie.title}</span>
                                        </li>
                                    )) :
                                        <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">فیلم "{actorMovieId}" وجود ندارد</div>
                                    }
                                </ul>
                            </div>

                            <div className="w-full relative flex items-center justify-center gap-1">
                                <select name="" id="" className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" value={userRole} onChange={e => setUserRole(e.target.value)}>
                                    <option value="actor">بازیگر</option>
                                    <option value="director">کارگردان</option>
                                    <option value="voiceActor">صداپیشه</option>
                                    <option value="writer">نویسنده</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نقش هنرپیشه</span>
                            </div>

                            <button
                                className="md:col-start-1 md:col-end-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer"
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
                                                    <img src={movie.src} alt="" className="w-full h-full object-center object-cover" />
                                                </div>
                                                <h3 className="text-light-gray dark:text-white font-shabnam">{movie.title}</h3>
                                            </div>

                                            <button
                                                className="p-1 bg-red-500 hover:bg-red-600 transition-colors rounded-sm cursor-pointer"
                                                onClick={e => deleteActorMovie(movie.id)}
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
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">URL تصویر</span>
                </div>
                <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                    <textarea
                        className="w-full rounded-md p-3 min-h-36 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                    ></textarea>
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">بیوگرافی</span>
                </div>

                <button
                    className="md:col-start-1 md:col-end-3 py-1 w-full rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-all inline-flex items-center justify-center gap-1 text-white font-shabnam text-lg"
                    onClick={addActor}
                >
                    {actorId ? 'آپدیت هنرپیشه' : 'ایجاد هنرپیشه'}

                </button>
            </div>
        </div>
    )
}