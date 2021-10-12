import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import onload from '../assets/onload.gif'
import '../styles/onLoad.css'



const fetcher = async (url)=>{    
    const response = await fetch("http://localhost:4000/getImageList", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    url: decodeURIComponent(url)
                }),
              })
              let actual = await response.json()
    return actual.imageList
}

export default function Manga() {
    const [data, setData] = useState([])
    useEffect(async () => {
        setData(await fetcher(url))
        
    }, [])
    console.log(data)
   
    const {url, back} = useParams()
    
    return (

        <div>
            <div>
            <Link className='link' to={`/reader/${back}`}>
                back
            </Link>
            </div>
             
            
            {data.length === 0? <img className="onLoad" src={onload} alt="" />:
	             data.map((s, i) => <img key={i} src={s} alt="" />)
	        }
           

            
                
            
                  
        </div>
    )
}
