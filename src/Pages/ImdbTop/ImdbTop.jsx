import React , {useEffect} from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import PaginateBtns from './../../Components/PaginateBtns/PaginateBtns'
import TopMovieCard from './../../Components/TopMovieCard/TopMovieCard'
import { movies } from '../../moviesData'

import usePagination from '../../Hooks/usePagination' // arguments (movies array - default value of currentPage - pageCount or movieElements shown per page) , returns (filteredMovies - bindingObj - currentPage - setCurrentPage - pagesCount - startIndex)


export default function ImdbTop() {
    let { movieType, pageId = 1 } = useParams()

    
    const [filteredMovies, bindingObj, currentPage, setCurrentPage, pagesCount, startIndex] = usePagination(movies.sort((a , b) => b.rating[0].rate - a.rating[0].rate), +pageId , 15)
    
    let movieTypeRoute = movieType == 'series' ? 'سريال' : movieType == 'movies' ? 'فيلم' : 'انيمه'
    
    console.log(pageId , pagesCount , filteredMovies)
    let navigate = useNavigate()
    useEffect(() => {
        if (pagesCount && pageId <= pagesCount) {
            setCurrentPage(+pageId)
        } else {
            setCurrentPage(1)
            navigate(`/imdb-top/${movieType}/`)
        }
    }, [])

    return (
        <div className="container mx-auto px-5 my-12 flex flex-col items-center gap-12 ">
            <div className="flex flex-col items-center gap-9">
                <div className="h-36 min-w-36 flex items-center justify-center rounded-full font-bold text-4xl border border-light dark:border-primary bg-yellow-500 ring-[12px] ring-yellow-300/70">
                    <span className="text-light dark:text-primary">IMDb</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-light-gray text-2xl dark:text-white font-vazir">250 <span>{movieTypeRoute}</span> برتر IMDb</h3>
                    <span className="text-xs text-gray-400 dark:text-gray-600 font-vazir">ليست 250 <span>{movieTypeRoute}</span> برتر IMDb</span>
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-12">
                    {filteredMovies.map((movie, index) => (
                        <TopMovieCard {...movie} index={startIndex + (index + 1)} />
                    ))}
                </div>
                <div className="w-full flex items-center justify-center gap-1.5 flex-wrap rounded-lg py-4 bg-white shadow shadow-black/5 dark:bg-secondary">
                    <PaginateBtns {...bindingObj} currentPage={currentPage} route={`/imdb-top/${movieType}`} />
                </div>
            </div>

        </div>
    )
}
