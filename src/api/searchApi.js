import {useState} from "react"


let sData = []
const searchRes = async (e) =>{
const  [res, setRes] = useState()
    try {
      const response = await fetch("http://localhost:4000/autocomplete", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          type: "manga",
          title: e.value 
        }),
      })
      let actual = await response.json()
        setRes(actual)
        console.log(res)
        sData.push(res)
        
    } catch (error) {
      console.error(error)
    }
      
}

export  {searchRes}

export{sData}