import { Routes, Route } from 'react-router'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Home from './components/Home.tsx'
import Menu from './components/Menu.tsx'
import PriceCalculator from './components/PriceCalculator.tsx'
import Faq from './components/Faq.tsx'
import Youtubers from './components/Youtubers.tsx'
import './App.css'
import MenuItem from './components/MenuItem.tsx'

function App() {
  
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price-calculator" element={<PriceCalculator />} />
          <Route path="/menu">
            <Route index element={<Menu />} />
            <Route path=':menuId' element={<MenuItem />}/>
          </Route>
          <Route path="/faq" element={<Faq />} />
          <Route path="/youtubers" element={<Youtubers />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App


