import { authsaga } from "./auth.saga";
import { all} from 'redux-saga/effects'

export default function* rootsaga(){
    yield all ([
        authsaga()
    ])
}