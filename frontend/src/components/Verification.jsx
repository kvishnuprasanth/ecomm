import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import logo from '../assets/logo.png'

const Verification = () => {
    const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          formik.handleSubmit()
        }
       }
       const submit=()=>{

       }
       const formik = useFormik({
        initialValues: {
          otp:''
        },
        validationSchema:Yup.object({
          otp:Yup.string()
          .min(4,'password must be min 4 characters')
          .matches(/[0-9]/, 'Password requires a number')
          .required('required'),
        }),
        onSubmit:submit
      });
  return (
    <div className='flex flex-col justify-start items-center h-[100vh] w-[100vw] bg-gray-200'>
      <img src={logo} className='h-[100px] w-[100px] ' alt="ecommerce logo" />
      <div className='bg-white h-auto w-[380px] p-8 pt-6 shadow-xl'>
        <p className='font-poppins text-[1.75rem]'>Verification required</p>
        <p className='font-poppins text-[0.9rem] '>To continue, complete this verification step. We've sent an OTP to the email *****gmail.com. Please enter it below to complete verification.</p>
       
     <form className='my-4'  onKeyUp={handleKeyEnter}>
        <label className='flex flex-col'>
          <span className='font-medium'>Enter OTP</span>
          <input 
          type="text"
          name='text'
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter OTP"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik.touched.otp && formik.errors.otp && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik.errors.otp}</p>}
        </label>
      </form>
     <button className='w-[100%] -my-2 h-[37px] hover:bg-violet-600 font-medium text-[1.1rem] bg-violet-500 rounded-lg' onClick={formik.handleSubmit}>continue</button>
      <p className='flex justify-center items-center mt-6 text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer'>Resend OTP</p>
      </div>
    </div>
  )
}

export default Verification
