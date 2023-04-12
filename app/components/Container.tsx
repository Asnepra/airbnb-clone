'use client';

interface ContainerProps {
  children: React.ReactNode
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div
      className="px-4 xl:px-10 md:px-6 sm:px-2 max-w-full mx-auto ">
      {children}
    </div>
   );
}
 
export default Container;
