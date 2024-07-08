import style from './Button.module.css'

export const Button = ({ children, disabled, ...props }) => {


    return <button disabled={disabled} className={style.btn} {...props}>
        {children}
    </button>
}