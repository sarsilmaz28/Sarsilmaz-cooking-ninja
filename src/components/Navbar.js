import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import './Navbar.css'
import Searchbar from './Searchbar'
export default function Navbar() {

    // const {color,changeColor} = useContext(ThemeContext)  // since state has only 1 value i.e color so we destructure state into color and the fn changecolor

    const {color} = useTheme()

    return (
        <div className='navbar' style={{background: color}} >
           <nav /*onClick={()=>{ changeColor('blue')}}*/ >  {/*state updated*/}
            <Link to='/' className='brand'>
                <h1>Cooking Ninja</h1>
            </Link>
            <Searchbar/>
            <Link to='/create' className='create-recipe-button' >Create recipe</Link>
           </nav>
        </div>
    )
}
