import React from 'react';
import Finder from './finder.jsx';
import PostcodeList from './postcode-list.jsx';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.handleNewData = this.handleNewData.bind(this);
    }
    handleNewData(data) {
        let saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];

        console.log(222, data.data);

        // Проверить пришедший список на наличие в избранном
        // В рендер отдать новый список с параметром saved для элементов в избранном
        const updatedData = data.data.reduce((result, item) => {
            const newItem = item;
            const isSaved = saved.some(savedItem => savedItem.id === item.id);

            if (isSaved) {
                newItem.saved = true;
                result.push(newItem);
            } else {
                result.push(item);
            }

            return result;
        }, []);

        console.log(111, updatedData);
        this.setState({ data: updatedData });
    }
    render() {
        return (
            <div className='search'>
                <h2>Поиск</h2>
                <Finder onGetData={ this.handleNewData } />
                <PostcodeList data={ this.state.data } />
            </div>
        );
    }
}
