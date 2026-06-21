import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [dataFetch, setDataFetch] = useState(null)
  const [config, setConfig] = useState(null)
  const [method, setMethod] = useState(null)
  const [callFetch, setCallFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 1. Configura os dados para o POST
  const httpConfig = (dataFetch, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Corrigido o 'l' duplo
        },
        body: JSON.stringify(dataFetch)
      })
      setMethod(method)
    }
  }

  // 2. useEffect para o GET (disparado ao carregar, mudar a URL ou após um POST)
  useEffect(() => { 
    const fetchData = async () => {
      try {

          setIsLoading(true)

        const request = await fetch(url)

        if (!request.ok) {
          throw new Error(`Erro de requisição: ${request.status}`)
        }

        const response = await request.json()
        setDataFetch(response)
        setIsLoading(false)
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    }

    fetchData()
  }, [url, method, callFetch]) // Quando callFetch mudar, ele atualiza a lista!

  // 3. useEffect para o POST (disparado quando a 'config' for definida)
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST" && config) {
        try {
          const request = await fetch(url, config)
          const response = await request.json()

          // Modifica o callFetch para um valor alternado (ou um contador) 
          // apenas para o primeiro useEffect saber que precisa atualizar a lista do GET
          setCallFetch((prev) => !prev)
          
          // Limpa os estados para evitar que o POST seja enviado novamente sem querer
          setMethod(null)
          setConfig(null)
        } catch (error) {
          console.error("Erro no POST:", error)
        }
      }
    }

    httpRequest()
  }, [config, url]) // Adicionadas as dependências corretas
 
  return { dataFetch, httpConfig, isLoading };
}

export default useFetch