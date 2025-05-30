import React, { useState , useContext } from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import UserContext from '../../Contexts/UserContext';

import { MdKeyboardArrowRight } from "react-icons/md";

let apiData = {
  postApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/requests',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}


export default function AddRequest() {
  const [isAdding, setIsAdding] = useState(false)

  // inputs validation
  const schema = yup.object().shape({
    title: yup.string().required('وارد كردن عنوان فیلم یا سریال اجباري است'),
    description: yup.string().required('وارد توضیحات اجباري است'),
    movieType: yup
      .string().oneOf(['movie', 'series'])
  })

   let {userObj} = useContext(UserContext)

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      movieType: 'movie',
    },
    resolver: yupResolver(schema)
  })

  // add new Request
  const addRequestHandler = async requestObj => {
    await fetch(apiData.postApi, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'apikey': apiData.apikey,
        'Authorization': apiData.authorization
      },
      body: JSON.stringify(requestObj)
    }).then(res => {
      console.log(res)
      if (res.ok) {
        location.href = "/my-account/userPanel/requests"
      }
    })
      .catch(err => {
        setIsAdding(false)
        console.log('مشکلی در افزودن فیلم پیش آمده')
      })
  }

  const addRequest = data => {
    let newRequest = {...data}

    newRequest.userId = userObj?.id
    newRequest.status = 'pending'
    newRequest.created_at = new Date()
    

    // console.log(newRequest)
    addRequestHandler(newRequest)
  }


  return (
    <>
      <div className="w-full flex items-center justify-between mb-10">
        <h2 className="text-gray-700 dark:text-white font-vazir text-sm xs:text-base md:text-lg lg:text-xl">درخواست جدید</h2>
        <a href="/my-account/userPanel/requests" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
          <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400 text-xs sm:text-base md:text-xl lg:text-2xl" />
          <span className="text-light-gray dark:text-gray-400 text-nowrap text-xs md:text-sm lg:text-base">بازگشت به لیست درخواست ها</span>
        </a>
      </div>

      <form action="" className="mt-5 grid grid-cols-2 gap-7 items-center w-full" onSubmit={handleSubmit(addRequest)}>
        <div className="w-full relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('title')}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان فیلم / سریال / انیمه</span>
          {errors?.title && (
            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.title?.message}</span>
          )}
        </div>
        <div className="w-full relative flex items-center justify-center gap-1">
          <select
            name=""
            id=""
            className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('movieType')}
          >
            <option value="movie">فیلم</option>
            <option value="series">سریال</option>
          </select>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">نوع فیلم</span>
          {errors?.movieType && (
            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.movieType?.message}</span>
          )}
        </div>

        <div className="md:col-start-1 md:col-end-3 w-full relative select-none">
          <textarea
            className="w-full min-h-36 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('description')}
          ></textarea>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
          {errors?.description && (
            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.description?.message}</span>
          )}
        </div>

        <button
          className="md:col-start-1 md:col-end-3 w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-all cursor-pointer rounded-md py-2 text-white font-vazir"
          disabled={isAdding}
        >
          {isAdding ? 'آپدیت' : 'ارسال'}
        </button>
      </form>
    </>
  )
}
