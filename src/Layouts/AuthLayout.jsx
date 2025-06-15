import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MoviesFormImage from '../assets/Movies-Form.jpg'

import InfoModal from './../Components/InfoModal/InfoModal'
import FormContext from './../Contexts/FormContext'

export default function Form() {
    const [showModal, setShowModal] = useState(false)

    return (
        <FormContext.Provider value={{
            showModal,
            setShowModal
        }}>
            <div className="flex items-center w-full py-12 lg:py-0 min-h-screen">
                <div className="w-full lg:w-1/2 xl:w-2/5 px-12 flex flex-col justify-center items-center lg:items-start gap-7">
                    <Outlet />
                </div>
                <div className="hidden min-h-screen lg:inline lg:w-1/2 xl:w-3/5 rounded-r-2xl overflow-hidden">
                    <img src={MoviesFormImage} className="w-full !min-h-screen object-center object-cover" />
                </div>

                <InfoModal />
            </div>
        </FormContext.Provider>
    )
}
