import { createContext, useReducer } from "react"

export const ThemeContext = createContext()

const themeReducer=(state, action)=>{  //Reveives 2 arguments ./ 1 current state & 2 action object
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state,color: action.payload}  //all other values in state are kept same by spreading and color is changed
                    // if we donot spread the state, all other values in state will be lost
        
        case 'CHANGE_MODE':
            return {...state, mode:action.payload}
            
        default:
            return state
    }
}

export function ThemeProvider({children})
{
    //useReducer hook.  state is the object {color:blue}  & themeReducer is dispatch fn  
    const [state,dispatch]=useReducer(themeReducer,{
        color:'#0d6176',
        mode:'light'
    })

    //A function is reequired to call dispatch fn with action object 
    const changeColor=(color)=>{
                  //action object
        dispatch({type: 'CHANGE_COLOR', payload: color})  //This in turn calls themeReducer fn
    }

    const changeMode=(mode)=>{
                  //action object
        dispatch({type: 'CHANGE_MODE', payload: mode})  //This in turn calls themeReducer fn
    }

    return (
        <ThemeContext.Provider value={{...state,changeColor, changeMode}}> {/*All states along with the color change fn is passed that will be extracted in the compnent using useContext and there , change color will be used */}
            {children}
        </ThemeContext.Provider>
    )
}