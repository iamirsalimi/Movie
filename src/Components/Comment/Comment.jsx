import React, { useState } from 'react'

import CommentForm from '../CommentForm/CommentForm';


import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";


export default function Comment({ id, userName, userRule, commentText, hasSpoil, likes, replied, repliedTo, replies, date, showAddComment, replyName , setReplyName, setShowAddCommentForm, isReplied }) {
    // the comments that they have spoil we shouldn't show them at first and give people choice to choose they wanna see comment or not regarded to spoil 
    const [showSpoiledComment, setShowSpoiledComment] = useState(false)

    // return the easy readable time and date
    const calcDate = date => {
        let newDate = new Date(date)

        return `${newDate.getFullYear().toString().padStart(2, 0)}-${newDate.getMonth().toString().padStart(2, 0)}-${newDate.getDate().toString().padStart(2, 0)} ${newDate.getHours().toString().padStart(2, 0)}:${newDate.getMinutes().toString().padStart(2, 0)}`
    }

    return (
        <>

            <div className={`w-full p-4 rounded-xl border border-gray-200 dark:bg-primary dark:border-none flex flex-col gap-5 ${isReplied && 'replied'}`}>
                <div className="flex items-center justify-start gap-2">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                        <FaUser className="translate-y-2 text-white text-4xl" />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                        <div className="flex items-center justify-start gap-4">
                            <div className="flex items-center justify-start gap-2">
                                <h2 className="text-light-gray dark:text-white text-xl">{userName}</h2>
                                <div className="font replys,-vazir text-xs px-2 py-1 rounded-full bg-sky-400 dark:bg-secondary text-white">{userRule}</div>
                            </div>
                            {replied && (
                                <span className="text-xs text-gray-400 dark:text-gray-600">در پاسخ به @{repliedTo}</span>
                            )}
                        </div>
                        <span className={`${isReplied ? 'text-gray-400' : 'text-gray-300'} dark:text-gray-600 text-xs`}>{calcDate(date)}</span>
                    </div>
                </div>
                <div
                    className={`text-light-gray dark:text-white font-vazir text-sm ${hasSpoil ? 'cursor-pointer select-none' : ''}`}
                >
                    {hasSpoil ? (
                        <>
                            {!showSpoiledComment ? (
                                <span className="text-red-500" onClick={() => setShowSpoiledComment(true)}>دیدگاه دارای اسپویل می باشد، برای مشاهده کلیک کنید</span>
                            ) : (
                                <span onClick={() => setShowSpoiledComment(false)}>{commentText}</span>
                            )}

                        </>
                    ) : (
                        <span>{commentText}</span>
                    )}
                </div>
                <div className="flex items-center justify-start gap-5">
                    <div className="flex items-center justify-center gap-2">
                        <button className="inline-flex items-center justify-center gap-1 cursor-pointer group">
                            <span className="text-gray-400 dark:text-gray-200 group-hover:text-sky-500 transition-colors">{likes.filter(like => like.liked).length}</span>
                            <AiOutlineLike className="text-gray-400 dark:text-gray-200 group-hover:text-sky-500 transition-colors" />
                        </button>
                        <button className="inline-flex items-center justify-center gap-1 cursor-pointer group">
                            <span className="text-gray-400 dark:text-gray-200 group-hover:text-sky-500 transition-colors">{likes.filter(like => !like.liked)?.length}</span>
                            <AiOutlineDislike className="text-gray-400 dark:text-gray-200 group-hover:text-sky-500 transition-colors" />
                        </button>
                    </div>
                    <button
                        className="px-2 py-1 text-xs text-gray-400 border border-gray-400 hover:text-gray-500 hover:border-gray-500 dark:hover:text-white dark:hover:border-white transition-colors cursor-pointer font-vazir rounded-full"
                        onClick={() => {
                            showAddComment(false)
                            setReplyName(userName)
                        }}
                    >پاسخ</button>
                </div>
            </div>

            {replyName === userName && (
                <CommentForm repliedTo={userName} showReply={true} userId={5} userName="Sarah" setReplyName={setReplyName} setShowAddCommentForm={showAddComment} />
            )}

            <div className="w-full flex flex-col gap-5">
                {replies.length > 0 && replies.map(reply => (
                    <div className="w-full pr-5 relative flex flex-col gap-5 after:absolute after:inline-block after:h-[calc(100%-1.25rem)] after:w-1 after:rounded-full after:bg-gray-200 dark:after:bg-primary-dark after:top-0 after:right-0">
                        <Comment isReplied key={reply.id} {...reply} replyName={replyName} showAddComment={setShowAddCommentForm} setReplyName={setReplyName} setShowAddCommentForm={setShowAddCommentForm} />
                    </div>
                ))
                }
            </div>

        </>

    )
}
