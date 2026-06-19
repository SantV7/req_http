import { useEffect, useState } from "react"
import '../global.css'

function App() {
  
  const [data, setData] = useState([])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')  

  const url = "http://localhost:3000/products"


  async function requisicao() { //Requisição do tipo GET (para buscar dados)
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

  async function handleSubmit(event) {
    event.preventDefault()



  }




  return (
    <>
    <div className="appMain">
      <h1>Lista de produtos</h1>

      {data.map((itemList) => (
        <ul key={itemList.id}>
          <li>Produto: {itemList.name} - R${itemList.price}</li>
        </ul>
      ))}

       <div className="add-product">
          <form onSubmit={handleSubmit}>

            <label>
              <span>Nome:</span>
              <input
                type="text"
                value={name}
                name="name" 
                onChange={(event) => setName(event.target.value)}/>
            </label>

            <label>
              <span>Price:</span>
              <input
                type="text"
                value={price}
                name="price" 
                onChange={(event) => setPrice(event.target.value)}/>
            </label>

            <button type="submit" value='Criar'> Criar</button>
          </form>
        </div> 
    </div>

    </>
  )
}

export default App
