import React, { Component } from 'react';
import $ from 'jquery';

class MyShows extends Component {

    updateWatched(index) {
        $.ajax({
            url: `${this.props.url}/episodes/${this.props.episodeList[index].id}`,
            method: "PUT",
            data: {watched: true, score: this.props.user.score + 5, user_id: this.props.user.id}
        }).done((data) => {
            $.ajax({
                url: `${this.props.url}/episodes/scrape`,
                method: "PUT",
                data: {
                    name: this.props.episodeList[index].show_name.replace(/\s/g, "-").toLowerCase(),
                    season: this.props.episodeList[index].season,
                    episodeNumber: this.props.episodeList[index].episodenumber,
                    id: this.props.episodeList[index].id
                }
            }).done((data) => {
                console.log(data);
                this.props.setScore(5);
            })
        });
    }

    render() {
        let totalSeasons = this.props.episodeList[(this.props.episodeList.length) - 1].season;
        let watched = [];
        let notWatched = [];
        let upcoming = [];
        let d = new Date();

        for (let j = 1; j <= totalSeasons; j++) {
            let watchedCount = 0,
                notWatchedCount = 0,
                upcomingCount = 0;
            watched.push(
                <div>
                    <h2 className="seasonHeader">Season {j}</h2>
                </div>
            )
            notWatched.push(
                <div>
                    <h2 className="seasonHeader">Season {j}</h2>
                </div>
            )
            upcoming.push(
                <div>
                    <h2 className="seasonHeader">Season {j}</h2>
                </div>
            )
            this.props.episodeList.forEach((episode, i) => {
                let airdate = new Date(episode.airdate);
                if (episode.season === j && episode.watched) {
                    watchedCount++;
                    watched.push(
                        <div key={i}>
                            <h3 className="inline">Episode {episode.season}.{episode.episodenumber}: {episode.name}</h3>
                            <h5 >Aired: {episode.airdate.substr(0, episode.airdate.length-6)}</h5>
                            <a href={episode.recap_url}>Recap</a>
                        </div>
                    );
                } else if (episode.season === j && !episode.watched && d>=airdate ) {
                    notWatchedCount++;
                    notWatched.push(
                        <div key={i}>
                            <h3 className="inline">Episode {episode.season}.{episode.episodenumber}: {episode.name}</h3>
                            <input 
                                type="checkbox"
                                onClick={(e) => {this.updateWatched(i)}}
                            />
                            <h5 >Aired: {episode.airdate.substr(0, episode.airdate.length-6)}</h5>
                        </div>
                    );
                } else if (episode.season === j) {
                    upcomingCount++;
                    upcoming.push(
                        <div key={i}>
                            <h3 className="inline">Episode {episode.season}.{episode.episodenumber}: {episode.name}</h3>
                            <h5 >Aired: {episode.airdate.substr(0, episode.airdate.length-6)}</h5>
                        </div>
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
        }

        return (
            <div>
                <h1>{this.props.currentShow.name}</h1>   
                <div className="episodes">
                    <div className="watched">
                        <h1>Watched</h1>
                        <h3>{watched}</h3>
                    </div>
                    <div className="notWatched">
                        <h1>Not Watched</h1>
                        <h3>{notWatched}</h3>
                    </div>
                    <div className="Upcoming">
                        <h1>Upcoming</h1>
                        <h3>{upcoming}</h3>
                    </div>
                </div>
                {this.removeHeaders}
            </div>
        );
    }
}

export default MyShows;