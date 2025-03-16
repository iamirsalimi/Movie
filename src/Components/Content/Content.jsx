import React, { useEffect, useState } from 'react'

import FilterBox from './../FilterBox/FilterBox'
import FilterModal from './../FilterModal/FilterModal'
import MainPageComp from '../mainPageComp/MainPageComp'

export default function Content() {
  const [showFilterModal, setShowFilterModal] = useState(false)

  return (
    <div className="mx-auto container w-full flex-col gap-y-7 gap-x-4 px-7">
      <FilterBox setShowFilterModal={setShowFilterModal} />
      <MainPageComp />
      <FilterModal showModal={showFilterModal} setShowModal={setShowFilterModal} />
    </div>
  )
}
