import React, { useState } from 'react'

import { toast } from 'react-hot-toast'

import { RxCross2 } from "react-icons/rx";

let apiData = {
  postApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function ReportBox({ showModal, setShowModal, userObj, movieObj }) {
  const [title, setTitle] = useState(`خرابي لينک های دانلود ${movieObj.title}`)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const addTicketHandler = async newTicketObj => {
    await fetch(apiData.postApi, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'apikey': apiData.apikey,
        'Authorization': apiData.authorization
      },
      body: JSON.stringify(newTicketObj)
    }).then(res => {
      if (res.ok) {
        hideModal()
        setIsSending(false)
        setTitle('')
        setMessage('')
      }
    })
      .catch(err => {
        setIsSending(false)
        console.log('مشکلی در افزودن تیکت پیش آمده')
      })
  }

  const addTicket = e => {
    e.preventDefault()

    if (!message) {
      toast.error('لطفاً توضیحات را وارد کنید')
      return
    }

    if (userObj) {
      setIsSending(true)
      let newTicketObj = {
        userId: userObj.id,
        fullName: `${userObj.firstName} ${userObj.lastName}`,
        userName: userObj.userName,
        subject: `(لینک های دانلود فیلم با ID "${movieObj.id}" - "${movieObj.title}" به مشکل برخوردند) \n ${message}`,
        category: 'links',
        status: 'pending', // it could be "pending" , "answered" or "closed"
        priority: 'middle', // it could be "low" , "middle" or "high"
        description: message,
        is_read_by_admin: false,
        is_read_by_user: true,
        last_message_by: null, // null means user just created ticket and it either can be "user" or "admin" 
        created_at: new Date(),
        updated_at: new Date(),
      }

      // console.log(newTicketObj, Object.keys(newTicketObj))
      addTicketHandler(newTicketObj)
    }
  }

  const hideModal = () => {
    setShowModal(false)
  }


  return (
    <div className={`fixed w-full top-0 left-0 h-full max-h-screen overflow-y-scroll z-50 pb-10 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'} overflow-y-auto`}>
      <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={hideModal}></div>

      <div className={`w-[90%] sm:w-4/5 lg:w-1/3 absolute top-5 h-fit bg-white py-4 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-4 transition-all duration-300 ${showModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 dark:border-secondary">
          <h2 className="font-vazir text-gray-700 dark:text-gray-300 font-bold text-base text-center">گزارش خرابی</h2>
          <RxCross2 className="text-light-gray dark:text-gray-300 text-2xl cursor-pointer p-1 bg-gray-100 dark:bg-secondary rounded-full" onClick={hideModal} />
        </div>

        <div className="w-full flex flex-col items-center gap-2">
          <h2 className="text-light-gray dark:text-white font-shabnam">گزارش خرابي {movieObj.title}</h2>
          <div className="w-full rounded-lg bg-red-500 text-white text-sm text-center font-vazir py-1 px-2">درون قسمت توضیحات حتما ذکر کنید که کدام لینک دانلود خراب است</div>
          <form onSubmit={addTicket} className="w-full max-w-lg mx-auto p-4 border rounded-xl border-gray-300 dark:border-primary bg-gray-100 dark:bg-secondary">
            <h3 className="text-lg font-bold text-light-gray dark:text-white mb-5">گزارش خرابی لینک</h3>

            <div className="w-full relative select-none mb-4">
              <input
                type="text"
                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                value={title}
                readOnly
              />
              <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-secondary">عنوان مشکل</span>
            </div>

            <div className="w-full relative select-none mb-4">
              <textarea
                className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-gray-100 text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-gray-100 dark:bg-secondary">توضیحات</span>
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white cursor-pointer py-2 px-4 rounded-md font-vazir transition-all"
              disabled={isSending}
            >
              {isSending ? 'در حال ارسال...' : 'ارسال گزارش'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}