import { useState, useEffect } from 'react'

const CustomHooks = (): [number, (n: number) => void] => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log(count)
    }, [count])


    return [count, setCount]
}

export default CustomHooks