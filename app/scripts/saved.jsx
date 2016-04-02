import React from 'react';
import PostcodeList from './postcode-list.jsx';

export default class Saved extends React.Component {
    constructor(props) {
        super(props);

        let saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];

        this.state = { data: saved.reduce((result, item) => {
            const newItem = item;

            newItem.saved = true;

            return result.concat(newItem);
        }, []) };
    }
    render() {
        return <PostcodeList data={ this.state.data } title='Избранное' />;
    }
}
