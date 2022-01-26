import React, { useState, useEffect } from "react";

export function validate(input){
  let errores ={}
  if(!input.username){
    errores.username="Username is required";
  }else if(!/\S+@\w+\.\S+/.test(input.username)){
    errores.username="Username is invalid"
  }
  if(!input.password){
    errores.password="Password is required"
  }else if(!/(?=.*\d)/.test(input.password)){
    errores.password="Password is invalid"
  }
  return errores;
}





export default function Form() {

  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    username:'',
    password:''
  })
  
  const handleInputChange = (e)=>{
    console.log("1:",input.username);
    setInput({ ...input, [e.target.name]:e.target.value })
  }
  

  useEffect(() => {
    setErrors(validate(input))
  }, [input])
  

  return (
    <div>
     
      <form>
        <label htmlFor="username">Username:</label>
        <div>
          <input name="username" value={input.username} className={errors.username && "danger"} placeholder="example@gmail.com" type="text"  onChange={handleInputChange} onBlur={()=>setErrors(validate(input))}/>
          {errors.username && (<p className="danger">{errors.username}</p>)}
        </div>

        <label htmlFor="password">Password:</label>
        <div>
          <input name="password"  value={input.password} className={errors.password && "danger"} placeholder="Password" type="password" onChange={handleInputChange} onBlur={()=>setErrors(validate(input))}/>
          {errors.password && (<p className="danger">{errors.password}</p>)}
        </div>

      </form>
    </div>
  );
}