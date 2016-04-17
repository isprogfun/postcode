const initialState = {
    currentTabId: 'search',
    savedList: JSON.parse(window.localStorage.getItem('saved')) || [],
    searchedList: []
};

export default function reducers(state = initialState, action) {
    switch (action.type) {

    case 'SET_CURRENT_TAB':
        return {
            ...state,
            currentTabId: action.id
        };

    case 'SET_SEARCHED_LIST':
        return {
            ...state,
            searchedList: action.searchedList
                // Выводим только те результаты, где есть индекс
                .filter(item => item.zip)
                .map((item) => ({
                    ...item,
                    saved: state.savedList.some(savedItem => savedItem.id === item.id)
                }))
        };

    case 'SAVE_ITEM':
        return {
            ...state,
            savedList: state.savedList.concat([{ ...action.item, saved: true }]),
            searchedList: state.searchedList.map((item) => {
                if (item.id === action.item.id) {
                    return { ...item, saved: true };
                }

                return item;
            })
        };

    case 'DELETE_ITEM':
        return {
            ...state,
            savedList: state.savedList.filter((item) => item.id !== action.item.id),
            searchedList: state.searchedList.map((item) => {
                if (item.id === action.item.id) {
                    return { ...item, saved: false };
                }

                return item;
            })
        };

    default:
        return state;
    }
}
