import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Login(props) {

  const [usertype, setusertype] = useState('login');
  const [reset, setReset] = useState(false);

  let schemaVal, initVal;

  if (usertype === 'login') {
     schemaVal = {
      email: yup.string().email("please enter email id."),
      password: yup.string().required("please enter password."),
    };

    initVal={
      email:'',
      password:'',
    }

  }else if (usertype === 'signup'){
      schemaVal = {
      name: yup.string().required("please enter name."),
      email: yup.string().email().required("please enter email id"),
      password: yup.string().required("please enter password."),
    
    };
    initVal={
      name:'',
      email:'',
      password:'',
    }
  }else if(reset === true){
    schemaVal = {
      email: yup.string().email().required("please enter email id"),
    };

    initVal={
    email:'',
    }
  }

  let schema = yup.object().shape(schemaVal);


  const formikObj = useFormik({
    initialValues:initVal ,
    validationSchema: schema,
    onSubmit: (values) => {
      if(usertype === 'Login'){
        handleLogin(values);
    }else{

        // alert(JSON.stringify(values, null, 2));
        dispatch(singupAction(values))
       
    }

    },
  });
  const { errors, handleSubmit, handleChange, handleBlur, touched } = formikObj;

  return (

    <>
      <section id="appointment" className="appointment">
        <div className="container">
          <div className="section-title">
            {
              reset ?
                <h2>Forgot Password</h2>
                :
                usertype === 'login' ? <h2>Login</h2> : <h2>SignUp</h2>
            }
          </div>
          <Formik values={formikObj}>
            <Form onSubmit={handleSubmit} className="php-email-form">
              {

                reset ? null :
                  usertype === 'signup' ?
                    <div className="row">
                      <div className="col-md-4 form-group">
                        <input type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p>{errors.name && touched.name ? errors.name : ''}</p>
                        <div className="validate" />
                      </div>
                    </div>
                    :
                    null
              }

              <div className="row">
                <div className="col-md-4 form-group mt-3 mt-md-0">
                  <input type="email"
                    className="form-control "
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p>{errors.email && touched.email ? errors.email : ''}</p>
                  <div className="validate" />
                </div>
              </div>
              <>
                {
                  reset ? null :
                    usertype === 'login' || 'signup' ?
                      <>

                        <div className="row">
                          <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="tel"
                              className="form-control"
                              name="password"
                              id="password"
                              placeholder="Your password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p>{errors.password && touched.password ? errors.password : ''}</p>
                            <div className="validate" />
                          </div>
                        </div>

                      </>
                      :
                      null

                }

              </>

              {
                reset ?
                  <> <a type="submit" onClick={() => { setReset(false); setusertype('login') }}>Remember Password?</a><br /></>
                  :
                  usertype === 'login' ?
                    <>
                      <a type="submit" onClick={() => setusertype('signup')}>Create have an Account?</a><br />
                      <a type="submit" onClick={() => setReset('reset')}>Forgot Password?</a></>
                    :
                    <>
                      <a type="submit" onClick={() => setusertype('login')}>Already you have an  </a>
                    </>
              }

              {
                reset ?
                  <div className="text-center"><button type="submit">Submit</button></div>
                  :
                  usertype === 'login' ?
                    <>
                      <div className="text-center">  <button type="submit">Login</button></div></>
                    :
                    <div className="text-center"> <button type="submit">SignUp</button></div>
              }
            </Form>
          </Formik>
        </div>
      </section>

    </>

  );
}

export default Login;



