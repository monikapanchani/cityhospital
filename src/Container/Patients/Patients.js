import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Patients(props) {

    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [data, setdata] = useState([]);
    const [did, setDid] = useState(0);
    const [update, setUpdate]=useState(false);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };



    const handleInsert = (values) => {
        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        let localData = JSON.parse(localStorage.getItem('Patients'));
        if (localData === null) {
            localStorage.setItem("Patients", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("Patients", JSON.stringify(localData))

        }

        loadData();
        handleClose();
        formikobj.resetForm();
    }

    let schema = yup.object().shape({
        name: yup.string().required("Please enter name"),
        age: yup.number().required("please enter age"),
        weight: yup.number().required("please enter weight"),
        contact: yup.number().required("please enter contact"),

    });

   let handleUpdateData=(values)=>{
    let localData = JSON.parse(localStorage.getItem('Patients'));
     let lData = localData.map((l)=>{
            if(l.id === values.id){
                return values;
            }else{
                return l;
            }
        })
        localStorage.setItem('Patients',JSON.stringify(lData));
        console.log(lData);
       loadData();
       formikobj.resetForm();
       handleClose();
       setUpdate(false); 
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            age: '',
            weight: '',
            contact: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if(update){
                handleUpdateData(values);
            }else{

                handleInsert(values)
            }
        
        },
    });

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem('Patients'));
        let fData = localData.filter((l) => l.id !== did)
        console.log(fData);
        localStorage.setItem("Patients", JSON.stringify(fData));
        loadData();
        handleClose();

    }

   const handleEdit=(params)=>{
    console.log(params);
    handleClickOpen();
    
    setUpdate(true);

    formikobj.setValues(params.row)
   }
    const columns = [
        { field: 'name', headerName: 'Patients Name', width: 130 },
        { field: 'age', headerName: 'Age ', width: 130 },
        { field: 'weight', headerName: 'weight', width: 130 },
        { field: 'contact', headerName: 'contact', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="large" onClick={() =>  handleEdit(params) }>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </>

            )
        },


    ];


    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem('Patients'));
        if (localData !== null) {

            setdata(localData)
        }

    }

    useEffect(
        () => {
            loadData();
        }, [])

    const { handleChange, handleSubmit, handleBlur, errors, touched, values } = formikobj

    console.log(data);
    return (
        <div>
        <div className='container'>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog fullWidth
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to Delete?"}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Patients Detail</DialogTitle>
                <Formik values={formikobj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>

                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="Patients Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.name && touched.name ? errors.name : ''}</p>
                            <TextField
                                value={values.age}
                                margin="dense"
                                name="age"
                                label="age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.age && touched.age ? errors.age : ''}</p>
                            <TextField
                                 value={values.weight}
                                margin="dense"
                                name="weight"
                                label=" weight"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.weight && touched.weight ? errors.weight : ''}</p>
                            <TextField
                                value={values.contact}
                                margin="dense"
                                name="contact"
                                label="contact"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.contact && touched.contact ? errors.contact : ''}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                           { 
                           update === (true) ?
                            <Button type='submit'>Update</Button>
                            :
                            <Button type='submit'>Submit</Button>
                           }
                        </DialogActions>

                    </Form>
                </Formik>

            </Dialog>
            </div>
        </div >
    );
}

export default Patients;