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

import { getCookie, getUserInfo } from '../utils'

let apiData = {
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
            if(res.ok){
                setUserObj(newUserObj)
            }
        })
            .catch(err => {
                console.log('مشکلی در ثبت نام پیش آمده')
                setIsPending(false)
            })
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
                    setIsPending(false)
                    setError(false)
                }

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
        const checkUserSubscriptionStatus = async (userObj) => {
            // which means user has no vip plan so it's not necessary to check user vipPlan  
            if (!userObj.subscriptionExpiresAt) {
                return false
            }

            const now = dayjs()
            const expireDate = dayjs(userObj.subscriptionExpiresAt);

            if (expireDate.isBefore(now)) {
                const updatedUser = {
                    ...userObj,
                    subscriptionStatus: 'expired',
                    subscriptionPlan: {},
                    subscriptionExpiresAt: '',
                }

                await updateUserHandler(updatedUser)
            }
        }

        if (userObj) {
            checkUserSubscriptionStatus(userObj)
        }
    }, [userObj])

    return (
        <UserContext.Provider value={{ userObj, setUserObj }}>
            <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
                <NavBar showMenu={showMenu} setShowMenu={setShowMenu} showModal={showSearchModal} setShowModal={setShowSearchModal} hasUserLoggedIn={hasUserLoggedIn} user={userObj} />

                <MoviesContext.Provider value={{
                    isPending: isPending,
                    error: error,
                    movies: movies,
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
