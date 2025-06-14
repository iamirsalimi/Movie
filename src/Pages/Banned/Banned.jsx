import { useContext } from 'react'

import dayjs from 'dayjs'
import jalali from 'jalaliday'

import UserContext from './../../Contexts/UserContext'

dayjs.extend(jalali)

export default function Banned() {
    let { userObj : user, setUserObj } = useContext(UserContext)


    const getDate = date => {
        let registerDate = new Date(date)
        let persianDate = dayjs(registerDate).calendar('jalali').locale('fa').format('YYYY/MM/DD')
        // console.log(persianDate, registerDate)
        return persianDate
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-primary p-4 text-center">
            <h1 className="text-3xl font-shabnam mb-4 text-red-700">دسترسی شما به صورت {user?.accountStatus == 'temporary-banned' ? 'محدود' : 'نامحدود'} مسدود شده است</h1>
            <p className="mb-2 font-shabnam"> 
                <span className="text-gray-600 dark:text-white">دلیل : </span>
                <span className="text-red-700">{user?.banReason}</span>
            </p>
            {user?.accountStatus == 'temporary-banned' && (
                <p className="mb-2 font-shabnam">
                    <span className="text-gray-600 dark:text-white">تاریخ انقضا : </span>
                    <span className="text-red-700">{getDate(user?.ban_expiration_date)}</span> 
                </p>
            )}
            <p className="text-sm text-gray-600 dark:text-white mt-4 font-vazir">در صورت نیاز می‌توانید از طریق تیکت پشتیبانی با ما تماس بگیرید.</p>
            <a
                href="/my-account/userPanel/messages"
                className="text-sm font-vazir py-1 p-2 bg-red-500 hoverLbg-red-600 transition-colors text-white dark:text-primary rounded-md mt-4"
            >رفتن به قسمت تیکت ها</a>
        </div>
    )
}