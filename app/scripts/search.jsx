import React from 'react';
import Finder from './finder.jsx';
import PostcodeList from './postcode-list.jsx';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    handleNewData(data) {
        var saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];

        // Проверить пришедший список на наличие в избранном
        data = data.data.map(item => {
            saved.some(savedItem => {
                if (savedItem.id === item.id) {
                    item.saved = true;

                    return true;
                }
            })

            return item;
        })

        this.setState({ data: data });
    }
    render() {
        return (
            <div className='search'>
                <h2>Поиск</h2>
                <Finder onGetData={ this.handleNewData.bind(this) } />
                <PostcodeList data={ this.state.data } />
            </div>
        );
    }
};
