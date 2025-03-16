import { useState } from 'react'
import { useRoutes } from 'react-router-dom'

import useLocalTheme from './Hooks/useLocalTheme'

import NavBar from './Components/NavBar/NavBar'
import Menu from './Components/Menu/Menu'
import SearchModal from './Components/SearchModal/SearchModal'
import routes from './Routes'

import './App.css'

function App() {
  const [theme, setTheme] = useLocalTheme()
  const [showMenu, setShowMenu] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)

  let router = useRoutes(routes)

  return (
    <div dir="rtl" className="relative flex flex-col">
      <NavBar theme={theme} setTheme={setTheme} showMenu={showMenu} setShowMenu={setShowMenu} showModal={showSearchModal} setShowModal={setShowSearchModal} />
      <main className="w-full h-full absolute top-0">
        {router}
      </main>
      <footer>

      </footer>

      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      <SearchModal showModal={showSearchModal} setShowModal={setShowSearchModal} />

    </div>
  )
}

export default App
