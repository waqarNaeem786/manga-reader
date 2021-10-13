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
        <div className="container">   
           {data.length === 0 ? <img className="" src={onload} alt="" />:
            <div className="row justify-content-evenly">
              <div className="col-12 pt-5">
                <img className="img-thumbnail" src={data.thumb} alt="" />
                  <Link to="/">
                  <img className="reader-logo" src="https://cdn-icons-png.flaticon.com/128/2314/2314904.png" alt="" />    
                  </Link>
                  <div className="disc">
                      <h3 className="title">{data.title}</h3>
                      <h2>{data.author}</h2>
                      <p  className="text">
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
  