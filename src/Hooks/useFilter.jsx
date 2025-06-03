import { useState, useEffect } from 'react'

export default function useFilter(defaultType = 'movie' , thisYear) {
    const [activeType, setActiveType] = useState(defaultType)
    const [genre, setGenre] = useState('genre')
    const [imdb, setImdb] = useState('score')
    const [rotten, setRotten] = useState('score')
    const [metacritic, setMetacritic] = useState('score')
    const [hasSubtitle, setHasSubtitle] = useState(false)
    const [isDubbed, setIsDubbed] = useState(false)
    const [country, setCountry] = useState('country')
    const [fromYear, setFromYear] = useState(1950)
    const [toYear, setToYear] = useState(thisYear)

    const resetFilters = () => {
        setActiveType('movie')
        setGenre('genre')
        setImdb('score')
        setRotten('score')
        setMetacritic('score')
        setHasSubtitle(false)
        setIsDubbed(false)
        setCountry('country')
        setFromYear(1950)
        setToYear(thisYear)
    }

    return {
        activeType, setActiveType,
        genre, setGenre,
        fromYear, setFromYear,
        toYear, setToYear,
        hasSubtitle, setHasSubtitle,
        isDubbed, setIsDubbed,
        imdb, setImdb,
        rotten, setRotten,
        metacritic, setMetacritic,
        country, setCountry,
        resetFilters
    }
}
