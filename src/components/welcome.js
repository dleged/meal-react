import React , { Component } from 'react';
import styles from './welcome.css';

console.log(styles);

class Welcome extends Component{
	render() {
		return(
			<div className='normal'>
	      <h1 className='title'>Yay! Welcome to meal react!</h1>
	      <div className='welcome' />
	      <ul className='list'>
	        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
	        <li><a href="https://github.com/dleged/meal-react">Getting Started</a></li>
	      </ul>
	    </div>
		)
	}
}


module.exports = Welcome;
