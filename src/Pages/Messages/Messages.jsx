import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Messages() {
    return (
        <div className="panel-box py-4 px-5 flex flex-col items-center gap-9">
            <Outlet />
        </div>
    )
}
