import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../Components/NavBar/NavBar'
import Menu from '../Components/Menu/Menu'
import SearchModal from '../Components/SearchModal/SearchModal'
import Footer from '../Components/Footer/Footer'
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton.'


export default function MainLayout() {
    const [showMenu, setShowMenu] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)

    return (
        <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
            <NavBar showMenu={showMenu} setShowMenu={setShowMenu} showModal={showSearchModal} setShowModal={setShowSearchModal} />

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
