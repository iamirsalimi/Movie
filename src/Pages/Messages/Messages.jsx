import React, { useEffect, useRef } from 'react';

import { Outlet } from 'react-router-dom'

export default function Messages() {
    // ref for end of the message element , user  will see latest messages
    const endOfMessagesRef = useRef(null)
    
    // when component got mount page will scroll automatically to end of the message page  
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    return (
        <div className="panel-box py-4 px-5 flex flex-col items-center gap-9 mb-16">
            <Outlet />
            <span ref={endOfMessagesRef} />
        </div>
    )
}
