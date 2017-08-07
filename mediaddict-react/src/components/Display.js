import React, { Component } from 'react';
import $ from 'jquery';

class Display extends Component {

    handleSubmit(event){
        event.preventDefault();
        $.ajax({
            url: "http://api.tvmaze.com/search/shows",
            data: { q: this.props.searchValue }
        }).done((data) => {
            this.props.updateQuery(data);
        });
    }

    renderQuery() {
        return this.props.queryResult.map((show, i) => {
            return (
                <li 
                  key={i}
                >
                    <span>{show.show.name}</span>
                    <button onClick={(e) => {this.props.setShow(e, show.show)}}>Select</button>
                </li>
            );
        });
    }

    checkSeason(e, season) {
        let thisSeason = ".season" + season;
        if ($(thisSeason).eq(0).attr('checked') === "checked") {
            $(thisSeason).attr('checked', false);
        } else {
            $(thisSeason).attr('checked', true);
        }    
        
    }

    renderEpisodes() {
        let totalSeasons = this.props.episodeList[(this.props.episodeList.length)-1].season;
        let episodeDisplay= [];

        for (let j=1; j<=totalSeasons; j++) {
            episodeDisplay.push(
                <div>
                    <h2 className="inline">Season {j}</h2>
                    <div onChange={(e) => {this.checkSeason(e, j)}}>
                        <input 
                            type="checkbox"
                            value={j}
                        />
                    </div>
                </div>
            )
            this.props.episodeList.forEach((episode, i) => {
                if (episode.season === j) {
                    episodeDisplay.push(
                        <div key={i}>
                            <h3 className="inline">Episode {episode.season}.{episode.number}: {episode.name}</h3>
                            <input 
                                type="checkbox"
                                value={episode.id}
                                className={"season" + j}
                                onChange={(e) => {this.updateWatched(e, i)}}
                            />
                            <h5 >Aired: {episode.airdate}</h5>
                        </div>);
                }
            })
        }

        return(
            <div>
                {episodeDisplay}
                <button onClick={(e) =>{this.props.addShow(e, this.props.show, this.props.episodeList)}}>Add</button>
            </div>
        )
    }

    render() {
        let displayElement;

//---------------------LOGIN VIEW--------------------------------
        if (this.props.display === "login") {
            displayElement = 
                <div>
                    <div>
                        <h1 className="title">Login</h1>
                    </div>
                    <form onSubmit={this.props.handleLogin.bind(this)}>
                        <label>Name</label>
                        <br />
                        <input id="name" className="input" type="text" name="user[name]" placeholder="User Name" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input id="password" className="input" type="password" name="user[password]" placeholder="P4ssw0rd1234" />
                        <br />
                        <input type="submit" className="button" value="Login" />
                    </form>
                    <div onClick={(e) => {this.props.setDisplay("new")}}>
                        <p>Sign Up</p>
                    </div>
                </div>;

//---------------------SIGNUP VIEW--------------------------------
        } else if (this.props.display === "new") {
            displayElement = 
                <div>
                    <div>
                        <h1 className="title">Sign Up</h1>
                    </div>
                    <form onSubmit={this.props.newUser.bind(this)}>
                        <label>Name</label>
                        <br />
                        <input className="input" id="name" type="text" name="user[name]" placeholder="User Name" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input id="password" className="input" type="password" name="user[password]" placeholder="P4ssw0rd1234" />
                        <br />
                        <input type="submit" className="button" value="Sign Up" />
                    </form>
                </div>;

//---------------------PROFILE VIEW--------------------------------
        } else if (this.props.display === "profile") {
            displayElement =
                <div className="profile">
                    <div className="profileShows">Test</div>
                    <div className="profileMovies">Test</div>
                    <div className="upcoming">Test</div>
                </div>;

//---------------------CALENDAR VIEW--------------------------------
        } else if (this.props.display === "calendar") {
            displayElement = 
                <div></div>;

//---------------------ADD SHOW VIEW--------------------------------
        } else if (this.props.display === "addShow") {
            displayElement = 
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>
                            Show Name:
                            <input type="text" name="name" 
                                value={this.props.searchValue}
                                onChange={this.props.handleNameChange.bind(this)}/>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                        {this.renderQuery()}
                    </div>
                </div>;

//---------------------EPISODES VIEW--------------------------------
        } else if (this.props.display === "episodes") {
            displayElement = 
                <div>
                    {this.renderEpisodes()}
                </div>;

//---------------------ADD MOVIE VIEW--------------------------------
        } else if (this.props.display === "addMovie") {
            displayElement = 
                <div></div>;

//---------------------LEADERBOARD VIEW--------------------------------
        } else if (this.props.display === "leaderboard") {
            displayElement = 
                <div></div>;

//---------------------MY SHOWS VIEW--------------------------------
        } else if (this.props.display === "myShows") {
            displayElement = 
                <div></div>;

//---------------------MY MOVIESS VIEW--------------------------------
        } else if (this.props.display === "myMovies") {
            displayElement = 
                <div></div>;

        }

        return (
            <div className="container">
                {displayElement}
            </div>
        );
    }
}

export default Display;