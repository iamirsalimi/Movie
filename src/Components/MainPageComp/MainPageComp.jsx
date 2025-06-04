import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import WithPageContent from './../../HOCs/WithPageContent'

import WeeklyTable from './../WeeklyTable/WeeklyTable'
import MainMovies from './../MainMovies/MainMovies'


function MainPageComp({ movies, movieTable }) {
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [checked, setChecked] = useState(false)


  const searchLocation = new URLSearchParams(useLocation().search)

  const [searchType, setSearchType] = useState(searchLocation.get('search-type'))
  const [searchValue, setSearchValue] = useState(searchLocation.get('search-type') ? searchLocation.get('s') : null)

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

  const countries = [
    { value: "USA", label: ["آمریکا", "آمریكا"] },
    { value: "canada", label: ["کانادا", "كانادا"] },
    { value: "britain", label: ["انگلبس"] },
    { value: "south-korea", label: ["كره جنوبي", "کره جنوبی"] },
    { value: "japan", label: ["ژاپن"] },
    { value: "iran", label: ["ایران"] },
    { value: "germany", label: ["آلمان"] },
    { value: "france", label: ["فرانسه"] },
    { value: "italy", label: ["ایتالیا"] },
    { value: "brazil", label: ["برزیل"] },
    { value: "spain", label: ["اسپانیا"] },
    { value: "indonesia", label: ["اندونزی"] },
    { value: "denmark", label: ["دانمارک", "دانمارك"] },
    { value: "china", label: ["چین"] },
    { value: "turkey", label: ["ترکیه", "تركيه"] },
    { value: "india", label: ["هند"] },
    { value: "albania", label: ["آلبانی"] },
  ]

  const location = useLocation()

  const filterMoviesHandler = () => {
    let result = [...movies]
    
    if(searchType){
      if (searchType == 'advanced') {
        const params = new URLSearchParams(location.search)
  
        const filters = {
          search: params.get('s'),
          movieType: params.get('movieType'),
          genre: params.get('genre') && genres[params.get('movieType')].find(genre => genre.value == params.get('genre')).label,
          imdb: params.get('imdb') || 0,
          rotten: params.get('rotten') || 0,
          metacritic: params.get('metacritic') || 0,
          country: params.get('country') ? countries.find(country => country.value == params.get('country'))?.label : [],
          hasSubtitle: params.get('hasSubtitle') === 'true', // to change that to boolean
          isDubbed: params.get('isDubbed') === 'true', // to change that to boolean
          fromYear: +params.get('fromYear') || 1950,
          toYear: +params.get('toYear') || new Date().getFullYear()
        }
  
        result = movies.filter(movie => {
          if (filters.movieType && movie.movieType !== filters.movieType) return false
          if (filters.genre && filters.genre !== 'genre' && !movie.genres.includes(filters.genre)) return false
          if (filters.imdb && +movie.imdb_score < +filters.imdb) return false
          if (filters.rotten && +movie.rotten_score < +filters.rotten) return false
          if (filters.metacritic && +movie.metacritic_score < +filters.metacritic) return false
  
          if (filters.country.length > 0) {
            if (!movie.countries?.some(country => filters.country.includes(country))) return false
          }
  
          if (filters.hasSubtitle && !movie.has_subtitle) return false
          if (filters.isDubbed && !movie.is_dubbed) return false
          if (filters.fromYear && +movie.year < +filters.fromYear) return false
          if (filters.toYear && +movie.year > +filters.toYear) return false
  
          return true
        })
      } else {
        result = movies.filter(movie => movie.title.toLowerCase().includes(searchValue))
      }
    }

    setFilteredMovies(result)
  }

  useEffect(() => {
    if (movies.length > 0 && !checked && filteredMovies.length == movies.length) {
      setChecked(true)
      filterMoviesHandler()
    }
  }, [location.search, movies, filteredMovies])

  useEffect(() => {
    if (movies.length > 0) {
      setFilteredMovies(movies)
    }
  }, [movies])

  return (
    <>
      <WeeklyTable movieTable={movieTable} movies={movies} />
      <MainMovies movies={filteredMovies} />
    </>
  )
}

export default WithPageContent(MainPageComp)