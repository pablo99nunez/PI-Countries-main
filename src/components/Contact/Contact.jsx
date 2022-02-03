import React,{useRef} from 'react';
import './Contact.css'
import Button from '../Interactive/Button/Button'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router'

export default function Contact() {
    const form =useRef(null)
    const navigate=useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: e.target[0].value,
            email: e.target[1].value,
            subject: e.target[2].value,
            msj: e.target[3].value
        }
        console.log(JSON.stringify(data))
        fetch("https://patriam-back.herokuapp.com/sendEmail", { //https://patriam-back.herokuapp.com/sendEmail
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((e) => {
            alert("Correo enviado")
            navigate("/home")
        })
            .catch((e) => alert("Algo salio mal: " + e))
    }
    return <>
        <Link to="/home" className='goBack'>
            <h2>Patriam.</h2>
        </Link>
        <div className="containerForm" >
            <form className='contactForm' ref={form} onSubmit={handleSubmit}>
                <h2>Nombre</h2>
                <input type="text" name="name" />
                <h2>Email</h2>
                <input type="email" name="email" />
                <h2>Asunto</h2>
                <input type="text" name="subject" />
                <h2>Mensaje</h2>
                <textarea name="msj" id="" cols="30" rows="10" ></textarea>
                
                <button type="submit">Enviar</button>              

            </form>
        </div>
    </>
}
