import '../styles/BasicForm.css'
import api from '../api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState()
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    async function handleRegister(e){
        setLoading(false);
        e.preventDefault();
        try {
           await  api.post('/movie/user/',{name,email,phone,password},{headers:{'Content-Type':'multipart/form-data'}}).then(()=>{navigate('/login')})
           
        }catch(error){
            alert(error)
        }finally{
           setLoading(false)
        }
    }




    return <>
    <div className="container">
        
        <form  className="form-container" onSubmit={handleRegister} >
        <h1>Register here..</h1>

        <input type="text" 
            className="form-input" 
            placeholder='Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            name='name'

            />
            

           <input type="number"
           className='form-input'
           placeholder='phone'
           value={phone}
           onChange={(e)=>setPhone(e.target.value)}
           name='username'

           
           />
           
           <input type="email"
           className='form-input'
           placeholder='email'
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           name='email'
            />

            <input type="password"
            placeholder='password'
            className='form-input' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name='password'
            />



            <button className="form-button" type='submit'>Click to Register</button>
            <a href="/login">Already Registered? Login.</a>
            </form>
    </div>
    </>
}
export default RegisterForm