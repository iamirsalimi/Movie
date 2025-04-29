import React from 'react'

export default function DashboardTable({title , tableHeaders}) {
  return (
    <div className="py-3 px-4 flex flex-col gap-4 panel-box">
        <div className="inline-flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                <span className="inline-block w-3 h-3 bg-sky-500 rounded-full"></span>
                <span className="inline-block w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
            </div>
            <h2 className="font-vazir text-gray-800 dark:text-white text-lg">{title}</h2>
        </div>

        <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5">
          <table className="w-full ">
              <thead className="min-w-full">
                <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                  {tableHeaders.map(header => (
                    <th className="py-1 pb-3 px-2 text-light-gray dark:text-white">{header}</th>
                  ))}
                </tr>
              </thead>
          </table>
        </div>
    </div>
  )
}
