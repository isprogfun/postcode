import React from 'react';

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        this.props.onChangeTab(e.target.dataset.id);
    }
    render() {
        return (
            <nav className='tabs'>
                <ul className='tabs__list'>
                    { this.props.tabs.map(tab => this.renderTab(tab)) }
                </ul>
            </nav>
        )
    }
    renderTab(tab) {
        let className = 'tabs__item';

        if (tab.id === this.props.currentId) {
            className += ' tabs__item_active';
        }

        return <li onClick={ this.handleClick.bind(this) } className={ className } key={ tab.id } data-id={ tab.id }>{ tab.name }</li>;
    }
};
