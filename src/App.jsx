import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './Component/Navbar/index'
import Home from './Component/Home/index'
import Details from './Component/Details/index'
import Favorites from './Component/Favorites/index'

function App() {
  return (
    <>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/recipe-app/' element={<Home />} />
          <Route path='/recipe-app/favorites' element={<Favorites />} />
          <Route path='/recipe-app/recipe-item/:id' element={<Details />} />
        </Routes>
      </div>
    </>
  )
}

export default App