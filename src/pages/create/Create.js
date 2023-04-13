import { useState } from 'react'
// import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

import './Create.css'



export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('') //for a single ingredient 
  const [ingredients, setIngredients] = useState([])   //for all ingredients

  const history = useHistory()

  // const {postData,data,error}=useFetch('http://localhost:3000/recipes','POST')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const doc = { title, ingredients, method, cookingTime: cookingTime + 'minutes' }

    try {
      await projectFirestore.collection('recipes').add(doc)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()  //takes away white spaces before and after
    if (ing && !ingredients.includes(ing))  //to check if ing is not null and ing is not already present in the array
    {
      setIngredients(prevIngredients => [...prevIngredients, ing])  //bcoz we need the prev values
    }
    setNewIngredient('')
  }

  // useEffect(() => { was used with useFetch hook
  //   if (data) {
  //     history.push('/')
  //   }
  // }, [data])

  return (
    <div className='create'>
      <form onSubmit={handleSubmit} >
        <h2 className='page-title'>Add a New Recipe</h2>

        <label>
          <span>Recipe Title:</span>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
        </label>

        {/* //Add Ingredients */}
        <label>
          <span>Recipe Ingredients</span>
          <div className="ingredients">
            <input type="text" onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient} />
            <button onClick={handleAdd} className='btn'>Add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)} </p>

        <label>
          <span>Recipe Method:</span>
          <textarea onChange={(e) => setMethod(e.target.value)} value={method} required />
        </label>

        <label>
          <span>Cooking Time:</span>
          <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required />
        </label>

        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}
