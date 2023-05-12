'use client'
import React, { useEffect } from 'react'
import EmptyState from './components/EmptyState';


interface ErrorsProps{
    error:Error;
}
const Errors:React.FC<ErrorsProps> = ({
    error
}) => {
    useEffect(()=>{
        console.error(error);
        //Add analystics code here for errors
    },[error]);
  return (
    <EmptyState title='Uh! oh!'
    subtitle='Something'/>
  )
}

export default Errors;