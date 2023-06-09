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
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';


interface UserMenuProp{
    currentUser?: SafeUser | null;
}
const UserMenu:React.FC<UserMenuProp>=({
    currentUser
})=>{

    const router= useRouter();

    const loginModal = useLoginModal();

    const registerModal =useRegisterModal();

    const rentModal = useRentModal();

    // to toggle menu icon, initially menu is closed and both variables are false

    const [isOpenMenu, setIsOpenMenu] =useState(false);

    const toggleMenu =useCallback(()=>{
        setIsOpenMenu((value) =>!value);
    },[]);

    const onRent = useCallback(()=>{
        //Check if there is currentUser

        if(!currentUser) {
            //ask the user to login and break out of this using return
            return loginModal.onOpen();
        }

        //If there is a currentUser the open the rentModal
        rentModal.onOpen();

    },[currentUser, loginModal,rentModal]);
    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent}
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
                        <Avatar avatarImageUrl={currentUser?.image}/>
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
                            <MenuItem onClick={()=>router.push('/trips')}
                            label="My Trips"/>
                            <MenuItem onClick={()=>router.push('/favorites')}
                            label="My Favourites"/>
                            
                            <MenuItem onClick={()=>router.push('/reservations')}
                            label="My Reservations"/>
                            <MenuItem onClick={()=>router.push('/properties')}
                            label="My Properties"/>
                            {/**This button disappears on home */}
                            <MenuItem onClick={rentModal.onOpen}
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