import React, { Component } from 'react';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);

        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ];

    }

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name;
            const clazz = active ? 'btn btn-info': 'btn btn-outline-secondary';
            return (
                <button
                    key={name}
                    type="button"
                    className={clazz}
                    onClick={() => this.props.onFilterSelect(name)}>
                    {label}
                </button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
