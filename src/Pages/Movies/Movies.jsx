import React from 'react'

import { Outlet } from 'react-router-dom'

export default function Movies() {
    return (
        <div className="w-full h-fit flex flex-col items-center gap-10 mb-12">
            <Outlet />
        </div >
    )
}
