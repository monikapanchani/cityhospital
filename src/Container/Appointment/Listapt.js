import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from "reactstrap";

function Listapt(props) {
    const history = useHistory();
    const localdata = JSON.parse(localStorage.getItem("apt"));
    const [data, setdata] = useState([])

    useEffect(() => {
        getdata()
    },
        [])

    const getdata = () => {
        const localdata = JSON.parse(localStorage.getItem('apt'));
        setdata(localdata);
    }

    const handleEdit = (id) => {
        history.push("/Bookappoinment", { id: id })
    }

    const handleDelete = (id) => {

        let localData = JSON.parse(localStorage.getItem('apt'));
        let fData = localData.filter((l) => l.id !== id)
        localStorage.setItem("apt", JSON.stringify(fData));
        getdata();
    }

    return (

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

            <div className='container'>
                <div className="section-title">
                    <h2>Make an Appointment</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>


                <div className='row d-flex justify-content-center'>
                    {
                        data.map((d, i) => {

                            return (
                                <Card className='my-3 mx-3 col-3 border-3 '>
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            {d.name}
                                        </CardTitle>
                                        <CardSubtitle>
                                            {d.email}
                                        </CardSubtitle>
                                        <CardText>
                                            {d.date}
                                        </CardText>
                                        <Button className='shadow-none mx-2 border-2' onClick={() => { handleEdit(d.id) }}>
                                            Edit
                                        </Button>
                                        <Button id="btn" className='shadow-none mx-2 border-2' onClick={() => { handleDelete(d.id) }}>
                                            Delete
                                        </Button>
                                    </CardBody>
                                </Card>

                            )
                        })
                    }
                </div>

            </div>
        </section>


    );
}

export default Listapt;