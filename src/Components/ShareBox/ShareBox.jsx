import React, { useState } from 'react'

import { toast } from 'react-hot-toast'

import { FaCopy, FaTelegram, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { RxCross2 } from "react-icons/rx";

export default function ShareBox({ showModal, setShowModal, id : movieId, movieType, title }) {
  const [copied, setCopied] = useState(false)

  const baseUrl = window.location.origin
  const movieLink = `${baseUrl}/${movieType}/${movieId}`

  // we might have space and persian letters so we have to encode that url to a acceptable url we use encodeURIComponent it's better than encodeURI because it wont delete "?,/,..." 
  const encodedTitle = encodeURIComponent(title || "تماشای فیلم")
  const encodedLink = encodeURIComponent(movieLink)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(movieLink)
      setCopied(true)
      toast.success('لینک کپی شد!')
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      toast.error('خطا در کپی کردن لینک')
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
          <h2 className="font-vazir text-gray-700 dark:text-gray-300 font-bold text-base text-center">اشتراک‌ گذاری</h2>
          <RxCross2 className="text-light-gray dark:text-gray-300 text-2xl cursor-pointer p-1 bg-gray-100 dark:bg-secondary rounded-full" onClick={hideModal} />
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-light-gray dark:text-white font-shabnam">اشتراک‌ گذاری {title}</h2>
          <div className="bg-gray-100 dark:bg-secondary border border-gray-200 dark:border-gray-700 p-4 rounded-xl w-full max-w-md mx-auto">
            <div className="flex items-center justify-between gap-2 border rounded-md px-3 py-2 border-white dark:border-primary bg-white dark:bg-primary">
              <input
                type="text"
                value={movieLink}
                readOnly
                className="w-full bg-transparent text-sm text-gray-700 dark:text-white outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="text-sky-600 hover:text-sky-500 cursor-pointer transition-colors"
              >
                <FaCopy />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-start gap-2.5 text-xl text-white">
              <a
                href={`https://wa.me/?text=${encodedLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 p-2 rounded-full"
                title="واتساپ"
              >
                <FaWhatsapp />
              </a>

              <a
                href={`https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                title="تلگرام"
              >
                <FaTelegram />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-400 hover:bg-sky-500 p-2 rounded-full"
                title="توییتر"
              >
                <FaTwitter />
              </a>

              <a
                href={`mailto:?subject=${encodedTitle}&body=${encodedLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 p-2 rounded-full"
                title="ایمیل"
              >
                <FaEnvelope />
              </a>
            </div>

            {copied && (
              <p className="mt-2 text-sm text-green-500 font-vazir">✔ لینک با موفقیت کپی شد</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
