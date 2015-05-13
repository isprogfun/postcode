module.exports = React.createClass({
    getInitialState: function() {
        return { saved: this.props.item.saved };
    },
    handleSaveClick: function() {
        var that = this,
            saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];

        if (this.state.saved) {
            saved = saved.filter(function(item) {
                return item.id !== that.props.item.id;
            });
        } else {
            saved.push(this.props.item);
        }

        this.setState({ saved: !this.state.saved })
        saved = JSON.stringify(saved);
        window.localStorage.setItem('saved', saved);
    },
    render: function() {
        var className = "postcodeList__save";

        if (this.state.saved) {
            className += " postcodeList__save_saved"
        }

        return (
            <li className='postcodeList__item'>
                <span className={ className } onClick={ this.handleSaveClick }>♡</span>
                <span>{ this.props.item.zip }: { this.props.item.fullName }</span>
            </li>
        )
    }
});
