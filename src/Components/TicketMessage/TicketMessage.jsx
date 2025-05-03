import React from 'react'

import { FaUser } from "react-icons/fa";

export default function TicketMessage({ adminFlag }) {
    return (
        <div className={`w-full flex items-end ${adminFlag ? 'justify-end' : 'justify-start'} gap-5`}>
            {!adminFlag && (
                <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    <FaUser className="text-white absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                </div>
            )}
            
            <div className={`${adminFlag ? 'ticket-message-admin' : 'ticket-message-user'} bottom-2 flex flex-col gap-2`}>
                <p className="font-vazir-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate saepe deleniti dicta mollitia laboriosam delectus, modi, velit ratione nostrum vitae at vel, quisquam laudantium eveniet.</p>
                <span className="font-bold text-sm">12:20 {adminFlag && ( <span>- ادمین</span> )} </span>
            </div>
            
            {adminFlag && (
                <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    <FaUser className="text-white absolute -bottom-5 left-1/2 -translate-1/2 w-8 h-8" />
                </div>
            )}
        </div>
    )
}
