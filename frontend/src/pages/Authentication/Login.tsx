import  { useState } from 'react'
import { Button3 } from '../../components/Button'
import { Link } from 'react-router-dom'
import { Button2 } from '../../components/Button'
import Input from '../../components/Input'
import { LogIn } from '../../fetchData'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login} from '../../../reducers/userSlice'

// import logo from '../../../public/levitation.png';
const Login = () => {
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleSubmit = async () => {
        // e.preventDefault();
        try{

            const res = await LogIn({email,password})
            dispatch(login(res?.data?.userData))
            navigate("/addproduct")

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='text-white bg-neutral-950 min-w-screen min-h-screen relative overflow-hidden'>
            <div className='spotlight2 z-10'></div>

            <div className='bg-neutral-800 py-2 px-4 w-full flex justify-between sticky items-center z-50'>
                <img src="../../../public/logo.png" alt="" className='w-25 h-10' />
                <Button3 title='Connecting People With Technology ' />
            </div>
            <div className='w-5/6 h-4/5 flex justify-around  mx-auto mt-6 z-50'>
                <img src="../../../public/levitation.png" alt="" className='w-80 h-full hidden rounded-2xl object-contain md:block z-50' />
                <div  >
                    <h1 className='text-xl font-bold md:text-3xl'>Let the journey begin</h1>
                    <p className='text-xs md:text-sm text-neutral-500 mt-2'>This is basic signup page which is used for levitation assignment purpose. </p>
                    {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                        <Input value={email} type='text' placeholder="Enter your email" label="Email Address" description="This name will be displayed with your inquiry" onchange={(e: any) => setemail(e.target.value)} />
                        <Input value={password} type='password' placeholder="Enter your password" label="Password" description="Any further updates will be forwarded on this Email ID" onchange={(e: any) => setpassword(e.target.value)} />
                        <div className='flex gap-12 items-center mt-8'>
                            <Button2 title='Login Now' onClick={handleSubmit} />

                            <Link to="/" className='text-xs md:text-base'>Forgot password?</Link>
                        </div>
                    {/* </form> */}
                </div>
            </div>
            <div className='spotlight'></div>

        </div>
    )
}

export default Login
