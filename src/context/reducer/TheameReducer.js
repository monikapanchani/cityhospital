import { TOGGLE_THEAME } from "../Actiontype"


export const TheameReducer = (state, action)=>{
    switch(action.type){
        case TOGGLE_THEAME :
            return{
                ...state,
                theme : action.payload
            }
            default :
            return state
    }
}