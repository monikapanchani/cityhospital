import * as Actiontype from '../actiontype';
let iniVal ={
    counter : 0 
}
export default counterReducer=(state = iniVal, action)=>{
    switch(action.type) {
        case Actiontype.INCRIMENT_COUNTER :
        return {
            ...state,
            counter : counter.state +1,
        }
        case Actiontype.DECRIMENT_COUNTER :
        return {
            ...state,
            counter : counter.state -1,
        }
        default  :
        return state;
    }
}