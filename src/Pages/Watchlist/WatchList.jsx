import React from 'react'

import { movies } from './../../moviesData'

import WatchListMovieCard from '../../Components/WatchListMovieCard/WatchListMovieCard'

export default function WatchList() {
  return (
    <div className="py-4 pb-12 px-5 panel-box flex flex-col gap-7">
      <h2 className="text-gray-700 dark:text-white font-vazir text-2xl">لیست تماشا</h2>

      <div className="grid grid-cols-5 gap-x-4 gap-y-16">
        {movies.map(movie => (
          <WatchListMovieCard {...movie} />
        ))}
      </div>
    </div>
  )
}
