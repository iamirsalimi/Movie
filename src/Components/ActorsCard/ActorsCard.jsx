import React from 'react'

export default function ActorsCard({ id, name , src }) {
    return (
        <a href={`/Actors/${id}`} className="relative pb-2 group">
            <li key={id} className="group overflow-hidden relative rounded-lg h-40 cursor-pointer">
                <img src={src} className="w-full h-full object-cover object-center" alt="" />
                <span className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center duration-200"></span>
            </li>
            <span className="text-nowrap line-clamp-1 absolute text-sm -bottom-7 left-1/2 -translate-1/2 text-gray-700 dark:text-white  opacity-100 transition-all group-hover:-translate-y-3 group-hover:opacity-0">{name}</span>
        </a>
    )
}
