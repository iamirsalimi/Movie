import React , {useEffect} from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import MovieCard from './../MovieCard/MovieCard'
import PaginateBtns from '../PaginateBtns/PaginateBtns'

import usePagination from '../../Hooks/usePagination' // arguments (movies array - default value of currentPage - pageCount or movieElements shown per page) , returns (filteredMovies - bindingObj - currentPage - setCurrentPage - pagesCount - startIndex)

export default function MainMovies({ movies }) {
    // if pagesCount was equals to -1 that means it hasn't initialized yet 
    const [filteredMovies, bindingObj , currentPage, setCurrentPage , pagesCount] = usePagination(movies, 1, 10)

    let { pageId } = useParams()
    let navigate = useNavigate()

    // console.log(pagesCount , pageId)
    useEffect(() => {
        if (pagesCount != -1 && pageId <= pagesCount) {
            setCurrentPage(+pageId)
        } else {
            navigate('/')
        }
    }, [])

    return (
        <div className="flex flex-col gap-5">
            {filteredMovies.map(movie => (
                <MovieCard {...movie} />
            ))}
            <div className="flex items-center justify-center gap-1.5 w-full rounded-lg py-4 bg-white shadow shadow-black/5 dark:bg-secondary">
                <PaginateBtns currentPage={currentPage} {...bindingObj} />
            </div>
        </div>
    )
}
