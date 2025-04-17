import React, { useState } from 'react'

import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

export default function Login() {
    const [showPass, setShowPass] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    const toggleShowingPassHandler = () => {
        setShowPass(prev => !prev)
    }

    return (
        <>
            <h2 className="font-vazir text-2xl text-gray-700 dark:text-gray-200">ورود به Movie Website</h2>

            <div className="w-full relative select-none">
                <input type="text" className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />
                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام کاربری</span>
            </div>

            <div className="w-full relative select-none">
                <input type={`${showPass ? 'text' : 'password'}`} className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16} />
                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">رمز عبور</span>
                <div onClick={toggleShowingPassHandler} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-600 transition-all peer-focus:!text-sky-500">
                    {showPass ? (
                        <PiEyeClosedBold className="text-2xl" />
                    ) : (
                        <PiEyeBold className="text-2xl" />
                    )}
                </div>
            </div>

            <div className="w-full">
                <input id="default-checkbox" type="checkbox" value="" className="peer" hidden checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                <label htmlFor="default-checkbox" className="flex items-center w-fit">
                    <span className={`inline-block cursor-pointer w-5 h-5 rounded-md border transition-colors ${rememberMe ? '!border-sky-500 bg-sky-500' : 'border-light-gray dark:border-gray-600'} `}></span>
                    <span className="ms-2 text-sm font-vazir text-light-gray dark:text-gray-600 select-none">مرا به خاطر بسپار</span>
                </label>
            </div>

            <button className="w-full py-4 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-colors font-vazir text-white font-bold">ورود</button>
            <div className="w-full flex items-center justify-between -mt-4">
                <a href="/account/register" className="w-fit text-sm px-2 py-1 rounded-md cursor-pointer font-vazir font-light bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-white">ثبت نام</a>
                <a href="#" className="w-fit text-sm px-2 py-1 rounded-md cursor-pointer font-vazir font-light bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-white">فراموشی رمز عبور</a>
            </div>

        </>
    )
}
