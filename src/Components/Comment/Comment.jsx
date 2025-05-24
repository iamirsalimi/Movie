import React, { useState , useEffect , forwardRef, useRef } from 'react'

import { useLocation } from 'react-router-dom';

import dayjs from 'dayjs';
import jalali from 'jalaliday';

import CommentForm from '../CommentForm/CommentForm';

dayjs.extend(jalali)

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const Comment = forwardRef(({ mainUserId, mainUserName, mainUserRole, movieId,movieType , userId, user_name, userRole, parentId, id, text, has_spoiler, status, likes, disLikes, replied_to, created_at, replyId, setReplyId, setShowAddCommentForm, isAdding, setIsAdding, updateCommentsLikesHandler , addCommentHandler , comments } , ref) => {
    // the comments that they have spoil we shouldn't show them at first and give people choice to choose they wanna see comment or not regarded to spoil 
    const [showSpoiledComment, setShowSpoiledComment] = useState(false)
    // finding comments replied to this comments
    const [replies , setReplies] = useState(() => {
        let repliesArray = comments?.filter(comment => comment.parentId == id)
        return repliesArray
    })

    let replyRefs = useRef({})

    // return the easy readable time and date with Iran timezone
    const getDate = date => {
        let newDate = new Date(date)
        let persianDate = dayjs(newDate).calendar('jalali').locale('fa').format('YYYY/MM/DD - HH:mm')
        return persianDate
    }

    const likeComment = () => {
        let newLikes = new Set(likes)

        // if user already liked comment after clicking again we should remove his like
        console.log(newLikes, [...newLikes].includes(+userId))
        if (![...newLikes].includes(+userId)) {
            newLikes.add(+userId)

            if (disLikes.includes(+userId)) {
                let newDisLikes = new Set(disLikes)
                newDisLikes.delete(+userId)
                // if fourth argument be true it means user already disliked comment so we should remove that dislike and add user Like to likes array
                updateCommentsLikesHandler(id, 'likes', newLikes, true, newDisLikes)
                return false;
            }
            console.log('added')
        } else {
            newLikes.delete(+userId)
            console.log('removed')
        }

        updateCommentsLikesHandler(id, 'likes', newLikes, false)
    }

    const dislikeComment = () => {
        let newDisLikes = new Set(disLikes)

        // if user already disLiked comment after clicking again we should remove his disLike
        if (![...newDisLikes].includes(+userId)) {
            newDisLikes.add(+userId)

            if (likes.includes(+userId)) {
                let newLikes = new Set(likes)
                newLikes.delete(+userId)
                // if fourth argument be true it means user already liked comment so we should remove that like and add user disLike to disLikes array
                updateCommentsLikesHandler(id, 'disLikes', newDisLikes, true, newLikes)
                return false;
            }

            console.log('added')
        } else {
            newDisLikes.delete(+userId)
            console.log('removed')
        }
        updateCommentsLikesHandler(id, 'disLikes', newDisLikes, false)
    }

    useEffect(() => {
            const hash = location.hash;
            const commentId = hash?.replace('#comment-', '');
            if (replies?.length > 0 && commentId && replyRefs.current[commentId]) {
                replyRefs.current[commentId].scrollIntoView({ behavior: 'smooth', block: 'start' });
                replyRefs.current[commentId].classList.add('!bg-sky-100')
                replyRefs.current[commentId].classList.add('dark:!bg-sky-900')
                replyRefs.current[commentId].firstElementChild.lastElementChild.lastElementChild.classList.add('dark:!text-white')
                setTimeout(() => {
                    replyRefs.current[commentId].classList.remove('!bg-sky-100')
                    replyRefs.current[commentId].classList.remove('dark:!bg-sky-900')
                    replyRefs.current[commentId].firstElementChild.lastElementChild.lastElementChild.classList.remove('dark:!text-white')
                } , 3000)
            }
        }, [replies])



    // check if user liked comment or not
    const checkLike = () => likes.includes(+userId)
    const checkDisLike = () => disLikes.includes(+userId)

    return (
        <>

            <div id={`comment-${id}`} ref={ref} className={`w-full p-4 rounded-xl border border-gray-200 dark:bg-primary dark:border-none transition-all !text-white flex flex-col gap-5 ${parentId ? 'replied' : ''}`}>
                <div className="flex items-center justify-start gap-2">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                        <FaUser className="translate-y-2 text-white text-4xl" />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                        <div className="flex items-center justify-start gap-4">
                            <div className="flex items-center justify-start gap-2">
                                <h2 className="text-light-gray dark:text-white text-base md:text-lg lg:text-xl">{user_name}</h2>
                                <div className={`font-vazir text-xs px-2 py-1 rounded-full text-white ${userRole == 'user' ? 'bg-gray-400 dark:bg-secondary' : 'bg-sky-400 dark:text-primary'}`}>{userRole == 'user' ? 'کاربر' : 'ادمین'}</div>
                            </div>
                            {parentId && (
                                <span className="text-xs text-gray-400 dark:text-gray-600">در پاسخ به @{replied_to}</span>
                            )}
                        </div>
                        <span className={`${parentId ? 'text-gray-400' : 'text-gray-300'} dark:text-gray-600 text-xs`}>{getDate(created_at)}</span>
                    </div>
                </div>
                <div
                    className={`text-light-gray dark:text-white font-vazir text-sm ${has_spoiler ? 'cursor-pointer select-none' : ''}`}
                >
                    {has_spoiler ? (
                        <>
                            {!showSpoiledComment ? (
                                <span className="text-red-500" onClick={() => setShowSpoiledComment(true)}>دیدگاه دارای اسپویل می باشد، برای مشاهده کلیک کنید</span>
                            ) : (
                                <span onClick={() => setShowSpoiledComment(false)} className="font-shabnam-light">{text}</span>
                            )}

                        </>
                    ) : (
                        <span className="font-shabnam-light">{text}</span>
                    )}
                </div>
                <div className="flex items-center justify-start gap-5">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            className="inline-flex items-center justify-center gap-1 cursor-pointer group"
                            onClick={likeComment}
                        >
                            <span className={`group-hover:text-sky-500 transition-colors ${checkLike() ? '!text-sky-500' : 'text-gray-400 dark:text-gray-200'} `}>{likes.length}</span>
                            <AiOutlineLike className={`group-hover:text-sky-500 transition-colors ${checkLike() ? '!text-sky-500' : 'text-gray-400 dark:text-gray-200'}`} />
                        </button>
                        <button
                            className="inline-flex items-center justify-center gap-1 cursor-pointer group"
                            onClick={dislikeComment}
                        >
                            <span className={`group-hover:text-sky-500 transition-colors ${checkDisLike() ? '!text-sky-500' : 'text-gray-400 dark:text-gray-200'}`}>{disLikes.length}</span>
                            <AiOutlineDislike className={`group-hover:text-sky-500 transition-colors ${checkDisLike() ? '!text-sky-500' : 'text-gray-400 dark:text-gray-200'}`} />
                        </button>
                    </div>
                    <button
                        className="px-2 py-1 text-xs text-gray-400 border border-gray-400 hover:text-gray-500 hover:border-gray-500 dark:hover:text-white dark:hover:border-white transition-colors cursor-pointer font-vazir rounded-full"
                        onClick={() => {
                            setShowAddCommentForm(false)
                            setReplyId(id)
                        }}
                    >پاسخ</button>
                </div>
            </div>

            {replyId === id && (
                <CommentForm userId={mainUserId} userName={mainUserName} userRole={mainUserRole} movieId={movieId} movieType={movieType} parentId={id} repliedTo={user_name} showReply={true} setReplyId={setReplyId} setShowAddCommentForm={setShowAddCommentForm} isAdding={isAdding} setIsAdding={setIsAdding} addCommentHandler={addCommentHandler} />
            )}

            <div className="w-full flex flex-col gap-5">
                {replies?.length > 0 && replies?.map(reply => (
                    <div key={reply.id} className="w-full pr-4 lg:pr-5 relative flex flex-col gap-5 after:absolute after:inline-block after:h-[calc(100%-1.25rem)] after:w-1 after:rounded-full after:bg-gray-200 dark:after:bg-primary-dark after:top-0 after:right-0">
                        <Comment isReplied {...reply} replyId={replyId} setReplyId={setReplyId} setShowAddCommentForm={setShowAddCommentForm} isAdding={isAdding} setIsAdding={setIsAdding}  mainUserId={mainUserId} mainUserName={mainUserName} mainUserRole={mainUserRole} movieId={movieId} movieType={movieType}  addCommentHandler={addCommentHandler} updateCommentsLikesHandler={updateCommentsLikesHandler} comments={comments} ref={(el) => replyRefs.current[reply.id] = el} />
                    </div>
                ))
                }
            </div>

        </>

    )
})

export default Comment