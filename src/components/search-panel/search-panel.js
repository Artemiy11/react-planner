import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(e) {
        this.setState({
            term: e.target.value
        })
        this.props.onUpdateSearch(this.state.term);
    }

    render() {
        return (
            <input
            type="text"
            className="form-control search-input"
            placeholder="Поиск по записям"
            onChange={this.onUpdateSearch}
            />
        )
    }
}
