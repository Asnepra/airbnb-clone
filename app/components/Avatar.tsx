'use client';

import Image from "next/image";

interface AvatarProps {
  avatarImageUrl: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ avatarImageUrl }) => {
  return ( 
    <Image src={avatarImageUrl  ||"/images/placeholder.jpg"} alt="Avatar"
        className="rounded-full cursor-pointer"
        height={30} width={30}
        ></Image>
    
   );
}
 
export default Avatar;