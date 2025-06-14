import React, { useState, useEffect, useContext } from 'react'

import UserContext from './../../Contexts/UserContext'
import LoadingContext from './../../Contexts/LoadingContext'

import { getCommentsByUserId } from './../../Services/Axios/Requests/Comments'
import PanelComment from './../../Components/PanelComment/PanelComment'

export default function Comments() {
  const [comments, setComments] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(false)

  const { userObj } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    const getCommentsInfo = async () => {
      try {
        const data = await getCommentsByUserId(userObj?.id)

        if (data.length > 0) {
          const sortedComments = data.sort((a, b) => {
            let aDate = new Date(a.created_at).getTime()
            let bDate = new Date(b.created_at).getTime()

            return bDate - aDate
          })
          setComments(sortedComments)
        }

        setIsPending(null)
        setError(false)
      } catch (err) {
        console.log('fetch error')
        setError(err)
        setIsPending(false)
        setComments(null)
      }
    }

    if (userObj) {
      getCommentsInfo()
    }

  }, [userObj])

  useEffect(() => {
    if (userObj && isPending == null) {
      setLoading(false)
    }
  }, [userObj, isPending])

  return (
    <div className="panel-box flex flex-col gap-4 py-4 px-5 mb-16">
      <h2 className="text-gray-700 dark:text-white font-vazir text-xl">دیدگاه ها</h2>
      <div className="w-full flex flex-col items-center gap-5">
        {isPending && (
          <h2 className="text-center font-vazir text-red-500 text-sm">در حال دریافت کامنت ها ... </h2>
        )}

        {error && (
          <h2 className="text-center font-vazir text-red-500 text-sm">{error.message} </h2>
        )}

        {isPending == null && (
          <>
            {comments.length > 0 ? comments?.filter(comment => comment.userId == userObj.id).map(comment => (
              <PanelComment key={comment.id} comments={comments} {...comment} />
            )) : (
              <h2 className="text-center text-light-gray dark:text-gray-300 text-lg md:text-xl font-vazir text-sm">شما تا کنون کامنتی نذاشته اید</h2>
            )}
          </>
        )}

      </div>
    </div>
  )
}
