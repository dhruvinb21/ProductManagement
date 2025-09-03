import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryMaster from './components/CategoryMaster';
import Nav from './components/Nav';
import ProductMaster from './components/ProductMaster';
import ProductList from './components/ProductsList';


function AppContent() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<ProductList/>} />
        <Route path='/home' element={<ProductList/>} />
        <Route path='/manageCategory' element={<CategoryMaster />} />
        <Route path='/manageProduct' element={<ProductMaster />} />
      </Routes>
    </>
  )
}

function App() {


  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>

    </>
  )
}

export default App
