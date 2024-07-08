import styles from "./Modal.module.css"

export const Modal = ({ children, visible, setVisible }) => {

    const rootClasses = [styles.modal]

    if (visible) {
        rootClasses.push(styles.active)
    }

    return <div onClick={setVisible}
        className={visible ? `${styles.modal} ${styles.active}` : styles.modal}
    >
        <div onClick={e => e.stopPropagation()} className={styles.modal__content}>
            {children}
        </div>
    </div>
}