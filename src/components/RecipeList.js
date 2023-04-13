import React from 'react'
import './RecipeList.css'
import trashCan from '../assets/trashCan.svg'

import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'


export default function RecipeList({recipes}) {

  const {mode} = useTheme()

  if(recipes.length === 0)
  {
    return (
      <div className='error'>No recipes to load...</div>
    )
  }


  const handleClick=(id)=>{
    projectFirestore.collection('recipes').doc(id).delete()
  }


  return (
    <div className='recipeList'>
      {recipes.map((recipe)=>(
       <div key={recipe.id} className={`card ${mode}`} >
        <h3>{recipe.title}</h3>
        <p>{recipe.cookingTime} to make</p>
        <div>{recipe.method.substring(0,100)}...</div>
        <Link to={`/recipes/${recipe.id}`} >Cook This</Link>
        <img 
          className='delete'
          src={trashCan}
          onClick={()=> handleClick(recipe.id)}  />  {/*Done like this bcz we had to pass the id as argument to the handle click and if called handleClick directly on click we couldnt pass the argument  */}
       </div>
      ))}
    </div>
  )
}
