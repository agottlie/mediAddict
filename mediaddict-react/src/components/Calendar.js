import React, { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import '../css/fullcalendar.css'


class Calendar extends Component {
	constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

	componentDidMount() {
	    this.getEpisodes();
	    // this.getMovies();
	}

	getEpisodes() {
		$.ajax({
            url: `${this.props.url}/episodes/${this.props.user.id}`
        }).done((data) => {
            let events=[];
            data.forEach((episode) => {
            	events.push({title: episode.show_name, start: episode.airdate});
            })
        	this.setState({
        		events: events
        	});
	        $('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				eventColor: 'green',
				events: events
			})
        });
	}

	// getMovies() {
	// 	$.ajax({
 //            url: `${this.props.url}/episodes/${this.props.user.id}`
 //        }).done((data) => {
 //            data.forEach((episode) => {
 //            	events.push({title: episode.show_name, start: episode.airdate});
 //            })
 //        	console.log(events);
	//         $('#calendar').fullCalendar({
	// 			header: {
	// 				left: 'prev,next today',
	// 				center: 'title',
	// 				right: 'month,agendaWeek,agendaDay'
	// 			},
	// 			eventColor: 'green',
	// 			events: events
	// 		})
 //        });
	// }

	render() {
		return (
	        	<div id="calendar"></div>
	    );
	}

}

export default Calendar;