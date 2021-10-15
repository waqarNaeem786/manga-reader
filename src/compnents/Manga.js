import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import onload from '../assets/onload.gif'
import { Url } from './baseUrl'




const fetcher = async (url)=>{    
    const response = await fetch(`${Url}/getImageList`, {
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
    // console.log(data)
   
    const {url, back} = useParams()
    
    return (

        <div>
            <div>
            <Link className='link' to={`/reader/${back}`}>
                <button type="button" className="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </button>
            </Link>
            </div>
             
            
            {data.length === 0? <div className="onLoad"><img src={onload} alt="" /></div> :
	             data.map((s, i) => <img className="page" key={i} src={s} alt="" />)
	        }
           

            
                
            
                  
        </div>
    )
}
