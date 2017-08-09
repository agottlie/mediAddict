import React, { Component } from 'react';

class MyMovies extends Component {
	render() {
		console.log(this.props.currentMovie);
		return (
	        <div>
	        	<h1>{this.props.currentMovie.name}</h1>
	        	<h3>Release Date: {this.props.currentMovie.premieredate}</h3>
	        	<h3>Run Time: {this.props.currentMovie.length} minutes</h3>
	        </div>
	    );
	}
}

export default MyMovies;