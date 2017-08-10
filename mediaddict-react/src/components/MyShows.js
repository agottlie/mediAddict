import React, { Component } from 'react';

class MyShows extends Component {

	render() {
		let totalSeasons = this.props.episodeList[(this.props.episodeList.length)-1].season;
        let episodeDisplay= [];

        for (let j=1; j<=totalSeasons; j++) {
            episodeDisplay.push(
                <div>
                    <h2 className="inline">Season {j}</h2>
                </div>
            )
            this.props.episodeList.forEach((episode, i) => {
                if (episode.season === j) {
                    episodeDisplay.push(
                        <div key={i}>
                            <h3 className="inline">Episode {episode.season}.{episode.episodenumber}: {episode.name}</h3>
                            <h5 >Aired: {episode.airdate.substr(0, episode.airdate.length-6)}</h5>
                        </div>
                    );
                }
            })
        }

		return (
	        <div>
	        	{episodeDisplay}
	        </div>
	    );
	}
}

export default MyShows;