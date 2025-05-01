import React from 'react'

export default function AllTickets() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-gray-700 dark:text-white font-vazir text-xl">Messages</h2>
        <a href="/my-account/userPanel/messages/add-new-ticket" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600  transition-colors">تیکت جدید</a>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-1">
            <span className="text-light-gray dark:text-gray-400 font-vazir text-nowrap text-sm">جستجو بر اساس</span>
            <select name="" id="" className="p-2 bg-gray-100 text-light-gray dark:bg-primary dark:text-white rounded-md" value="">
              <option value="">ID</option>
              <option value="">عنوان</option>
              <option value="">دپارتمان</option>
            </select>
          </div>

          <div className="w-full relative select-none">
            <input
              type="text"
              className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
            />
            <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
          </div>
        </div>

        <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5">
          <table className="w-full ">
            <thead className="min-w-full">
              <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">عنوان تیکت</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">دپارتمان</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ ثبت</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">وضعیت</th>
                <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
              </tr>
            </thead>
          </table>
        </div>

      </div>
    </>
  )
}
