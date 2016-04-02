import React from 'react';
import PostcodeItem from './postcode-item.jsx';

const PostcodeList = (props) =>
    <div className='postcodeList'>
        <h2>{ props.title }</h2>
        <ul className='postcodeList__list'>
            {
                props.data
                    .filter(item => item.zip) // Выводим только те результаты, где есть индекс
                    .map(item => <PostcodeItem item={ item } key={ item.id } />)
            }
        </ul>
    </div>;

PostcodeList.propTypes = {
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired
};

export { PostcodeList as default };
