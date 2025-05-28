import React from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';
dayjs.extend(jalali)

import { FaUser } from "react-icons/fa";

export default function TicketMessage({ receiveFlag, adminFlag, sender_role = 'user', text , created_at }) {
    const getHour = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('HH:mm')
        return persianDate
    }

    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        return persianDate
    }

    return (
        <div className={`w-full pt-7 relative flex items-end ${receiveFlag ? 'justify-end' : 'justify-start'} gap-5`}>
            <span className="absolute left-1/2 -top-3 -translate-x-1/2 px-2 py-1 rounded-full bg-white text-light-gray dark:bg-secondary dark:text-white text-xs font-vazir">{getDate(created_at)}</span>

            {!receiveFlag && (
                <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    {sender_role == 'user' ? (
                        <FaUser className="text-white absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                    ) : (
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7f_uEZWcJpvDPVlZmi2buSBoLv2PZoZ86Q&s" alt="" className="w-full h-full object-center object-cover" />
                    )}
                </div>
            )}

            <div className={`${receiveFlag ? 'ticket-message-admin' : 'ticket-message-user'} bottom-2 flex flex-col gap-2`}>
                <p className="font-vazir-light">{text}</p>
                <span className="font-bold text-sm">{getHour(created_at)} {adminFlag && (<span>- ادمین</span>)} </span>
            </div>

            {receiveFlag && (
                <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    {sender_role == 'user' ? (
                        <FaUser className="text-white absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                    ) : (
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7f_uEZWcJpvDPVlZmi2buSBoLv2PZoZ86Q&s" alt="" className="w-full h-full object-center object-cover" />
                    )}
                </div>
            )}
        </div>
    )
}
