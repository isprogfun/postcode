import React from 'react';
import Tabs from './tabs.jsx';
import Search from './search.jsx';
import Saved from './saved.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentId: props.currentId };
    }
    changeTab(id) {
        this.setState({ currentId: id });
    }
    render() {
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
                <Tabs tabs={ tabs } onChangeTab={ this.changeTab.bind(this) } currentId={ this.state.currentId } />
                { currentTab }
            </main>
        );
    }
};

Main.defaultProps = { currentId: 'search' };

React.render(<Main />, document.getElementById('container'));
