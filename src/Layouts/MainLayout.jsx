import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import dayjs from 'dayjs'

import { Toaster } from 'react-hot-toast';

import NavBar from '../Components/NavBar/NavBar'
import Menu from '../Components/Menu/Menu'
import SearchModal from '../Components/SearchModal/SearchModal'
import Footer from '../Components/Footer/Footer'
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton.'
import UserContext from '../Contexts/UserContext'
import MoviesContext from '../Contexts/MoviesContext'
import Loader from '../Components/Loader/Loader'

import { getCookie, getUserInfo, checkUserSubscriptionStatus, checkUserBanStatus } from '../utils'

let apiData = {
    getNotificationsApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications?select=*',
    updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?select=*',
    deleteApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Movies?id=eq.',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function MainLayout() {
    const [showMenu, setShowMenu] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [hasUserLoggedIn, setHasUserLoggedIn] = useState(false)
    const [movies, setMovies] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [checked, setChecked] = useState(false)

    const [userObj, setUserObj] = useState(null)

    // update user Handler
    const updateUserHandler = async newUserObj => {
        await fetch(`${apiData.updateApi}${userObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            },
            body: JSON.stringify(newUserObj)
        }).then(res => {
            if (res.ok) {
                setUserObj(newUserObj)
            }
        })
            .catch(err => {
                console.log('مشکلی در ثبت نام پیش آمده')
                setIsPending(false)
            })
    }

    const runChecks = async () => {
        if (!userObj || checked) return false

        // if updated user exist means subscription expired
        let updatedUser = null
        updatedUser = await checkUserSubscriptionStatus(userObj)

        if (userObj.isBanned) {
            const user = await checkUserBanStatus(userObj)
            // if user exist means ban expired
            if (user) {
                // if ban and subscription both expire add the same time we update user obj only once AutoMatically
                if (updatedUser) {
                    updatedUser.accountStatus = user.accountStatus
                    updatedUser.isBanned = user.isBanned
                    updatedUser.banReason = user.banReason
                    updatedUser.banDuration = user.banDuration
                    updatedUser.ban_expiration_date = user.ban_expiration_date
                } else {
                    updatedUser = { ...user }
                }
            }
        }

        if (updatedUser) {
            // console.log('update' , updatedUser)
            await updateUserHandler(updatedUser)
        }
    }

    useEffect(() => {
        const token = getCookie('userToken');

        if (!token) {
            return;
        }

        const fetchUser = async () => {
            const user = await getUserInfo(token)
            if (user) {
                setUserObj(user)
                if (user?.isBanned && window.location.pathname !== '/banned') {
                    window.location = '/banned'
                }
            } else {
                setUserObj(null)
            }
            setHasUserLoggedIn(user ? true : false)
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const res = await fetch(apiData.getApi, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json();

                if (data) {
                    let sortedMoviesArray = data.sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    })

                    setMovies(sortedMoviesArray)
                }

                setIsPending(null)
                setError(false)
            } catch (err) {
                console.log('fetch error', err)
                isPending(false)
                setError(err)
            }
        }

        setIsPending(true)
        getAllMovies()
    }, [])

    useEffect(() => {
        // checked is a flag to see if we had already checked user infos or not
        if (userObj && !checked) {
            setChecked(true)
            runChecks()
        }
    }, [userObj])

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const res = await fetch(apiData.getNotificationsApi, {
                    headers: {
                        'apikey': apiData.apikey,
                        'Authorization': apiData.authorization
                    }
                })

                const data = await res.json()

                if (data.length > 0) {
                    setNotifications(data.filter(notif => !notif.userId || notif.userId == userObj?.id).filter(notif => {
                        // we should show user the notification that made after user registration not earlier notifications
                        let userAccountCreationDate = new Date(userObj.created_At).getTime()
                        let notifCreationDate = new Date(notif.created_at).getTime()
                        return notifCreationDate > userAccountCreationDate
                    }).sort((a, b) => {
                        let aDate = new Date(a.created_at).getTime()
                        let bDate = new Date(b.created_at).getTime()
                        return bDate - aDate
                    }))
                }
            } catch (err) {
                console.log('fetch error', err)
            }
        }

        // when admin is on main page we don't show him notifications
        if (userObj && userObj?.role == 'user') {
            getNotifications()
        }
    }, [userObj])

    return (
        <UserContext.Provider value={{ userObj, setUserObj }}>
            <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
                <NavBar showMenu={showMenu} setShowMenu={setShowMenu} showModal={showSearchModal} setShowModal={setShowSearchModal} hasUserLoggedIn={hasUserLoggedIn} user={userObj} notifications={notifications} />

                <MoviesContext.Provider value={{
                    isPending,
                    error,
                    movies,
                    setMovies,
                }}>
                    <main className="w-full h-full" >
                        <Outlet />
                    </main>
                </MoviesContext.Provider>

                <Footer />

                {/* Modals */}
                <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
                <SearchModal showModal={showSearchModal} setShowModal={setShowSearchModal} />

                {/* scroll to top btn */}
                <ScrollToTopButton />
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </UserContext.Provider>
    )
}
