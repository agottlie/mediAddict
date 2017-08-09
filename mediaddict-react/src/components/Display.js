import React, { Component } from 'react';
import AddMovie from './AddMovie';
import AddShow from './AddShow';
import Calendar from './Calendar';
import Episodes from './Episodes';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import MyMovies from './MyMovies';
import MyShows from './MyShows';

class Display extends Component {

    render() {
        let displayElement;

//---------------------PROFILE VIEW--------------------------------
        if (this.props.display === "profile") {
            displayElement =
                <Profile 
                    user={this.props.user}
                    url={this.props.url}
                    myShows={this.props.myShows}
                    myMovies={this.props.myMovies}
                    setShows={this.props.setShows}
                    setMovies={this.props.setMovies}
                    setDisplay={this.props.setDisplay}
                />;

//---------------------CALENDAR VIEW--------------------------------
        } else if (this.props.display === "calendar") {
            displayElement = 
                <Calendar 
                    user={this.props.user}
                    url={this.props.url}
                />;

//---------------------ADD SHOW VIEW--------------------------------
        } else if (this.props.display === "addShow") {
            displayElement = 
                <AddShow
                    searchValue={this.props.searchValue}
                    handleNameChange={this.props.handleNameChange}
                    queryResult={this.props.queryResult}
                    updateQuery={this.props.updateQuery}
                    setShow={this.props.setShow}
                />;

//---------------------EPISODES VIEW--------------------------------
        } else if (this.props.display === "episodes") {
            displayElement = 
                <Episodes 
                    episodeList={this.props.episodeList}
                    updateWatched={this.props.updateWatched}
                    addShow={this.props.addShow}
                    show={this.props.show}
                />;
                

//---------------------ADD MOVIE VIEW--------------------------------
        } else if (this.props.display === "addMovie") {
            displayElement = 
                <AddMovie 
                    searchValue={this.props.searchValue}
                    handleNameChange={this.props.handleNameChange}
                    queryResult={this.props.queryResult}
                    addMovie={this.props.addMovie}
                    updateQuery={this.props.updateQuery}
                />;

//---------------------LEADERBOARD VIEW--------------------------------
        } else if (this.props.display === "leaderboard") {
            displayElement = 
                <Leaderboard />;

//---------------------MY SHOWS VIEW--------------------------------
        } else if (this.props.display === "myShows") {
            displayElement = 
                <MyShows />;

//---------------------MY MOVIES VIEW--------------------------------
        } else if (this.props.display === "myMovies") {
            displayElement = 
                <MyMovies />;

        }

        return (
            <div className="container">
                {displayElement}
            </div>
        );
    }
}

export default Display;