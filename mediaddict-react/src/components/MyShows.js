import React, { Component } from 'react';

class MyShows extends Component {

	render() {
		return (
	        <div>
	        	{this.props.currentShow.name}
	        </div>
	    );
	}
}

export default MyShows;