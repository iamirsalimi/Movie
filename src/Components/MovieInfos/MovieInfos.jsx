import React from 'react'

export default function MovieInfos({ infoTitle, infoValue, children }) {
  return (
    <div className="relative bg-white dark:bg-primary border border-gray-200 dark:border-secondary rounded-xl h-fit pt-3 pb-1 px-2">
      <div className="absolute -top-3 right-2 rounded-sm  inline-flex items-center justify-center gap-1 bg-white dark:bg-secondary px-2 py-1">
        {children}
        <span className="text-gray-500 dark:text-gray-400 font-vazir text-xs">{infoTitle}</span>
      </div>
      <span className="text-primary dark:text-white font-shabnam-light text-xs sm:text-sm">{typeof infoValue == 'object' ? infoValue.map(value => (
        <span className={`group ${infoValue.length > 2 ? 'text-xs' : 'text-sm'} px-0.5 md:px-1`}><span>{value}</span><span className="group-last:hidden text-slate-500"> ,</span></span>
      )) : infoValue}</span>
    </div>
  )
}
