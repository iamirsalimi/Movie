import React, { useState, useEffect, useContext } from 'react'

import NotifAccordian from '../../Components/NotifAccordian/NotifAccordian'
import UserContext from '../../Contexts/UserContext'
import LoadingContext from '../../Contexts/LoadingContext'
import { updateUser as updateUserNotifs } from '../../Services/Axios/Requests/Users'
import { getNotifications } from '../../Services/Axios/Requests/Notifications'

export default function Notifs() {
  const [notifications, setNotifications] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(false)

  let { userObj } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)

  const updateUserHandler = async newUserObj => {
    await updateUserNotifs(userObj?.id, newUserObj)
      .then(res => {
        console.log('کاربر اپدیت شد')
      })
      .catch(err => {
        console.log('مشکلی در ثبت نام پیش آمده')

      })
  }

  const updateUser = () => {
    let newUserObj = { ...userObj }

    let hasAllNotifs = notifications.every(notif => newUserObj?.read_notifications.some(userNotif => userNotif == notif.id))

    if (!hasAllNotifs) {
      let userNotifs = new Set(userObj?.read_notifications)

      notifications.forEach(notif => {
        userNotifs.add(notif.id)
      })

      newUserObj.read_notifications = [...userNotifs]
      updateUserHandler(newUserObj)
    }
  }

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const data = await getNotifications()
        if (data) {
          // we should sow user the notifications that they either are for all users or they are for just that user (if it had userId it means we should show that to users)
          let sortedNotificationsArray = data.filter(notif => !notif.userId || notif.userId == userObj?.id).filter(notif => {
            // we should show user the notification that made after user registration not earlier notifications
            let userAccountCreationDate = new Date(userObj.created_At).getTime()
            let notifCreationDate = new Date(notif.created_at).getTime()
            return notifCreationDate > userAccountCreationDate
          }).sort((a, b) => {
            let aDate = new Date(a.created_at).getTime()
            let bDate = new Date(b.created_at).getTime()
            return bDate - aDate
          })
          setNotifications(sortedNotificationsArray)
        }

        setIsPending(null)
        setError(false)
      } catch (err) {
        console.log('fetch error', err)
        setIsPending(false)
        setError(err)
      }
    }

    if (userObj) {
      setIsPending(true)
      getAllNotifications()
    }
  }, [userObj])

  useEffect(() => {
    if (userObj && isPending == null) {
      updateUser()
      if (loading) {
        setLoading(false)
      }
    }
  }, [userObj, isPending])

  return (
    <div className="w-full flex flex-col items-center gap-5 mb-16">
      {!isPending && notifications.map(notification => (
        <NotifAccordian key={notification.id} {...notification} />
      ))}

      {isPending == null && notifications.length == 0 && (
        <div className="w-full mt-16 panel-box py-5">
          <h2 className="text-center text-light-gray dark:text-gray-300 text-lg md:text-xl font-vazir">اعلانی تا کنون ثبت نشده</h2>
        </div>
      )}

      {isPending && (
        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
      )}

      {error && (
        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
      )}

    </div>
  )
}
