'use client'
import React from 'react'
import { Range } from 'react-date-range';
import Calender from '../inputs/Calender';
import Button from '../Button';


interface ListingReservationsProps{
    price: number;
    dateRange:Range;
    totalPrice:number;
    onChangeDate: (value:Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[] | void;
}
const ListingReservations:React.FC<ListingReservationsProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
  const dates = disabledDates ? disabledDates : [];
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-400 overflow-hidden'>
        <div className='flex flex-row items-center gap-1 p-4'>
            <div className='text-2xl font-semibold'> $ {price} /night</div>
        </div>
        <hr/>
        <Calender value={dateRange}
        disabledDates={dates}
        onChange={(value)=>onChangeDate(value.selection)}/>
        <hr/>
        <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg '>
          
          <div className=''>Total - </div>
          <div className=''>$ {totalPrice}</div>
        </div>
        <div className='p-4'>
            <Button disabled={disabled}
            label="Reserve"
            onClick={onSubmit}/>
          </div>
    </div>
  )
}

export default ListingReservations