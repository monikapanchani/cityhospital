import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function MedicineData() {
    const [data, setdata] = useState([]);
    const [dopen, setdOpen] = React.useState(false);
    const [did, setdid] = useState(0);
    const [update, setupdate] = useState(false);
    const [fmdata,setfmdata] = useState([]);

    const handledClickOpen = () => {
        setdOpen(true);
    };

    const handledClose = () => {
        setdOpen(false);
    };

    const loaddata = () => {
        const localdata = JSON.parse(localStorage.getItem("Medicines"));

        if (localdata !== null) {
            setdata(localdata)
        }
    }

    const handleinsert = (values) => {

        const localdata = JSON.parse(localStorage.getItem("Medicines"));

        const m_id = Math.floor(Math.random() * 100);

        const data = {
            id: m_id,
            ...values
        }
        if (localdata === null) {
            localStorage.setItem("Medicines", JSON.stringify([data]));
        } else {
            localdata.push(data);
            localStorage.setItem("Medicines", JSON.stringify(localdata));
        }

        handleClose()
        formik.resetForm()
        loaddata()
    }

    const handleupdate = (values) => {

        const localdata = JSON.parse(localStorage.getItem("Medicines"));
        const lData = localdata.map((l) => {
            if (l.id === values.id) {
                return values;
            } else {
                return l;
            }
        })
        localStorage.setItem("Medicines", JSON.stringify(lData));
        loaddata()
        formik.resetForm();
        setupdate(false);

    }

    let schema = yup.object().shape({
        name: yup.string().required("Please enter your medicine name."),
        quantity: yup.number().positive().integer().required("Please enter your medicine quantity."),
        price: yup.number().positive().integer().required("Please enter your medicine price."),
        expiry: yup.number().positive().integer().required("Please enter your medicine expiry year.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: '',
            expiry: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleupdate(values);
            } else {
                handleinsert(values);
            }
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleedit = (params) => {
        handleClickOpen()
        setupdate(true)
        formik.setValues(params.row)
    }

    const handledelete = (params) => {
        const localdata = JSON.parse(localStorage.getItem("Medicines"));
        const filterdata = localdata.filter((v) => v.id !== did);

        localStorage.setItem("Medicines", JSON.stringify(filterdata));

        handledClose()
        setdid(0)
        loaddata()
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: 'action', headerName: 'Action', width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="lg" style={{ color: 'red' }} onClick={() => { handledClickOpen(); setdid(params.id) }} >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size='lg' color='primary' onClick={() => { handleedit(params) }}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </>
            )
        },
    ];

    const handlesearch = (searchvalue) => {
        const localdata = JSON.parse(localStorage.getItem("Medicines"));
        const fdata = localdata.filter((l) => (
            l.name.toLowerCase().includes(searchvalue) ||
            l.quantity.toString().includes(searchvalue) ||
            l.price.toString().includes(searchvalue) ||
            l.expiry.toString().includes(searchvalue)
        ))
        setfmdata(fdata)
    }
    const filtdata = fmdata.length > 0 ? fmdata : data;

    let { errors, handleBlur, handleSubmit, handleChange, touched, values } = formik;

    useEffect(() => {
        loaddata()
    }, [])
    return (
        <>
            <h1>Medicines</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicines
                </Button>
                <div style={{ textAlign: "center" }}>
                    <TextField style={{ width: "80%" }}
                        margin="dense"
                        name='Search'
                        label="Search medicine data"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => handlesearch(e.target.value)}
                    />
                </div>
                <Dialog
                    open={dopen}
                    onClose={handledClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handledClose}>No</Button>
                        <Button onClick={handledelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Medicines</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>

                                <TextField
                                    margin="dense"
                                    name='name'
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p style={{ color: "#1976d2" }}>{errors.name}</p> : null}
                                <TextField
                                    margin="dense"
                                    name='quantity'
                                    label="Quantity"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                />
                                {errors.quantity && touched.quantity ? <p style={{ color: "#1976d2" }}>{errors.quantity}</p> : null}
                                <TextField
                                    margin="dense"
                                    name='price'
                                    label="Price"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                {errors.price && touched.price ? <p style={{ color: "#1976d2" }}>{errors.price}</p> : null}
                                <TextField
                                    margin="dense"
                                    name='expiry'
                                    label="Expiry"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expiry}
                                />
                                {errors.expiry && touched.expiry ? <p style={{ color: "#1976d2" }}>{errors.expiry}</p> : null}

                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    update ? <Button type='submit' onClick={handleClose}>update</Button> :
                                        <Button type='submit'>Submit</Button>
                                }
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
            <div style={{ height: 400, width: '80%', margin: '25px auto 0' }}>
                <DataGrid
                    rows={filtdata}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>

    );
}

export default MedicineData;