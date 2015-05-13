var PostcodeList = require('./postcode-list.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        var saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];
        saved = saved.map(function(item) {
            item.saved = true;

            return item;
        });

        return { data: saved };
    },
    render: function() {
        return (
            <PostcodeList data={ this.state.data } title='Избранное' />
        )
    }
});
