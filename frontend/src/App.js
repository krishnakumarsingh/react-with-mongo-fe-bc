import 'bootstrap/dist/css/bootstrap.min.css';
import React/* , { useState, useEffect } */ from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './components/display'
/* import axios from 'axios'; */

function App() {
  /* const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await axios.get('http://localhoast:3002/products');
      const responseData = await response.json();
      setLoadedProducts(responseData.products);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);
  const addProductHandler = async (productName, productPrice) => {
    try {
      const newProduct = {
        title: productName,
        price: +productPrice
      }
      let hasError = false;
      const response = await fetch('http://localhoast:3002/product', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok) {
        hasError = true;
      }
      const responseData = await response.json();
      if(hasError) {
        throw new Error(responseData.message);
      }
      setLoadedProducts(prevProducts => {
        return prevProducts.concat({
          ...newProduct,
          id: responseData.product.id
        });
      });
    } catch (error) {
      alert(error.message || 'Somthing went wrong!!');
    }
  } */
  return (
    <React.Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* !isLoading &&  */<Display /* onAddProduct={addProductHandler} items={loadedProducts} */></Display>}
    </React.Fragment>
  );
}

export default App;
