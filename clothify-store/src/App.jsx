import './App.css';
import Home from './UserComponent/landing/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/@fontsource/open-sans/700.css';
import SignIn from './UserComponent/login/sign-in';
import Layout from './UserComponent/layout/layout';
import SignUp from './UserComponent/signup/sign-up';
import { AuthProvider } from './Config/AuthContext';
import PrivateRoute from './Config/PrivateRoute';
import Profile from './UserComponent/userProfile/profileHome';
import AddProduct from './AdminComponent/product/AddProduct';
import MenCategory from './UserComponent/product-category/men-category';
import ScrollToTop from './Config/ScrollToTop';
import WomenCategory from './UserComponent/product-category/women-category';
import KidsCategory from './UserComponent/product-category/kids-category';
import TeensCategory from './UserComponent/product-category/teens-category';
import AdminDashboard from './AdminComponent/dashboard/AdminDashboard';
import { CartProvider } from './UserComponent/cart/CartContext';
import Invoice from './UserComponent/invoice/Invoice';
import BillingInfo from './UserComponent/billing/BillingInfo';

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <AuthProvider>
        <ScrollToTop/>
        <Routes>
          {/* =====================User====================== */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp /></Layout>} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout><Profile /></Layout>
              </PrivateRoute>
            }
          />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/category-men" element={<Layout><MenCategory /></Layout>} />
          <Route path="/category-women" element={<Layout><WomenCategory /></Layout>} />
          <Route path="/category-kids" element={<Layout><KidsCategory /></Layout>} />
          <Route path="/category-teens" element={<Layout><TeensCategory /></Layout>} />
          <Route path='/admin' element={<AdminDashboard/>} />
          <Route path='/invoice' element={<Invoice/>} />
          <Route path='/billing' element={<BillingInfo/>} />



          {/* =====================Admin====================== */}

          {/* =====================404 Page====================== */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
