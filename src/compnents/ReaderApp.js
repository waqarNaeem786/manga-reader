import React from 'react'
import {loader} from "../assets/onload.gif"


export default function ReaderApp({ chaps }) {
    return (
        <div>
            { 
                    chaps.mangaInfo.map(data=>(
                    <div>
                    <img src={data.thumb} alt="" />
                    <h1>Title:{data.title}</h1>
                    <h3>Author:{data.author}</h3>
                    <p>{data.desc}</p>
                    <p>{data.status}</p>
                    <p>{data.lastUpdate}</p>
                    </div>
                    
                ))   }
        </div>
    )
}
