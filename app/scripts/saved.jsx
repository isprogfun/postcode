import React from 'react';
import PostcodeList from './postcode-list.jsx';

export default class Saved extends React.Component {
    render() {
        return (
            <div className= { `saved + ${this.props.active ? ' saved_active' : ''} ` }>
                <PostcodeList store={ this.props.store } list='savedList' title='Избранное' />
            </div>
        );
    }
}

Saved.propTypes = {
    store: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool.isRequired
};
