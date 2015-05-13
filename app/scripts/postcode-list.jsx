var PostcodeItem = require('./postcode-item.jsx');

module.exports = React.createClass({
    render: function() {
        // Выводим только те результаты, где есть индекс
        var postcodeItems = this.props.data.filter(function(item) {
            return item.zip;
        });

        return (
            <div className='postcodeList'>
                <h2>{ this.props.title }</h2>
                <ul className='postcodeList__list'>
                    { postcodeItems.map(function(item) {
                        return (
                            <PostcodeItem item={ item } key={ item.id } />
                        )
                    }) }
                </ul>
            </div>
        )
    }
});
