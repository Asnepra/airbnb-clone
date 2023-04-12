'use client';

import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import React, { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
//import { User } from '@prisma/client';

import {signOut} from "next-auth/react"
import { SafeUser } from '@/app/types';


interface UserMenuProp{
    currentUser?: SafeUser | null;
}
const UserMenu:React.FC<UserMenuProp>=({
    currentUser
})=>{

    const loginModal = useLoginModal();

    const registerModal =useRegisterModal();

    // to toggle menu icon, initially menu is closed and both variables are false

    const [isOpenMenu, setIsOpenMenu] =useState(false);

    const toggleMenu =useCallback(()=>{
        setIsOpenMenu((value) =>!value);
    },[]);
    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={()=>{}}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full
                hover:bg-neutral-100 transition cursor-pointer"
                > Airbnb Your Home
                </div>
                <div onClick={toggleMenu} 
                className="flex flex-row
                items-center gap-3 rounded-md cursor-pointer hover:shadow-md
                transition p-2 md:py-1 md:px-2 border-[1px] border-neutral-200">
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avatar src={undefined}/>
                    </div>
                </div>
                
            </div>
            {/* If the menu is open do the following using boolean div is rendered */}

            {isOpenMenu && (
                <div className='absolute rounded-xl shadow-md w-[40vw]
                md:w-3/4 bg-zinc-100 overflow-hidden right-0 top-12'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                            <MenuItem onClick={()=>{}}
                            label="My Trips"/>
                            <MenuItem onClick={()=>{}}
                            label="My Favourites"/>
                            
                            <MenuItem onClick={()=>{}}
                            label="My Reservations"/>
                            <MenuItem onClick={()=>{}}
                            label="My Properties"/>
                            {/**This button disappears on home */}
                            <MenuItem onClick={()=>{}}
                            label="AirBnb My Home"/>
                            <hr/>
                            <MenuItem onClick={()=>signOut()}
                            label="Logout"/>
                            
                            </>

                        ):(
                            <>
                            <MenuItem onClick={loginModal.onOpen}
                            label="Login"/>
                            <MenuItem onClick={registerModal.onOpen}
                            label="Sign Up"/>
                            </>
                       ) }
                    </div>

                </div>
            )}
          
            
        </div>
    )
}

export default UserMenu;