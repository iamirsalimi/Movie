import React, { useContext, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast';

import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

import FormContext from '../../Contexts/FormContext'

import useInput from '../../Hooks/useInput'; // value , binding , resetValue , it gets init value but if we don't pass the init value to it it'll consider the init value as ''
import { Await } from 'react-router-dom';

const generateToken = () => Math.random().toString(36).substring(2) + Date.now();


class User {
    constructor(firstName, lastName, email, userName, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.userName = userName.toLowerCase()
        this.password = password
        this.nickName = ''
        this.role = 'user' //user or admin
        this.accountStatus = "" //active or temporary-ban or permanent-ban 
        this.isBanned = false
        this.banReason = ""
        this.created_At = new Date()
        this.last_login_at = new Date()
        this.isVerified = false
        this.subscriptionStatus = false // false means don't hove and true means have   
        this.subscriptionExpiresAt = ''
        this.subscriptionPlan = ''
        this.read_notifications = []
        this.watchList = []
        this.requests = []
        this.has_unread_tickets = false
        this.unread_tickets = []
        this.last_purchases = []
        this.userToken = generateToken()
    }
}

let apiData = {
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userName=eq.',
    api: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function Register() {
    const [firstNameValue, firstNameBinding, firstNameReset] = useInput()
    const [lastNameValue, lastNameBinding, lastNameReset] = useInput()
    const [emailValue, emailBinding, emailReset] = useInput()
    const [userNameValue, userNameBinding, userNameReset] = useInput()
    const [passwordValue, passwordBinding, passwordReset] = useInput()
    const [repeatPasswordValue, repeatPasswordBinding, repeatPasswordReset] = useInput()

    const [userNameTestingFlag, setUserNameTestingFlag] = useState(false)
    const [userNameValidFlag, setUserNameValidFlag] = useState(null)

    let validationObj = { email: false, userName: false, password: { equality: false, valid: false } } // when we want to submit the form all inputs must be validate

    const [showPass, setShowPass] = useState(false)
    const [repeatShowPass, setRepeatShowPass] = useState(false)

    let emailRegex = /^\S+@\S+\.\S+$/
    let userNameRegex = /^[0-9A-Za-z]{5,16}$/
    let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@_.])(?!.* ).{8,16}$/
    let numberRegex = /[0-9]/
    let lowerCaseLetterRegex = /[a-z]/
    let upperCaseLetterRegex = /[A-Z]/
    let symbolRegex = /[@#_.]/

    let { setShowModal } = useContext(FormContext)

    const setCookie = (cookieName, cookieValue, cookieDay) => {
        const date = new Date()
        date.setTime(date.getTime() + (cookieDay * 24 * 60 * 60 * 1000))
        const expires = date.toUTCString()

        document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expires}; SameSite=Strict; Secure`;
    }


    const errorNotify = text => {
        toast.error(text)
    }

    const checkPassEquality = () => {
        if (passwordValue == repeatPasswordValue) {
            validationObj.password.equality = true
        } else {
            errorNotify('رمز های عبور یکسان نیستتند')
            validationObj.password.equality = false
        }
    }

    const isAllInputsValid = () => {
        let isValid = false

        let { email, userName, password } = validationObj
        console.log('email -> ', email, 'userName -> ', userName, 'password equality -> ', password.equality, 'password valid -> ', password.valid, validationObj)
        if (email && userName && password.equality && password.valid) {
            isValid = true
        }

        return isValid
    }

    const testEmail = () => {
        let emailFlag = emailRegex.test(emailValue)

        if (!emailFlag && emailValue) {
            errorNotify('ايميل درست نيست')
            validationObj.email = false
        } else {
            validationObj.email = true
        }
    }

    const checkUserNameExist = async () => {
        console.log('before fetch', validationObj.userName)

        await fetch(`${apiData.getApi}${userNameValue.toLowerCase()}`, {
            headers: {
                'apikey': apiData.apikey,
                'Authorization': apiData.authorization
            }
        }).then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    validationObj.userName = false
                    setUserNameValidFlag(false)
                    errorNotify('نام کاربری از قبل موجود هست')
                } else {
                    validationObj.userName = true
                    console.log('after fetch not exist', validationObj.userName)
                    setUserNameValidFlag(true)
                }

                setUserNameTestingFlag(false)
            })
            .catch(err => errorNotify('خطا هنگام بررسی نام کاربری'))
    }

    const testUserName = async () => {
        let userNameFlag = userNameRegex.test(userNameValue)

        if (!userNameFlag && userNameValue) {
            errorNotify('نام کاربری درست نيست')
            validationObj.userName = false
            console.log('userNameFlag is false')
            console.log('notValid')
        } else {
            setUserNameTestingFlag(true)
            await checkUserNameExist()
        }
    }

    const testPassword = passValue => {
        let passwordFlag = passwordRegex.test(passValue)

        if (!passwordFlag && passValue) {
            // toast.error('رمز عبور درست نيست')
            validationObj.password.valid = false

            if (!numberRegex.test(passValue)) {
                errorNotify('رمز عبور بايد حداقل داراي 1 عدد باشد')
            }

            if (!lowerCaseLetterRegex.test(passValue)) {
                errorNotify('رمز عبور بايد حداقل داراي 1 حرف كوچك باشد')
            }

            if (!upperCaseLetterRegex.test(passValue)) {
                errorNotify('رمز عبور بايد حداقل داراي 1 حرف بزرگ باشد')
            }

            if (!symbolRegex.test(passValue)) {
                errorNotify('رمز عبور بايد حداقل داراي 1 کاراکتر (@ یا # یا _ یا .) باشد')
            }

            if (passValue.length < 8) {
                errorNotify('رمز عبور بايد حداقل داراي 8 کاراکتر باشد')
            }

        } else {
            validationObj.password.valid = true
        }

        checkPassEquality()
    }

    const registerUser = async e => {
        e.preventDefault()
        testEmail()
        await testUserName()
        testPassword(passwordValue)

        let isAllValid = isAllInputsValid()
        console.log(isAllValid, validationObj)
        if (isAllValid) {
            let newUserObj = new User(firstNameValue, lastNameValue, emailValue, userNameValue, passwordValue)

            await fetch(apiData.api, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'apikey': apiData.apikey,
                    'Authorization': apiData.authorization
                },
                body: JSON.stringify(newUserObj)
            }).then(res => {
                toast.success('ثبت نام با موفقیت انجام شد')
                setCookie('userToken' , newUserObj.userToken , 10)
                firstNameReset()
                lastNameReset()
                emailReset()
                userNameReset()
                passwordReset()
                repeatPasswordReset()
                location.href = "/"
            })
                .catch(err => errorNotify('مشکلی در ثبت نام پیش آمده'))

            // console.log('registered', newUserObj)
        }
    }

    return (
        <>

            <div className="w-full flex items-center gap-2 sm:gap-5 justify-between">
                <a href="/" className="inline-flex items-center justify-center gap-2 w-fit px-2 py-1.5 rounded-md cursor-pointer bg-gray-200 dark:bg-gray-800" >
                    <IoIosArrowForward className="text-sm text-gray-500 dark:text-white" />
                    <span className="text-sm font-vazir text-gray-500 dark:text-white">بازگشت به صفحه اصلی</span>
                </a>
                <div
                    className="w-fit px-2 py-1 rounded-md cursor-pointer bg-red-100  text-xl inline-flex items-center justify-center gap-2"
                    onClick={e => setShowModal(true)}
                >
                    <span className="hidden xs:inline text-sm font-vazir text-red-500">اطلاعات مهم برای ثبت نام</span>
                    <FaCircleInfo className="text-red-500 text-xl xs:text-base" />
                </div>
            </div>

            <h2 className="font-vazir text-2xl text-gray-700 dark:text-gray-200">ثبت نام در Movie Website</h2>

            <form className="w-full flex flex-col justify-center items-center lg:items-start gap-7" onSubmit={registerUser}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-7">
                    <div className="w-full relative select-none">
                        <input type="text" {...firstNameBinding} className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" maxLength={20} required />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام</span>
                    </div>

                    <div className="w-full relative select-none">
                        <input type="text" {...lastNameBinding} className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" maxLength={20} required />
                        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام خانوادگی</span>
                    </div>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        {...emailBinding}
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        onBlur={testEmail}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">ایمیل</span>
                </div>

                <div className="w-full relative select-none">
                    <input
                        type="text"
                        {...userNameBinding}
                        className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                        onBlur={testUserName}
                    />
                    <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-light dark:bg-primary">نام کاربری</span>
                    {userNameTestingFlag && (
                        <div className="flex items-center justify-start gap-2 mt-2 text-sm">
                            <span className="font-vazir text-sky-500">در حال بررسی  وجود نام کاربری</span>
                            <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-200 dark:border-secondary !border-t-sky-500 animate-spin"></span>
                        </div>
                    )}

                    {!userNameTestingFlag && userNameValidFlag != null && (
                        <span className={`mt-2 font-vazir text-sm ${userNameValidFlag ? 'text-green-500' : 'text-red-500'}`}>
                            {userNameValidFlag ? 'نام کاربری معتبر است' : 'نام کاربری معتبر نیست'}
                        </span>
                    )}

                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-7">
                    <div className="w-full relative select-none">
                        <input
                            type={`${showPass ? 'text' : 'password'}`}
                            {...passwordBinding}
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
                            onBlur={e => testPassword(passwordValue)}
                        />
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
                        <input
                            type={`${repeatShowPass ? 'text' : 'password'}`}
                            {...repeatPasswordBinding}
                            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-primary bg-light text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
                            onBlur={e => testPassword(repeatPasswordValue)}
                        />
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
                    <a href="/account/login" className="w-fit text-sm px-2 py-1 rounded-md cursor-pointer font-vazir font-light bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-white">وارد شوید</a>
                </div>
            </form>

            <Toaster
                position="top-left"
                reverseOrder={false}
            />
        </>
    )
}