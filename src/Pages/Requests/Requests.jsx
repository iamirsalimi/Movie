import React from 'react'

import { Outlet, useLocation } from 'react-router-dom'

export default function Requests() {
  let locationFlag = useLocation().pathname.includes('add-request')
  console.log(locationFlag)
  return (
    <div className="w-full flex flex-col gap-2 items-center">
      {locationFlag && (
        <p className="w-full px-5 py-4 rounded-xl bg-sky-900 text-sky-200 text-sm text-center font-vazir">درخواست‌های خودتون رو بفرستید، حتما قبل از درخواست از وجود نداشتن فیلم یا سریال موردنظر در سایت مطمئن بشین، در وارد کردن نام دقت نمایید.
        </p>
      )}
      <div className="panel-box py-4 px-5 flex flex-col items-center gap-5">
        <Outlet />
      </div>
    </div>
  )
}
