import React, { Component } from 'react';
import $ from 'jquery';

class Episodes extends Component {
	checkSeason(e, season) {
        let thisSeasonHeader = ".seasonHeader" + season;
        let thisSeason = ".season" + season;
        if ($(thisSeasonHeader).eq(0).attr('checked') === "checked") {
            $(thisSeason).attr('checked', false);
            $(thisSeasonHeader).eq(0).attr('checked', false);
        } else {
            $(thisSeason).attr('checked', true);
            $(thisSeasonHeader).eq(0).attr('checked', true);
        }     
    }

	render() {
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
                            className={"seasonHeader"+j}
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
                                id={episode.id}
                                className={"season" + j}
                                onChange={(e) => {this.props.updateWatched(e, i, episode.id)}}
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
}

export default Episodes;