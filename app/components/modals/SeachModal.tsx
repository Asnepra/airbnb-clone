'use client';

import { useRouter, useSearchParams } from "next/navigation";



import Modal from "./Modal";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import {Range } from "react-date-range";
import dynamic from "next/dynamic";
import CounstrySelectProperty, { CountrySelectValue } from "../inputs/CountrySelectProperty";

import qs from "query-string"
import { formatISO } from "date-fns";
import Heading from "../Heading";
import MapPropertylocation from "../MapPropertylocation";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";

enum STEPS{
  //TOTAL 3 STEPS
  LOCATION=0,
  DATE = 1,
  INFORMATION=2
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(()=> dynamic(()=>import('../MapPropertylocation'),{
    ssr:false,
  }),[location]);

  const onBack= useCallback(()=>{
    setSteps((value)=>value-1);
  },[]);
  
  const onNext= useCallback(()=>{
    setSteps((value)=>value+1);
  },[]);

  const onSubmit= useCallback(async ()=>{
    if(steps!==STEPS.INFORMATION){
      return onNext();
    }
    //deifne the currentQuery for filtering
    let currentQuery= {};
    if(params){
      currentQuery=qs.parse(params.toString());
    }
    const updatedQuery:any={
      ...currentQuery,
      LocationValue:location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };
    //Check if date ranges are also added or not
    if(dateRange.startDate){
      updatedQuery.startDate = formatISO( dateRange.startDate);
    }

    if(dateRange.endDate){
      updatedQuery.endDate = formatISO( dateRange.endDate);
    }

    const url= qs.stringifyUrl({
      url:'/',
      query:updatedQuery
    },{skipNull:true});
    //reset the steps
    setSteps(STEPS.LOCATION);
    //Close the seach modal
    searchModal.onOpen();
    router.push(url);
  },[steps,searchModal, location, router, guestCount, roomCount, bathroomCount,dateRange,onNext, params]);

  //Create Action Label for primary and secondary Action

  const  actionLabel = useMemo(()=>{
    if(steps===STEPS.INFORMATION){
      //Indication it is the last step else return the last step
      return "Search";
    }
    return "Next";
  },[steps]);

  const secondaryActionLabel = useMemo(()=>{
    if(steps===STEPS.LOCATION){
      return "Undefined"
    }
    return 'Back';
  },[]);



  let bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Vhere do you like to go!!'
      subtitle='Find the perfect Location'/>
      <CounstrySelectProperty value={location} onChange={
        (value)=>setLocation(value as CountrySelectValue)
      }/>
        <hr/>
        <MapPropertylocation center={location?.latlng}/>
        
     
    </div>
  );

  //Create filter for Date

  if(steps===STEPS.DATE){
    bodyContent=(
      <div className="flex flex-col gap-4">
        <Heading title="Date you like to go on?"
        subtitle="Make sure everyone is free" />
        <Calender value={dateRange} onChange={(value)=>{
          setDateRange(value.selection)
        }}/>
      </div>
    )
  }
  if(steps===STEPS.INFORMATION){
    bodyContent=(
      <div className="flex flex-col gap-4">
        <Heading title="more Information"
        subtitle="Find your perfect Place" />
        <Counter title="Guests" subtitle="Hov many Guests are coming?" value={guestCount} onChange={(value)=>{
          setGuestCount(value)
        }}/>
        <Counter title="Rooms" subtitle="Hov many Rooms do you need?" value={roomCount} onChange={(value)=>{
          setRoomCount(value)
        }}/>
        <Counter title="BathRoom" subtitle="Hov many bathrooms do you need?" value={bathroomCount} onChange={(value)=>{
          setbathroomCount(value)
        }}/>
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      secondaryAction={steps===STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
}

export default SearchModal;
