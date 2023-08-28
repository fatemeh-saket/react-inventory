import { createContext } from "react";

const ThemeContext=createContext({
    locale: "fa",
    skin: "Light",
    isRtl:true,
    changeLanguage: ()=>{},
    changeColor:()=>{}
})
export default ThemeContext