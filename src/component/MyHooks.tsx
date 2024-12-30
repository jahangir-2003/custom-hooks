import { useState, useEffect } from 'react';


const useFetchData = (url: string) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(url).then((res) => res.json()).then((data) => setData(data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [url])

    return [data]
}

export default useFetchData