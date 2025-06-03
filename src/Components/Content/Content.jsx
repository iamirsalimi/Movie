import React, { useState, useEffect } from 'react'

import FilterBox from './../FilterBox/FilterBox'
import FilterModal from './../FilterModal/FilterModal'
import MainPageComp from '../mainPageComp/MainPageComp'

import useFilter from '../../Hooks/useFilter';

let thisYear = new Date().getFullYear()


export default function Content() {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [genres, setGenres] = useState({
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
  })

  const { activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry, resetFilters } = useFilter('movie', thisYear)

  const [activeTypeArray, setActiveTypeArray] = useState(genres[activeType])

  const filterMovies = () => {
    console.log('clicked', country)
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

    console.log(queryString)
    // if (queryString) {
    //     window.location = `?${queryString}`
    // }
  }

  const filterStates = { activeType, setActiveType, genre, setGenre, fromYear, setFromYear, toYear, setToYear, hasSubtitle, setHasSubtitle, isDubbed, setIsDubbed, imdb, setImdb, rotten, setRotten, metacritic, setMetacritic, country, setCountry, activeTypeArray, setActiveTypeArray,thisYear, filterMovies, resetFilters }

  useEffect(() => {
    if (showFilterModal) {
      resetFilters()
    }
  }, [showFilterModal])

  useEffect(() => {
    setActiveTypeArray(genres[activeType])
  }, [activeType])

  return (
    <div className="mx-auto container w-full flex-col gap-y-7 gap-x-4 px-7">
      <FilterBox setShowFilterModal={setShowFilterModal} {...filterStates} />
      <MainPageComp />
      <FilterModal showModal={showFilterModal} setShowModal={setShowFilterModal} {...filterStates} />
    </div>
  )
}
