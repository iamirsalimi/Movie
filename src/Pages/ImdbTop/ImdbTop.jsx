import React, { useState, useEffect, useContext } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import PaginateBtns from './../../Components/PaginateBtns/PaginateBtns'
import TopMovieCard from './../../Components/TopMovieCard/TopMovieCard'
import MoviesContext from '../../Contexts/MoviesContext'
import Loader from '../../Components/Loader/Loader'

import usePagination from '../../Hooks/usePagination' // arguments (movies array - default value of currentPage - pageCount or movieElements shown per page) , returns (filteredMovies - bindingObj - currentPage - setCurrentPage - pagesCount - startIndex)

export default function ImdbTop() {
    let { movieType, pageId = 1 } = useParams()

    let { movies: moviesArray, isPending, error } = useContext(MoviesContext)

    const [movies, setMovies] = useState(moviesArray)
    const [loading, setLoading] = useState(true)

    const [filteredMovies, bindingObj, currentPage, setCurrentPage, pagesCount, startIndex] = usePagination(movies, +pageId, 15)

    let movieTypeRoute = movieType == 'series' ? 'سريال' : movieType == 'movies' ? 'فيلم' : 'انيمه'

    // console.log(pageId, pagesCount, filteredMovies)
    let navigate = useNavigate()

    useEffect(() => {
        const pageNumber = parseInt(pageId);

        if (!pageId || isNaN(pageNumber)) return;

        if (pagesCount === 0) return

        if (pageNumber >= 1 && pageNumber <= pagesCount) {
            setCurrentPage(pageNumber)
        } else {
            navigate('/not-found')
        }
    }, [pageId, pagesCount])

    useEffect(() => {
        if (moviesArray.length > 0) {
            if (movieType != 'anime') {
                setMovies(moviesArray.filter(movie => movie.broadcastStatus != 'premiere' && movie.movieType == (movieType == 'movies' ? 'movie' : 'series'))?.sort((a, b) => b.imdb_score - a.imdb_score))
            } else {
                setMovies(moviesArray.filter(movie => movie.broadcastStatus != 'premiere' && movie.genres.includes('انیمه'))?.sort((a, b) => b.imdb_score - a.imdb_score))
            }
            setLoading(false)
        }
    }, [moviesArray])

    
    return (
        <>
            <div className="container mx-auto px-5 my-12 flex flex-col items-center gap-12 ">
                <div className="flex flex-col items-center gap-9">
                    <div className="h-36 min-w-36 flex items-center justify-center rounded-full font-bold text-4xl border border-light dark:border-primary bg-yellow-500 ring-[12px] ring-yellow-300/70">
                        <span className="text-light dark:text-primary">IMDb</span >
                    </div >
                    <div className="flex flex-col gap-2 items-center">
                        <h3 className="text-light-gray text-2xl dark:text-white font-vazir">250 <span>{movieTypeRoute}</span> برتر IMDb</h3>
                        <span className="text-xs text-gray-400 dark:text-gray-600 font-vazir">ليست 250 <span>{movieTypeRoute}</span> برتر IMDb</span>
                    </div>
                </div >
                <div className="w-full flex flex-col items-center gap-10">
                    {isPending && (
                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت {movieType == 'movies' ? 'فیلم' : movieType == 'series' ? 'سریال' : 'انیمه'} ها ... </h2>
                    )}

                    {error && (
                        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
                    )}

                    {isPending == null && (
                        <>
                            {movies.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-12">
                                        {filteredMovies.map((movie, index) => (
                                            <TopMovieCard {...movie} index={startIndex + (index + 1)} />
                                        ))}
                                    </div>
                                    {pagesCount > 1 && (
                                        <div className="w-full flex items-center justify-center gap-1.5 flex-wrap rounded-lg py-4 bg-white shadow shadow-black/5 dark:bg-secondary">
                                            <PaginateBtns {...bindingObj} currentPage={currentPage} route={`/imdb-top/${movieType}`} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <h2 className="text-center text-gray-700 dark:text-gray-400 font-vazir text-sm sm:text-base md:text-lg lg:text-2xl mt-4">{movieType == 'movies' ? 'فیلمی' : movieType == 'series' ? 'سریالی' : 'انیمه ای'} تا کنون ثبت نشده</h2>
                            )}
                        </>
                    )}
                </div>
            </div >
            {loading && (
                <Loader words={['Movies', 'Series', 'Animes']} />
            )}
        </>
    )
}
