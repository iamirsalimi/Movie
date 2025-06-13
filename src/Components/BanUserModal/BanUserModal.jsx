import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';

dayjs.extend(jalali)

export default function BanUserModal({ showModal, setShowModal, userObj, updateUser, isUpdating }) {
    const [accountStatus, setAccountStatus] = useState('active')
    const [banDuration, setBanDuration] = useState('30')
    const [banReason, setBanReason] = useState('')

    // console.log(userObj)

    const hideModal = () => {
        setShowModal(false)
        setAccountStatus('active')
        setBanDuration('30')
        setBanReason('')
    }

    const getJalaliDate = date => {
        let newDate = new Date(date)

        return dayjs(newDate).calendar("jalali").locale("fa").format("YYYY/MM/DD")
    }

    const getExpirationDate = (daysToAdd) => {
        let date = new Date()

        date.setTime(date.getTime() + (+daysToAdd * 24 * 60 * 60 * 1000))

        return date
    }

    const updateUserHandler = () => {
        if (userObj && userObj.accountStatus !== accountStatus || userObj.banDuration != banDuration || userObj.banReason != banReason) {
            let newUserObj = { ...userObj }

            if (accountStatus.includes('banned')) {
                newUserObj.accountStatus = accountStatus
                newUserObj.isBanned = true
                newUserObj.banReason = banReason

                if (accountStatus == 'temporary-banned') {
                    newUserObj.banDuration = banDuration
                    newUserObj.ban_expiration_date = getExpirationDate(banDuration)
                } else {
                    newUserObj.banDuration = -1 // means ban in permanent
                }
            } else {
                newUserObj.accountStatus = 'active'
                newUserObj.isBanned = false
                newUserObj.banReason = ''
                newUserObj.banDuration = null
                newUserObj.ban_expiration_date = null
            }

            updateUser(newUserObj)
        }
    }

    return (
        <div className={`fixed w-full top-0 left-0 overflow-y-scroll h-full z-50 flex items-center justify-center transition-all ${showModal ? 'visible' : 'invisible'}`}>
            <div className={`fixed w-full top-0 left-0 bg-black/65 glass-effect min-h-screen transition-all duration-200 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-300`} onClick={hideModal}></div>

            <div className={`w-[90%] sm:w-4/5 lg:w-3/5 max-h-[80vh] overflow-y-auto absolute top-5 h-fit bg-white translate-y-12 py-7 px-5 rounded-xl dark:bg-primary flex flex-col items-center gap-7 transition-all duration-200 ${showModal ? 'scale-100' : 'scale-0'}`}>
                <h2 className="font-vazir text-red-500 font-bold text-xl text-center">وضعیت اکانت کاربر {userObj?.userName}</h2>
                <div className="w-full flex flex-col items-center gap-7">
                    <ul className="w-full flex flex-col items-center gap-4 font-vazir text-light-gray dark:text-white py-2 px-4 border border-gray-300 dark:border-secondary divide-y divide-gray-300 dark:divide-secondary rounded-md">
                        <li className="w-full py-1 flex items-center justify-between">
                            <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">وضعیت حساب کاربر :</h3>
                            <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj?.accountStatus == 'active' ? 'فعال' : userObj?.accountStatus == 'temporary-banned' ? 'بن موقت' : 'بن دایمی'}</span>
                        </li>
                        {userObj?.accountStatus != 'active' && (
                            <>
                                {userObj?.accountStatus == 'temporary-banned' && (
                                    <li className="w-full py-1 flex items-center justify-between">
                                        <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">مدت زمان بن :</h3>
                                        <span className="text-vazir-light text-primary dark:text-white text-sm md:text-base">{userObj.banDuration}</span>
                                    </li>
                                )}

                                <li className="w-full py-1 flex items-center justify-between">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">تاريخ منقضي شدن بن :</h3>
                                    <p className="text-vazir-light text-primary dark:text-white font-vazir text-sm md:text-base">{userObj?.accountStatus === 'temporary-banned'
                                        ? getJalaliDate(userObj?.ban_expiration_date) : 'هیچوقت'}</p>
                                </li>
                                <li className="w-full py-1 flex flex-col justify-center gap-1">
                                    <h3 className="text-vazir text-light-gray dark:text-gray-500 text-sm md:text-base">علت بن :</h3>
                                    <p className="text-vazir-light text-primary dark:text-white font-vazir text-justify text-sm md:text-base">{userObj?.banReason}</p>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className={`${accountStatus == 'temporary-banned' ? '' : 'md:col-start-1 md:col-end-3'} relative flex items-center justify-center gap-1`}>
                            <select
                                name=""
                                id=""
                                className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                value={accountStatus}
                                onChange={e => setAccountStatus(e.target.value)}
                            >
                                <option value="active">فعال</option>
                                <option value="temporary-banned">بن موقت</option>
                                <option value="permanent-banned">بن دایمی</option>
                            </select>
                            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-primary">وضعیت حساب کاربر</span>
                        </div>

                        {accountStatus == 'temporary-banned' && (
                            <div className="w-full relative flex items-center justify-center gap-1">
                                <select
                                    name=""
                                    id=""
                                    className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={banDuration}
                                    onChange={e => setBanDuration(e.target.value)}
                                >
                                    <option value="30">1 ماه</option>
                                    <option value="90">3 ماه</option>
                                    <option value="180">6 ماه</option>
                                    <option value="365">12 ماه</option>
                                </select>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-primary">مدت زمان بن</span>
                            </div>
                        )}

                        {(accountStatus == 'temporary-banned' || accountStatus == 'permanent-banned') && (
                            <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
                                <textarea
                                    className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-primary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                                    value={banReason}
                                    onChange={e => setBanReason(e.target.value)}
                                ></textarea>
                                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-primary">علت بن</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-5">
                    <button
                        className="w-full py-2 rounded-md cursor-pointer font-vazir bg-sky-500 hover:bg-sky-600 transition-all text-white"
                        onClick={hideModal}
                    >بستن</button>
                    <button
                        className="w-full py-2 rounded-md cursor-pointer font-vazir bg-red-500 hover:bg-red-600 disabled:bg-red-300 transition-all text-white"
                        onClick={e => updateUserHandler()}
                    >
                        {isUpdating ? 'در حال آپدیت کاربر ...' : 'آپدیت کاربر'}
                    </button>
                </div>
            </div>
        </div>
    )
}
