
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Activation from './pages/auth/Activation';
import Forget from './pages/auth/Forget';
import Reset from './pages/auth/Reset';
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/profile/Profile';
import { fetchUser, dispatchUser, dispatchLogin } from './redux/actions/authActions';
import Editusers from './pages/profile/Editusers';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import UserDashboard from './pages/dashboard/UserDashboard';
import CreateCatagory from './pages/admin/catagory/CreateCatagory';
import EditCatagory from './pages/admin/catagory/EditCatagory';
import CreateSub from './pages/admin/sub/CreateSub';
import EditSub from './pages/admin/sub/EditSub';
import CreateProduct from './pages/admin/product/CreateProduct';
import EditProduct from './pages/admin/product/EditProduct';
import Product from './pages/user/Product';
import ProductsByCatagory from './pages/admin/catagory/ProductsByCatagory';
import ProductsBySub from './pages/admin/sub/ProductsBySub';
import SideDrawer from './components/drawer/Drawer';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {



  const dispatch = useDispatch();

  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.users)

  const { isLogged, user, isAdmin } = auth

  const { avatar } = user;

  const notFound = () => {
    return (
      <>
        <div className='notFoundContainer'>
          <div>
            <h2>Please login</h2>
          </div>

        </div>
      </>
    )
  }

  const notAllowed = () => {
    return (
      <>
        <div className='notFoundContainer'>
          <div>
            <h2>Only admin</h2>
          </div>

        </div>
      </>
    )
  }


  useEffect(() => {
    if (token) {
      const getUser = () => {


        dispatch(dispatchLogin());
        fetchUser(token).then(res => {
          dispatch(dispatchUser(res.data))
        });

      }
      getUser();
    }
  }, [token, dispatch, isLogged, avatar, users])




  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <ToastContainer />
        <SideDrawer />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

          {/* Auth Routes */}
          <Route path='/login' element={isLogged ? <>{notFound()}</> : <Login />} />
          <Route path='/register' element={isLogged ? <>{notFound()}</> : <Register />} />
          <Route path='/user/activation/:activation_token' element={<Activation />} />
          <Route path='/user/forget' element={isLogged ? <Forget /> : <>{notFound()}</>} />
          <Route path='/user/reset/:token' element={isLogged ? <Reset /> : <>{notFound()}</>} />
          <Route path='/profile' element={isLogged ? <Profile /> : <>{notFound()}</>} />
          <Route path='/editUser/:id' element={isAdmin ? <Editusers /> : <>{notAllowed()}</>} />

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={isAdmin ? <AdminDashboard /> : <>{notAllowed()}</>} />
          <Route path='/admin/catagory' element={isAdmin ? <CreateCatagory /> : <>{notAllowed()}</>} />
          <Route path='/admin/catagory/edits/:slug' element={isAdmin ? <EditCatagory /> : <>{notAllowed()}</>} />
          <Route path='/admin/subcatagory' element={isAdmin ? <CreateSub /> : <>{notAllowed()}</>} />
          <Route path='/admin/sub/edits/:id/:slug' element={isAdmin ? <EditSub /> : <>{notAllowed()}</>} />
          <Route path='/admin/product' element={isAdmin ? <CreateProduct /> : <>{notAllowed()}</>} />
          <Route path='/admin/product/edits/:slug' element={isAdmin ? <EditProduct /> : <>{notAllowed()}</>} />
          <Route path='/admin/catatgory/:slug' element={<ProductsByCatagory />} />
          <Route path='/admin/sub/:slug' element={<ProductsBySub />} />

          {/* user Routes */}
          <Route path='/user/dashboard' element={isLogged ? <UserDashboard /> : <>{notFound()}</>} />
          <Route path='/product/:slug' element={<Product />} />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default React.memo(App);
