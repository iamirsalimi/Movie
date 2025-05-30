import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import MovieCard from './../MovieCard/MovieCard'
import PaginateBtns from '../PaginateBtns/PaginateBtns'

import usePagination from '../../Hooks/usePagination' // arguments (movies array - default value of currentPage - pageCount or movieElements shown per page) , returns (filteredMovies - bindingObj - currentPage - setCurrentPage - pagesCount - startIndex)

export default function MainMovies({ movies }) {
    // if pagesCount was equals to -1 that means it hasn't initialized yet 

    let { pageId } = useParams();
    const initialPage = pageId ? parseInt(pageId) : 1;

    const [filteredMovies, bindingObj, currentPage, setCurrentPage, pagesCount] = usePagination(movies, initialPage, 5)

    // console.log(movies , filteredMovies)

    let navigate = useNavigate()

    // console.log(pagesCount , pageId)
    // useEffect(() => {
    //     if (filteredMovies.length > 0) {
    //         if (pagesCount != -1 && pageId <= pagesCount) {
    //             setCurrentPage(+pageId)
    //             console.log(pagesCount, pageId)
    //             // } else {
    //             //     navigate('/')
    //         }
    //         console.log('not found -> ',pagesCount, pageId)
    //     }
    // }, [movies , filteredMovies])


    // useEffect(() => {
    //     const pageNumber = parseInt(pageId);

    //     if (!pageId || isNaN(pageNumber) || pagesCount === -1) return;

    //     if (pageNumber >= 1 && pageNumber <= pagesCount) {
    //         setCurrentPage(pageNumber)
    //         setReady(true)
    //     } else {
    //         navigate('/not-found')
    //     }
    // }, [pageId, pagesCount]);

    useEffect(() => {
        const pageNumber = parseInt(pageId);

        if (!pageId || isNaN(pageNumber)) return;

        if (pagesCount === 0) return

        if (pageNumber >= 1 && pageNumber <= pagesCount) {
            setCurrentPage(pageNumber);
        } else {
            navigate('/not-found');
        }
    }, [pageId, pagesCount])

    
    return (
        <div className="flex flex-col gap-5">
            {filteredMovies.map(movie => (
                <MovieCard key={movie.id} {...movie} />
            ))}
            <div className="flex items-center justify-center gap-1.5 w-full rounded-lg py-4 bg-white shadow shadow-black/5 dark:bg-secondary">
                <PaginateBtns currentPage={currentPage} {...bindingObj} />
            </div>
        </div>
    )
}
