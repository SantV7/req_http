import { useEffect, useState } from "react"
import '../global.css'
import useFetch from "./hooks/useFetch"

function App() {
  
  const [data, setData] = useState([])

  const [name, setName] = useState("")

  const [price, setPrice] = useState("")  

  const url = "http://localhost:3000/products"

  const { dataFetch, httpConfig, isLoading } = useFetch(url)

    useEffect(() => {
      if(dataFetch) {
        setData(dataFetch)
      }
    }, [dataFetch])

    console.log(data)

  async function handleSubmit(event) {
    event.preventDefault()

    const products = {
      name,
      price: parseFloat(price)
    }

    httpConfig(products, "POST")
      setName("")
      setPrice("")
  }




  return (
    <>
    <div className="appMain">
      <h1>Lista de produtos</h1>

      {isLoading && <p>Carregando dados....</p>}
      {data && data.map((itemList) => (
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
