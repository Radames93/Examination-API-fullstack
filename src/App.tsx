import { useState } from 'react'
import './App.css'
import Start from './components/Startsida'
import Tavla from './components/Tavla/Tavla'
import Galleri from './components/Galleri/Galleri'
import {NavLink, Routes, Route} from 'react-router-dom'

const App = () => (

    <div className="App">
        <header>
			<nav>
        <NavLink to="/tavla" className="navLinks"> Tavla </NavLink>
        <img className="hamtaro" src="./backend/images/hamtaro.jpg"/>
        <NavLink to="/" className="navLinks"> Startsida </NavLink>
        <NavLink to="/galleri" className="navLinks"> Galleri </NavLink>
			</nav>
		</header>
		<main>
			<Routes>
        <Route path="/" element={<Start />} />
				<Route path="/tavla/" element={<Tavla/>} />
        <Route path="/galleri/" element={<Galleri/>} />
			</Routes>
		</main>
    </div>
  )


export default App
