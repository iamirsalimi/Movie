import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function PanelLayout() {
    return (
        <div className="w-full flex">
            <Outlet />
        </div>
    )
}
