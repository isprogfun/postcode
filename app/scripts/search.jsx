import React from 'react';
import Finder from './finder.jsx';
import PostcodeList from './postcode-list.jsx';

const Search = (props) => (
    <div className= { `search + ${props.active ? ' search_active' : ''} ` }>
        <h2>Поиск</h2>
        <Finder store={ props.store } />
        <PostcodeList store={ props.store } list='searchedList' title='Результаты поиска' />
    </div>
);

Search.propTypes = {
    store: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool.isRequired
};

export { Search as default };
