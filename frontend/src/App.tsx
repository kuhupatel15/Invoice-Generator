import './App.css'
import { Route, Routes } from 'react-router-dom';
import AddProducts from './pages/AddProducts';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import Protected from './ProtectedRoute';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

          <Route path='/addproduct' element={<Protected children={<AddProducts/>} />} />

      </Routes>
    </div>
  )
}

export default App
