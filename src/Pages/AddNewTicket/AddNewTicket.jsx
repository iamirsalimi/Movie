import React, { useContext, useState } from 'react'

import dayjs from 'dayjs';
import jalali from 'jalaliday';
import 'react-datepicker/dist/react-datepicker.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import UserContext from '../../Contexts/UserContext'

import { MdKeyboardArrowRight } from "react-icons/md";

dayjs.extend(jalali)

let apiData = {
  postApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/tickets',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

export default function AddNewTicket() {
  const [isAdding , setIsAdding] =  useState(false)

  const userObj = useContext(UserContext)

  const schema = yup.object().shape({
    subject: yup.string().required('عنوان تیکت الزامی است.'),
    category: yup.string().oneOf(['account', 'payment', 'bug', 'links', 'content', 'other'], 'ظ نامعتبر است.').required('نوع دپارتمان تیکت الزامی است.'),
    description: yup
      .string()
      .required('توضیحات تیکت الزامی است.')
  })

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: '',
      category: 'account',
      description: '',
    },
  })

  const addTicketHandler = async newTicketObj => {
    await fetch(apiData.postApi, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'apikey': apiData.apikey,
        'Authorization': apiData.authorization
      },
      body: JSON.stringify(newTicketObj)
    }).then(res => {
      console.log(res)
      if (res.ok) {
        location.href = "/my-account/userPanel/messages"
      }
    })
      .catch(err => {
        setIsAdding(false)
        console.log('مشکلی در افزودن تیکت پیش آمده')
      })
  }

  const addTicket = data => {
    if (userObj) {
      // setIsAdding(true)
      let newUserObj = {
        userId: userObj.id,
        fullName: `${userObj.firstName} ${userObj.lastName}`,
        userName: userObj.userName,
        subject: data.subject,
        category: data.category,
        status: 'pending', // it could be "pending" , "answered" or "closed"
        priority: 'middle', // it could be "low" , "middle" or "high"
        description: data.description,
        is_read_by_admin: false,
        is_read_by_user: false,
        last_message_by: null, // null means user just created ticket and it either can be "user" or "admin" 
        created_at: new Date(),
        updated_at: new Date(),
      }

      console.log(newUserObj , Object.keys(newUserObj))
      addTicketHandler(newUserObj)
    }
  }

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-gray-700 dark:text-white font-vazir text-lg sm:text-xl lg:text-2xl">تیکت جدید</h2>
        <a href="/my-account/userPanel/messages" className="inline-flex items-center justify-center gap-0.5 px-2 py-1 rounded-md cursor-pointer font-vazir bg-gray-100 hover:bg-gray-200 dark:bg-primary dark:hover:bg-black/10  transition-colors">
          <MdKeyboardArrowRight className="text-light-gray dark:text-gray-400" />
          <span className="text-light-gray dark:text-gray-400 text-xs md:text-base">بازگشت به لیست درخواست ها</span>
        </a>
      </div>

      <form className="w-full grid grid-cols-2 gap-5 gap-y-7" onSubmit={handleSubmit(addTicket)}>
        <div className="w-full col-start-1 col-end-3 md:col-end-2 relative select-none">
          <input
            type="text"
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('subject')}
          />
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">عنوان</span>
          {errors?.subject && (
            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.subject?.message}</span>
          )}
        </div>

        <div className="w-full col-start-1 col-end-3 md:col-start-2 md:col-end-3 relative select-none">
          <select
            name=""
            id=""
            className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('category')}
          >
            <option value="account">اکانت</option>
            <option value="payment">پرداخت و اشتراک</option>
            <option value="bug">خطا در سایت یا فیلم</option>
            <option value="links">درخواست یا مشکل با فیلم/سریال</option>
            <option value="content">اکانت</option>
            <option value="other">سایر موارد</option>
          </select>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">دپارتمان</span>
          {errors?.category && (
            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.category?.message}</span>
          )}
        </div>

        <div className="col-start-1 col-end-3 w-full relative select-none">
          <textarea
            className="w-full rounded-md p-3 min-h-28 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            {...register('description')}
          ></textarea>
          <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">توضیحات</span>
          {errors?.description && (
            <span className="text-red-500 text-sm mt-2 font-vazir">{errors.description?.message}</span>
          )}
        </div>

        <button 
          className="col-start-1 col-end-3 w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 transition-all cursor-pointer rounded-md py-2 text-white font-vazir"
          disabled={isAdding}
        >
          {isAdding ? 'در حال ارسال تیکت ...' : 'ارسال'}

        </button>
      </form >
    </>
  )
}
