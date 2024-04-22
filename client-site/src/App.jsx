import { HashRouter as AdminRouter , Routes, Route } from 'react-router-dom';
import { HashRouter as WebsiteRouter } from 'react-router-dom';
import Dashboard from './admin/dashboard/Dashboard.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import User from './admin/user/User.jsx';
import Product from './admin/product/Product.jsx';
import Brand from './admin/brand/Brand';
import UpdateBrand from './admin/brand/UpdateBrand.jsx';
import ProductUpdate from './admin/product/ProductUpdate.jsx';
function App() {
 

  return (
       
      <>
          <AdminRouter basename="/admin">
              <Routes>
                  <Route path="/dashboard" element={<Dashboard />}/>
                  <Route path="/user-lists" element={<User title="User Information Lists" />}/>
                  <Route path="/brand-lists" element={<Brand title="Brand Lists"/>}/>
                  <Route path="/product-lists" element={<Product />}/>
                  <Route path="/brand-update/:id" element={<UpdateBrand/>}/>
                  <Route path="/update-product/:id" element={<ProductUpdate/>}/>
                  <Route path={"*"} element={<NotFoundPage/>}/>
              </Routes>
          </AdminRouter>

          
          <WebsiteRouter>
              <Routes>
                  <Route path="/" element={<HomePage />}/>
              </Routes>
          </WebsiteRouter>
      </>
  )
}

export default App
