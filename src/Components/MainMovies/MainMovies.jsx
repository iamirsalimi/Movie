import React, { useEffect, useState, useMemo } from 'react'

import MovieCard from './../MovieCard/MovieCard'

export default function MainMovies({ movies }) {
    let [filteredMovies, setFilteredMovies] = useState([])
    let [currentPage, setCurrentPage] = useState(1)
    let [buttonsArray, setButtonsArray] = useState([])
    let movieRowsCount = 10

    let pagesCount = null
    let endIndex = null
    let startIndex = null


    useEffect(() => {
        pagesCount = Math.ceil(movies.length / movieRowsCount)
        setButtonsArray(Array.from(Array(pagesCount).keys()))
        endIndex = currentPage * movieRowsCount
        startIndex = endIndex - movieRowsCount
        setFilteredMovies(movies.slice(startIndex, endIndex))
    }, [currentPage])

    const changePaginate = page => {
        setCurrentPage(page)
    }

    const midBtns = () => {
        let startIndex = currentPage - 2 < 1 ? 1 : currentPage - 2
        let endIndex = currentPage + 2 > buttonsArray.length ? buttonsArray.length : currentPage + 2

        // console.log(startIndex , endIndex ,buttonsArray , buttonsArray.slice(startIndex - 1 , endIndex))

        return buttonsArray.slice(startIndex - 1, endIndex)
    }

    return (
        <div className="flex flex-col gap-5">
            {filteredMovies.map(movie => (
                <MovieCard {...movie} />
            ))}
            <div className="flex items-center justify-center gap-1.5 w-full rounded-lg py-4 bg-white shadow shadow-black/5 dark:bg-secondary">
                {currentPage !== 1 && (
                    <button
                        className="py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold text-shabnam"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >صفحه قبل</button>
                )}

                {currentPage > 3 && (
                    <>
                        <button
                            className={`py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == 1 && 'active-paginate'}`}
                            onClick={() => changePaginate(1)}
                        >1</button>

                        <button
                            className="py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold"
                        >...</button>
                    </>
                )}

                {midBtns().map(button => (
                    <button
                        key={button}
                        className={`py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == (button + 1) && 'active-paginate'}`}
                        onClick={() => changePaginate(button + 1)}
                    >{button + 1}</button>
                ))}

                {currentPage < (buttonsArray.length - 2) && (
                    <>
                        <button
                            className="py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold"
                        >...</button>

                        <button
                            className={`py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == buttonsArray.length && 'active-paginate'}`}
                            onClick={() => changePaginate(buttonsArray.length)}
                        >{buttonsArray.length}</button>
                    </>

                )}

                {currentPage !== buttonsArray.length && (
                    <button
                        className="py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold text-shabnam"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >صفحه بعد</button>
                )}
            </div>
        </div>
    )
}
