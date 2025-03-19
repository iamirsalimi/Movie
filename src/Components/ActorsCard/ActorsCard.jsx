import React from 'react'

export default function ActorsCard({ id, name ,rule, src }) {
    return (
        <a href={`/Actors/${id}`} className="relative pb-2 group">
            <li key={id} className="group translate-0 transition-all hover:-translate-y-2 overflow-hidden relative rounded-lg h-40 cursor-pointer">
                <img src={src} className="w-full h-full object-cover object-center" alt="" />
                <span className="absolute top-0 left-0 w-full z-10 h-full bg-gradient-to-t from-black from-5% to-black/0 "></span>
                <span className="absolute text-center text-[11px] bottom-5 left-1/2 z-20 -translate-1/2 text-white font-bold">{name}</span>
                <span className="text-nowrap absolute -bottom-1 left-1/2 z-20 -translate-1/2 font-vazir bg-green-500 text-white cursor-pointer px-2 py-0.5 text-xs rounded-sm  font-bold">{rule}</span>
            </li>
        </a>
    )
}
