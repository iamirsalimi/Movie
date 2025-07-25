import React, { useId, useState } from 'react'

import toast from 'react-hot-toast'

// class for making new comment Object for reply or adding 
class CommentObj {
    constructor(movieId , movieType,movieTitle,movieSrc, userId, userName, userRole, parentId, replied_to, commentText, hasSpoil) {
        this.movieId = +movieId
        this.movieType = movieType
        this.movieTitle = movieTitle
        this.movieSrc = movieSrc
        this.userId = +userId
        this.user_name = userName
        this.userRole = userRole
        this.parentId = parentId
        this.replied_to = replied_to
        this.created_at = new Date()
        this.text = commentText
        this.has_spoiler = hasSpoil
        this.status = userRole == 'user' ? 'pending' : 'approved'
        this.likes = []
        this.disLikes = []
    }
}

export default function CommentForm({ showReply = false, movieId,movieType, movieTitle,movieSrc, userObj , userId, userName, userRole, parentId = null, repliedTo = null, setReplyId, setShowAddCommentForm, addCommentHandler, isAdding, setIsAdding }) {
    const [hasSpoil, setHasSpoil] = useState(false)
    const [commentText, setCommentText] = useState('')

    let toggleId = useId()
    let textAreaId = useId()

    // console.log(movieId , userId , userName, userRole, parentId , repliedTo)

    // when we close the ComponentForm we should reset inputs value too
    const closeReplyForm = () => {
        setShowAddCommentForm(true)
        setReplyId(null)
        setHasSpoil(false)
        setCommentText('')
    }

    // will make an Object for Comments
    const addComment = () => {
        if(!userObj){
            toast.error('برای افزودن دیدگاهتان ابتدا باید وارد حساب کاربری خود شوید')
            return false
        }

        if (commentText.trim()) {
            setIsAdding(true)
            let comment = new CommentObj(movieId,movieType,movieTitle,movieSrc, userId, userName, userRole, parentId, repliedTo, commentText.trim(), hasSpoil)
            // console.log(comment)
            addCommentHandler(comment)
            closeReplyForm()
        }
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <label htmlFor={textAreaId} className="w-fit text-light-gray font-vazir dark:text-white flex items-center justify-start gap-2">
                <span>افزودن دیدگاه</span>
                {showReply && (
                    <span className="text-gray-400 dark:text-gray-600 text-xs font-vazir">در پاسخ به @{repliedTo}</span>
                )}
            </label>
            <textarea id={textAreaId} value={commentText} onChange={e => setCommentText(e.target.value)} className="h-32 font-vazir-light rounded-lg border border-gray-300 text-gray-700 dark:border-primary dark:bg-primary dark:text-white resize-none px-2 py-1 outline-none focus:border-2 transition-all focus:border-sky-500" placeholder="دیدگاه شما ..." maxLength={500}></textarea>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 sm:gap-5">
                <div className="spoil-check flex items-center">
                    <input type="checkbox" className="hidden" id={toggleId} checked={hasSpoil} onChange={e => setHasSpoil(e.target.checked)} />
                    <label htmlFor={toggleId} className="text-light-gray dark:text-white font-shabnam select-none text-nowrap flex items-center justify-center gap-2">
                        <span className="font-vazir">دیدگاه دارای اسپویل است</span>
                        <div className={`flex items-center w-12 rounded-full ${hasSpoil ? 'bg-sky-100' : 'bg-gray-300 dark:bg-gray-700'} p-0.5 cursor-pointer transition-colors`}>
                            <span className={`inline-block rounded-full w-6 h-6 transition-all ${hasSpoil ? '!-translate-x-4/5  !bg-sky-500' : 'translate-x-0 bg-white'}`}></span>
                        </div>
                    </label>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button

                        className="px-5 py-1 w-fit rounded-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 transition-colors text-white font-vazir"
                        onClick={addComment}
                        disabled={isAdding}
                    >
                        {isAdding ? 'در حال ارسال کامنت ...' : 'ارسال'}
                    </button>
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
