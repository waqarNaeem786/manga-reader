import React from 'react'
import {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import {useMutation} from 'react-query'
import {loader} from "../assets/onload.gif"
import ReaderApp from "./ReaderApp"
export default function Reader() {
    const {title, url} = useParams()
    const [chaps, setChaps] = useState([])
    let decodeUrl = decodeURIComponent(url)
    // console.log(decodeUrl)
    
 
    const searchChp = async () => {
        try {
            // console.log(e.decodeUrl)
             const response = await fetch("http://localhost:4000/getMangaInfo", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    url: "https://mangajar.com/manga/how-a-realist-hero-rebuilt-the-kingdomdecodeUrl"
                }),
              })
              let actual = await response.json()
               setChaps(actual)
              if(chaps.length === 0){
                setChaps(["OOOooops"])
              }else if (actual !== undefined){
               setChaps(actual)
               console.log(chaps)
              }
           
        } catch (error) {
           console.error(error)
        }
    }
 const { isLoading, isError, isSuccess, error, mutate} = useMutation(searchChp, {retry: 5} )
    mutate(decodeUrl)  
 
 
    return (
        <div>
            <Link to="/">
                Home
            </Link>
            <button>refresh</button>
            <div>
                {/* { chaps.length !== 0 ?
                chaps.mangaInfo.map(items=>(
                         <ReaderApp chaps={items}/>
                ))
                
                    
                : <img src={loader} alt="" /> } */}
                
            </div>
            {/* <ReaderApp /> */}
            <h1>Title: {title} and Path: {`${decodeURIComponent(url)}`}</h1>            
        </div>
    )
}
  