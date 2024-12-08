import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import logo from '../assets/logo.png'
import { useSelector,useDispatch} from 'react-redux'
import {afterSignUp} from '../store/signupSlice'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate=useNavigate()
  const isSignUp=useSelector((state)=>state.isSignUp.isSignup);
  const dispatch=useDispatch();
    const handleKeyEnter1=(e)=>{
        if(e.key=='Enter'){
          formik2.handleSubmit()
        }
       }
    const handleKeyEnter2=(e)=>{
        if(e.key=='Enter'){
          formik2.handleSubmit()
        }
       }
       const submit=async ()=>{
        let res=await fetch("http://localhost:8000/api/user/create",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          body:JSON.stringify({
              email:formik1.values.email,name:formik1.values.name,password:formik1.values.password,otp:formik2.values.otp
          })
        })
        if(res.status===200){
          // window.alert('user created succesfully');
          navigate('/login');
        }
       }
       const formik1 = useFormik({
        initialValues: {
          name:'',
          email: '',
          password: '',
          confirm_password:''
        },
        validationSchema:Yup.object({
          name:Yup.string()
          .min(6,'name must be min 6 characters')
          .required('required'),
          email:Yup.string()
          .email('Enter valid email')
          .required('required'),
          password:Yup.string()
          .min(6,'password must be min 6 characters')
          .matches(/[0-9]/, 'Password requires a number')
          .matches(/[a-z]/, 'Password requires a lowercase letter')
          .matches(/[A-Z]/, 'Password requires an uppercase letter')
          .matches(/[^\w]/, 'Password requires a symbol')
          .required('required'),
          confirm_password: Yup
          .string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit:async ()=>{
          let res=await fetch("http://localhost:8000/api/user/checkuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                email:formik1.values.email
            })
          })
          const data=await res.json();
          if(res.status===200){
            if(data.exist){
              window.alert('user already exist');
            }else{
              let res=await fetch("http://localhost:8000/api/user/sendOtp",{
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              credentials:'include', 
              body:JSON.stringify({
                  email:formik1.values.email
              })
            })
            if(res.status===200)
                dispatch(afterSignUp.setFalse())
            }
          } 
        }
      });
      const formik2 = useFormik({
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
    <div className='flex flex-col justify-start items-center h-[150vh] w-[100vw] bg-gray-200'>
      <img src={logo} className='h-[100px] w-[100px] ' alt="ecommerce logo" />
      <div className='bg-white h-auto w-[350px] p-8 pt-6 shadow-xl'>
       {isSignUp && <p className='font-poppins text-[2.25rem]'>Create Account</p>}
      {!isSignUp && <p className='font-poppins text-[1.75rem]'>Verification required</p>}
        {!isSignUp && <p className='font-poppins text-[0.9rem] '>To continue, complete this verification step. We've sent an OTP to the email <span className='font-bold'>{formik1.values.email}</span>. Please enter it below to complete verification.</p>}
    {isSignUp && <form className='my-4 '  onKeyUp={handleKeyEnter1}>
        <label className='flex flex-col'>
          <span className='font-medium'>your Name</span>
          <input 
          type="name"
          name='name'
          value={formik1.values.name}
          onChange={formik1.handleChange}
          onBlur={formik1.handleBlur}
          placeholder="Enter Name"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik1.touched.name && formik1.errors.name && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik1.errors.name}</p>}
        </label>
        <label className='flex flex-col'>
          <span className='font-medium'>your Email</span>
          <input 
          type="email"
          name='email'
          value={formik1.values.email}
          onChange={formik1.handleChange}
          onBlur={formik1.handleBlur}
          placeholder="Enter email"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik1.touched.email && formik1.errors.email && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik1.errors.email}</p>}
        </label>
        <label className='flex flex-col'>
          <span className='font-medium'>your Password</span>
          <input 
          type="password"
          name='password'
          value={formik1.values.password}
          onChange={formik1.handleChange}
          onBlur={formik1.handleBlur}
          placeholder="Enter password"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik1.touched.password && formik1.errors.password && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik1.errors.password}</p>}
        </label>
        <label className='flex flex-col'>
          <span className='font-medium'>confirm_password</span>
          <input 
          type="password"
          name='confirm_password'
          value={formik1.values.confirm_password}
          onChange={formik1.handleChange}
          onBlur={formik1.handleBlur}
          placeholder="Enter password again"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik1.touched.confirm_password && formik1.errors.confirm_password && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik1.errors.confirm_password}</p>}
        </label>
      </form>}
     {!isSignUp && <form className='my-4'  onKeyUp={handleKeyEnter2}>
        <label className='flex flex-col'>
          <span className='font-medium'>Enter OTP</span>
          <input 
          type="text"
          name='otp'
          value={formik2.values.otp}
          onChange={formik2.handleChange}
          onBlur={formik2.handleBlur}
          placeholder="Enter OTP"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik2.touched.otp && formik2.errors.otp && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik2.errors.otp}</p>}
        </label>
      </form>}
      {isSignUp && <p className='font-poppins text-[0.85rem]'> By enrolling your mobile Email address, you consent to receive automated security notifications via text message from ecommerce. Message and data rates may apply.</p>}
    {isSignUp && <button className='w-[100%] mt-4 h-[37px] hover:bg-violet-600 font-medium text-[1.1rem] bg-violet-500 rounded-lg' onClick={formik1.handleSubmit}>continue</button>}
    {isSignUp && <p className='font-poppins text-[0.85rem] mt-2'>
Already have an account? <span onClick={()=>{navigate('/login')}} className='text-[0.89rem] text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer'>Sign in</span></p>}
    {!isSignUp && <button className='w-[100%] -my-2 h-[37px] hover:bg-violet-600 font-medium text-[1.1rem] bg-violet-500 rounded-lg' onClick={formik2.handleSubmit}>Sign up</button>}
      {!isSignUp && <p className='flex justify-center items-center mt-6 text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer'>Resend OTP</p>}
      </div>
    </div>
  )
}

export default SignUp
