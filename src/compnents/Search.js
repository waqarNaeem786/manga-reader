import { useState } from 'react'
import React from 'react'
import {useMutation} from 'react-query'
import onload from "../assets/onload.gif"
import  '../styles/onLoad.css'
import Genre from "./Genre"

import {
    Link
  } from "react-router-dom";
// import {searchRes, sData} from '../api/searchApi'

export default function Search() {
    //Hooks
    const [value, setValue] = useState('')
    const  [res, setRes] = useState()
    
    //MutaionFn
    const searchRes = async (e) =>{
            try {
              const response = await fetch("http://localhost:4000/search", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
               
                  type:"manga",
                  title: e.value,
                  maxItems:1
                }),
              })
              let actual = await response.json()
              if(actual === null || undefined){
                setRes("OOOooops")
              }else{
                setRes(actual)
                console.log(res)
              }
                
            } catch (error) {
              console.error(error)
            }
              
}
//Mutation Hook and Mutation Hook
const { isLoading, isError, isSuccess, error, mutate} = useMutation(searchRes, {retry: 5} )

//Input Button Function
const click = () => {
  if(value.length !== 0){
    mutate({value})
  }else{
    alert("Search bar is Empty")
  }
}

    return (
        <div>                           
                <input type="text" value={value} onChange={e=>{setValue(e.target.value)}} />
                <input type="submit" value="submit" onClick={click} /> 
              <Genre />
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
                   
                      {res.searchArray.map(items => (
                        <div className="search-data, card" key={items.id}>
                         <Link to={`/reader/${items.title}/${encodeURIComponent(items.link)}`}>
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
