import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'

import toast, { Toaster } from 'react-hot-toast';

import { setCookie } from './../../utils';
import useInput from './../../Hooks/useInput'
import {checkUserName , updateUser as updateUserHandler} from './../../Services/Axios/Requests/Users'

import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";

export default function Login() {
    const [showPass, setShowPass] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [userNameValue, userNameBinding, userNameReset] = useInput()
    const [passwordValue, passwordBinding, passwordReset] = useInput()

    const [errors, setErrors] = useState({ userName: '', password: '' })
    const [isPending, setIsPending] = useState(false)

    const errorNotify = text => {
        toast.error(text)
    }

    const toggleShowingPassHandler = () => {
        setShowPass(prev => !prev)
    }

    const updateUser = async (userId, userObj) => {
        await updateUserHandler(userId , userObj)
        .then(res => {
            console.log(res)
            window.location.href = "/"
        })
            .catch(err => errorNotify('مشکلی در ثبت نام پیش آمده'))
    }

    const loginUser = async e => {
        e.preventDefault()

        if (!userNameValue || !passwordValue) {
            toast.error("نام کاربری و رمز عبور را وارد کنید");
            return;
        }

        setIsPending(true)
        // to get user details first and after validation update user last login 
        await checkUserName(userNameValue.toLowerCase())
            .then(data => {
                if (data.length > 0) {
                    if (data[0].password == passwordValue) {
                        let newUser = { ...data[0] }
                        newUser.last_login_at = new Date()
                        // to update user login
                        updateUser(data[0].id, newUser);

                        setErrors({ userName: '', password: '' })

                        if (rememberMe) {
                            setCookie('userToken', data[0].userToken, 10)
                        } else {
                            setCookie('userToken', data[0].userToken, -1)
                        }

                        toast.success('ورود با موفقیت انجام شد')
                    } else {
                        setErrors({ userName: '', password: 'رمز عبور درست نمی باشد' })
                        setIsPending(false)
                    }
                } else {
                    setIsPending(false)
                    errorNotify('نام کاربری وجود ندارد')
                    setErrors({ userName: 'نام کاربری موجود نمی باشد', password: '' })
                }
            })
            .catch(err => {
                console.log(err)
                errorNotify('خطا هنگام بررسی نام کاربری')
                setIsPending(false)
            })
    }

    return (
        <>
            <Helmet>
                <title>ورود | MovieFlix</title>
            </Helmet>
            <a href="/" className="inline-flex items-center justify-center gap-2 w-fit px-2 py-1.5 rounded-md cursor-pointer bg-gray-200 dark:bg-gray-800" >
                <IoIosArrowForward className="text-sm text-gray-500 dark:text-white" />
                <span className="text-sm font-vazir text-gray-500 dark:text-white">بازگشت به صفحه اصلی</span>
            </a>

            <h2 className="font-vazir text-2xl text-gray-700 dark:text-gray-200">ورود به Movie Website</h2>

            <form action="" className="w-full flex flex-col justify-center items-center lg:items-start gap-7" onSubmit={loginUser}>
                <div className="w-full relative select-none">
                    <input
                        type="text"
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        {...userNameBinding}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام کاربری</span>

                    {errors.userName && (
                        <span className="text-sm font-vazir text-red-500 mt-2">{errors.userName}</span>
                    )}
                </div>

                <div className="w-full relative select-none">
                    <input
                        type={`${showPass ? 'text' : 'password'}`}
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
                        {...passwordBinding}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">رمز عبور</span>
                    <div onClick={toggleShowingPassHandler} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-600 transition-all peer-focus:!text-sky-500">
                        {showPass ? (
                            <PiEyeClosedBold className="text-2xl" />
                        ) : (
                            <PiEyeBold className="text-2xl" />
                        )}
                    </div>

                </div>
                {errors.password && (
                    <span className="text-sm font-vazir text-red-500 -mt-5">{errors.password}</span>
                )}

                <div className="w-full">
                    <input id="default-checkbox" type="checkbox" value="" className="peer" hidden checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                    <label htmlFor="default-checkbox" className="flex items-center w-fit">
                        <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${rememberMe ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'} `}></span>
                        <span className="ms-2 text-sm font-vazir text-light-gray dark:text-gray-600 select-none">مرا به خاطر بسپار</span>
                    </label>
                </div>

                <button className="w-full py-4 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-colors font-vazir text-white font-bold disabled:!bg-sky-300" disabled={isPending}>
                    {isPending ? 'در حال بررسی ...' : 'ورود'}
                </button>
                <div className="w-full flex items-center justify-between -mt-4">
                    <a href="/account/register" className="w-fit text-sm px-2 py-1 rounded-md cursor-pointer font-vazir font-light bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-white">ثبت نام</a>
                    <a href="#" className="w-fit text-sm px-2 py-1 rounded-md cursor-pointer font-vazir font-light bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-white">فراموشی رمز عبور</a>
                </div>
            </form>

            <Toaster
                position="top-left"
                reverseOrder={false}
            />
        </>
    )
}
