import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import  axios  from "axios";
import { Link } from 'react-router-dom';



const fetcher = async (url)=>{
    const res = await axios({
        url:'http://localhost:4000/getImageList',
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data:{
            url: decodeURIComponent(url)
        }
    }) 
    // console.log(res.data)  
    return res.data.imageList
}

export default function Manga() {
    let arr = []
    const [data, setData] = useState()
    useEffect(async () => {
        setData(await fetcher(url))
        
    }, [])
    // console.log(data)
    arr.push(data)
    // console.log(arr)
    const {url} = useParams()
    return (
        <div>
            <Link to="/reader">
                back
            </Link>
            
           { 
           arr.map(e=>(
               
               <img src={e} alt="" />
               
    ))
             
           } 
           

            
                
            
            <p>{decodeURIComponent(url)}</p>
            <h1>Hello</h1>          
        </div>
    )
}
