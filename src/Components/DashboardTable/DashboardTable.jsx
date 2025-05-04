import React from 'react'

export default function DashboardTable({ tableHeaders }) {
  return (
    <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-x-scroll lg:overflow-x-hidden">
      <table className="w-full">
        <thead className="min-w-full">
          <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
            {tableHeaders.map(header => (
              <th className="py-1 pb-3 px-2 text-light-gray dark:text-gray-400">{header}</th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  )
}
