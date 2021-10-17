import React from 'react'
import {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import axios from 'axios'
import onload from '../assets/onload.gif'
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
              <div className="">

                  <Link to="/">
                  <img className="reader-logo" src="https://cdn-icons-png.flaticon.com/128/2314/2314904.png" alt="" />    
                  </Link>
                 
                  <img className="title-logo img-thumbnail" src={data.thumb} alt="" />
              </div>
                <h3 className="title">{data.title}</h3>
                      <h2>{data.author}</h2>
                      <p className="text">
                        {data.desc}
                      </p>
                  

                  

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
  