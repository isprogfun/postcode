import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './tabs.jsx';
import Search from './search.jsx';
import Saved from './saved.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentId: props.currentId };
        this.changeTab = this.changeTab.bind(this);
    }
    changeTab(id) {
        this.setState({ currentId: id });
    }
    render() {
        let currentTab;
        let tabs = [
            { name: '?', id: 'search' },
            { name: '♡', id: 'saved' }
        ];

        if (this.state.currentId === 'search') {
            currentTab = <Search />;
        } else if (this.state.currentId === 'saved') {
            currentTab = <Saved />;
        }

        return (
            <main className='main'>
                <Tabs
                    tabs={ tabs }
                    onChangeTab={ this.changeTab }
                    currentId={ this.state.currentId }
                />
                { currentTab }
            </main>
        );
    }
}

Main.defaultProps = { currentId: 'search' };
Main.propTypes = {
    currentId: React.PropTypes.string.isRequired
};

ReactDOM.render(<Main />, document.getElementById('container'));
