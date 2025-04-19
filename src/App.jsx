import { useRoutes } from 'react-router-dom'

import useLocalTheme from './Hooks/useLocalTheme'

import ThemeContext from './Contexts/ThemeContext'

import routes from './Routes'

import './App.css'

function App() {
  const [theme, setTheme] = useLocalTheme()
  let router = useRoutes(routes)

  const changeTheme = () => {
    setTheme(prev => {
      localStorage.setItem('theme', 'dark' == prev ? 'light' : 'dark')
      document.documentElement.classList.toggle('dark')
      return 'dark' == prev ? 'light' : 'dark'
    })
  }

  return (
    <div dir="rtl" className="relative flex flex-col bg-light dark:bg-primary">
      <ThemeContext.Provider value={{
        theme,
        setTheme,
        changeTheme
      }}>
        {router}
      </ThemeContext.Provider>
    </div>
  )
}

export default App
