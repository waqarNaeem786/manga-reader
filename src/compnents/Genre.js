import React from 'react'
import { useState, useEffect } from 'react'
import onload from '../assets/onload.gif'
import {Link} from 'react-router-dom'
import { Url } from './baseUrl'


export default function Genre() {
  //hooks
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("MGJR")

  //expermiment
 

  //fetching
  useEffect(async() => {
    setLoading(true)
    try {
      const response = await fetch(`${Url}/getMangaList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          src: value
           
        }),
      })
      setLoading(false)
      let actual = await response.json()
       setGenra(actual)
    } catch (error) {
      console.error(error)
    }
  }, [value])
  const [genera, setGenra] = useState([])
   

    // console.log(genera)
    //source changing functions
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
          <div className="btns">
          <button onClick={mgfx}>MangaFox</button>
          <button onClick={mgjr}>MangaJar</button>
          <button onClick={mgse}>MangaSee</button>
          <button onClick={mghr}>MangaHere</button>
          <button onClick={mgdx}>MangaDex</button>
          <button onClick={rco}>ReadComicOnline</button>
               
          </div>
                        
                  <div className="on-search-flex">
                      { loading === true || genera.length === 0  ? <img src={onload} alt="" /> :
                        
                        genera.LatestManga.map((items, i) => (
                        <div className="search-data, card">
                          <Link to={`/reader/${encodeURIComponent(items.link)}`}>
                          <img className="search-image" key={i} src={items.thumb} alt="" />
                          <h3>{items.title}</h3>
                          </Link>
                        </div>
                       ) ) }  
                        
                      
                  </div>  
        </div>

       
    )
}
