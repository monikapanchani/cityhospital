import * as Actiontype from '../actiontype'

export let increment=()=>(dispatch)=>{
    dispatch({type:Actiontype.INCRIMENT_COUNTER})
}

export let decrement=()=>(dispatch)=>{
    dispatch({type:Actiontype.DECRIMENT_COUNTER})
}