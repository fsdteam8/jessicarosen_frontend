import React from 'react'
import Products from '../../products/page'

const Page = ({params}:{params:{slug:string}}) => {
  return (
    <div className='container'>
    <h2 className='text-3xl font-bold text-black leading-normal pt-10'>{decodeURIComponent(params?.slug)}</h2>

      <Products/>
    </div>
  )
}

export default Page
