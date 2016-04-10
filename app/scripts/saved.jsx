import React from 'react';
import PostcodeList from './postcode-list.jsx';

const Saved = (props) => (
    <div className= { `saved + ${props.active ? ' saved_active' : ''} ` }>
        <PostcodeList store={ props.store } list='savedList' title='Избранное' />
    </div>
);

Saved.propTypes = {
    store: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool.isRequired
};

export { Saved as default };
