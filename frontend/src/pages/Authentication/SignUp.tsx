import {useState} from 'react'
import {Button} from '../../components/Button'
import { Button2 } from '../../components/Button'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import { Register } from '../../fetchData'
import { useDispatch } from 'react-redux'
import {login} from '../../../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("")
    const handleSubmit = async () => {
        try{
            let res =await Register({email,username,password});
            dispatch(login(res?.data?.userData))
            navigate("/addproduct")
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='text-white bg-neutral-950 min-w-screen min-h-screen relative overflow-hidden'>
            <div className='spotlight2 z-10'></div>
            <div className='bg-neutral-800 py-2 px-4 w-full flex justify-between items-center sticky z-50'>
                <img src="../../../public/logo.png" alt="" className='w-25 h-10' />
                <Link to='/'><Button title='Login' /></Link>
            </div>
            <div className='w-5/6 h-4/5 flex justify-around  mx-auto mt-6 z-50'>
                    <img src="../../../public/levitation.png" alt="" className='w-80 z-50 h-full hidden rounded-2xl object-contain md:block' />
                <div >
                    <h1 className='text-xl font-bold md:text-3xl'>Sign Up to begin journey</h1>
                    <p className='text-xs md:text-sm text-neutral-500 mt-2'>This is basic signup page which is used for levitation assignment purpose. </p>
                    <Input value={username} type='text' onchange={(e: any) => setusername(e.target.value)} placeholder="Enter your name" label="Enter your name" description="This name will be displayed with your inquiry"/>
                    <Input value={email} type='text' onchange={(e: any) => setemail(e.target.value)} placeholder="Enter your email" label="Email Address" description="This name will be displayed with your inquiry"/>
                    <Input value={password} type='password' onchange={(e: any) => setpassword(e.target.value)} placeholder="Enter your password" label="Password" description="Any further updates will be forwarded on this Email ID"/>
                    <div className='flex gap-12 items-center'><Button2 title='Register' onClick={handleSubmit}/><Link to="/" className='text-xs md:text-base'>Already have an account?</Link></div>
                </div>
            </div>
            <div className='spotlight'></div>
        </div>
    )
}

export default SignUp
