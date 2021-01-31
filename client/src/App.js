import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'

function App () {
  return (
    <div>
      <Router>
        <Container maxWidth='lg'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth' component={Auth} />
          </Switch>
        </Container>
      </Router>

    </div>
  )
}

export default App
