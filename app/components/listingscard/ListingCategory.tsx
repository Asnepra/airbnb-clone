'use client'
import React from 'react'
import { IconType } from 'react-icons'

interface ListingCategoryProps{
    icon:IconType;
    label:string;
    description:string;
}
const ListingCategory:React.FC<ListingCategoryProps> = ({
    icon:Icon,
    label,
    description
}) => {
  return (
    <div className='fles flex-col gap-6'>
        <div className='flex flex-row items-center gap-4'>
            <Icon size={40} className='text-rose-500'/>
            <div className=' flex flex-col '>
                <div className='text-lg font-semibold'>
                    {label}
                </div>
                <div className='text-slate-700 font-light '>
                    {description}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingCategory