import{ useEffect, useState } from 'react'


export  const useFetch = (url) => {
    const [dataFetch, setDataFetch] = useState(null)

    useEffect(() => { 
      const fetchData = async () => {
        const request = await fetch(url)
        const response = await request.json()
        setDataFetch(response)
     }

     fetchData()

    }, [url])
    return { dataFetch }
}

export default useFetch