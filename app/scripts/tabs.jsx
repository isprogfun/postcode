import React from 'react';

export default class Tabs extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onChangeTab(e.target.dataset.id);
    }
    renderTab(tab) {
        let className = 'tabs__item';

        if (tab.id === this.props.currentId) {
            className += ' tabs__item_active';
        }

        return (
            <li
                onClick={ this.handleClick }
                className={ className }
                key={ tab.id }
                data-id={ tab.id }
            >
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
    onChangeTab: React.PropTypes.func.isRequired,
    currentId: React.PropTypes.string.isRequired,
    tabs: React.PropTypes.array.isRequired
};
