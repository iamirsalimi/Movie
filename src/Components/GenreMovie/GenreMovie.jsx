import React from 'react'

export default function GenreMovie({ genreTitle, genreValue, children }) {
  return (
    <div className="relative bg-primary rounded-md h-fit pt-3 pb-1 px-2">
      <div className="absolute -top-3 right-2 rounded-sm  inline-flex items-center justify-center gap-1 bg-secondary px-2 py-1">
        {children}
        <span className="text-gray-400 font-vazir text-xs ">{genreTitle}</span>
      </div>
      <span className="text-white font-vazir text-sm">{typeof genreValue == 'object' ? genreValue.map(language => (
        <span className="group text-sm px-0.5 md:px-1"><span>{language}</span><span className="group-last:hidden text-slate-500">,</span></span>
      )) : genreValue}</span>
    </div>
  )
}
