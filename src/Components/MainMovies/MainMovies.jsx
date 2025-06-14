import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import MovieCard from './../MovieCard/MovieCard'
import PaginateBtns from './../PaginateBtns/PaginateBtns'

import usePagination from './../../Hooks/usePagination' // arguments (movies array - default value of currentPage - pageCount or movieElements shown per page) , returns (filteredMovies - bindingObj - currentPage - setCurrentPage - pagesCount - startIndex)

export default function MainMovies({ movies }) {
    // if pagesCount was equals to -1 that means it hasn't initialized yet 

    let { pageId } = useParams()
    const initialPage = pageId ? parseInt(pageId) : 1

    const [filteredMovies, bindingObj, currentPage, setCurrentPage, pagesCount] = usePagination(movies, initialPage, 5)


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

    // console.log(movies , filteredMovies)

    return (
        <div className="flex flex-col gap-5">
            {filteredMovies.map(movie => (
                <MovieCard key={movie.id} {...movie} />
            ))}
            {pagesCount > 1 && (
                <div className="flex items-center justify-center gap-1.5 w-full rounded-lg py-4 bg-white shadow shadow-black/5 dark:bg-secondary">
                    <PaginateBtns currentPage={currentPage} {...bindingObj} />
                </div>
            )}
        </div>
    )
}
