import React, { useState } from 'react'

import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

export default function Register() {
    const [showPass, setShowPass] = useState(false)
    const [repeatShowPass, setRepeatShowPass] = useState(false)

    return (
        <>
            <h2 className="font-vazir text-2xl text-gray-700 dark:text-gray-200">ثبت نام در Movie Website</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-7">
                <div className="w-full relative select-none">
                    <input type="text" className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام</span>
                </div>

                <div className="w-full relative select-none">
                    <input type="text" className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام خانوادگی</span>
                </div>
            </div>

            <div className="w-full relative select-none">
                <input type="text" className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />
                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">ایمیل</span>
            </div>
            
            <div className="w-full relative select-none">
                <input type="text" className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" />
                <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام کاربری</span>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-7">
                <div className="w-full relative select-none">
                    <input type={`${showPass ? 'text' : 'password'}`} className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16} />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">رمز عبور</span>
                    <div onClick={() => setShowPass(prev => !prev)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-600 transition-all peer-focus:!text-sky-500">
                        {showPass ? (
                            <PiEyeClosedBold className="text-2xl" />
                        ) : (
                            <PiEyeBold className="text-2xl" />
                        )}
                    </div>
                </div>
                
                <div className="w-full relative select-none">
                    <input type={`${repeatShowPass ? 'text' : 'password'}`} className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16} />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">تکرار رمز عبور</span>
                    <div onClick={() => setRepeatShowPass(prev => !prev)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-600 transition-all peer-focus:!text-sky-500">
                        {repeatShowPass ? (
                            <PiEyeClosedBold className="text-2xl" />
                        ) : (
                            <PiEyeBold className="text-2xl" />
                        )}
                    </div>
                </div>
            </div>

            <button className="w-full py-4 rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600 transition-colors font-vazir text-white font-bold">ثبت نام</button>

            <div className="w-full flex items-center justify-between -mt-4">
                <span className="ms-2 text-sm font-vazir text-light-gray dark:text-gray-600 select-none">حساب کاربری دارید؟</span>
                <a href="/account/login" className="w-fit text-sm px-2 py-1 rounded-md cursor-pointer font-vazir font-light bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-white">وارد شوید</a>
            </div>
        </>
    )
}
