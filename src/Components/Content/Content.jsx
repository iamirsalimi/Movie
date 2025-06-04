import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import FilterBox from './../FilterBox/FilterBox'
import FilterModal from './../FilterModal/FilterModal'
import MainPageComp from '../mainPageComp/MainPageComp'

import useFilter from '../../Hooks/useFilter';

let thisYear = new Date().getFullYear()


export default function Content() {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const genres = {
    movie: [
      { label: 'اکشن', value: 'action' },
      { label: 'ترسناک', value: 'horror' },
      { label: 'انیمیشن', value: 'animation' },
      { label: 'تاریخی', value: 'history' },
      { label: 'جنایی', value: 'crime' },
      { label: 'جنگی', value: 'war' },
      { label: 'خانوادگی', value: 'family' },
      { label: 'درام', value: 'drama' },
      { label: 'زندگی نامه', value: 'biography' },
      { label: 'عاشقانه', value: 'romance' },
      { label: 'علمی تخیلی', value: 'sci-fi' },
      { label: 'فانتزی', value: 'fantasy' },
      { label: 'کمدی', value: 'comedy' },
      { label: 'کوتاه', value: 'short' },
      { label: 'ماجراجویی', value: 'adventure' },
      { label: 'انیمه', value: 'anime' },
      { label: 'مستند', value: 'documentary' },
      { label: 'معمایی', value: 'mystery' },
      { label: 'موزیکال', value: 'musical' },
      { label: 'وسترن', value: 'western' },
      { label: 'نوآر', value: 'noir' },
      { label: 'هیجان انگیز', value: 'thriller' },
      { label: 'ورزشی', value: 'sport' },
    ],
    series: [
      { label: 'اکشن', value: 'action' },
      { label: 'Talk-Show', value: 'talk-show' },
      { label: 'ترسناک', value: 'horror' },
      { label: 'انیمیشن', value: 'animation' },
      { label: 'تاریخی', value: 'history' },
      { label: 'جنایی', value: 'crime' },
      { label: 'جنگی', value: 'war' },
      { label: 'خانوادگی', value: 'family' },
      { label: 'درام', value: 'drama' },
      { label: 'زندگی نامه', value: 'biography' },
      { label: 'عاشقانه', value: 'romance' },
      { label: 'علمی تخیلی', value: 'sci-fi' },
      { label: 'فانتزی', value: 'fantasy' },
      { label: 'کمدی', value: 'comedy' },
      { label: 'کوتاه', value: 'short' },
      { label: 'انیمه', value: 'anime' },
      { label: 'ماجراجویی', value: 'adventure' },
      { label: 'مستند', value: 'documentary' },
      { label: 'معمایی', value: 'mystery' },
      { label: 'موزیکال', value: 'musical' },
      { label: 'وسترن', value: 'western' },
      { label: 'نوآر', value: 'noir' },
      { label: 'هیجان انگیز', value: 'thriller' },
      { label: 'ورزشی', value: 'sport' },
      { label: 'موسیقی', value: 'music' },
    ]
  }

  const { activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry, resetFilters } = useFilter('movie', thisYear)

  const [activeTypeArray, setActiveTypeArray] = useState(genres[activeType])

  const location = useLocation()
  const searchLocation = new URLSearchParams(location.search)

  const [searchType, setSearchType] = useState(searchLocation.get('search-type'))
  const [searchValue, setSearchValue] = useState(searchLocation.get('search-type') ? searchLocation.get('s') : null)

  const filterMovies = () => {
    const query = new URLSearchParams()

    if (activeType) query.set('movieType', activeType)
    if (genre != 'genre') query.set('genre', genre)
    if (imdb != 'score') query.set('imdb', imdb)
    if (rotten != 'score') query.set('rotten', rotten)
    if (metacritic != 'score') query.set('metacritic', metacritic)
    if (country != 'country') query.set('country', country)
    if (hasSubtitle) query.set('hasSubtitle', hasSubtitle)
    if (isDubbed) query.set('isDubbed', isDubbed)
    if (parseInt(fromYear) && +fromYear != 1950) query.set('fromYear', fromYear)
    if (parseInt(toYear) && +toYear != 2025) query.set('toYear', toYear)

    const queryString = query.toString()

    if (queryString) {
      window.location = `?search-type=advanced&${queryString}`
    }
  }

  // to give all of them to components as a object
  const filterStates = { activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry, activeTypeArray, setActiveTypeArray, thisYear, filterMovies, resetFilters }

  // to reset filters when
  useEffect(() => {
    if (showFilterModal && !searchType) {
      resetFilters()
    }
  }, [showFilterModal])

  useEffect(() => {
    setActiveTypeArray(genres[activeType])
  }, [activeType])

  useEffect(() => {
    if (searchType == 'advanced') {
      const params = new URLSearchParams(location.search)

      const filters = {
        search: params.get('s'),
        movieType: params.get('movieType'),
        genre: params.get('genre'),
        imdb: params.get('imdb') || 0,
        rotten: params.get('rotten') || 0,
        metacritic: params.get('metacritic') || 0,
        country: params.get('country'),
        hasSubtitle: params.get('hasSubtitle') === 'true', // to change that to boolean
        isDubbed: params.get('isDubbed') === 'true', // to change that to boolean
        fromYear: +params.get('fromYear') || 1950,
        toYear: +params.get('toYear') || thisYear
      }

      if (filters.movieType) {
        setActiveType(filters.movieType)
        setActiveTypeArray(genres[activeType])
      }

      if (filters.genre) setGenre(filters.genre)
      if (filters.imdb) setImdb(filters.imdb)
      if (filters.rotten) setRotten(filters.rotten)
      if (filters.metacritic) setMetacritic(filters.metacritic)
      if (filters.country) setCountry(filters.country)
      if (filters.hasSubtitle) setHasSubtitle(filters.hasSubtitle)
      if (filters.isDubbed) setIsDubbed(filters.isDubbed)
      if (filters.fromYear) setFromYear(filters.fromYear)
      if (filters.toYear) setToYear(filters.toYear)
    }
  }, [])

  return (
    <div className="mx-auto container w-full flex-col gap-y-7 gap-x-4 px-7">
      {searchType && (
        <h1 className="xs:text-lg md:text-xl lg:text-2xl font-vazir text-yellow-600 text-center mb-7">{searchType == 'advanced' ? 'نتايج جستجوي پیشرفته' : `نتايج جستجوي "${searchValue}"`}</h1>
      )}
      <FilterBox setShowFilterModal={setShowFilterModal} {...filterStates} />
      <MainPageComp />
      <FilterModal showModal={showFilterModal} setShowModal={setShowFilterModal} {...filterStates} />
    </div>
  )
}
