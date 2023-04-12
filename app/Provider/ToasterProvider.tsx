"use client";

//It is foreign library and it is used in client component, therefore have to use-client
import { Toaster } from "react-hot-toast";



const ToasterProvider = () => {
  return (
    <Toaster></Toaster>
  )
}

export default ToasterProvider