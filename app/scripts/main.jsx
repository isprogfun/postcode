var Tabs = require('./tabs.jsx'),
    Search = require('./search.jsx'),
    Saved = require('./saved.jsx');

var Main = React.createClass({
    getInitialState: function() {
        return { currentId: 'search' };
    },
    changeTab: function(id) {
        this.setState({ currentId: id });
    },
    render: function() {
        var currentTab,
            tabs = [
                { name: '?', id: 'search' },
                { name: '♡', id: 'saved' }
            ];

        if (this.state.currentId === 'search') {
            currentTab = <Search />
        } else if (this.state.currentId === 'saved') {
            currentTab = <Saved />
        }

        return (
            <main className='main'>
                <Tabs tabs={ tabs } onChangeTab={ this.changeTab } currentId={ this.state.currentId } />
                { currentTab }
            </main>
        );
    }
});

React.render(<Main />, document.getElementById('container'));
