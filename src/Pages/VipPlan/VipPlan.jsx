import React from 'react'

export default function VipPlan() {
    return (
        <>
            <div className="py-4 px-5 panel-box flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir">اشتراک فعالی ندارید</h2>
                <button className="px-3 py-2 rounded-lg cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition-colors text-white dark:text-primary font-vazir">خرید اشتراک</button>
            </div>
            <div className="flex flex-col gap-5 py-5 px-4 panel-box">
                <h2 className="text-gray-700 dark:text-white font-vazir">لیست تراکنش ها</h2>
                <div className="py-2 px-3 w-full border border-gray-200 dark:border-white/5 rounded-xl">
                    <table className="w-full ">
                        <thead className="min-w-full">
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">ID</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">نوع اشتراک</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">مبلغ</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">وضعیت تراکنش</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">تاریخ</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">فاکتور</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}
