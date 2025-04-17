import { useState, useEffect } from 'react'

import { useRoutes, useLocation } from 'react-router-dom'

import useLocalTheme from './Hooks/useLocalTheme'

import NavBar from './Components/NavBar/NavBar'
import Menu from './Components/Menu/Menu'
import SearchModal from './Components/SearchModal/SearchModal'
import Footer from './Components/Footer/Footer'
import routes from './Routes'

import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

import './App.css'

function App() {
  const [theme, setTheme] = useLocalTheme()
  const [showMenu, setShowMenu] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [btnShowFlag, setBtnShowFlag] = useState(false)

  let router = useRoutes(routes)

  let location = useLocation().pathname

  let regex = /^(\/account\/((login)|(register))\/?)$/g

  let isInLoginPage = regex.test(location)
  console.log(isInLoginPage)

  const showBtn = e => {
    setBtnShowFlag(window.scrollY > 300 ? true : false)
  }

  const goUpHandler = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', showBtn)
  }, [])

  return (
    <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
      {!isInLoginPage && (
        <NavBar theme={theme} setTheme={setTheme} showMenu={showMenu} setShowMenu={setShowMenu} showModal={showSearchModal} setShowModal={setShowSearchModal} />
      )}
      
      <main className="w-full h-full" >
        {router}
      </main>

      {!isInLoginPage && (
        <Footer />
      )}

      {/* Modals */}
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      <SearchModal showModal={showSearchModal} setShowModal={setShowSearchModal} />
      <button
        className={`p-2 w-fit rounded-md border border-sky-600 text-white bg-sky-600 hover:bg-white hover:text-sky-600 dark:hover:bg-white dark:hover:border-white transition-all fixed bottom-10 right-7 cursor-pointer group ${btnShowFlag ? 'translate-x-0 visible' : 'translate-x-20 invisible'}`}
        onClick={goUpHandler}
      >
        <MdOutlineKeyboardDoubleArrowUp className="text-white group-hover:text-sky-600 transition-all text-xl" />
      </button>
    </div>
  )
}

export default App
