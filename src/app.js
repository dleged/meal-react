import React, { Component } from 'react';
import {
  BrowserRouter as Router,Route
} from 'react-router-dom';
import Welcome from './components/welcome';

class AppWithRouter extends Component {
		render(){
			return (
				<div>
					<Router path='/index.html'>
						<Route exact path='/index.html' component={Welcome}/>
					</Router>
				</div>
		  )
		}
};

export default AppWithRouter;
