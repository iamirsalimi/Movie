import React from 'react'

import RadialProgress from './../RadialProgress/RadialProgress'

export default function Card({ id, title, cover, description, isActive, movieType, imdb_score}) {
  // console.log(genre)
  return (
    <a href={`/${movieType}/${id}`}>
      <div className={`relative h-full w-full space-y-2.5 group ${isActive && 'cursor-pointer'}`}>
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img src={cover} className="h-full w-full object-center object-cover" alt="" />
        </div>

        <div className={`absolute top-2 left-2 ${isActive ? 'opacity-100 group-hover:-translate-y-10 group-hover:opacity-0 duration-300 transition-all' : ''}`}>
          <RadialProgress score={imdb_score} />
        </div>

        {isActive && (
          <p className="absolute top-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 duration-300 bg-black/65 glass-effect-card h-full w-full text-justify font-vazir-light p-2 text-white text-sm">{description}</p>
        )}

        {isActive && (
          <span className={`text-yellow-500 opacity-100 w-full font-sans font-semibold group-hover:opacity-0 transition-all`}>{title}</span>
        )}
      </div>
    </a>
  )
}
