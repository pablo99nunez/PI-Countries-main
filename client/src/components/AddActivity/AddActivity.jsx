import React, { useEffect, useState } from 'react'
import "./AddActivity.css"
import Select from '../Interactive/Select/Select'
import Button from '../Interactive/Button/Button'
import Error from '../Interactive/Error/Error'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { useSelector } from 'react-redux'
import Alert from '../Interactive/Alert/Alert'

export default function AddActivity() {
    const [datei, setDatei] = useState(0)
    const [datef, setDatef] = useState(0)
    const [created, setCreated] = useState({})
    const countries = useSelector(state => state.countries)
    const navigate= useNavigate()

    const [errors, setErrors] = useState({
        name:"",
        season:"",
        duration:"",
        difficulty:"",
        IDs:""
    })
    const [input, setInput] = useState({
        name:"",
        season:"Verano",
        duration:"",
        difficulty:"1",
        IDs:[]
    })
    function preSubmit(){
        if(input.name.trim()==""){
            setErrors({...errors,name:"Debes ingresar un nombre"})
            throw new Error("Debes ingresar un nombre")
        }
        if(input.duration=="" || input.duration==0){
            setErrors({...errors,duration:"Debes ingresar una duracion"})
            throw new Error("Debes ingresar una duracion")
        }
        if(!input.IDs[0]){
            setErrors({...errors,IDs:"Debes ingresar al menos un pais"})
            throw new Error("Debes ingresar al menos un pais")
        }
    }

    function validate(){
        let errores={}
        if(input.name.trim()==""){
            errores.name="No puede estar vacio"
        }
        if(input.duration>0){
            errores.duration="La fecha final no puede ser antes de la inicial."
        }
        return errores
    }
    const handleInputChange = (e)=>{
        setInput({ ...input, [e.target.name]:e.target.value })
        
      }
    const handlePaisesInput=(e)=>{
        if(e.key=="Enter"){
            let found=countries.find(pais=>pais.name.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(found)
            if(found){
                if(input.IDs.includes(found.id)){
                    setErrors({...errors,IDs:"Ya ingresaste ese pais"})
                }else setInput({...input,IDs:[...input.IDs,found.id]})
            }else{
                setErrors({...errors,IDs:"No existe el pais ingresado"})
            }

        }
    }
    useEffect(() => {
        
        setErrors(validate(input))
        
    }, [input])
    useEffect(()=>{
        setInput({...input,duration:datei-datef})
    },[datei,datef])
    
    return (
        <div className='activityPage'>
                
            
            <h1 className='titlePage'>Añadir actividad turistica.</h1>
            <div className='form'>
                <div className="inputBox">
                    <h2>Nombre</h2>
                    <input type="text" name="name" onChange={handleInputChange} />
                    {errors.name && (<Error e={errors.name}></Error>)}
                </div>
                <div className="inputBox">
                    <h2>Dificultad</h2>

                    <Select opt={[1,2,3,4,5]} name="difficulty" onSelect={(e)=>{
                        setInput({...input,difficulty:e})
                    }}></Select>
                </div>
                <div className="inputBox">
                    <h2>Duracion</h2>
                    <div className='durationPicker'>
                        <div>
                            <h4>Desde</h4>
                            <input type="date" name="" id="" onChange={(e)=>setDatei(e.target.valueAsNumber)}/>
                        </div>
                        <div>
                            <h4>Hasta</h4>
                            <input type="date" name="" id="" onChange={(e)=>setDatef(e.target.valueAsNumber)} onBlur={handleInputChange}/>
                            {errors.duration && (<Error e={errors.duration}></Error>)}
                        </div>

                    </div>
                </div>
                <div className="inputBox">
                    <h2>Temporada</h2>
                    <Select opt={["Verano","Invierno","Otoño","Primavera"]} name="season" onSelect={(e)=>{
                        setInput({...input,season:e})
                    }}></Select>
                </div>
                <div className="inputBox">
                    <h2>Paises</h2>
                    <input type="text" name="IDs" onKeyDown={handlePaisesInput}/>
                    {errors.IDs && <Error e={errors.IDs}/>}
                    {input.IDs?.map((e)=>{
                        let found=countries.find(pais=>pais.id==e)
                        return <p>{found.name}</p>
                    })}


                </div>
                <div>

                <Link to="/home">
                    <Button value="Cancelar" color="#AE4545" onClick={()=>{}}></Button>
                </Link>
                
                    <Button value="Añadir" color="#45AE45" type="submit" onClick={()=>{
                        preSubmit()
                        fetch('http://localhost:3001/activity',{
                            method:'post',
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(input)
                        }).then(()=>{
                            setCreated({type:"infoType",value:"Actividad creada satisfactoriamente"})
                        }
                        ).catch((e)=>{
                            console.log(e)
                            setCreated({type:"warningType",value:"Ha ocurrido un error"})
                        })
                    }}></Button>
                
                    {created.value && <Alert type={created.type} value={created.value} onClick={()=>{
                        navigate("/home")
                    }}/>}

                </div>
            </div>
        </div>
    )
}
