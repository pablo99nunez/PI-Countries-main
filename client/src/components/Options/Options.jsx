import React from 'react'
import { useState } from 'react'
import './Options.css'

export default function Options({handle=()=>{},onErase=()=>{},width=400}) {
    let [opts,setOpts]=useState([])
    let results=[]

    function handleDelete(e,value){
        setOpts(oldArray=>{
           return oldArray.filter((id)=>{
           
            return id.key!=e})
        })
        onErase(value)
    }
    
    function handleInput(e){
        if(e.key=="Enter"){
            const res = handle(e)
            console.log(res)
            if(res){
                results.push(res)
                console.log(opts.length)
                setOpts([...opts,
                <div key={`opt${res}`} className='opt' onClick={()=>handleDelete(`opt${res}`,res)}>
                    {res}
                </div>])
            e.target.value=""
        }}
    }
    return (
        <div className='options'>
            <input type="text" onKeyDown={handleInput} style={{width}}/>
            <div className='optsWrapper' style={{width}}>
                {opts && opts.map(e=>e)}
            </div>
        </div>
    )
}
