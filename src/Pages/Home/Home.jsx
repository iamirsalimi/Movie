import React from 'react'

import Header from './../../Components/Header/Header'
import Content from './../../Components/Content/Content'

export default function Home() {

  return (
    <div className="w-full relative flex flex-col gap-5 overflow-hidden">
      <Header />
      <Content />
    </div>
  )
}
