import React, { useId } from 'react'

export default function CommentForm({ showReply, userName, setShowReply, showAddComment }) {
    const closeReplyForm = () => {
        showAddComment(true)
        setShowReply(false)
    }

    let toggleId = useId()

    return (
        <div className="w-full flex flex-col gap-3">
            <label htmlFor={toggleId} className="w-fit text-light-gray font-vazir dark:text-white flex items-center justify-start gap-2">
                <span>افزودن دیدگاه</span>
                {showReply && (
                    <span className="text-gray-400 dark:text-gray-600 text-xs font-vazir">در پاسخ به @{userName}</span>
                )}
            </label>
            <textarea id={toggleId} className="h-32 font-vazir rounded-lg border border-gray-300 text-gray-700 dark:border-primary dark:bg-primary dark:text-white resize-none px-2 py-1 outline-none focus:border-2 transition-all focus:border-sky-500" placeholder="دیدگاه شما ..." maxLength={500}></textarea>
            <div className="flex items-center justify-start gap-5">
                <div className="filter-lang flex items-center">
                    <input type="checkbox" className="hidden" id="dubed" />
                    <label htmlFor="dubed" className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                        <span className="font-vazir">دیدگاه دارای اسپویل است</span>
                        <div className="flex items-center w-12 rounded-full bg-gray-300 dark:bg-gray-700 p-0.5 cursor-pointer transition-colors">
                            <span className="inline-block rounded-full w-6 h-6 transition-all translate-x-0 bg-white"></span>
                        </div>
                    </label>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className="px-5 py-1 w-fit rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-colors text-white font-vazir">ارسال</button>
                    {showReply && (
                        <button
                            className="px-5 py-1 w-fit rounded-full cursor-pointer border border-light-gray text-light-gray transition-colors hover:bg-gray-100 dark:border-gray-400 dark:text-gray-400 dark:hover:border-white dark:hover:text-white dark:hover:bg-secondary font-vazir text-sm"
                            onClick={closeReplyForm}
                        >لغو پاسخ</button>
                    )}
                </div>
            </div>
        </div>
    )
}
