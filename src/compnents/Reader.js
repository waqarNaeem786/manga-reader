import React from 'react'
import {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import axios from 'axios'
import onload from '../assets/onload.gif'
import logo from '../assets/logo.png'
import { Url } from './baseUrl'



async function fetcher(url) {
        const response = await axios({
          method: 'POST',
          url: `${Url}/getMangaInfo`,
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
// eslint-disable-next-line
 useEffect(async () => {
   setData(await fetcher(url))
   
 }, [])

const { url } = useParams()
const [data, setData] = useState([]) 
     
 
// console.log(data)
    return (
        <div className="container">  
        
           {data.length === 0 ? <div className="onLoad" ><img src={onload} alt="" /></div>:
            <div className="row">

            <div className="reader-logo">
                  <Link to="/">
                  <img src={logo} alt="" />    
                  </Link>
            </div>
                  
                 <div className="author-thumb">
                 <img className="title-logo img-thumbnail" src={data.thumb} alt="" />
                 <div className="title-desc">
                 <h3 className="title">{data.title}</h3>
                 <h2>{data.author}</h2>
                      <p className="text">
                        {data.desc}
                      </p>

                 </div>
                 </div>
                  

                  

                    <h4>Chapters:</h4>                 
                      <div className="chaps">
                        {data.chapterList.map((element) => (
                        <Link to={`/manga/${encodeURIComponent(element.chapterLink)}/${url}`}>
                        <p>{element.chapterTitle}</p>                
                        </Link>                  
                      ))}</div>
              
            </div> 
           

           }
            
                        
        </div>
    )
}
  