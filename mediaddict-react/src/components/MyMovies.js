import React, { Component } from 'react';
import Moment from 'react-moment';
import $ from 'jquery';
import 'moment-timezone';

class MyMovies extends Component {
	updateWatched() {
		if (this.props.currentMovie.watched === false) {
			$.ajax({
	            url: `${this.props.url}/movies/${this.props.currentMovie.id}`,
	            method: "PUT",
	            data: {watched: true, score: this.props.user.score + 10, user_id: this.props.user.id}
	        }).done((data) => {
	            let url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
				url += '?' + $.param({
				    'api-key': "39e33badfa5f41b2a75fc660a36da0b9",
				    'query': this.props.currentMovie.name
				});
	            $.ajax({
	                url: url,
	                method: "GET"         
	            }).done((data) => {
	                $.ajax({
		                url: `${this.props.url}/movies/recap`,
		                method: "PUT",
		                data: {
		                    id: this.props.currentMovie.id,
		                    recap_url: data.results[0].link.url
		                }
		            }).done((data) => {
			            this.props.setScore(10);
			        })
			    });
	        });
    	}	
	}


	render() {
		let status;
		if (new Date() < new Date(this.props.currentMovie.premieredate)) {
			status = <h2>Status: Upcoming</h2>;
		} else if (this.props.currentMovie.watched === true) {
			status = 
				<div>
					<h2>Status: Watched</h2>
					<a href={this.props.currentMovie.recap_url}>Read Review</a>
				</div>;
		} else {
			status = 
				<div>
					<h2>Status: Not Watched</h2>
					<h3 className="inline">Completed?</h3>
	                <input 
	                    type="checkbox"
	                    onClick={(e) => {this.updateWatched()}}
	                />
	            </div>;
		}

		return (
	        <div>
	        	<h1>{this.props.currentMovie.name}</h1>
	        	<h3>Release Date: <Moment format="MMMM D, YYYY">{this.props.currentMovie.premieredate}</Moment></h3>
	        	<h3>Run Time: {this.props.currentMovie.length} minutes</h3>
	        	<br />
	        	{status}
	        	<button onClick={(e) => {this.props.delete(e, "movies", this.props.currentMovie.id)}}>Remove</button>
	        </div>
	    );
	}
}

export default MyMovies;