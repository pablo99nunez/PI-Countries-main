import React from 'react';
import './Contact.css'

export default function Contact() {
    const handleSubmit=(e)=>{
        e.preventDefault();
        let data={
            name:e.target[0].value,
            email:e.target[1].value,
            subject:e.target[2].value,
            msj:e.target[3].value
        }
        console.log(JSON.stringify(data))
        fetch("https://patriam-back.herokuapp.com/sendEmail",{ //https://patriam-back.herokuapp.com/sendEmail
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((e)=>{
            alert("Correo enviado")
        })
        .catch((e)=>alert("Algo salio mal: "+e))
    }
  return <div className="containerForm">
    
    <form className='contactForm' onSubmit={handleSubmit}>
                <label htmlFor="">Nombre</label>
                <input type="text" name="name"/>
                <label htmlFor="">Email</label>
                <input type="email" name="email" />
                <label htmlFor="">Asunto</label>
                <input type="text" name="subject" />
                <label htmlFor="">Mensaje</label>
                <textarea name="msj" id="" cols="30" rows="10"></textarea>
                <button type="submit">Button</button>
    </form>
  </div>
}
