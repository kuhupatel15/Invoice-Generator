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
        {/* <ProtectedRoute> */}

          <Route path='/addproduct' element={<Protected children={<AddProducts/>} />} />
        {/* </ProtectedRoute> */}

      </Routes>
    </div>
  )
}

export default App
