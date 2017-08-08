import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Display from './components/Display';
import Navbar from './components/Navbar';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            display: "profile",
            queryResult: [],
            searchValue: "",
            show: {},
            episodeList: ['a'],
            count: 0
        }
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/"
        }).done((data) => {
            this.setState({ user: data.user });
        });
    }

    setDisplay(newValue) {
        this.setState({
            display: newValue
        })
    }

    setShow(e, newValue) {
        e.preventDefault();
        this.setState({
            show: newValue,
            display: "episodes"
        }, function complete() {this.setEpisodes()});
    }

    setEpisodes() {
        $.ajax({
            url: `http://api.tvmaze.com/shows/${this.state.show.id}/episodes`
        }).done((data) => {
            data.forEach((episode) => {
                episode.watched = false;
            })
            this.setState({
                episodeList: data,
                queryResult: [],
                searchValue: ""
            });
        });
    }

    handleLogin(event) {
        event.preventDefault();
        console.log("event.target.value:", event.target.value);
        $.ajax({
            url: "http://localhost:8080/users/login",
            method: "POST"
        }).done((data) => {
            this.setState({
                user: data.user
            })
        });
    }

    newUser(event) {
        event.preventDefault();
        console.log("event.target.value:", event.target.value);
        $.ajax({
            url: "http://localhost:8080/users/",
            method: "POST"
        }).done((data) => {
            this.setState({
                user: data.user
            })
        });
    }

    handleNameChange(event) {
        this.setState({ searchValue: event.target.value });
    }

    updateQuery(newValue) {
        this.setState({
            queryResult: newValue
        })
    }

    addShow(event, show, episodes) {
        event.preventDefault();
        $.ajax({
            url: `http://localhost:8080/shows`,
            method: "POST",
            data: { name: show.name, premiereDate: show.premiered, network: show.network.name }
        }).done((data) => {
            console.log(data.id);
            this.addEpisode(event, this.state.episodeList[this.state.count], data.id)
        });
    }

    addEpisode(event, episode, show_id) {
        event.preventDefault();
        $.ajax({
            url: `http://localhost:8080/episodes`,
            method: "POST",
            data: { name: episode.name, season: episode.season, episodeNumber: episode.number, airDate: episode.airdate, watched: episode.watched, show_id: show_id }
        }).done((data) => {
            this.setState({
                count: this.state.count + 1
            })
            if (this.state.count + 1 < this.state.episodeList.length) {
                this.addEpisode(event, this.state.episodeList[this.state.count], show_id);
            } else {
                this.setState({
                    count: 0
                })
            }
        });
    }

    updateWatched(event,index) {
        let tempList = this.state.episodeList;
        if (tempList[index].watched === true) {
            tempList[index].watched = false;
        } else {
            tempList[index].watched = true;
        }
        this.setState({
            episodeList: tempList
        })
    }

    render() {
        return (
            <div className="App">
              <Navbar 
                display = {this.state.display}
                setDisplay={this.setDisplay.bind(this)}
              />
              <Display
                display={this.state.display}
                setDisplay={this.setDisplay.bind(this)}
                handleLogin={this.handleLogin.bind(this)}
                user={this.state.user}
                newUser={this.newUser.bind(this)}
                handleNameChange={this.handleNameChange.bind(this)}
                queryResult={this.state.queryResult}
                searchValue={this.state.searchValue}
                updateQuery={this.updateQuery.bind(this)}
                show={this.state.show}
                setShow={this.setShow.bind(this)}
                episodeList={this.state.episodeList}
                addShow={this.addShow.bind(this)}
                updateWatched={this.updateWatched.bind(this)}
            />
            </div>
        );
    }
}

export default App;