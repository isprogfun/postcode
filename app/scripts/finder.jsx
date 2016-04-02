import React from 'react';
import ReactDOM from 'react-dom';
import utils from './utils.js';

export default class Finder extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentWillMount() {
        this.getData = utils.debounce(this.getData, 200, true);
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
                    this.props.onGetData({ data: data.result });
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
            this.props.onGetData({ data: [] });
        } else {
            this.getData(text);
        }
    }
    render() {
        return (
            <div className='finder'>
                <input
                    ref='text'
                    onChange={ this.handleChange }
                    className='finder__text'
                    type='text'
                    placeholder='Введите адрес'
                />
            </div>
        );
    }
}

Finder.propTypes = {
    onGetData: React.PropTypes.func.isRequired
};
