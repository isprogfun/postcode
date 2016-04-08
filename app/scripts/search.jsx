import React from 'react';
import Finder from './finder.jsx';
import PostcodeList from './postcode-list.jsx';

export default class Search extends React.Component {
    render() {
        return (
            <div className= { `search + ${this.props.active ? ' search_active' : ''} ` }>
                <h2>Поиск</h2>
                <Finder store={ this.props.store } />
                <PostcodeList store={ this.props.store } list='searchedList' title='Результаты поиска' />
            </div>
        );
    }
}

Search.propTypes = {
    store: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool.isRequired
};
