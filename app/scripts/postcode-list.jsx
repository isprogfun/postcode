import React from 'react';
import PostcodeItem from './postcode-item.jsx';

const PostcodeList = (props) => (
    <div className='postcodeList'>
        <h2>{ props.title }</h2>
        <ul className='postcodeList__list'>
            {
                props.store.getState()[props.list].map(item => (
                    <PostcodeItem item={ item } key={ item.id } store={ props.store } />
                ))
            }
        </ul>
    </div>
);

PostcodeList.propTypes = {
    store: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired,
    list: React.PropTypes.string.isRequired
};

export { PostcodeList as default };
