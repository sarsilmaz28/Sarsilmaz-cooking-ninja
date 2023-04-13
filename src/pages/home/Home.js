import React, { useEffect, useState } from 'react'
import RecipeList from '../../components/RecipeList'
import { projectFirestore } from '../../firebase/config'
// import {useFetch} from '../../hooks/useFetch'

import './Home.css'

export default function Home() {

  // const {data,loading,error}=useFetch('http://localhost:3000/recipes')

  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)

  useEffect(()=>{   //to load the data form firestore collection once
    setLoading(true)
    // projectFirestore.collection('recipes').get().then((snapshot) => {  //syntax to get data from a collection named recipe
   

    const unsub= projectFirestore.collection('recipes').onSnapshot((snapshot) => {  //syntax to get real time data from a collection named recipe and this fn reruns everytime there is a change in the collection
        if(snapshot.empty){                      //returns a promise
          setError("No recipes to Load")
          setLoading(false)
        }
        else{
          let result=[]
          snapshot.docs.forEach( element => {  //docs is a attribute in the snapshot object returned from the collection call
            result.push({id: element.id, ...element.data()}) 
          });
          setData(result)
          setLoading(false)
        }
    }, (err)=>{
      setError(err)
      setLoading(false)
    })

    return ()=> unsub()

  },[])

  return (
    <div className='home'>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
