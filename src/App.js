import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './Container/Footer/Footer';
import Header from './Container/Header/Header';
import About from './Container/About/About';
import Contact from './Container/Contact/Contact';
import Department from './Container/Department';
import Doctors from './Container/Doctors/Doctors';
import Home from './Container/Home';
import Login from './Container/Login/Login';
import Medicines from './Container/Medicines/Medicines';
// import Bookapt from './Container/Appointment/Bookapt';
import Patients from './Container/Patients/Patients.js';
import Bookapt from './Container/Appointment/Bookapt';
import Listapt from './Container/Appointment/Listapt';
import PublicRoute from './Routing/PublicRoute';
import PrivateRoute from './Routing/PrivateRoute';



function App(props) {
  return (
    <div>
      <Header />
      <Switch>
      <PublicRoute  exact path={"/"} component={Home}/>
      <PublicRoute exact path={"/department"} component={Department}/>
      <PublicRoute exact path={"/medicines"} component={Medicines}/>
      <PublicRoute exact path={"/doctors"} component={Doctors}/>
      <PublicRoute exact path={"/about"} component={About}/>
      <PublicRoute exact path={"/contact"} component={Contact}/>
      <PublicRoute exact path={"/login"} component={Login}/>
      <PublicRoute  exact path={"/patients"}  component={Patients}/>

      <PrivateRoute exact path={"/Bookappoinment"} component={Bookapt} />
      <PrivateRoute exact path={"/Listappoinment"} component={Listapt} />
  
     </Switch>
      <Footer/>
    </div>
  );
}

export default App;
