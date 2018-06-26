import React, { Component } from 'react';
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;


class App  extends Component {
    render() {
      
      return (
        <Router>
          <div className='container'>
              <Nav />
              <Switch>
                <Route path= '/battle/results' component={Results}/>
                <Route path='/popular' component={Popular} />
                <Route path='/battle' component={Battle} />
                <Route exact path='/' component={Home} />
                <Route render={function() {
                  return <p>Not Found</p>
                }}/>
              </ Switch>   
          </div>
        </Router>
       
      )
  
    }
  }

export default App


  