import useTheme from "../hooks/useTheme"
import modeIcon from '../assets/mode_icon.svg'

import './ThemeSelector.css'

const colorArray=['#59249c', '#0d6176', 'black']
export default function ThemeSelector() {

    const {changeColor,changeMode,mode} = useTheme()

    const toggleMode=()=>{
        changeMode(mode==='dark' ? 'light' : 'dark')
    }
    console.log(mode)

  return (
    <div className="theme-selector">
        <div className="toggle-mode">                                    {/*Changing icon from dark to light based on mode */}
            <img src={modeIcon} alt="toggler" onClick={toggleMode} style={{filter: mode ==='dark' ? 'invert(100%)': 'invert(20%)'}} />
        </div>
      <div className="theme-buttons">
        {colorArray.map(color =>(
            <div key={color} onClick={()=> changeColor(color)} style={{background: color}}/>
        ))}
      </div>
    </div>
  )
}
