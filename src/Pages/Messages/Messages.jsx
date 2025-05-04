import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'


export default function Messages() {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="panel-box py-4 px-5 flex flex-col items-center gap-9 mb-16">
            <Outlet />
            <span ref={endOfMessagesRef} />
        </div>
    )
}
