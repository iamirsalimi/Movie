import React , { useState } from 'react'

import VipPlanModal from '../../Components/VipPlanModal/VipPlanModal'

export default function VipPlan() {
    const [showModal , setShowModal] = useState(false)
    
    return (
        <>
            <div className="py-4 px-5 panel-box flex items-center justify-between">
                <h2 className="text-gray-700 dark:text-white font-vazir text-sm lg:text-base">اشتراک فعالی ندارید</h2>
                <button
                    className="px-3 py-2 rounded-lg cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition-colors text-white dark:text-primary font-vazir text-sm lg:text-base"
                    onClick={e => setShowModal(prev => !prev)}
                >خرید اشتراک</button>
            </div>
            <div className="flex flex-col gap-5 py-5 px-4 panel-box">
                <h2 className="text-gray-700 dark:text-white font-vazir">لیست تراکنش ها</h2>
                <div className="py-2 px-3 w-full border border-gray-200 dark:border-white/5 rounded-xl overflow-scroll lg:overflow-hidden">
                    <table className="w-full">
                        <thead className="min-w-full">
                            <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">ID</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">نوع اشتراک</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">مبلغ</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">وضعیت تراکنش</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">تاریخ</th>
                                <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">فاکتور</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

            <VipPlanModal showModal={showModal} setShowModal={setShowModal}  />
        </>
    )
}
