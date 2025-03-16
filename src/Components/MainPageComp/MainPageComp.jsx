import React from 'react'

import WithPageContent from './../../HOCs/WithPageContent'

import WeeklyTable from './../WeeklyTable/WeeklyTable'
import MainMovies from './../MainMovies/MainMovies'


function MainPageComp({movies , movieTable}) {
  return (
    <>
        <WeeklyTable movieTable={movieTable} movies={movies} />
        <MainMovies movies={movies} />
    </>
  )
}

export default WithPageContent(MainPageComp)