import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Col ,Button} from 'react-materialize';

import appState from '../../mobx'

@observer
class Mobx extends Component {
	render(){
		return (
				<Col m={6} s={12}>
			    <Card
						className='blue-grey darken-1'
						textClassName='white-text'
						title='Mobox title'
						actions={[<a href='#'>This is a link</a>]}
					>
					 Seconds passed: {this.props.appState.timer}
			    </Card>
					<Button
						onClick={this.onReset.bind(this)}
					 	waves='light'>button
				  </Button>
			</Col>
			)
		}
		onReset () {
			this.props.appState.resetTimer();
		}

}

export default () => <Mobx appState={ appState } />;
