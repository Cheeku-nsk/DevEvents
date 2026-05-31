'use client';
import Image from "next/image";

const Explorebtn = () => {
  return (
    <button type="button" id="explore-btn" className="cursor-pointer mt-4 mx-auto" onClick={()=>{alert(`Clicked!`)}}>
    <a href="#events">
      Explore Events
      
      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24}/>
    </a> </button>
  )
}

export default Explorebtn