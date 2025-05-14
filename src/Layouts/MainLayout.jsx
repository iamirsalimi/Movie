import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar/NavBar'
import Menu from '../Components/Menu/Menu'
import SearchModal from '../Components/SearchModal/SearchModal'
import Footer from '../Components/Footer/Footer'
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton.'

import { getCookie } from '../utils'

let apiData = {
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userToken=eq.',
    api: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function MainLayout() {
    const [showMenu, setShowMenu] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false)

    const [userObj, setUserObj] = useState(null)


    useEffect(() => {
        let token = getCookie('userToken')

        if (!token) {
            return;
        }

        const getUserInfo = async token => {
            await fetch(`${apiData.getApi}${token}`, {
                headers: {
                    'apikey': apiData.apikey,
                    'Authorization': apiData.authorization
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        setUserObj(data[0])
                        setHasUserLoggedIn(true)
                    }
                })
                .catch(err => {
                    setHasUserLoggedIn(false)
                    console.log(err)
                })
        }

        getUserInfo(token)
    }, [])

    useEffect(() => {
        console.log(userObj)
    }, [userObj])

    return (
        <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
            <NavBar showMenu={showMenu} setShowMenu={setShowMenu} showModal={showSearchModal} setShowModal={setShowSearchModal} hasUserLoggedIn={hasUserLoggedIn} />

            <main className="w-full h-full" >
                <Outlet />
            </main>

            <Footer />

            {/* Modals */}
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            <SearchModal showModal={showSearchModal} setShowModal={setShowSearchModal} />

            {/* scroll to top btn */}
            <ScrollToTopButton />
        </div>
    )
}
