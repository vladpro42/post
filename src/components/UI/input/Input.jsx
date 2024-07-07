import style from "./Input.module.css"


export const Input = (props) => {


    console.log(props)
    return <input
        className={style.inp}
        {...props}
    />
}