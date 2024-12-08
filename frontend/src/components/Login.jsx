import React from 'react'
import logo from '../assets/logo.png'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import {afterEmail} from '../store/loginSlice'
import {isVerifyaction} from '../store/verificationSlice'
import {userState} from '../store/user'

const Login = () => {
  const navigate=useNavigate()
  const isEmail=useSelector((state)=>state.isEmail.isEmail)
  const isVerify=useSelector((state)=>state.isVerify.isVerify)
  const dispatch=useDispatch()

  const calluser=async ()=>{
    try {
      // setLoading(true)
      let res= await fetch(`http://localhost:8000/api/user/getuser`,{
        method:'GET',
        // mode: 'no-cors',
        headers:{
          'Access-Control-Allow-Origin': '*',
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include', 
      });
      let data=await res.json();
      // setLoading(false)
      console.log(res.status);
      if(res.status===200){
        dispatch(userState.setUser(data.can));
        // console.log(data.can);
    }
    else{
      dispatch(userState.unsetUser());
    }
    } catch (err) {
     
    }
  }

  const submit=async ()=>{
    let res=await fetch("http://localhost:8000/api/user/create-session",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      credentials:'include', 
      body:JSON.stringify({
          email:formik1.values.email,
          password:formik2.values.password
      })
    })
    if(res.status===200){
      // window.alert('sucessfully logged in')
      calluser()
      navigate('/');
    }
  }
  const formik1=useFormik({
    initialValues:{
      email:''
    },
    validationSchema:Yup.object({
      email:Yup.string()
        .email('Enter valid email')
        .required('required'),
    }),
    onSubmit:()=>{dispatch(afterEmail.setFalse())}
  })
  const formik2=useFormik({
    initialValues:{
      password:''
    },
    validationSchema:Yup.object({
        password:Yup.string()
        .min(6,'password must be min 6 characters')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('required'),
    }),
    onSubmit:submit
  })
  const formik3 = useFormik({
    initialValues: {
      otp:''
    },
    validationSchema:Yup.object({
      otp:Yup.string()
      .min(4,'password must be min 4 characters')
      .matches(/[0-9]/, 'Password requires a number')
      .required('required'),
    }),
  });
  const handleKeyEnter1=(e)=>{
    if(e.key=='Enter'){
      formik1.handleSubmit()
    }
   }
  const handleKeyEnter2=(e)=>{
    if(e.key=='Enter'){
      formik2.handleSubmit()
    }
   }
  const handleKeyEnter3=(e)=>{
    if(e.key=='Enter'){
      formik3.handleSubmit()
    }
   }
  return (
    <div className='flex flex-col justify-start items-center h-[100vh] w-[100vw] bg-gray-200'>
      <img src={logo} className='h-[100px] w-[100px] ' alt="ecommerce logo" />
      <div className='bg-white h-auto w-[350px] p-8 pt-6 shadow-xl'>
       {!isVerify && <p className='font-poppins text-[2.25rem]'>Login</p>}
       {isVerify && <p className='font-poppins text-[1.75rem]'>Verification required</p>}
       {isVerify && <p className='font-poppins text-[0.9rem] '>To continue, complete this verification step. We've sent an OTP to the email <span className='font-bold'>{formik1.values.email}</span>. Please enter it below to complete verification.</p>}
       {!isEmail && !isVerify && <div className='flex flex-row my-4'>
       <p className='font-poppins text-[0.93rem]'>{formik1.values.email}</p>
       <p className='mx-3 text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer' onClick={()=>{formik1.values.email='';dispatch(afterEmail.setTrue())}}>change</p>
       </div>}
      {isEmail && !isVerify && <form className='my-2'  onKeyUp={handleKeyEnter1}>
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
      </form>}
      {!isEmail && !isVerify && <form className='my-2'  onKeyUp={handleKeyEnter2}>
        <label className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
          <span className='font-medium'>your Password</span>
          <span className='text-[0.9rem] text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer' onClick={()=>{dispatch(isVerifyaction.setTrue())}}>forgot Password</span>
          </div>
          <input 
          type="password"
          name='password'
          value={formik2.values.password}
          onChange={formik2.handleChange}
          onBlur={formik2.handleBlur}
          placeholder="Enter password"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik2.touched.password && formik2.errors.password && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik2.errors.password}</p>}
        </label>
      </form>}
      {isVerify && <form className='my-4'  onKeyUp={handleKeyEnter3}>
        <label className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
          <span className='font-medium'>Enter OTP</span>
          <span className='text-[0.9rem] text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer' onClick={()=>{dispatch(isVerifyaction.setFalse())}}>Go back</span>
          </div>
          <input 
          type="text"
          name='text'
          value={formik3.values.otp}
          onChange={formik3.handleChange}
          onBlur={formik3.handleBlur}
          placeholder="Enter OTP"
          className='my-2 border-2 shadow-inner border-gray-500 h-[30px] p-4 px-2 outline-none '
          />
            {formik3.touched.otp && formik3.errors.otp && <p className={`text-red-700 font-medium text-[0.8rem] ml-1 tracking-widest`}>{formik3.errors.otp}</p>}
        </label>
      </form>}
      {isEmail && !isVerify && <button className='w-[100%] my-1 h-[37px] hover:bg-violet-600 font-medium text-[1.1rem] bg-violet-500 ' onClick={formik1.handleSubmit}>continue</button>}
      {isEmail && !isVerify && <p className='font-poppins text-[0.9rem] mt-3'>By continuing, you agree to ecommerce's  <span className='text-[0.89rem] text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer'>Conditions of Use</span>  and <span className='text-[0.89rem] text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer'>Privacy Notice</span>.</p>}
      {/* {isEmail && !isVerify && <p className='flex justify-center items-center mt-3'>-- OR --</p>}
      {isEmail && !isVerify && <button className='w-[100%] mt-3 h-[37px] hover:bg-slate-200 border-2 border-slate-500 font-medium text-[1.1rem] bg-slate-100 flex justify-center items-center' onClick={googleLogin}>
        <img src={googleLogo} alt="googleLogo" className='h-[35px] w-[35px]' />
        </button>} */}
      {!isEmail && !isVerify && <button className='w-[100%] my-1 h-[37px] hover:bg-violet-600 font-medium text-[1.1rem] bg-violet-500 rounded-lg' onClick={formik2.handleSubmit}>Login</button>}
      {isVerify && <button className='w-[100%] -my-2 h-[37px] hover:bg-violet-600 font-medium text-[1.1rem] bg-violet-500 rounded-lg' onClick={formik3.handleSubmit}>continue</button>}
     {isVerify && <p className='flex justify-center items-center mt-6 text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer'>Resend OTP</p>}
      </div>
       {isEmail && !isVerify && <p className='my-9 font-poppins opacity-75'>--------- &nbsp; New to ecommerce &nbsp;---------</p>}
     {isEmail && !isVerify && <button className='w-[350px] bg-white shadow-xl hover:bg-slate-100 h-[35px]' onClick={()=>{navigate('/signup')}}>Create account</button>}
    </div>
  )
}

export default Login
