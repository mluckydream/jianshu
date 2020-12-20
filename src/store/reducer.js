const defaulfState = {
    focused: false
};

export default (state = defaulfState, action) => {
    if(action.type === 'search_focus'){
        return {
            focused: true
        }
    }
    if(action.type === 'search_blur'){
        return {
            focused: false
        }
    }

    return state;
}