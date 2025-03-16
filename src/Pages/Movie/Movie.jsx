import React from 'react'

import { useParams, Outlet , Navigate } from 'react-router-dom'

export default function Movie() {
    let { '*': splat } = useParams()
    
    let regex = /^((Movies)|(Series))$/gi

    let hasRoute = regex.test(splat.split('/')[0])
    console.log(hasRoute)
    return (
        <>
            {hasRoute ? (
                <Outlet />
            ) : (
                <Navigate to='/' />
            )}
        </>
    )
}
