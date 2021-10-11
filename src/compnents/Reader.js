import React from 'react'
import {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import axios from 'axios'
import onload from '../assets/onload.gif'


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
                Home
            </Link>
            
           <div>
             
           </div>
           {data.length === 0 ? <img src={onload} alt="" />:
            <div>
            <img src={data.thumb} alt="" />
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
  