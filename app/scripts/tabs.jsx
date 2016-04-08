import React from 'react';

export default class Tabs extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.store.dispatch({
            type: 'SET_CURRENT_TAB',
            id: e.target.dataset.id
        });
    }
    renderTab(tab) {
        let className = 'tabs__item';

        if (tab.id === this.props.store.getState().currentTabId) {
            className += ' tabs__item_active';
        }

        return (
            <li onClick={ this.onClick } className={ className } key={tab.id} data-id={ tab.id }>
                { tab.name }
            </li>
        );
    }
    render() {
        return (
            <nav className='tabs'>
                <ul className='tabs__list'>
                    { this.props.tabs.map(tab => this.renderTab(tab)) }
                </ul>
            </nav>
        );
    }
}

Tabs.propTypes = {
    tabs: React.PropTypes.array.isRequired,
    store: React.PropTypes.object.isRequired
};
