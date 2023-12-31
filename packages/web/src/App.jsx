import './App.css'
import Login from './components/Login'
import NavBar from './components/NavBar'
import {BrowserRouter, Routes, Route, /* useNavigate */} from 'react-router-dom'
import SignUp from './components/SignUp'
import HomePage from './components/HomePage'
import CustomerProfile from './components/customers/CustomerProfile'

function App() {

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='login' element={isLoggedIn ? <HomePage/> : <Login />}></Route>
          <Route path='signUp' element={<SignUp/>}></Route>
          <Route path='home' element={<HomePage/>}></Route>
          <Route path='user/:activepage' element={isLoggedIn ? <CustomerProfile/> : <Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
