import React, { Component } from 'react';
import {
  BrowserRouter as Router,Route,Switch
} from 'react-router-dom';
import Welcome from './components/welcome';
import Mobx from './pages/Mobx';

class AppWithRouter extends Component {
		render(){
			return (
				<div>
					<Router path='/'>
              <Route exact path='/' component={ Mobx }/>
					</Router>
				</div>
		  )
		}
};

export default AppWithRouter;
