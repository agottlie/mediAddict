import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

class MyMovies extends Component {
	render() {
		return (
	        <div>
	        	<h1>{this.props.currentMovie.name}</h1>
	        	<h3>Release Date: <Moment format="MMMM D, YYYY">{this.props.currentMovie.premieredate}</Moment></h3>
	        	<h3>Run Time: {this.props.currentMovie.length} minutes</h3>
	        </div>
	    );
	}
}

export default MyMovies;