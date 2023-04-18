'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';

interface CategoryBoxProps{
    label: string,
    icon: IconType,
    description?: string,
    selected?: boolean,
}

const CategoryBox:React.FC<CategoryBoxProps> = ({
    label,
    icon:Icon,
    description,
    selected
}) => {
  //Going to use router for category listing

  const router=useRouter();
  const params= useSearchParams();

  const handleClick = useCallback(()=>{
    //First define the empty query string
    let currentQuery={};

    //Look for current params object. Params can be null so used if else

    if(params){
      currentQuery = queryString.parse(params.toString());
    }

    //Updating the query for multiple values like location, startdate etc.
    //So if user clicks on the category box, the query is going to be updated by another vairbale called as category, that is assinged the value of label form the categoryBox
    const updatedQuery:any = {
      ...currentQuery,
      category:label,
    };

    //Selcting the category box is going to be add the category to the query and selecting or clicking again will remove the category


    if(params?.get("category")===label){
      delete updatedQuery.category;
    }


    //Generated the query for url and filter out the empty spaces using skipNull
    const url= queryString.stringifyUrl({
      url: '/',
      query : updatedQuery,
    },{skipNull: true});


    router.push(url);
  },[label,params, router]);


  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-rose-500 transition cursor-pointer 
    ${selected ?'border-b-rose-500':'border-transparent'}
    ${selected ?'text-rose-500':'text-neutral-500'}`}>
      <Icon size={26}/>
      <div className="font-medium text-base">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox;