import React from 'react';

export default class PostcodeItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }
    handleSaveClick() {
        if (this.props.item.saved) {
            this.props.store.dispatch({
                type: 'DELETE_ITEM',
                item: this.props.item
            });
        } else {
            this.props.store.dispatch({
                type: 'SAVE_ITEM',
                item: this.props.item
            });
        }
    }
    render() {
        let className = 'postcodeList__save';

        if (this.props.item.saved) {
            className += ' postcodeList__save_saved';
        }

        return (
            <li className='postcodeList__item'>
                <span className={ className } onClick={ this.handleSaveClick }>♡</span>
                <span>{ this.props.item.zip }: { this.props.item.fullName }</span>
            </li>
        );
    }
}

PostcodeItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
};
