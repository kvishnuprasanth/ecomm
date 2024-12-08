import React from 'react'

const Footer = () => {
  return (
    <div className='w-[100vw] h-[70vh] bg-[#232F3E] relative'>
        <div className='absolute top-0 w-[100%] h-[45px] bg-[#455567] hover:bg-[#314051] text-white flex justify-center items-center cursor-pointer font-poppins' onClick={()=>{window.scrollTo(0,0)}} >Back to Top</div>
     <div className='text-white font-poppins pt-[50px]'>
    Footer
     </div>
    </div>
  )
}

export default Footer
