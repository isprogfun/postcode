import React from 'react';
import PostcodeItem from './postcode-item.jsx';

export default class PostcodeList extends React.Component {
    render() {
        return (
            <div className='postcodeList'>
                <h2>{ this.props.title }</h2>
                <ul className='postcodeList__list'>
                    {
                        this.props.store.getState()[this.props.list]
                            .map(item => <PostcodeItem item={ item } key={ item.id } store={ this.props.store }/>)
                    }
                </ul>
            </div>
        );
    }
}

PostcodeList.propTypes = {
    store: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired,
    list: React.PropTypes.string.isRequired
};

// export { PostcodeList as default };
