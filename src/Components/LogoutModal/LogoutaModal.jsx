import React from 'react'

export default function LogoutModal({showModal, setShowModal}) {
    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <div className={`absolute w-full top-0 left-0 h-full z-50 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideModal}></div>
            
            <div className={`w-[90%] sm:w-4/5 lg:w-1/3 fixed top-20 h-fit bg-white py-7 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-7 transition-all duration-200 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <h2 className="font-vazir text-light-gray dark:text-white font-bold text-lg lg:text-xl text-center">آیا مطمینید میخواهید از حساب کاربری خود خارج شوید؟</h2>

                <div className="w-full grid grid-cols-2 gap-2">
                    <button 
                        className="w-full py-2 rounded-md cursor-pointer font-vazir bg-sky-500 hover:bg-sky-600 transition-all text-white"
                        onClick={e => hideModal()}    
                    >خیر</button>
                    <button 
                        className="w-full py-2 rounded-md cursor-pointer font-vazir bg-red-500 hover:bg-red-600 transition-all text-white"
                        onClick={e => setShowModal(false)}    
                    >بله</button>
                </div>
            </div>
        </div>
    )
}
