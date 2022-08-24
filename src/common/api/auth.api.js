import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
export const signupApi = (values) => {
  console.log("signupApi", values);

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;

        onAuthStateChanged(auth, (user) => {
          console.log(user);
          if (user.emailVerified) {
            resolve({ payload: "email registerd" });
          } else {
            sendEmailVerification(user)
              .then(() => {
                resolve({ payload: "please verified email" });
              })
              .catch((e) => { 
              })
            
          }
        });
      })
      // .then((user) => {
      //   onAuthStateChanged(auth, (user) => {
      //     if (user.emailVerified) {
      //       resolve({ payload: "email registerd" });
      //     } else {
      //       resolve({ payload: "please verified email" });
      //     }
      //   });
      // })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
          reject({ payload: "already use email" });
        } else {
          reject({ payload: errorCode });
        }
      });
  });
};

export const signinApi = (values) => {
  console.log("signinApi", values);

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          resolve({ payload: "Login successfully" });
        } else {
          reject({ payload: "First Verified email" });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode.localeCompare("auth/user-not-found") === 0) {
          reject({ payload: "Do not match email & password" });
        } else {
          reject({ payload: errorCode });
        }
      });
  });
};
