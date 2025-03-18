import React , {useState} from 'react'

import CommentForm from '../CommentForm/CommentForm';

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";



export default function Comment({ id, userName, userRule, commentText, likes, replyed, replyedTo, replys, date, showAddComment }) {
    // we have to have a state to check on every comments if they are in reply position or not , and when we are in reply position we have to hide leave comment section and just show user the reply form
    const [showReply, setShowReply] = useState(false)

    // return the easy readable time and date
    const calcDate = date => {
        let newDate = new Date(date)

        return `${newDate.getFullYear().toString().padStart(2, 0)}-${newDate.getMonth().toString().padStart(2, 0)}-${newDate.getDate().toString().padStart(2, 0)} ${newDate.getHours().toString().padStart(2, 0)}:${newDate.getMinutes().toString().padStart(2, 0)}`
    }

    return (
        <>
            <div className="w-full p-4 rounded-xl border border-gray-200 dark:bg-primary dark:border-none flex flex-col gap-5">
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
                            {replyed && (
                                <span className="text-xs text-gray-400 dark:text-gray-600">در پاسخ به @{replyedTo}</span>
                            )}
                        </div>
                        <span className="text-gray-300 dark:text-gray-600 text-xs">{calcDate(date)}</span>
                    </div>
                </div>
                <footer className="text-light-gray dark:text-white font-vazir">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit vero earum quod velit minus maxime facere aperiam perferendis soluta. Magni?</footer>
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
                            setShowReply(true)
                            showAddComment(false)
                        }}
                    >پاسخ</button>
                </div>
            </div>

            {showReply && (
                <CommentForm showReply={showReply} userName={userName} setShowReply={setShowReply} showAddComment={showAddComment} />
            )}

        </>
    )
}
