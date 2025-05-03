import React from 'react'

export default function UserActivityInfo({title , value , color , children}) {
  return (
    <div className="py-3 pl-4 pr-6 flex items-center justify-between panel-box">
        <div className="flex flex-col justify-center gap-1">
            <span className="text-gray-800 dark:text-white font-bold text-sm xl:text-base">{value}</span>
            <h2 className="text-light-gray dark:text-gray-500 font-vazir-light text-xs xl:text-sm">{title}</h2>
        </div>
        <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${color} hover:scale-110 transition-transform`}>
            {children}
        </div>
    </div>
  )
}
