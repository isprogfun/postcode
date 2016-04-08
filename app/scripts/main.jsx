import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';

import Tabs from './tabs.jsx';
import Search from './search.jsx';
import Saved from './saved.jsx';

const store = createStore(reducers);

class Main extends React.Component {
    render() {
        const currentTabId = store.getState().currentTabId;
        let tabs = [
            { name: '?', id: 'search' },
            { name: '♡', id: 'saved' }
        ];

        return (
            <main className='main'>
                <Tabs tabs={ tabs } currentId={ currentTabId } store = { store } />
                <Search store={ store } active={ currentTabId === 'search' } />
                <Saved store={ store } active={ currentTabId === 'saved' } />
            </main>
        );
    }
}

const render = () => {
    ReactDOM.render(<Main />, document.getElementById('container'));
};

// Первый рендер
render();

// Рендер на изменение стора
store.subscribe(render);
