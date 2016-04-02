import React from 'react';
import ProfileList from './Profiles';

const propertyStyle = { marginLeft: '30px' };

let Property = React.createClass({
	propTypes: {
		'name': React.PropTypes.string.isRequired,
		'items': React.PropTypes.array.isRequired
	},
	render(){
		return (
			<div className="property">
				<div className="propertyName">
					<h3>{this.props.name}</h3>
				</div>
				<ProfileList data={this.props.items} />
			</div>
		);
	}
});


let PropertyList = React.createClass({
	propTypes: {
		'name': React.PropTypes.string,
		'items': React.PropTypes.array,
		'data': React.PropTypes.array
	},
	render(){
		let propertyNodes = this.props.data.map((properties) => {
			return (
				<Property key={properties.id} name={properties.name} items={properties.profiles.items}>
					{properties.name}
				</Property>
			);
		});

		return (
			<div className="propertyList" style={propertyStyle}>
				{propertyNodes}
			</div>
		);
	}
});

export default PropertyList;
