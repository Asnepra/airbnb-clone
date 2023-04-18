'use client'
import React from 'react'

import {TbBeach, TbPool} from 'react-icons/tb'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs';
import {GiWindmill,GiMountainRoad, GiIsland, GiBoatFishing, GiCastle, GiCampfire, GiCaveEntrance, GiCactus, GiBarn} from 'react-icons/gi'
import {IoDiamond} from 'react-icons/io5'
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'


export const categories=[
    {
        label:'Beach', 
        icon:TbBeach,
        description:'This property is close to the Beach'
    },
    {
        label:'Farm',
        icon:GiWindmill,
        description:'This property is close to the Farm'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description:'This property is close to the Modern'
    },
    {
        label:'Mountain',
        icon:GiMountainRoad,
        description:'This property is close to the Mountain'
    },
    {
        label:'Pools',
        icon:TbPool,
        description:'This property has Pool'
    },
    {
        label:'Islands',
        icon:GiIsland,
        description:'This property is on Island'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'This property is close to the Lake'
    },
    {
        label:'Skiing',
        icon:FaSkiing,
        description:'This property as skiing activites'
    },
    {
        label:'Castles',
        icon:GiCastle,
        description:'This property is in a Castles'
    },
    {
        label:'Camping',
        icon:GiCampfire,
        description:'This property has camping activities'
    },
    {
        label:'Arctic',
        icon:BsSnow,
        description:'This property is close to the Farm'
    },
    {
        label:'Cave',
        icon:GiCaveEntrance,
        description:'This property is close to the Farm'
    },
    {
        label:'Desert',
        icon:GiCactus,
        description:'This property is in Desert'
    },
    {
        label:'Barns',
        icon:GiBarn,
        description:'This property is in Barn'
    },
    {
        label:'Lux',
        icon:IoDiamond,
        description:'This property is Luxurious'
    },
]
const Categories = () => {

    const params= useSearchParams();
    //extracting the category
    const category = params?.get('category');
    //The category Box is visible only on the index page of the logged in user, so gonna do that using the pathname

    const pathName = usePathname();

    const isMainPage = pathName === '/';

    if(!isMainPage) {
        //Not gonna show the Category Box
        return null;
    }
  return (
    <div className='p-4 flex flex-row justify-between items-center overflow-x-auto'>
        {categories.map((items) =>(
            <CategoryBox key={items.label}
            label={items.label}
            selected={category === items.label}
            icon={items.icon} />
        ))}
    </div>
  )
}

export default Categories