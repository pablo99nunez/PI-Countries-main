import React, { useEffect } from 'react'
import { useState } from 'react'
import './Options.css'

export default function Options({handle=()=>{},onErase=()=>{},width=400,value=[]}) {
    let [opts,setOpts]=useState(
        value.map(e=>{
            return <div key={`opt${e}`} className='opt' onClick={()=>handleDelete(`opt${e}`,e)}>
            {e}
        </div>
        })
    )
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
            
            if(res){
                results.push(res)
                
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
