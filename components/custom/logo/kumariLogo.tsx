import Image from "next/image";

const KumariLogo = () => {
  return ( 
   <Image
    src="/kumari_logo.png" 
    width={80}
    height={80}
    alt="kumarilogo"
    priority
   /> 
   );
}
 
export default KumariLogo;