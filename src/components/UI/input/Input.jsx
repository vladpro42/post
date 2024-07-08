import style from "./Input.module.css"


export const Input = (props) => {

    return <input
        className={style.inp}
        {...props}
    />
}