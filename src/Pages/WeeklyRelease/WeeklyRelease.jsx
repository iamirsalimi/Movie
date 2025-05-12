import React from 'react'

import { Outlet } from 'react-router-dom'

export default function WeeklyRelease() {
    return (
        <div className="w-full h-fit flex flex-col items-center gap-10">
            <Outlet />
        </div >
    )
}
