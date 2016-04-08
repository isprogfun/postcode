import React from 'react';
import ReactDOM from 'react-dom';
import utils from './utils.js';

export default class Finder extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.getData = utils.debounce(this.getData.bind(this), 200, true);
    }
    getData(text) {
        const url = '//kladr-api.ru/api.php';

        $.ajax({
            url,
            data: {
                query: text,
                oneString: 1,
                limit: 10,
                token: '552180d47c5239e6538b4590'
            },
            dataType: 'jsonp',
            success: (data) => {
                if (data.result && data.result.length) {
                    this.props.store.dispatch({
                        type: 'SET_SEARCHED_LIST',
                        searchedList: data.result
                    });
                }
            },
            error: (xhr, status, error) => {
                console.log(url, status, error.toString());
            }
        });
    }
    handleChange() {
        const text = ReactDOM.findDOMNode(this.refs.text).value.trim();

        if (!text) {
            this.props.store.dispatch({
                type: 'SET_SEARCHED_LIST',
                searchedList: []
            });
        } else {
            this.getData(text);
        }
    }
    render() {
        return (
            <div className='finder'>
                <input className='finder__text'
                    ref='text'
                    onChange={ this.handleChange }
                    type='text'
                    placeholder='Введите адрес'
                />
            </div>
        );
    }
}

Finder.propTypes = {
    store: React.PropTypes.object.isRequired
};
