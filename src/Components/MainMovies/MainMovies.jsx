import React, { useEffect, useState, useMemo } from 'react'

import MovieCard from './../MovieCard/MovieCard'
import { useNavigate, useParams } from 'react-router-dom'

export default function MainMovies({ movies }) {
    let [filteredMovies, setFilteredMovies] = useState([])
    let [buttonsArray, setButtonsArray] = useState([])
    let [currentPage, setCurrentPage] = useState(1)
    let movieRowsCount = 10
    
    let pagesCount = null
    let endIndex = null
    let startIndex = null

    let { pageId } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        pagesCount = Math.ceil(movies.length / movieRowsCount)
        setButtonsArray(Array.from(Array(pagesCount).keys()))
        endIndex = currentPage * movieRowsCount
        startIndex = endIndex - movieRowsCount
        setFilteredMovies(movies.slice(startIndex, endIndex))
    }, [currentPage])

    useEffect(() => {
        if(pagesCount && pageId <= pagesCount){
            setCurrentPage(+pageId)
        } else {
            navigate('/')
        }
    } , [])

    // we should show only 2 more and 2 less of currentPage Btns 
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
                    <a href={`/${currentPage - 1 == 1 ? '' : `page/${currentPage - 1}`}`}>
                        <button
                            className="py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold text-shabnam"
                        >صفحه قبل</button>
                    </a>
                )}

                {currentPage > 3 && (
                    <>
                        <a href="/">
                            <button
                                className={`py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == 1 && 'active-paginate'}`}
                            >1</button>

                        </a>

                        <button
                            className="py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold"
                        >...</button>
                    </>
                )}

                {midBtns().map(button => (
                    <a href={`/page/${button + 1}`}>
                        <button
                            key={button}
                            className={`py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == (button + 1) && 'active-paginate'}`}
                        >{button + 1}</button>
                    </a>
                ))}

                {currentPage < (buttonsArray.length - 2) && (
                    <>
                        <button
                            className="py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold"
                        >...</button>


                        <a href={`/page/${buttonsArray.length}`}>
                            <button
                                className={`py-1 px-2 rounded-sm bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold ${currentPage == buttonsArray.length && 'active-paginate'}`}
                            >{buttonsArray.length}</button>
                        </a>
                    </>

                )}

                {currentPage !== buttonsArray.length && (
                    <a href={`/page/${currentPage + 1}`}>
                        <button
                            className="py-1 px-2 rounded-sm  bg-sky-100 text-light-gray hover:bg-sky-200 dark:bg-primary dark:text-sky-100 dark:hover:bg-sky-100 dark:hover:text-primary transition-colors duration-150 cursor-pointer font-semibold text-shabnam"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >صفحه بعد</button>
                    </a>
                )}
            </div>
        </div>
    )
}
