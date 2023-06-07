import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { AdminView } from './components/AdminView'
import { KitchenView } from './components/KitchenView'
import { WaiterView } from './components/WaiterView'

function App() {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/admin-view" element={<AdminView/>} />
    <Route path="/kitchen-view" element={<KitchenView/>} />
    <Route path="/waiter-view" element={<WaiterView/>} />
  </Routes>
}

export default App
