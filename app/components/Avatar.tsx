'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return ( 
    <Image src="/images/placeholder.jpg" alt="Avatar"
        className="rounded-full cursor-pointer"
        height={30} width={30}
        ></Image>
    
   );
}
 
export default Avatar;