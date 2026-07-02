import { useEffect, useState } from "react"
import '../global.css'
import useFetch from "./hooks/useFetch"

function App() {
  
  const [ data, setData ] = useState([])

  const [ name, setName ] = useState("")

  const [ price, setPrice ] = useState("")  
  const [ warning, setWarning ] = useState(false)

  const url = "http://localhost:3000/products"

  const { dataFetch, httpConfig,  isLoading } = useFetch(url)

    useEffect(() => {
      if(dataFetch) {
        setData(dataFetch)
      }
    }, [dataFetch])

    console.log(data)

    async function handleSubmit(event) {
      event.preventDefault()

      if(name.trim() === "" || price.trim() === "") {
       return alert("É necessário ter um nome e um preço")
      }

      const idProducts = data.length > 0 ? String(Number(data[data.length - 1].id) + 1) : 1
      // o tamanho de data é maior que 0 ? se sim, converta para string o numero em data[tamanho do index] acesse o último elemento da lista pegando o tamanho total menos 1, pegue o id dele, converte para número e adicione 1, se nao coloque 1

      const products = {
        id: idProducts,
        name,
        price: parseFloat(price)
      }

      httpConfig(products, "POST")

      setData(dataFetch)

      setName("")
      setPrice("")
  }


  return (
    <>
    <div className="appMain">
      <h1>Lista de produtos</h1>

      {isLoading && <p>Carregando dados....</p>}
  {!isLoading && data && (
    <ul>
      {data.map((itemList) => (
        <li key={itemList.id}>
          Produto: {itemList.name} - R${itemList.price}
        </li>
      ))}
    </ul>
  )}

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

            <button type="submit" value='Criar'>Criar</button>
          </form>
        </div> 
        
    </div>
    </>
  )
}

export default App
