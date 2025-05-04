import React from 'react'

import PanelComment from './../../Components/PanelComment/PanelComment'

export default function Comments() {
  return (
    <div className="panel-box flex flex-col gap-4 py-4 px-5 mb-16">
      <h2 className="text-gray-700 dark:text-white font-vazir text-xl">دیدگاه ها</h2>
      <div className="flex flex-col items-center gap-5">
        <PanelComment />
        <PanelComment />
      </div>
    </div>
  )
}
