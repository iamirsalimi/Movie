import React, { useState, useEffect , useContext } from 'react'

import NotifAccordian from '../../Components/NotifAccordian/NotifAccordian'
import UserContext from '../../Contexts/UserContext'

let apiData = {
  updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications?id=eq.',
  getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/Notifications?select=*',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}


export default function Notifs() {
  const [notifications, setNotifications] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(false)

  let userObj = useContext(UserContext)

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
          let sortedNotificationsArray = data.filter(notif => !notif.userId || notif.userId == userObj.id).sort((a, b) => {
            let aDate = new Date(a.created_at).getTime()
            let bDate = new Date(b.created_at).getTime()
            return aDate - bDate
          })
          setNotifications(sortedNotificationsArray)
          console.log(sortedNotificationsArray)
          setIsPending(false)
          setError(false)
        }

      } catch (err) {
        console.log('fetch error', err)
        isPending(false)
        setError(err)
      }
    }

    setIsPending(true)
    getAllNotifications()
  }, [])

  return (
    <div className="w-full flex flex-col items-center gap-5 mb-16">
      {notifications.map(notification => (
        <NotifAccordian key={notification.id} {...notification} />
      ))}

    </div>
  )
}
