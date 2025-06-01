import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast';

import { RxCross2 } from "react-icons/rx";

export default function AnnounceMentModal({ showModal, setShowModal, isAdding , setIsAdding, updateFlag, setUpdateFlag, addAnnouncementHandler, updateAnnouncementHandler, announcementObj}) {
    const [announcementText, setAnnouncementText] = useState('')

    const addOrUpdateAnnouncement = e => {
        if (announcementText.trim()) {
            if (!updateFlag) {
                setIsAdding(true)
                let newAnnouncementObj = {
                    text: announcementText,
                    created_at: new Date()
                }
                addAnnouncementHandler(newAnnouncementObj)
                setAnnouncementText('')
            } else {
                if(announcementObj?.text == announcementText.trim()){
                    toast.error('اطلاعات اطلاعیه همانند قبل است')
                    return false;
                }
                setIsAdding(true)
                let newAnnouncementObj = {...announcementObj}
                newAnnouncementObj.text = announcementText
                updateAnnouncementHandler(announcementObj.id , newAnnouncementObj)
                setAnnouncementText('')
            }
        } else {
            toast.error('متن اطلاعیه نمیتواند خالی باشد')
        }
    }

    const hideMenu = () => {
        setUpdateFlag(false)
        setAnnouncementText('')
        setShowModal(false)
    }

    useEffect(() => {
        if(updateFlag){
            setAnnouncementText(announcementObj.text)
        }
    } , [updateFlag])

    return (
        <div className={`absolute w-full top-0 left-0 h-full max-h-screen overflow-y-scroll z-50 pb-10 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'} overflow-y-auto`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideMenu}></div>

            <div className={`w-[90%] sm:w-4/5 lg:w-1/3 absolute top-1/4 h-fit bg-white py-4 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-4 transition-all duration-300 ${showModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 dark:border-secondary">
                    <h2 className="font-vazir text-gray-700 dark:text-gray-300 font-bold text-base text-center">اطلاعیه وبسایت</h2>
                    <RxCross2 className="text-light-gray dark:text-gray-300 text-2xl cursor-pointer p-1 bg-gray-100 dark:bg-secondary rounded-full" onClick={hideMenu} />
                </div>

                <div className="w-full flex flex-col items-center gap-4">
                    <h2 className="text-light-gray dark:text-white font-shabnam">لطفا متن اطلاعیه را بادقت وارد نمایید</h2>
                    <div className="w-full relative select-none">
                        <textarea
                            className="w-full rounded-md p-3 min-h-28 max-h-52 overflow-y-auto border border-light-gray dark:border-gray-600 dark:bg-primary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                            value={announcementText}
                            onChange={e => setAnnouncementText(e.target.value)}
                        ></textarea>
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-primary">متن اطلاعیه</span>
                    </div>
                </div>

                <button
                    className="w-full py-2 rounded-md cursor-pointer font-vazir disabled:bg-green-200 bg-green-500 hover:bg-green-600 transition-all text-white dark:text-primary"
                    disabled={isAdding}
                    onClick={addOrUpdateAnnouncement}
                >
                    {isAdding ? `در حال ${updateFlag ? 'آپدیت' : 'افزودن'} اطلاعیه ...` : `${updateFlag ? 'آپدیت' : 'افزودن'} اطلاعیه`}
                </button>
            </div>
        </div>
    )
}