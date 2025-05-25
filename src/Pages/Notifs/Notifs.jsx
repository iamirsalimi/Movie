import React, { useState, useEffect, useContext } from 'react'

import NotifAccordian from '../../Components/NotifAccordian/NotifAccordian'
import UserContext from '../../Contexts/UserContext'

let apiData = {
  updateUserApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?id=eq.',
  getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications?select=*',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function Notifs() {
  const [notifications, setNotifications] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(false)

  let userObj = useContext(UserContext)

  const updateUserHandler = async newUserObj => {
    await fetch(`${apiData.updateUserApi}${userObj?.id}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'apikey': apiData.apikey,
        'Authorization': apiData.authorization
      },
      body: JSON.stringify(newUserObj)
    }).then(res => {
      if (res.ok) {
        console.log('کاربر اپدیت شد')
      }
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
        const res = await fetch(apiData.getApi, {
          headers: {
            'apikey': apiData.apikey,
            'Authorization': apiData.authorization
          }
        })

        const data = await res.json();

        if (data) {
          // we should sow user the notifications that they either are for all users or they are for just that user (if it had userId it means we should show that to users)
          let sortedNotificationsArray = data.filter(notif => !notif.userId || notif.userId == userObj?.id).sort((a, b) => {
            let aDate = new Date(a.created_at).getTime()
            let bDate = new Date(b.created_at).getTime()
            return aDate - bDate
          })
          setNotifications(sortedNotificationsArray)
          setIsPending(false)
          setError(false)
        }

      } catch (err) {
        console.log('fetch error', err)
        setIsPending(false)
        setError(err)
      }
    }

    setIsPending(true)
    getAllNotifications()
  }, [])

  useEffect(() => {
    if (userObj && notifications) {
      updateUser()
    }

  }, [userObj, notifications])

  return (
    <div className="w-full flex flex-col items-center gap-5 mb-16">
      {!isPending && notifications.map(notification => (
        <NotifAccordian key={notification.id} {...notification} />
      ))}

      {isPending && (
        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در حال دریافت اطلاعات ... </h2>
      )}

      {error && (
        <h2 className="text-center text-red-500 font-vazir text-sm mt-4">در دریافت اطلاعات از سرور مشکل بر خوردیم لطفا صفحه را رفرش کنید</h2>
      )}

    </div>
  )
}
