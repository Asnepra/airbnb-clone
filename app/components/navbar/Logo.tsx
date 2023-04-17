'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="cursor-pointer" 
      src="/images/airbnb_logo.png" 
      height="80" 
      width="80" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
