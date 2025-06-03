import React, { useState, useEffect } from 'react'

import { RxCross2 } from "react-icons/rx";

let apiData = {
    getMoviesApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?select=*',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}


export default function SearchModal({ showModal, setShowModal }) {
    const [searchValue, setSearchValue] = useState('')
    const [movies, setMovies] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const [showMovies, setShowMovies] = useState(false)

    const hideMenu = () => {
        setShowModal(false)
    }

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
                setMovies(data)
            }
            
            setIsPending(null)
            setError(false)
        } catch (err) {
            console.log('fetch error')
            setError(err)
            setIsPending(false)
            setMovies([])
        }
    }

    useEffect(() => {
        if (movies.length == 0 && searchValue.trim()) {
            setIsPending(true)
            getAllMovies()
        }

        setShowMovies(searchValue.trim() ? true : false)
    }, [searchValue])

    return (
        <div className={`absolute w-full top-0 left-0 h-full z-50 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>
            <div className={`w-[90%] sm:w-4/5 lg:w-1/3 fixed top-5 h-fit bg-white rounded-md dark:bg-primary flex flex-col transition-all duration-200 ${showModal ? 'translate-y-0' : '-translate-y-full'} flex flex-col gap-1 py-2`}>

                <div className="flex items-center justify-between px-2">
                    <h1 className="font-bold font-vazir text-xl dark:text-white text-gray-700">جستجو فیلم یا سریال</h1>
                    <button className="w-fit p-1 rounded-sm bg-gray-200 text-gray-800 dark:bg-secondary dark:text-white cursor-pointer" onClick={hideMenu}>
                        <RxCross2 className="text-xl" />
                    </button>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 py-5 px-2 border-t border-gray-100 dark:border-secondary">
                    <input
                        type="text"
                        className="w-full text-lg bg-gray-200 dark:bg-secondary py-1 px-2 rounded-md focus:outline-0 font-vazir text-primary dark:text-white place-holder:text-gray-700 dark:place-holder:text-gray-300"
                        placeholder="نام فیلم یا سریال"
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button
                        className="p-1 rounded-sm bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer"
                        onClick={e => {
                            if (!searchValue) {
                                hideMenu()
                            } else {
                                window.location = `?movieName=${searchValue}`
                            }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-white dark:stroke-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <ul className="flex flex-col items-center gap-2 px-2">
                    {isPending && (
                        <h2 className="md:col-start-1 md:col-end-4 text-center font-vazir text-red-500 text-sm md:text-base mt-2">در حال دریافت فیلم ها ... </h2>
                    )}

                    {error && (
                        <h2 className="md:col-start-1 md:col-end-4 text-center font-vazir text-red-500 text-sm md:text-base mt-2">{error?.message} </h2>
                    )}


                    {isPending == null && searchValue.trim() && (
                        <>
                            {movies.filter(movie => movie.title.includes(searchValue.trim())).length !== 0 ? movies.filter(movie => movie.title.includes(searchValue.trim())).slice(0,5).map(movie => (
                                <a href={`/${movie.movieType}/${movie.id}`} className="w-full">
                                    <li className="group cursor-pointer rounded-lg transition-all bg-white dark:bg-primary hover:bg-gray-100 dark:hover:bg-black/15  py-2 px-4 text-center flex items-center justify-start gap-2">
                                        <div className="min-w-15 max-w-15 h-15 overflow-hidden rounded-lg">
                                            <img src={movie.cover} alt="" className="w-full h-full object-center object-cover" />
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                                            <span className="text-sm font-vazir text-light-gray dark:text-white transition-colors text-justify">{movie.mainTitle}</span>
                                            <span className="text-xs font-vazir-light text-light-gray dark:text-gray-500 transition-colors text-justify">{movie.title}</span>
                                        </div>
                                    </li>
                                </a>
                            )) :
                                <div className="col-start-1 col-end-5 text-center font-vazir text-red-500">فیلم "{searchValue}" وجود ندارد</div>
                            }

                        </>
                    )}

                </ul>
            </div>
        </div>
    )
}
