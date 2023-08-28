import classes from '../UiStyle.module.css'
export default function Input(props){
    return(
        <input
         type="text"
         value={props.value}
         className={props.className} 
         disabled={props.disabled}
         placeholder={props.placeholder}
         onChange={props.onChange}
         size={props.size}
         />
    )
}