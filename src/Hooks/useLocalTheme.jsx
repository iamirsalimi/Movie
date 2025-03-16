import { useState } from "react"

export default function useLocalTheme() {
    const [localTheme, setLocalTheme] = useState(localStorage.getItem('theme') || 'light')

    if(localTheme == 'dark'){
        document.documentElement.classList.add('dark')
    }

    return [localTheme , setLocalTheme]
}