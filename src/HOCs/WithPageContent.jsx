import React, { useState, useEffect, useContext } from 'react'

import NewMoviesTable from './../Components/NewMoviesTable/NewMoviesTable'
import GenreTables from './../Components/GenreTables/GenreTables'
import UpdatedSeries from './../Components/UpdatedSeries/UpdatedSeries'
import Loader from './../Components/Loader/Loader'

import MoviesContext from './../Contexts/MoviesContext'
import LoadingContext from './../Contexts/LoadingContext'

import { IoLogoInstagram } from "react-icons/io";
import { PiTelegramLogoDuotone } from "react-icons/pi";


export default function WithPageContent(Comp, movieContent) {
    const NewComponent = () => {
        const [loading, setLoading] = useState(true)

        let { movies: moviesArray } = useContext(MoviesContext)
        const [movies, setMovies] = useState(moviesArray)

        const [genres, setGenres] = useState({
            'movie': ['اکشن', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'ماجراجویی', 'انیمه', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی'],
            'series': ['اکشن', 'Talk-Show', 'ترسناک', 'انیمیشن', 'تاریخی', 'جنایی', 'جنگی', 'خانوادگی', 'درام', 'زندگی نامه', 'عاشقانه', 'علمی تخیلی', 'فانتزی', 'کمدی', 'کوتاه', 'انیمه', 'ماجراجویی', 'مستند', 'معمایی', 'موزیکال', 'وسترن', 'نوآر', 'هیجان انگیز', 'ورزشی', 'موسیقی']
        })

        useEffect(() => {
            setMovies(moviesArray)
        }, [moviesArray])

        return (
            <LoadingContext.Provider value={{
                loading,
                setLoading
            }}>
                <div className={`container mx-auto ${movieContent && '!px-5'} flex flex-col lg:flex-row gap-x-4 gap-y-7 mt-12`}>
                    {/* right side */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-7">
                        <Comp movies={movies?.filter(movie => movie.broadcastStatus !== 'premiere')} />
                    </div>

                    {/* left side */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-y-7">
                        <div className="w-full flex flex-col items-center justify-center gap-3">
                            <a href="#" className="inline-block w-full">
                                <div className="bg-gradient-to-r z-20 from-(--purpleCustom) to-(--orangeCustom) w-full rounded-xl p-4 flex items-center justify-between">
                                    <span className="font-vazir text-white font-semibold">اينستاگرام ما</span>
                                    <IoLogoInstagram className="text-white text-4xl" />
                                </div>

                            </a>
                            <a href="#" className="inline-block w-full">
                                <div className="bg-gradient-to-r z-20 from-blue-600 to-sky-400 w-full p-4 rounded-xl flex items-center justify-between">
                                    <span className="font-vazir text-white font-semibold">تلگرام ما</span>
                                    <PiTelegramLogoDuotone className="text-white text-4xl" />
                                </div>
                            </a>
                        </div>
                        {/* <NewMoviesTable movies={movies.filter(movie => movie.is_in_new_movies)} /> */}
                        <NewMoviesTable movies={movies} />
                        <UpdatedSeries series={movies?.filter(movie => movie.movieType == 'series').sort((a , b) => {
                            let aDate = new Date(a.updated_at).getTime()
                            let bDate = new Date(b.updated_at).getTime()

                            return bDate - aDate
                        })} />
                        <GenreTables genre={genres} movies={movies} />
                    </div>
                </div>

                {loading && (
                    <Loader words={['Movies', 'Series', 'Animes', 'New Movies']} />
                )}
            </LoadingContext.Provider>
        )
    }

    return NewComponent
}
