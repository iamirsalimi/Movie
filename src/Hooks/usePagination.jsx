import React, { useState, useEffect } from 'react'

export default function usePagination(movies , current , rows) {
    const [filteredMovies, setFilteredMovies] = useState([])
    const [buttonsArray, setButtonsArray] = useState([])
    
    let movieRowsCount = rows
    let pagesCount = Math.ceil(movies.length / movieRowsCount)
    current = current > pagesCount ? 1 : current
    
    const [currentPage, setCurrentPage] = useState(current)
    
    let startIndex = (current - 1) * rows   
    let endIndex = startIndex + rows

    useEffect(() => {
        setButtonsArray(Array.from(Array(pagesCount).keys()))
        setFilteredMovies(movies.slice(startIndex, endIndex))
    }, [currentPage])

    // we should show only 2 more and 2 less of currentPage Btns 
    let bindingObj = {
        buttonsArray : buttonsArray,
        midBtns : () => {
            let startIndex = currentPage - 2 < 1 ? 1 : currentPage - 2
            let endIndex = currentPage + 2 > buttonsArray.length ? buttonsArray.length : currentPage + 2
    
            // console.log(startIndex , endIndex ,buttonsArray , buttonsArray.slice(startIndex - 1 , endIndex))

            return buttonsArray.slice(startIndex - 1, endIndex)
        }
    }


    // start Index is just used for imdb-top page that they can have access to the index of each movieElem (in each page we show the index of the film so we need that to calculate movie index) 
    return [filteredMovies , bindingObj , currentPage , setCurrentPage , pagesCount , startIndex]
}
