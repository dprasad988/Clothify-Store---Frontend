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
import Profile from './UserComponent/userProfile/profile';
import AddProduct from './AdminComponent/product/AddProduct';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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

          {/* =====================Admin====================== */}

          {/* =====================404 Page====================== */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
