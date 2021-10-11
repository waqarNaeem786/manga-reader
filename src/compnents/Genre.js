import React from 'react'
import { useState, useEffect } from 'react'
import onload from '../assets/onload.gif'


export default function Genre() {
  const [value, setValue] = useState("MGFX")
  useEffect(async() => {
    try {
      const response = await fetch("http://localhost:4000/getMangaList", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          src: value,
          page: 1 
        }),
      })
      let actual = await response.json()
       setGenra(actual)
    } catch (error) {
      console.error(error)
    }
  }, [value])
  const [genera, setGenra] = useState([])
   

    console.log(genera)
    
    function mgfx() {
      setValue("MGFX")
    }
    function mgjr (){
      setValue("MGJR")
    }
    function mgse (){
      setValue("MGSE")
    }
     function mghr (){
      setValue("MGHR")
    }
    function mgdx (){
      setValue("MGDX")
    }
    function rco (){
      setValue("RCO")
    }

    return (
        <div>
          
          <button onClick={mgfx}>MangaFox</button>
          <button onClick={mgjr}>MangaJar</button>
          <button onClick={mgse}>MangaSee</button>
          <button onClick={mghr}>MangaHere</button>
          <button onClick={mgdx}>MangaDex</button>
          <button onClick={rco}>ReadComicOnline</button>
                             
                  <div className="on-search-flex">
                      { genera.length === 0 ? <img src={onload} alt="" /> :
                        
                        genera.LatestManga.map((items, i) => (
                        <div className="">
                          <img key={i} src={items.thumb} alt="" />
                          <p>{items.title}</p>
                        </div>
                       ) ) }  
                        
                      
                  </div>  
        </div>

       
    )
}
