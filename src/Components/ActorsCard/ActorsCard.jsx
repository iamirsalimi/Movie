import React from 'react'

export default function ActorsCard({ id, castId, fullName ,role, src }) {
    return (
        <a href={`/actors/${castId}`} className="relative mb-2 group">
            <li key={id} className="group translate-0 transition-all hover:-translate-y-2 overflow-hidden relative rounded-lg h-40 cursor-pointer">
                <img src={src} className="w-full h-full !object-cover !object-center" alt="" />
                <span className="absolute top-0 left-0 w-full z-10 h-full bg-gradient-to-t from-black from-5% to-black/0 "></span>
                <span className="absolute text-center text-[11px] bottom-5 left-1/2 z-20 -translate-1/2 text-white font-bold">{fullName}</span>
                <span className={`text-nowrap absolute -bottom-1 left-1/2 z-20 -translate-1/2 font-shabnam-light text-white cursor-pointer px-2 py-0.5 text-xs rounded-sm  font-bold ${role == 'actor' ? 'bg-green-500' : role == 'director' ? 'bg-yellow-500' : role == 'voiceActor' ? 'bg-purple-600' : 'bg-gray-500'}`}>{role == 'actor' ? 'بازیگر' : role == 'director' ? 'کارگردان' : role == 'voiceActor' ? 'صدا پیشه' : 'نویسنده'}</span>
            </li>
        </a>
    )
}
