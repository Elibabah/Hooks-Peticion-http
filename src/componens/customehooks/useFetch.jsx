import React from 'react'
import { useState, useEffect } from 'react' 


export const useFetch = (url) => {

      const [dataFetched, setDataFetched] = useState([]) 

      useEffect(()=> {
            //Fetch
            fetch(url)
            .then((respuesta) => respuesta.json())
            .then((data)=> setDataFetched(data))
            .catch((error)=> console.log(error))
      }, [])

      console.log(dataFetched)
      return [dataFetched] 
}

