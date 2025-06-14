import React, { useState, useContext, useEffect } from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import toast from 'react-hot-toast';

import { checkUserName, updateUser as updateUserDetails } from './../../Services/Axios/Requests/Users';
import UserContext from './../../Contexts/UserContext'
import LoadingContext from './../../Contexts/LoadingContext'

import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

let userNameRegex = /^[0-9A-Za-z_.]+$/
let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@_.])(?!.* ).{8,16}$/

let apiData = {
  updateApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userToken=eq.',
  getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userName=eq.',
  api: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function ProfileEdit() {
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showRepeatPass, setRepeatShowPass] = useState(false)

  const [userNameTestingFlag, setUserNameTestingFlag] = useState(false)
  const [userNameValidFlag, setUserNameValidFlag] = useState(null)

  const { userObj } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)


  const schema = yup.object().shape({
    firstName: yup.string().required('وارد كردن نام اجباري است'),
    lastName: yup.string().required('وارد كردن نام خانوادگي اجباري است'),
    nickName: yup.string(),
    email: yup.string().email('ایمیل نامعتبر است').required('وارد كردن ايميل اجباري است'),
    userName: yup
      .string()
      .required('وارد كردن نام کاربری اجباری است')
      .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد')
      .matches(userNameRegex, 'نام کاربری نامعتبر است')
    ,
    recentPassword: yup
      .string()
      .min(6, 'رمز عبور حداقل باید 6 کاراکتر باشد')
      .max(16, 'رمز عبور حداکثر باید 16 کاراکتر باشد')
      .matches(passwordRegex, 'رمز عبور نامعتبر است'),
    newPassword: yup.string().notRequired(),
    confirmNewPassword: yup.string().notRequired(),
  })

  let {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let recentPassword = watch('recentPassword')
  let newPassword = watch('newPassword')
  let confirmNewPassword = watch('confirmNewPassword')

  const errorNotify = text => {
    toast.error(text)
  }

  const updateUser = async (userId, newUserObj) => {
    await updateUserDetails(userId, newUserObj)
      .then(res => {
        location.reload()
      })
      .catch(err => errorNotify('مشکلی در ثبت نام پیش آمده'))
  }

  // yup can't validate matching two password inputs and also recognize them as a not required fields 
  const validatePasswords = (recentPassword, newPassword, confirmNewPassword) => {
    if (newPassword && !passwordRegex.test(newPassword)) {
      setError('newPassword', { type: 'validation', message: 'رمز عبور معتبر نیست' });
    }

    if (confirmNewPassword && !passwordRegex.test(confirmNewPassword)) {
      setError('confirmNewPassword', { type: 'validation', message: 'رمز عبور معتبر نیست' });
    }

    if (newPassword != confirmNewPassword) {
      setError('confirmNewPassword', { type: 'match', message: 'مقدار رمز عبور جدید با تکرار آن برابر نیست' });
      setError('newPassword', { type: 'match', message: 'مقدار رمز عبور جدید با تکرار آن برابر نیست' });
      return;
    }

    if (newPassword === recentPassword) {
      setError('newPassword', { type: 'same', message: 'رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد.' });
      setError('confirmNewPassword', { type: 'same', message: 'رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد.' });
      return;
    }
  }

  const updateUserHandler = async (data) => {
    validatePasswords(data.recentPassword, data.newPassword, data.confirmNewPassword)

    if (Object.keys(errors).length == 0) {
      if (userObj.firstName != data.firstName || userObj.lastName != data.lastName || userObj.nickName != data.nickName || userObj.userObjName != data.userObjName || userObj.email != data.email || userObj.password != data.newPassword) {
        let newUserObj = { ...userObj }
        newUserObj.firstName = data.firstName
        newUserObj.lastName = data.lastName
        newUserObj.nickName = data.nickName
        newUserObj.userName = data.userName
        newUserObj.email = data.email

        if (data.newPassword) {
          newUserObj.password = data.newPassword
        }

        await updateUser(newUserObj.id, newUserObj)
      }
    }
  }

  const toggleShowingPassHandler = (setShowPass) => {
    setShowPass(prev => !prev)
  }

  const checkUserNameExist = async () => {
    // console.log('before fetch')
    const userNameValue = watch('userName').toLowerCase()

    if (userNameValue.trim() && userNameValue != userObj?.userName) {
      setUserNameTestingFlag(true)
      await checkUserName(userNameValue)
        .then(data => {
          if (data.length > 0) {
            setUserNameValidFlag(false)
          } else {
            setUserNameValidFlag(true)
          }

          setUserNameTestingFlag(false)
        })
        .catch(err => {
          errorNotify('خطا هنگام بررسی نام کاربری')
          console.log(err)
        })
    } else {
      setUserNameValidFlag(null)
    }
  }

  useEffect(() => {
    setValue('firstName', userObj?.firstName, { shouldValidate: true })
    setValue('lastName', userObj?.lastName, { shouldValidate: true })
    setValue('nickName', userObj?.nickName, { shouldValidate: true })
    setValue('userName', userObj?.userName, { shouldValidate: true })
    setValue('email', userObj?.email, { shouldValidate: true })
    setValue('recentPassword', userObj?.password, { shouldValidate: true })
    if (userObj && loading) {
      setLoading(false)
    }
  }, [userObj])

  useEffect(() => {
    if (newPassword || confirmNewPassword) {
      validatePasswords(recentPassword, newPassword, confirmNewPassword)
    }
  }, [recentPassword, newPassword, confirmNewPassword])

  return (
    <form className="p-4 flex flex-col gap-7 panel-box rounded-2xl mb-16" onSubmit={handleSubmit(updateUserHandler)}>

      {/* Update Profile Informations */}
      <ul className="col-start-1 col-end-4 bg-red-500 rounded-xl py-5 px-2 flex flex-col items-center gap-2 font-vazir text-white text-sm lg:text-base">
        <li className="text-center">نام كاربري نميتواند با اعداد شروع شود همچنين بايد حداقل 5 و حداكثر 16 كاراكتر باشد</li>
        <li className="text-center">نام كاربري شما در بخش كامنت ها نمايش داده مي شود درصورتي كه نام نمایشی خود را مشخص نكرده باشيد</li>
        <li className="text-center">رمز عبور حداقل ميتواند 8 و حداکثر 16 کاراکتر می تواند باشد</li>
        <li className="text-center">رمز عبور باید حداقل یک حرف کوچک ،حداقل یک حرف بزرگ ، حداقل یک کارکتر (یکی از مقادیر # و @ و _ و .) و حداقل یک عدد داشته باشد</li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First Name */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('firstName')}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام</span>
        </div>

        {/* last Name */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('lastName')}

          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام خانوادگی</span>
        </div>

        {/* nick Name */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('nickName')}

          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام نمایشی</span>
          <span className="font-shabnam text-sm text-sky-400 ">با این نام در سایت شناخته خواهید شد</span>
        </div>

        {/* userName */}
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('userName')}
            onBlur={checkUserNameExist}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">نام کاربری</span>
          {userNameTestingFlag && (
            <div className="flex items-center justify-start gap-2 mt-2 text-sm">
              <span className="font-vazir text-sky-500">در حال بررسی  وجود نام کاربری</span>
              <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-200 dark:border-secondary !border-t-sky-500 animate-spin"></span>
            </div>
          )}

          {!errors.userName && !userNameTestingFlag && userNameValidFlag != null && (
            <span className={`mt-2 font-vazir text-sm ${userNameValidFlag ? 'text-green-500' : 'text-red-500'}`}>
              {userNameValidFlag ? 'نام کاربری معتبر است' : 'نام کاربری از قبل موجود نیست'}
            </span>
          )}

          {errors.userName && (
            <span className="text-sm text-red-500 font-vazir">{errors.userName.message}</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="col-start-1 w-full relative select-none">
        <input
          type="text"
          className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
          {...register('email')}
        />
        <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">ایمیل</span>
        {errors.email && (
          <span className="text-sm text-red-500 font-vazir">{errors.email.message}</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <h2 className="col-start-1 col-end-4 font-vazir text-gray-800 dark:text-white text-lg">تغییر رمز عبور</h2>
        {/* Current Password */}

        <div className="col-start-1 col-end-4 lg:col-start-1 lg:col-end-2 w-full flex flex-col gap-1">
          <div className="col-start-1 col-end-4 lg:col-start-1 lg:col-end-2 w-full relative select-none">
            <input
              type={`${showCurrentPass ? 'text' : 'password'}`}
              className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
              {...register('recentPassword')}

            />
            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">رمز عبور فعلی</span>
            <div onClick={() => toggleShowingPassHandler(setShowCurrentPass)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-500 transition-all peer-focus:!text-sky-500">
              {showCurrentPass ? (
                <PiEyeClosedBold className="text-2xl" />
              ) : (
                <PiEyeBold className="text-2xl" />
              )}
            </div>
          </div>
          {errors.recentPassword && (
            <span className="text-sm text-red-500 font-vazir">{errors.recentPassword.message}</span>
          )}
        </div>


        {/* New Password */}
        <div className="col-start-1 col-end-4 lg:col-start-2 lg:col-end-3 w-full flex flex-col gap-1">
          <div className="relative select-none">
            <input
              type={`${showPass ? 'text' : 'password'}`}
              className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
              {...register('newPassword')}
            />
            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary">رمز عبور جدید</span>
            <div onClick={() => toggleShowingPassHandler(setShowPass)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-500 transition-all peer-focus:!text-sky-500">
              {showPass ? (
                <PiEyeClosedBold className="text-2xl" />
              ) : (
                <PiEyeBold className="text-2xl" />
              )}
            </div>
          </div>
          {errors.newPassword && (
            <span className="text-sm text-red-500 font-vazir">{errors.newPassword.message}</span>
          )}
        </div>

        {/* Repeat New Password */}

        <div className="col-start-1 col-end-4 lg:col-start-3 lg:col-end-4 w-full flex flex-col gap-1">
          <div className="relative select-none">
            <input
              type={`${showRepeatPass ? 'text' : 'password'}`}
              className="w-full rounded-md p-3 border border-light-gray dark:border-gray-500 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors" minLength={8} maxLength={16}
              {...register('confirmNewPassword')}
            />
            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-500 bg-white dark:bg-secondary"> تکرار رمز عبور جدید</span>
            <div onClick={() => toggleShowingPassHandler(setRepeatShowPass)} className="absolute left-1 bottom-1/2 translate-1/2 cursor-pointer select-none text-light-gray dark:text-gray-500 transition-all peer-focus:!text-sky-500">
              {showRepeatPass ? (
                <PiEyeClosedBold className="text-2xl" />
              ) : (
                <PiEyeBold className="text-2xl" />
              )}
            </div>
          </div>
          {errors.confirmNewPassword && (
            <span className="text-sm text-red-500 font-vazir">{errors.confirmNewPassword.message}</span>
          )}
        </div>

      </div>
      <button className="py-2 rounded-sm bg-sky-500 hover:bg-sky-600 transition-colors text-white font-vazir cursor-pointer">به روزرسانی پروفایل</button>
    </form>
  )
}
