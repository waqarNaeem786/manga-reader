import { useState } from 'react'
import React from 'react'
import {useMutation} from 'react-query'
import onload from "../assets/onload.gif"
import Genre from "./Genre"
import { Url } from './baseUrl'

import {
    Link
  } from "react-router-dom";

export default function Search() {
    //Hooks
    const [value, setValue] = useState('')
    const  [res, setRes] = useState()
    
    //MutaionFn
    const searchRes = async (e) =>{
            try {
              const response = await fetch(`${Url}/search`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
               
                  type:"manga",
                  title: e.value,
                  maxItems: 20
                }),
              })
              let actual = await response.json()
              if(actual === null || undefined){
                setRes("OOOooops")
              }else{
                setRes(actual)
                // console.log(res)
              }
                
            } catch (error) {
              console.error(error)
            }
              
}
//Mutation Hook and Mutation Hook
const { isLoading, isError, isSuccess, error, mutate} = useMutation(searchRes, {retry: 5} )

//Input Button Function
function handleChange(e) {
  setValue(e.target.value)
}
const handleKey = () => {
  
    mutate({value})
  
}
const click = e => {
    if (e.keyCode === 13) {
      this.btn.click();
    }
  };


    return (

      <div> 
      <img className="logo" src="https://cdn-icons-png.flaticon.com/128/2314/2314904.png" alt="" />
        
        <div className="input-flex">
            <input className="input" placeholder="Search..." type="text" value={value} onChange={handleChange} onKeyPress={handleKey} />
            <button className="input-btn" type="submit" value="Search" onClick={click} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </div>
        {value.length === 0 ? <Genre /> : ""}
                 

            <div> 
               
                 
                  {isLoading
                      ? <img className="onLoad" src={onload} alt={onload}/>: ""
                  }

                  {
                    isError
                    ? error : ""
                  }
                
                 {isSuccess ? 
                  <div className="on-search-flex">
                   
                      { res.searchArray.map(items => (
                        <div className="search-data card" key={items.id}>
                         <Link to={`/reader/${encodeURIComponent(items.link)}`}>
                          <img className="search-image" src={items.thumb} alt=""/>         
                          <div className="container" >
                          <h2>{items.title} </h2>
                          </div>
                         </Link>
                        </div>
                       ) ) } 
                        
                      
                  </div> : <p></p>}
                 
                  
                 
                 
                        
              </div>          
      </div>
        
       
     
        
    )
}
