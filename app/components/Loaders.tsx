'use client'

import { PuffLoader } from "react-spinners"

import React from 'react'

const Loaders = () => {
  return (
    <div className="h-70vh flex flex-col justify-center items-center">
        <PuffLoader size={100} color="red"></PuffLoader>
    </div>
  )
}

export default Loaders