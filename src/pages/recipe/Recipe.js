import React, { useEffect,useState } from 'react'

import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import useTheme from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

import './Recipe.css'


export default function Recipe() {

  const {id}=useParams()
  const [recipe,setRecipe]=useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)

  const {mode} = useTheme()

  useEffect(()=>{
      setLoading(true)

      projectFirestore.collection('recipes').doc(id).get().then((doc)=>{
        if(doc.exists)
        {
          setLoading(false)
          setRecipe(doc.data())
        }
        else{
          setLoading(false)
          setError("Could not find the recipe")
        }
      })
  },[id])

  return (
    <div className={`recipe ${mode}`} >
      {loading && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {recipe && (
        <div>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Time {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing)=> ( <li>{ing}</li>))}
          </ul>
          <p className='method' >{recipe.method}</p>
        </div>
      )}
    </div>
  )
}
