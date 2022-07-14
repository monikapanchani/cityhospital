import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';

function Bookapt(props) {


    const [update, setupdate] = useState(false)

    useEffect(() => {

        let localdata = JSON.parse(localStorage.getItem("apt"));

        if (props.location.state !== null && props.location.state !== undefined) {

            let ldata = props.location.state;

            const edata = localdata.filter((l) => l.id === ldata.id);

            formikObj.setValues(edata[0]);

            setupdate(true)
        }

        history.replace();

    }, [])

    const history = useHistory();
// 
    const handleinsert = (values) => {

        const id = Math.floor(Math.random() * 1000);

        const data = {
            id: id,
            ...values
        }

        console.log(data);

        const localdata = JSON.parse(localStorage.getItem("apt"));

        if (localdata === null) {
            localStorage.setItem("apt", JSON.stringify([data]))
        } else {
            localdata.push(data);
            localStorage.setItem("apt", JSON.stringify(localdata));
        }
        // console.log(data);
        history.push("/Listappoinment");
    }

    const handleUpdate = (values) => {

        const localData = JSON.parse(localStorage.getItem('apt'));

        let uData = localData.map((l) => {

            if (l.id === values.id) {
                return values;
            }
            else {
                return l;
            }

        })
        console.log(uData);

    
        localStorage.setItem('apt', JSON.stringify(uData));

        history.push('/Listappoinment');

        setupdate(false);

        history.replace();

        formikObj.resetForm();
    }
    let schema = yup.object().shape({
        name: yup.string().required('please enter name'),
        email: yup.string().required('please enter email'),
        phone: yup.string().required('please enter phone'),
        date: yup.string().required('please enter date'),
        message: yup.string().required('please enter message'),
        department: yup.string().required('please enter department')
    });


    const formikObj = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            date: '',
            message: '',
            department: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if(update === true){
                handleUpdate(values);
            }else{
                handleinsert(values);
            }
            

            

        },
    });


    const { errors, handleSubmit, handleChange, handleBlur, touched, values } = formikObj;

    return (
        <>
            <main id="main">

                <section className='my-4'>
                    <div className='container'>
                        <div className='row text-center'>
                            <div className='col-6'>
                                <NavLink exact to={"/Bookappoinment"}>Book appointment</NavLink>
                            </div>
                            <div className='col-6'>
                                <NavLink exact to={"/Listappoinment"}>List appointment</NavLink>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="appointment" className="appointment">
                    <div className="container">

                        <div className="section-title">
                            <h2>Make an Appointment</h2>
                            <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                                blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                                Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                        </div>

                        <Formik values={formikObj}>
                            <Form onSubmit={handleSubmit} className="php-email-form">
                                <div className="row">

                                    <div className="col-md-4 form-group">
                                        <input
                                            value={values.name}
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="Your Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p>{errors.name && touched.name ? errors.name : ''}</p>
                                    </div>

                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input
                                            value={values.email}
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            placeholder="Your Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p>{errors.email && touched.email ? errors.email : ''}</p>
                                    </div>

                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input
                                            value={values.phone}
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            id="phone"
                                            placeholder="Your Phone"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p>{errors.phone && touched.phone ? errors.phone : ''}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 form-group mt-3">
                                        <input
                                            value={values.date}
                                            type="date"
                                            name="date"
                                            className="form-control datepicker"
                                            id="date"
                                            placeholder="Appointment Date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p>{errors.date && touched.date ? errors.date : ''}</p>
                                    </div>

                                    <div className="col-md-4 form-group mt-3">
                                        <select
                                            name="department"
                                            id="department"
                                            className="form-select"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.department}>

                                            <option value="">Select Department</option>
                                            <option value="Department 1">Department 1</option>
                                            <option value="Department 2">Department 2</option>
                                            <option value="Department 3">Department 3</option>

                                        </select>
                                        <p>{errors.department && touched.department ? errors.department : ''}</p>

                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <textarea className="form-control"
                                        value={values.message}
                                        name="message"
                                        rows={3}
                                        placeholder="Message"
                                        defaultValue={""}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    <p>{errors.message && touched.message ? errors.message : ''}</p>
                                </div>

                                <div className="mb-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message" />
                                    <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                                </div>
                                <div className="text-center">
                                    {
                                        update ?
                                            <button type="submit" >update</button>
                                            :
                                            <button type="submit">Appointment</button>
                                    }
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </section>

            </main>
        </>
    );
}

export default Bookapt;