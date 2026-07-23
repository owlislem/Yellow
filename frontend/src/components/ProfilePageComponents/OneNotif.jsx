import React from 'react'
import empty from '../../assets/blank-profile-picture-973460_1280.png'; // Import the image file



const OneNotif = ({ notification, markAsSeen,openNotif, showBorder}) => {
    const {id, object , message, seen} = notification;

    const handleClick=()=>{
        if (!seen){
            markAsSeen(id);

        }
        openNotif(notification);
    };



  return (
    <div 
        onClick={handleClick}
        className={`flex gap-3 p-4 relative ${seen ? "bg-white bg-z-0" : "bg-[#2461FF]  z-10 bg-opacity-[15%]"}  border-b-[0.5px] border-t-[0.5px] border-b-[#D9D9D9] border-l-[4px] border-l-yellow-primary `}
    >
        <div className=" w-full absolute inset-0  bg-opacity-15"></div>
        <div className=' flex-shrink-0'>
        <img src={empty} alt="" className=" w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] rounded-full object-cover" />
        </div>
        <div className='flex overflow-hidden  flex-col w-[50%]]'>
        <h2 className='font-medium text-[14px] sm:text-[18px] uppercase'>{object}</h2>
        <p className='font-light text-[12px] sm:text-[18px] truncate  '>{message}</p>
        </div>

  </div>
  )
}

export default OneNotif