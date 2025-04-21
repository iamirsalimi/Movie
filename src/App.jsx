import { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'

import useLocalTheme from './Hooks/useLocalTheme'

import ThemeContext from './Contexts/ThemeContext'

import routes from './Routes'

import './App.css'

function App() {
  const [theme, setTheme] = useLocalTheme()
  const [navFlag, setNavFlag] = useState(true)
  let router = useRoutes(routes)

  const changeTheme = () => {
    setTheme(prev => {
      localStorage.setItem('theme', 'dark' == prev ? 'light' : 'dark')
      document.documentElement.classList.toggle('dark')
      return 'dark' == prev ? 'light' : 'dark'
    })
  }
  
  let location = useLocation().pathname
  
  // home page regex
  useEffect(() => {
    let homeRegex = /^(\/|(\/page\/\d+)\/?)$/
    let homeFlag = homeRegex.test(location)
    setNavFlag(!homeFlag)
  }, [])

  return (
    <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
      <ThemeContext.Provider value={{
        theme,
        setTheme,
        changeTheme,
        navFlag,
        setNavFlag
      }}>
        {router}
      </ThemeContext.Provider>
    </div>
  )
}

export default App
