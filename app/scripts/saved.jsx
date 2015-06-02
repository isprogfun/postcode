import React from 'react';
import PostcodeList from './postcode-list.jsx';

export default class Saved extends React.Component {
    constructor(props) {
        super(props);

        var saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];
        saved = saved.map(item => {
            item.saved = true;

            return item;
        });

        this.state = { data: saved };
    }
    render() {
        return (
            <PostcodeList data={ this.state.data } title='Избранное' />
        )
    }
};
