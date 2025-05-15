import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar/NavBar'
import Menu from '../Components/Menu/Menu'
import SearchModal from '../Components/SearchModal/SearchModal'
import Footer from '../Components/Footer/Footer'
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton.'

import { getCookie, getUserInfo } from '../utils'

export default function MainLayout() {
    const [showMenu, setShowMenu] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false)

    const [userObj, setUserObj] = useState(null)

    useEffect(() => {
        const token = getCookie('userToken');

        if (!token) {
            return ;
        }

        const fetchUser = async () => {
            const user = await getUserInfo(token)
            if (user) {
                setUserObj(user)
            } else {
                setUserObj(null)
            }
            setHasUserLoggedIn(user ? true : false)
        }

        fetchUser()
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
