'use client';

import React, { useMemo, useState } from 'react'
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import Categories, { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelectProperty from '../inputs/CountrySelectProperty';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';

//Number of steps to complete for listing a property for rent
enum STEPS{
  CATEGORY_OF_PROPERTY =0,
  LOCATION_OF_PROPERTY =1,
  INFORMATION_OF_PROPERTY = 2,
  IMAGES_OF_PROPERTY = 3,
  DESCRIPTION_OF_PROPERTY = 4,
  PRICE_OF_PROPERTY = 5
}
const RentModal = () => {

  const rentModal = useRentModal();
  //Start by inputting the category of the property, default
  const [steps, setSteps] = useState(STEPS.CATEGORY_OF_PROPERTY);

  //Connect the category input to the RentModal

  const{
    register,
    handleSubmitProperty,
    setPropertyValue,
    watch,
    setValue,
    formState:{
      errors,
    },
      reset
  } =useForm<FieldValues>({
      //All these variables must be same as of the Listings table database prisma schema, as they are going to be saved in the database
      defaultValues:{
        category:'',
        location:null, //location Object for the property location
        guestCount:1, // default to 1
        roomCount:1, // default to 1
        bathroomCount:1, // default
        imageSrc:'', // default
        price:1, // default to 1
        title: '', // default to empty string
        description: '', // default to empty string

      }
    });
  

  //To look for change in the category value

  const categorySelected = watch('category');
  const locationSelected = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount= watch('bathroomCount');

  //importing map dynamically for rendering

  const MapPropertylocation = useMemo(()=> dynamic(()=>import('../MapPropertylocation'),{
    ssr: false
  }),[locationSelected])
  //This is to refresh the content after the category has been selected
  const setCustomValue = (id:string, value:any) => {
    setValue(id, value,{
      shouldDirty: true,
      shouldTouch:true,
      shouldValidate: true
    });
  }


  //Function to go back and forward for the property renting

  const onBack = () => {
    setSteps((value) => value-1);
  };

  const onNext = () => {
    setSteps((value) => value+1);
  };
//Adding Secondary Action Labels

const secondaryActionLabels = useMemo(()=>{
  //If on the first step (STEPS.CATEGORY_OF_PROPERTY), then there is no Back Button

  if(steps===STEPS.CATEGORY_OF_PROPERTY){
    return undefined;
  }
  return 'Back';
},[steps]);

  //Hard coding the action labels

  const actionLabel = useMemo(()=>{
    //Check if it the last step in entering the property details

    if(steps === STEPS.PRICE_OF_PROPERTY){
      return 'Create Property';
    }

    return 'Next';
    
  },[steps]);

  


  //Make the Body content of the property based on the step, so using let

  let bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Vhich of these best describes your place for renting purpose'
      subtitle='Pick a Category'/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {/**Going to map the Categories  having icons label and descriptions, going to replace each item, vith div and use the item data*/}

        {categories.map((item)=>(
          <div className='col-span-1' key={item.label}>
            <CategoryInput onClick={(categorySelected)=>setCustomValue('category', categorySelected)}
             selected={categorySelected===item.label} label={item.label} icon={item.icon}
          />
          </div>
        ))}
      </div>

    </div>
  );

  //Content for the Location Step

  if(steps===STEPS.LOCATION_OF_PROPERTY){
    bodyContent=(
      <div className='flex flex-col gap-8 '>
        <Heading title='vhere is this property located'
        subtitle='Help Guests find it!'/>
         <MapPropertylocation center={locationSelected?.latlng}/>
        <CountrySelectProperty value={locationSelected} onChange={(value)=>setCustomValue('location',value)}/>
       
      </div>
    )
  }

  //Added the option for Information of the property

  if(steps===STEPS.INFORMATION_OF_PROPERTY){
    //Change the Body Content

    bodyContent=(
      <div className='flex flex-col gap-8'>
        <Heading title='Share some informaton about your property'
        subtitle='vhat amenities do they have?'/>
        <Counter title='Guests'
        subtitle='Number of guests you allow?'
        value={guestCount}
        onChange={(value)=>setCustomValue('guestCount',value)}
        />
        <hr/>
        <Counter title='Rooms'
        subtitle='Number of rooms you have in your property?'
        value={roomCount}
        onChange={(value)=>setCustomValue('roomCount',value)}
        />
        <hr/>
        <Counter title='Bathrooms'
        subtitle='Number of bathroom you have in your property?'
        value={bathroomCount}
        onChange={(value)=>setCustomValue('bathroomCount',value)}
        />
      </div>
    )
  }

  const footer=(
    <div className='flex items-center justify-center p-1 md:p-2'>
      <span className=''>
        Step {steps+1} out of 6
      </span>
    </div>
  )

  
  return (
    <Modal isOpen={rentModal.isOpen} 
    onClose={rentModal.onClose}
    onSubmit={onNext}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabels}
    secondaryAction={steps===STEPS.CATEGORY_OF_PROPERTY ? undefined: onBack}
    body={bodyContent}
    footer={footer}
     title='Rent Your Property'/>
  )
}

export default RentModal