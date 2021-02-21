import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen  container mx-auto">
        <header className="flex items-center p-8 bg-gray-100">
          <Link to="/" className="text-xl font-semibold">Codemate</Link>
          <nav className="ml-4">
            <Link to="/" className="text-blue-600 hover:underline">People</Link>
            <Link to="/register" className="ml-3 text-blue-600 hover:underline">Friends</Link>
          </nav>
        </header>
        <main className="flex-grow p-8">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <footer className="p-6 bg-gray-100">
          <p className="">Developed by <a href="https://berkaycubuk.com" target="_blank">Berkay Çubuk</a> - 2021</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
