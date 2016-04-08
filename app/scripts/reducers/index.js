const initialState = {
    currentTabId: 'search',
    searchText: '',
    savedList: JSON.parse(window.localStorage.getItem('saved')) || [],
    searchedList: []
};

export default function reducers(state = initialState, action) {
    switch (action.type) {
    case 'SET_CURRENT_TAB':
        return {
            currentTabId: action.id,
            savedList: state.savedList,
            searchedList: state.searchedList
        };
    case 'SET_SEARCHED_LIST':
        return {
            currentTabId: state.currentTabId,
            savedList: state.savedList,
            searchedList: action.searchedList
                // Выводим только те результаты, где есть индекс
                .filter(item => item.zip)
                .map((item) => {
                    const newItem = item;

                    newItem.saved = state.savedList.some(savedItem => savedItem.id === item.id);

                    return newItem;
                })
        };
    case 'SAVE_ITEM':
        {
            const itemToSave = action.item;
            let newState = {};

            itemToSave.saved = true;

            newState = {
                currentTabId: state.currentTabId,
                savedList: state.savedList.concat([itemToSave]),
                searchedList: state.searchedList.reduce((result, item) => {
                    const itemToSave = item;

                    if (item.id === action.item.id) {
                        itemToSave.saved = true;
                    }

                    result.push(itemToSave);

                    return result;
                }, [])
            };

            window.localStorage.setItem('saved', JSON.stringify(newState.savedList));

            return newState;
        }
    case 'DELETE_ITEM':
        {
            const newState = {
                currentTabId: state.currentTabId,
                savedList: state.savedList.reduce((result, item) => {
                    return action.item.id === item.id ? result : result.concat([item]);
                }, []),
                searchedList: state.searchedList.reduce((result, item) => {
                    const newItem = item;

                    if (action.item.id === newItem.id) {
                        newItem.saved = false;
                    }

                    return result.concat([newItem]);
                }, [])
            };

            window.localStorage.setItem('saved', JSON.stringify(newState.savedList));

            return newState;
        }
    case 'SET_SEARCHED_TEXT':
        return {
            currentTabId: state.currentTabId,
            savedList: state.savedList,
            searchedList: state.searchedList
        };
    default:
        return state;
    }
}
