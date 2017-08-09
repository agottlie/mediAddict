import React, { Component } from 'react';
import $ from 'jquery';

class Profile extends Component {

	componentDidMount() {
	 	this.getShows();
        this.getMovies();
        this.props.getEpisodesAndMovies('listWeek');
   	}

   	getShows() {
        $.ajax({
            url: `${this.props.url}/shows/${this.props.user.id}`
        }).done((data) => {
            this.props.setShows(data);
        });
    }

    getMovies() {
    	$.ajax({
            url: `${this.props.url}/movies/${this.props.user.id}`
        }).done((data) => {
            this.props.setMovies(data);
        });
    }

    handleShowClick(index) {
    	this.props.setCurrentShow(index);
    	this.props.setDisplay("myShows");
    }

    handleMovieClick(index) {
    	this.props.setCurrentMovie(index);
    	this.props.setDisplay("myMovies");
    }

    renderShows(){
        if (this.props.myShows[0]) {
	        return this.props.myShows.map((show,i) => {
	            return(
	                <li key={i} onClick={(e) => {this.handleShowClick(i)}}>
	                    <h3>{show.name}</h3>
	                </li>
	            )
	        })
	    } else {
	    	return(
	    		<li onClick={(e) => {this.props.setDisplay("addShow")}}>Add Show</li>
	    	)
	    }
    }

    renderMovies(){
        if (this.props.myMovies[0]) {
	        return this.props.myMovies.map((movie,i) => {
	            return(
	                <li key={i} onClick={(e) => {this.handleMovieClick(i)}}>
	                    <h3>{movie.name}</h3>
	                </li>
	            )
	        })
	    } else {
	    	return(
	    		<li onClick={(e) => {this.props.setDisplay("addMovie")}}>Add Movie</li>	    	)
	    }
    }

	render() {
		return (
	        <div className="profile">
                <div className="shows">
                	<h2>MY SHOWS</h2>
	                <ul>
	                	{this.renderShows()}
	                </ul>
	            </div>

	            <div className="movies">
	            	<h2>MY MOVIES</h2>
	                <ul>
	                	{this.renderMovies()}
	                </ul>
	            </div>
              
                <div className="upcoming">
                	<h2>UPCOMING</h2>
                	<div id="calendar"></div>
                </div>
            </div>
	    );
	}
}

export default Profile;