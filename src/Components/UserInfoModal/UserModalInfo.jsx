import React from 'react'

export default function UserModalInfo({showModal , setShowModal}) {
    const hideMenu = () => {
        setShowModal(false)
    }

    return (
        <div className={`fixed w-full top-0 left-0 overflow-y-scroll h-full z-50 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-300`} onClick={hideMenu}></div>

            <div className={`w-[90%] sm:w-4/5 lg:w-3/5 max-h-[80vh] overflow-y-auto absolute top-5 h-fit bg-white translate-y-12 py-7 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-7 transition-all duration-200 ${showModal ? 'scale-100' : 'scale-0'}`}>
                <h2 className="font-vazir text-red-500 font-bold text-xl text-center">اطلاعات کاربر</h2>

                <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-200 dark:border-secondary divide-y divide-gray-200 dark:divide-secondary rounded-md">
                   
                </ul>

                <button
                    className="w-full py-2 rounded-md cursor-pointer font-vazir bg-red-500 hover:bg-red-600 transition-all text-white"
                    onClick={e => setShowModal(false)}
                >بستن</button>
            </div>
        </div>
    )
}
