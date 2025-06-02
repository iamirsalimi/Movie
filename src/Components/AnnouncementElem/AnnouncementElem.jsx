import React from 'react'

import { AiFillInfoCircle } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

export default function AnnouncementElem({ text, created_at, getDate, setUpdateFlag , setAnnouncementObj, setShowAnnouncementModal , setShowDeleteModal, announcementObj, adminFlag, base }) {
    return (
        <div className="w-full flex items-center justify-between gap-5 py-3 px-3 rounded-l-md border border-gray-100 dark:border-primary border-r-4 !border-r-yellow-400">
            <span className="w-full rounded-sm inline-flex items-center gap-2">
                {adminFlag && <span className="text-gray-400 dark:text-gray-500 text-xs text-xs font-vazir">{announcementObj.id}</span>}
                <AiFillInfoCircle className="text-yellow-400 text-lg" />
                <span className="text-light-gray dark:text-gray-400 font-vazir text-sm">{base ? 'اطلاعيه اي ثبت نشده' : text}</span>
                {adminFlag && <span className="text-gray-400 dark:text-gray-600 text-xs font-vazir hidden sm:inline">{getDate(created_at)}</span>}
            </span>
            {adminFlag && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        className="p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                        onClick={e => {
                            setAnnouncementObj(announcementObj)
                            setUpdateFlag(true)
                            setShowAnnouncementModal(true)
                        }}
                    >
                        <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                    </button>

                    <button
                        className="p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group"
                        onClick={e => {
                            setAnnouncementObj(announcementObj)
                            setShowDeleteModal(true)
                        }}
                    >
                        <LuTrash2 className="text-red-500 group-hover:text-white transition-all" />
                    </button>
                </div>
            )}
        </div>
    )
}
