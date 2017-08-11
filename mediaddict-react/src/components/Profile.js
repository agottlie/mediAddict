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

    handleShowClick(e, index) {
    	this.props.setCurrentShow(e, index);
    }

    handleMovieClick(index) {
    	this.props.setCurrentMovie(index);
    	this.props.setDisplay("myMovies");
    }

    renderShows(){
        if (this.props.myShows[0]) {
	         let watched = [],
		        notWatched = [],
	            watchedCount = 0,
                notWatchedCount = 0;
            watched.push(
                <div>
                    <h2 className="movieHeader">Up to Date</h2>
                </div>
            )
            notWatched.push(
                <div>
                    <h2 className="movieHeader">Watching</h2>
                </div>
            )
	        this.props.myShows.forEach((show,i) => {
	            let count = 0;
	            this.props.episodes.forEach((episode) => {
	            	if (episode.show_name === show.name && !episode.watched) {
	            		count++;
	            	}
	            })
	            if (count === 0) {
                    watchedCount++;
                    watched.push(
                        <li key={i} onClick={(e) => {this.handleShowClick(e, i)}}>
		                    <h3>{show.name}</h3>
		                </li>
                    );
                } else {
                    notWatchedCount++;
                    notWatched.push(
                        <li key={i} onClick={(e) => {this.handleShowClick(e, i)}}>
		                    <h3>{show.name}</h3>
		                </li>
                    );
                }
	        })
	        if (watchedCount === 0) {
                watched.pop();
            }
            if (notWatchedCount === 0) {
                notWatched.pop();
            }

            notWatched.push(watched);

            return notWatched;
	    } else {
	    	return(
	    		<li onClick={(e) => {this.props.setDisplay("addShow")}}>Add Show</li>
	    	)
	    }
    }

    renderMovies(){
        if (this.props.myMovies[0]) {
            let watched = [],
		        notWatched = [],
		        upcoming = [],
		        d = new Date(),
	            watchedCount = 0,
                notWatchedCount = 0,
                upcomingCount = 0;
            watched.push(
                <div>
                    <h2 className="movieHeader">Completed</h2>
                </div>
            )
            notWatched.push(
                <div>
                    <h2 className="movieHeader">Not Watched</h2>
                </div>
            )
            upcoming.push(
                <div>
                    <h2 className="movieHeader">Upcoming</h2>
                </div>
            )
	        this.props.myMovies.forEach((movie,i) => {
	            let premieredate = new Date(movie.premieredate)
	            if (movie.watched) {
                    watchedCount++;
                    watched.push(
                        <li key={i} onClick={(e) => {this.handleMovieClick(i)}}>
		                    <h3>{movie.name}</h3>
		                </li>
                    );
                } else if (!movie.watched && d>=premieredate ) {
                    notWatchedCount++;
                    notWatched.push(
                        <li key={i} onClick={(e) => {this.handleMovieClick(i)}}>
		                    <h3>{movie.name}</h3>
		                </li>
                    );
                } else {
                    upcomingCount++;
                    upcoming.push(
                        <li key={i} onClick={(e) => {this.handleMovieClick(i)}}>
		                    <h3>{movie.name}</h3>
		                </li>
                    );
                }
	        })
	        if (watchedCount === 0) {
                watched.pop();
            }
            if (notWatchedCount === 0) {
                notWatched.pop();
            }
            if (upcomingCount === 0) {
                upcoming.pop();
            }

            upcoming.push(notWatched);
            upcoming.push(watched);

            return upcoming;

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