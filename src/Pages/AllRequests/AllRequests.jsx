import React from 'react'

import DashboardTable from '../../Components/DashboardTable/DashboardTable'

export default function AllRequests() {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-gray-700 dark:text-white font-vazir text-xl">لیست درخواست ها</h2>
        <a href="/my-account/userPanel/requests/add-request" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600  transition-colors">درخواست جدید</a>
      </div>
      <DashboardTable tableHeaders={['#' , 'عنوان درخواست' , 'تاریخ ثبت' , 'وضعیت']} />
    </>
  )
}
