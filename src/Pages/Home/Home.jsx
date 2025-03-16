import React, { useEffect, useState } from 'react'

import Header from './../../Components/Header/Header'
import Content from './../../Components/Content/Content'
import Footer from './../../Components/Footer/Footer'

import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
export default function Home() {
  const [btnShowFlag, setBtnShowFlag] = useState(false)
  
  const showBtn = e => {
    setBtnShowFlag(window.scrollY > 300 ? true : false)
  }

  const goUpHandler = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    window.addEventListener('scroll' , showBtn)
  } , [])

  return (
    <div
     className="w-full relative flex flex-col gap-5 bg-light dark:bg-primary shadow-2xl shadow-black overflow-hidden"
      onScroll={e => console.log(e)}
    >
      <Header />
      <Content />
      <Footer />
      <button
        className={`p-2 w-fit rounded-md border border-sky-600 text-white bg-sky-600 hover:bg-white hover:text-sky-600 dark:hover:bg-white dark:hover:border-white transition-all fixed bottom-10 right-7 cursor-pointer group ${btnShowFlag ? 'translate-x-0 visible' : 'translate-x-20 invisible'}`}
        onClick={goUpHandler}
      >
        <MdOutlineKeyboardDoubleArrowUp className="text-white group-hover:text-sky-600 transition-all text-xl" />
      </button>
    </div>
  )
}
