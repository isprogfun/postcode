import React from 'react';
import utils from './utils.js';

export default class Finder extends React.Component {
    componentWillMount() {
        this.getData = utils.debounce(this.getData, 200, true);
    }
    getData(text) {
        var url = '//kladr-api.ru/api.php';

        $.ajax({
            url: url,
            data: {
                query: text,
                oneString: 1,
                limit: 10,
                token: '552180d47c5239e6538b4590'
            },
            dataType: 'jsonp',
            success: function(data) {
                if (data.result && data.result.length) {
                    this.props.onGetData({ data: data.result });
                }
            }.bind(this),
            error: function(xhr, status, error) {
                console.error(url, status, error.toString());
            }.bind(this)
        });
    }
    handleChange() {
        var text = React.findDOMNode(this.refs.text).value.trim();

        if (!text) {
            this.props.onGetData({ data: [] });
        } else {
            this.getData(text);
        }
    }
    render() {
        return (
            <div className='finder'>
                <input ref='text' onChange={ this.handleChange.bind(this) } className='finder__text' type='text' placeholder='Введите адрес' />
            </div>
        );
    }
};
