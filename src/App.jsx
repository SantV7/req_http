import { useEffect, useState } from "react"
import '../src/global.css'
import useFetch from "./hooks/useFetch"

function App() {
  
  const [ data, setData ] = useState([])
  const [ name, setName ] = useState("")
  const [ price, setPrice ] = useState("")  
  const [ warning, setWarning ] = useState(false)

  const url = "http://localhost:3000/products"

  const { dataFetch, httpConfig,  isLoading, errorRequest } = useFetch(url)

    useEffect(() => {
      if(dataFetch) {
        setData(dataFetch)
      }
    }, [dataFetch])


    async function handleSubmit(event) {
      event.preventDefault()

      //validação para os dois campos
      if(name.trim() === "" || price.trim() === "") {
       return alert("É necessário ter um nome e um preço")
      }

      // obj que é enviado para o backend
      const products = {
        name,
        price: Number(price.replace(",", ".")).toFixed(2)
      }
  
      httpConfig(products, "POST")

      setName("")
      setPrice("")
  }

  

  return (
    <>
    <div className="appMain">
      <h1>Lista de produtos</h1>
    

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

            {isLoading ? <button type="submit" disabled value='Loading...'>Carregando...</button> : <button type="submit" value='Criar'>Criar</button>}
      

          </form>
        </div> 
        {isLoading && <p>Carregando dados...</p>}
        {errorRequest && <>OPS! Algo deu errado, tente novamente.</>}
        
            {!isLoading && data && (
              <ul>
                {data.map((itemList) => (
                  <li key={itemList.id}>
                    Produto: {itemList.name} - R${itemList.price}
                  </li>
                ))}
              </ul>
              
            )}

            
        
    </div>
    </>
  )
}

export default App
