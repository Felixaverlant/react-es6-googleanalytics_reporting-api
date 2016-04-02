import React from 'react';
import * as GA from '../lib/GaApi';
import PropertyList from './Properties';
import { Jumbotron } from 'react-bootstrap';

const loginStyle = { cursor: 'pointer' };
const accountStyle = { margin: '50px 0 50px 5px' };

let Account = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		items: React.PropTypes.array.isRequired
	},
	render() {
		return (
			<div className="account">
				<h1>{this.props.name}</h1>

				<PropertyList data={this.props.items} />
			</div>
		);
	}
});

let AccountList = React.createClass({
	propTypes: {
		'data': React.PropTypes.object,
		'data.items': React.PropTypes.array
	},
	render() {
		let accountNodes = this.props.data.items.map((account) => {
			return (
				<div className="account" style={accountStyle} key={account.id}>
					<Account key={account.id} name={account.name} items={account.properties.items}>
						{account.name}
					</Account>
				</div>
			);
		});

		return (
			<div className="accountList">
				{accountNodes}
			</div>
		);
	}
});

export let DataBox = React.createClass({
	getInitialState() {
		return { data: { items: [] } };
	},
	auth(){
		GA.authorize().then(d => {
			this.setState(d);
		});
	},
	render() {
		return (
			<div className="accountBox">
				<Jumbotron>
					<h1>React  + GA Reporting API example</h1>
					<p>
						Simple example using Reactjs, Google Analytics Reporting API.
						After you log in, you'll be able to click on a GA profile and get
						a console.log() of the API response for the numbers of sessions for the last 7 days.
					</p>
					<a onClick={ () => { this.auth(); } } id="auth-button">
						<img border="0"
							alt="Google Sign-in button"
							src="scripts/assets/btn_google_signin_light_normal_web.png"
							style={loginStyle} />
					</a>
				</Jumbotron>

				<AccountList data={this.state.data} name={this.state.data.name}/>

			</div>
		);
	}
});

export default DataBox;
