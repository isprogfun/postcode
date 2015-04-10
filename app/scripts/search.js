var Search = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },
    handleNewData: function(data) {
        var saved = window.localStorage.getItem('saved');

        saved = saved ? JSON.parse(saved) : [];

        // Проверить пришедший список на наличие в избранном
        data = data.data.map(function(item) {
            saved.some(function(savedItem) {
                if (savedItem.id === item.id) {
                    item.saved = true;

                    return true;
                }
            })

            return item;
        })

        this.setState({ data: data });
    },
    render: function() {
        return (
            <div className='search'>
                <h2>Поиск</h2>
                <Finder onGetData={ this.handleNewData } />
                <PostcodeList data={ this.state.data } />
            </div>
        );
    }
});
