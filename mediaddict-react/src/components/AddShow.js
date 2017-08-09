import React, { Component } from 'react';
import $ from 'jquery';

class AddShow extends Component {
	handleShowSubmit(event){
        event.preventDefault();
        $.ajax({
            url: "http://api.tvmaze.com/search/shows",
            data: { q: this.props.searchValue }
        }).done((data) => {
            this.props.updateQuery(data);
        });
    }

    renderShowQuery() {
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

	render() {
		return (
	        <div>
	        	<form onSubmit={this.handleShowSubmit.bind(this)}>
                    <label>
                        Show Name:
                        <input type="text" name="name" 
                            value={this.props.searchValue}
                            onChange={this.props.handleNameChange.bind(this)}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    {this.renderShowQuery()}
                </div>
            </div>
	    );
	}
}

export default AddShow;