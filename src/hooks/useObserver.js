import { dblClick } from "@testing-library/user-event/dist/click"
import { useEffect, useRef } from "react"


export function useObserver(ref, isCanLoad, isLoading, callback) {

    const observer = useRef()
    useEffect(() => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
            
        const cb = (entries, observer) => {
            if (entries[0].isIntersecting && isCanLoad) {
                callback()
            }
        }

        observer.current = new IntersectionObserver(cb)
        observer.current.observe(ref.current)
    }, [isLoading])
}