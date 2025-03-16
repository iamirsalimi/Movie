import React from 'react'

export default function Card({id , title, src, desc, isActive, type }) {
  // console.log(genre)
  return (
    <a href={`${type}/${id}`}>
      <div className={`relative h-full w-full space-y-2.5 group ${isActive && 'cursor-pointer'}`}>
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img src={src} className="h-full w-full object-center object-cover" alt="" />
        </div>

        {isActive && (
          <p className="absolute top-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 duration-300 bg-black/65 glass-effect-card h-full w-full text-justify font-vazir p-2 text-white text-sm">{desc}</p>
        )}

        {isActive && (
          <span className={`text-yellow-500 opacity-100 w-full font-sans font-semibold group-hover:opacity-0 transition-all`}>{title}</span>
        )}
      </div>
    </a>
  )
}
