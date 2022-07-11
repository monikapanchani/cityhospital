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

function Medicine(props) {

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
        let localData = JSON.parse(localStorage.getItem('Medicine'));
        if (localData === null) {
            localStorage.setItem("Medicine", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("Medicine", JSON.stringify(localData))

        }

        loadData();
        handleClose();
        formikobj.resetForm();
    }

    let schema = yup.object().shape({
        name: yup.string().required("Please enter name"),
        price: yup.number().required("please enter price").positive().integer(),
        quantity: yup.string().required("please enter quantity"),
        expiry: yup.string().required("please enter expiry"),

    });

   let handleUpdateData=(values)=>{
    let localData = JSON.parse(localStorage.getItem('Medicine'));
     let lData = localData.map((l)=>{
            if(l.id === values.id){
                return values;
            }else{
                return l;
            }
        })
        localStorage.setItem('Medicine',JSON.stringify(lData));
        console.log(lData);
       loadData();
       formikobj.resetForm();
       handleClose();
       setUpdate(false); 
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: '',
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
        let localData = JSON.parse(localStorage.getItem('Medicine'));
        let fData = localData.filter((l) => l.id !== did)
        console.log(fData);
        localStorage.setItem("Medicine", JSON.stringify(fData));
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
        { field: 'name', headerName: 'Medicine Name', width: 130 },
        { field: 'price', headerName: 'price', width: 130 },
        { field: 'quantity', headerName: 'quantity', width: 130 },
        { field: 'expiry', headerName: 'expiry', width: 130 },
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
        let localData = JSON.parse(localStorage.getItem('Medicine'));
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
                <DialogTitle>Medicine Detail</DialogTitle>
                <Formik values={formikobj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>

                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="Medicine Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.name && touched.name ? errors.name : ''}</p>
                            <TextField
                                value={values.price}
                                margin="dense"
                                name="price"
                                label="Medicine Price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.price && touched.price ? errors.price : ''}</p>
                            <TextField
                                 value={values.quantity}
                                margin="dense"
                                name="quantity"
                                label="Medicine Quantity"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.quantity && touched.quantity ? errors.quantity : ''}</p>
                            <TextField
                                value={values.expiry}
                                margin="dense"
                                name="expiry"
                                label="Medicine Expiry"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.expiry && touched.expiry ? errors.expiry : ''}</p>
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
        </div >
    );
}

export default Medicine;