var Utils = require('./utils.jsx');

module.exports = React.createClass({
    componentWillMount: function() {
        this.getData = Utils.debounce(this.getData, 200, true);
    },
    getData: function(text) {
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
    },
    handleChange: function() {
        var text = React.findDOMNode(this.refs.text).value.trim();

        if (!text) {
            this.props.onGetData({ data: [] });
        } else {
            this.getData(text);
        }
    },
    render: function() {
        return (
            <div className='finder'>
                <input onChange={ this.handleChange } className='finder__text' type='text' placeholder='Введите адрес' ref='text' />
            </div>
        );
    }
});
