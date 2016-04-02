import React from 'react';
import * as GA from '../lib/GaApi';
import { Button } from 'react-bootstrap';

const profileStyle = { color: 'white', textDecoration: 'none' };
const buttonProfileStyle = { marginLeft: '30px' };

let Profile = React.createClass({
	propTypes: {
		'id': React.PropTypes.string.isRequired,
		'name': React.PropTypes.string.isRequired
	},
	getSampleData(){
		GA.queryReportingExample(this.props.id).then(d => console.log(d));
	},
	render(){
		return (
			<Button bsStyle="primary">
				<a onClick={ () => { this.getSampleData(); } } style={profileStyle}>{this.props.name}</a>
			</Button>
		);
	}
});

let ProfileList = React.createClass({
	propTypes: {
		'id': React.PropTypes.string,
		'name': React.PropTypes.string,
		'data': React.PropTypes.array
	},
	render(){
		let profileNodes = this.props.data.map((profiles) => {
			return (
				<Profile key={profiles.id} name={profiles.name} id={profiles.id}>
					{profiles.name}
				</Profile>
			);
		});

		return (
			<div className="profileList" style={buttonProfileStyle}>
				{profileNodes}
			</div>
		);
	}
});

export default ProfileList;
