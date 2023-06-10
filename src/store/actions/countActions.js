import { countActions } from "../reducers/countReducers";
export const changeCount = (type) => (dispatch, getState) =>{
    const {count} = getState();
    if(type==='INCREMENTA'){
        dispatch(countActions.countChange(count.number+1));
    } else {
        dispatch(countActions.countChange(count.number-1));
    }
};