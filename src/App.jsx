import { useEffect, useState } from "react"


function App() {
  
  const [data, setData] = useState([])

  const url = "http://localhost:3000/products"


  async function requisicao() {
    try {
      const request = await fetch(url)

      if(!request.ok) {
        throw new Error(`Erro na requisição: ${request.status}`)
      }

      const response = await request.json()
      setData(response)
    }

    catch (error) {
      console.error(`Erro: ${error}`)
    }
 }
  
  useEffect(() => {
    requisicao()
  }, [])

  console.log(data)


  return (
    <>
    <div className="appMain">
      <h1>Lista de produtos</h1>

      {data.map((itemList) => (
        <div key={itemList.id}>
          <p>Produto: {itemList.name} - R${itemList.price}</p>
        </div>

      ))}
    </div>

    </>
  )
}

export default App
