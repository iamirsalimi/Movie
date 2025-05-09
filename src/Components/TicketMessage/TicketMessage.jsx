import React from 'react'

import { FaUser } from "react-icons/fa";

export default function TicketMessage({ receiveFlag , adminReceiver }) {
    return (
        <div className={`w-full flex items-end ${receiveFlag ? 'justify-end' : 'justify-start'} gap-5`}>
            {!receiveFlag && (
                <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    <FaUser className="text-white absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                </div>
            )}
            
            <div className={`${receiveFlag ? 'ticket-message-admin' : 'ticket-message-user'} bottom-2 flex flex-col gap-2`}>
                <p className="font-vazir-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe deleniti dicta mollitia laboriosam delectus, modi, velit ratione nostrum vitae at vel, quisquam laudantium eveniet.</p>
                <span className="font-bold text-sm">12:20 {adminReceiver && ( <span>- ادمین</span> )} </span>
            </div>
            
            {receiveFlag && (
                <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    <FaUser className="text-white absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                </div>
            )}
        </div>
    )
}
