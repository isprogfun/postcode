import React from 'react';

export default class PostcodeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { saved: props.item.saved };
    }
    handleSaveClick() {
        var saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];

        if (this.state.saved) {
            saved = saved.filter(item => item.id !== this.props.item.id);
        } else {
            saved.push(this.props.item);
        }

        this.setState({ saved: !this.state.saved })
        saved = JSON.stringify(saved);
        window.localStorage.setItem('saved', saved);
    }
    render() {
        var className = "postcodeList__save";

        if (this.state.saved) {
            className += " postcodeList__save_saved"
        }

        return (
            <li className='postcodeList__item'>
                <span className={ className } onClick={ this.handleSaveClick.bind(this) }>♡</span>
                <span>{ this.props.item.zip }: { this.props.item.fullName }</span>
            </li>
        )
    }
};
