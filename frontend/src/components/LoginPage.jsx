import '../styles/BasicForm.css'
import { useState } from 'react'
import api from '../api';
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constants';
import {useNavigate} from 'react-router-dom'; 

function LoginForm(){
    
    const [email,setEmail]=useState("")
    const navigate=useNavigate()
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)

    const handleLogin= async(e)=>{
        setLoading(true)
        e.preventDefault();
        try {
            const res = await api.post('/movie/token/',{email,password})

            localStorage.setItem(ACCESS_TOKEN,res.data.access);
            localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
            navigate('/');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
        
        


            
       


    }
    
    return <>
    <div className="container">
        
        <form  className="form-container" onSubmit={handleLogin} >
        <h1>Welcome! Login</h1>
            

           <input type="text"
           className='form-input'
           placeholder='Email'
           value={email}
           onChange={(e)=>setEmail(e.target.value)}

           
           />
           
           

            <input type="password"
            placeholder='password'
            className='form-input'
            value={password}
           onChange={(e)=>setPassword(e.target.value)} />

            <button className="form-button" type='submit'>Click to Login</button>
            <a href="/register">Register here..</a>

        </form>
    </div>
    
    
    
    
    </>
}
export default LoginForm;