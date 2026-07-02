import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [dataFetch, setDataFetch] = useState(null)

  const [config, setConfig] = useState(null)

  const [method, setMethod] = useState(null)
  
  const [isLoading, setIsLoading] = useState(false)


  
  const httpConfig = (bodyData, method) => {
        if(method === "POST") {
          setConfig({
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            }, 
            body: JSON.stringify(bodyData)
          })
        }
        setMethod(method)
  }

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const request = await fetch(url)

          if(!request.ok) {
            throw new Error(`Erro na requisição: ${request.status}`)
          } 

          const response = await request.json()

          setDataFetch((prevData) => [...prevData, response])
        } catch (err) {
          console.error(`ERROR: ${err}`)
        }
        finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }, [url])



    useEffect(() => {
      const fetchPost = async () => {
        try {
          setIsLoading(true)
          const request = await fetch(url, config)
  
          if(!request.ok) {
            throw new Error(`Erro na requisição: ${request.status}`)
          } 
  
          const response = await request.json()
  
          setDataFetch((prevData) => [...prevData, response])
        } catch (err) {
          console.error(`ERROR: ${err}`)
        }
        finally {
          setMethod(null)
          setConfig(null)
          setIsLoading(false)
        }
      }

      if(method === "POST" && config) {
        fetchPost()
      }
      // trava de segurando pra não executar se for GET
      
    }, [ url, config ] )
 
  return { dataFetch, httpConfig,  isLoading };
}

export default useFetch
