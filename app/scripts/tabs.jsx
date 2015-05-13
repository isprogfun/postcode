module.exports = React.createClass({
    handleClick: function(e) {
        this.props.onChangeTab(e.target.dataset.id);
    },
    render: function() {
        return (
            <nav className='tabs'>
                <ul className='tabs__list'>
                    { this.props.tabs.map(this.renderTab) }
                </ul>
            </nav>
        )
    },
    renderTab: function(tab) {
        var className = 'tabs__item';

        if (tab.id === this.props.currentId) {
            className += ' tabs__item_active';
        }

        return <li onClick={ this.handleClick} className={ className } key={ tab.id } data-id={ tab.id }>{ tab.name }</li>;
    }
});
