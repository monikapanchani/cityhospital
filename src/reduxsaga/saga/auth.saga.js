import { all,call, takeEvery, } from 'redux-saga/effects'
import { signinApi, signupApi } from '../../common/api/auth.api';
import * as ActionTypes from '../Actiontype'


function* signup(action) {
   try {
      const user = yield call(signupApi, action.payload);
      // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
      console.log(user);
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
      console.log(e);
   }
}

function* signin(action){
   try{
      const user = yield call(signinApi, action.payload)
      console.log(user);
   }catch(e){
      console.log(e);
   }
}

function* watchSignup() {
  yield takeEvery(ActionTypes.SIGN_UP, signup );
}

function* watchSignin(){
   yield takeEvery(ActionTypes.SIGN_IN, signin)
}

export function* authsaga(){
    yield all([
        watchSignup(),
        watchSignin()
    ])
}