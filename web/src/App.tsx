import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#f6f6f6' }}>
        <div className="flex flex-col min-h-screen container mx-auto">
          <Header />
          <main className="flex-grow p-8">
            <Switch>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/profile/:username">
                <Profile />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/friends">
                <Friends />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Welcome />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
