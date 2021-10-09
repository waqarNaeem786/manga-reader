import React from 'react'
import { useMutation } from 'react-query'
import { useState } from 'react'
import {onload} from '../assets/onload.gif'
export default function Genre() {

    const [genera, setGenra] = useState()

    const searchGenre = async (e) => {
        console.log(e.t_value)
        try {
            const response = await fetch("http://localhost:4000/getGenres", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify({
                src: e.t_value 
              }),
            })
            let actual = await response.json()
             setGenra(actual) 
             console.log(genera)
          } catch (error) {
            console.error(error)
          }
         
    }

    const { isLoading, isError, isSuccess, error, mutate} = useMutation(searchGenre, {retry: 5} )

    function onchange(e){
        let t_value = e.target.value
        if(t_value !== 0){
            mutate({t_value})
          }else{
            alert("nothing is selected")
          }
    }
    return (
        <div>
            <select onChange={onchange}>
                <option value="MGFX">mangaFox</option>
                <option value="MGJR">mangaJar</option>
                <option value="MGSE">mangaSee</option>
                <option value="MGHR">mangaHere</option>
                <option value="MGDX"> mangaDex</option>
                <option value="RCO">readComicOnline</option>  
            </select>

            {isLoading
                      ? <img className="onLoad" src={onload} alt={onload}/>: ""
                  }

                  {
                    isError
                    ? error : ""
                  }

                  {isSuccess ? 
                  <div className="on-search-flex">
                      { genera.genreList.length !==0 ? genera.genreList.map(items => (
                        <div className="search-data">
                        <button key={items.id} href={items.link}>{items.title}</button>
                        </div>
                       ) ) : alert(" you havn't selected anything ") } 
                        
                      
                  </div> : <p></p>} 
        </div>

       
    )
}
