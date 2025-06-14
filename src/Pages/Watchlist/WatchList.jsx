import React, { useState, useEffect, useContext } from 'react'

import toast from 'react-hot-toast'
import UserContext from '../../Contexts/UserContext'
import LoadingContext from '../../Contexts/LoadingContext'

import { updateUser } from '../../Services/Axios/Requests/Users'

import WatchListMovieCard from '../../Components/WatchListMovieCard/WatchListMovieCard'

export default function WatchList() {
  let { userObj, setUserObj } = useContext(UserContext)

  const [watchList, setWatchList] = useState(userObj?.watchList || [])
  const [isPending, setIsPending] = useState(true)

  let toastId = null
  const { loading, setLoading } = useContext(LoadingContext)

  // update user handler
  const updateUserHandler = async newUserObj => {
    await updateUser(userObj?.id , newUserObj).then(res => {
      toast.dismiss(toastId)
      toastId = null
      toast.success('فیلم از لیست تماشا حذف شد')
      setUserObj(newUserObj)
    })
      .catch(err => {
        console.log(err)
        toast.dismiss(toastId)
        toastId = null
        toast.error('مشکلی در افزودن فیلم به لیست تماشا پیش آمده')
      })
  }

  const removeMovieFomUserWatchList = movieId => {
    const newUserObj = { ...userObj }
    let newWatchList = newUserObj?.watchList.filter(movie => movieId != movie.movieId)
    newUserObj.watchList = [...newWatchList]

    if (!toastId) {
      toastId = toast.loading('در حال حذف فیلم از لیست تماشا')
      updateUserHandler(newUserObj)
    }
  }

  useEffect(() => {
    if (userObj) {
      setWatchList(userObj?.watchList)
      setIsPending(false)
      if (loading) {
        setLoading(false)
      }
    } else {
      setIsPending(true)
    }
  }, [userObj])

  return (
    <div className="py-4 pb-12 px-5 panel-box flex flex-col gap-7 mb-16">
      <h2 className="text-gray-700 dark:text-white font-vazir text-xl">لیست تماشا</h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-16">
        {!isPending && watchList?.map(movie => (
          <WatchListMovieCard key={movie.id} {...movie} deleteMovieFromWatchList={removeMovieFomUserWatchList} />
        ))}
      </div>
      {isPending && (
        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
      )}

      {!isPending && watchList?.length == 0 && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-light-gray dark:text-gray-300 text-lg md:text-xl font-vazir text-sm">فيلمي در ليست تماشا وجود ندارد</h2>
          <a href="/" className="inline-block py-1 px-2 rounded-md font-vazir bg-sky-500 hover:bg-sky-600 transition-colors text-white">افزودن فيلم ها</a>
        </div>
      )}
    </div>
  )
}
