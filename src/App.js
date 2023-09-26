import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from './Components/ProductList'
import Header from './Components/Header'
import "./App.css";
const App = () => {
  return (
    <div>
       <ToastContainer position="top-center"  autoClose={3000}  limit={1} />
      <Header/>
      <ProductList/>
    </div>
  )
}

export default App
