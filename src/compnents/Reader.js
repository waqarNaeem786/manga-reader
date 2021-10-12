import React from 'react'
import {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import axios from 'axios'
import onload from '../assets/onload.gif'
import '../styles/onLoad.css'


async function fetcher(url) {
        const response = await axios({
          method: 'POST',
          url: 'http://localhost:4000/getMangaInfo',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          data:{
            url: decodeURIComponent(url)
          }
        })
        // console.log(response.data)
        return response.data.mangaInfo
      }
    
export default function Reader() {
 useEffect(async () => {
   setData(await fetcher(url))
   
 }, [])

const { url } = useParams()
const [data, setData] = useState([]) 
     
 
// console.log(data)
    return (
        <div>
            <Link to="/">
            <img className="logo-reader" src="https://cdn-icons-png.flaticon.com/128/2314/2314904.png" alt="" />    
            </Link>
            
           <div>
             
           </div>
           {data.length === 0 ? <img className="onLoad" src={onload} alt="" />:
            <div>
            <img src={data.thumb} alt="" />
            <h2>{data.author}</h2>
            <h3>{data.title}</h3>
             <p>
               {data.desc}
            </p> 
            <div>{data.chapterList.map((element) => (
              <Link to={`/manga/${encodeURIComponent(element.chapterLink)}/${url}`}>
              <div>
               <p>{element.chapterTitle}</p>
              </div>
             
              </Link>
             
              
              
            ))}</div>
            </div> 
           

           }
                        
        </div>
    )
}
  