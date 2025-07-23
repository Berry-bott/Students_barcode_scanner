import './App.css'
import Home from './pages/Home'
import AuthProvider from './login/Auths'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      {/* <Home /> */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AuthProvider" element={<AuthProvider />} />
    </Routes>
    </>
  )
}

export default App
