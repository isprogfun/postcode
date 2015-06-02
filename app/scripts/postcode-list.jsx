import React from 'react';
import PostcodeItem from './postcode-item.jsx';

export default class PostcodeList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Выводим только те результаты, где есть индекс
        var postcodeItems = this.props.data.filter(item => item.zip);

        return (
            <div className='postcodeList'>
                <h2>{ this.props.title }</h2>
                <ul className='postcodeList__list'>
                    { postcodeItems.map(item => <PostcodeItem item={ item } key={ item.id } />) }
                </ul>
            </div>
        )
    }
};
