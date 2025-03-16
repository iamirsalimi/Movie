import React from 'react'

import { RxCross2 } from "react-icons/rx";

export default function SearchModal({ showModal, setShowModal }) {

    const hideMenu = () => {
        setShowModal(false)
    }

    return (
        <div className={`absolute w-full top-0 left-0 h-full z-50 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>
            <div className={`w-[90%] sm:w-4/5 lg:w-1/3 fixed top-5 h-fit bg-white rounded-md dark:bg-primary flex flex-col transition-all duration-200 ${showModal ? 'translate-y-0' : '-translate-y-full'} flex flex-col gap-1 py-2`}>

                <div className="flex items-center justify-between px-2">
                    <h1 className="font-bold font-vazir text-xl dark:text-white text-gray-700">جستجو فیلم یا سریال</h1>
                    <button className="w-fit p-1 rounded-sm bg-gray-200 text-gray-800 dark:bg-secondary dark:text-white cursor-pointer" onClick={hideMenu}>
                        <RxCross2 className="text-xl" />
                    </button>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 py-5 px-2 border-t border-gray-100 dark:border-secondary">
                    <input type="text" className="w-full text-lg bg-gray-200 dark:bg-secondary py-1 px-2 rounded-md focus:outline-0 font-vazir text-primary dark:text-white place-holder:text-gray-700 dark:place-holder:text-gray-300" placeholder="نام فیلم یا سریال" />
                    <button className="p-1 rounded-sm bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-white dark:stroke-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
